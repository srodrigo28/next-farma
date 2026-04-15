import { spawn } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import process from "node:process";

const webRoot = resolve(process.cwd());
const repoRoot = resolve(webRoot, "..");
const apiRoot = join(repoRoot, "api");
const tempTestsDir = join(webRoot, ".tmp-tests");
const nodeTestEnv = { ...process.env };

function getPythonPath() {
  const windows = join(apiRoot, ".venv", "Scripts", "python.exe");
  const posix = join(apiRoot, ".venv", "bin", "python");
  if (existsSync(windows)) return windows;
  if (existsSync(posix)) return posix;
  throw new Error("Nao encontrei o Python da virtualenv da API.");
}

function run(command, args, options = {}) {
  return new Promise((resolvePromise, rejectPromise) => {
    const isWindowsCmd = process.platform === "win32" && command.toLowerCase().endsWith(".cmd");
    const finalCommand = isWindowsCmd ? "cmd.exe" : command;
    const finalArgs = isWindowsCmd ? ["/c", command, ...args] : args;

    const child = spawn(finalCommand, finalArgs, {
      stdio: "inherit",
      shell: false,
      ...options,
    });

    child.on("error", rejectPromise);
    child.on("exit", (code) => {
      if (code === 0) {
        resolvePromise(undefined);
        return;
      }
      rejectPromise(new Error(`Comando falhou: ${command} ${args.join(" ")} (exit ${code ?? "null"})`));
    });
  });
}

async function waitForHealthcheck(url, timeoutMs = 15000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 500));
  }

  throw new Error(`API de teste nao respondeu em ${url}`);
}

async function compileTests() {
  const tscPath = process.platform === "win32"
    ? resolve(webRoot, "node_modules", ".bin", "tsc.cmd")
    : resolve(webRoot, "node_modules", ".bin", "tsc");

  await run(tscPath, ["-p", "tsconfig.patient-tests.json"], { cwd: webRoot });
}

async function runUnitTests() {
  await run(process.execPath, ["--test", join(tempTestsDir, "src", "app", "pacientes", "patientRegistration.test.js")], {
    cwd: webRoot,
    env: nodeTestEnv,
  });
}

async function runIntegrationTests() {
  const pythonPath = getPythonPath();
  const server = spawn(pythonPath, [join(apiRoot, "run_test_server.py")], {
    cwd: repoRoot,
    stdio: "inherit",
    shell: false,
    env: {
      ...process.env,
      FLASK_ENV: "testing",
      APP_HOST: "127.0.0.1",
      APP_PORT: "5051",
    },
  });

  try {
    await waitForHealthcheck("http://127.0.0.1:5051/api/v1/health");
    await run(process.execPath, ["--test", join(tempTestsDir, "src", "app", "pacientes", "patientRegistration.integration.test.js")], {
      cwd: webRoot,
      env: {
        ...nodeTestEnv,
        PATIENT_TEST_API_URL: "http://127.0.0.1:5051",
      },
    });
  } finally {
    server.kill("SIGTERM");
  }
}

async function main() {
  const mode = process.argv[2] || "all";

  if (existsSync(tempTestsDir)) {
    rmSync(tempTestsDir, { recursive: true, force: true });
  }

  await compileTests();

  if (mode === "unit") {
    await runUnitTests();
  } else if (mode === "integration") {
    await runIntegrationTests();
  } else {
    await runUnitTests();
    await runIntegrationTests();
  }

  if (existsSync(tempTestsDir)) {
    rmSync(tempTestsDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  if (existsSync(tempTestsDir)) {
    rmSync(tempTestsDir, { recursive: true, force: true });
  }
  process.exit(1);
});
