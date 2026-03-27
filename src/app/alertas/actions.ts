export async function snoozeAlert(alertId: string) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    ok: true,
    alertId,
    message: "Alerta silenciado por 30 minutos.",
  };
}
