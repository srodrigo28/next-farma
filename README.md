# Next Farma Web

## Ambiente local

1. Copie `.env.example` para `.env`
2. Defina `NEXT_PUBLIC_API_URL` com a URL da API
3. Defina `NEXT_PUBLIC_GOOGLE_CLIENT_ID` com o client id Web do Google Identity Services
4. Garanta que a API tenha o mesmo valor em `GOOGLE_CLIENT_ID`
5. Rode `npm run dev`

## Alternando entre API local e online

Use no arquivo `.env`:

```env
NEXT_PUBLIC_API_URL="https://99dev.pro/api-farma"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="seu-google-client-id-web.apps.googleusercontent.com"
```

Para usar a API local, troque para:

```env
NEXT_PUBLIC_API_URL="http://127.0.0.1:5000"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="seu-google-client-id-web.apps.googleusercontent.com"
```

## Google Login

O fluxo atual nao usa `next-auth` para login Google.
A web abre o Google Identity Services no navegador e envia a `credential` para a API.
Por isso a variavel obrigatoria no frontend e `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.

## Como validar rapido

- Abra a web em `http://localhost:3000`
- Veja o selo `API online` ou `API indisponivel` no topo
- Teste login, dashboard, pacientes, medicacoes e sinais vitais
- Teste `Continuar com Google`

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run test:patients
npm run test:patients:unit
npm run test:patients:integration
```

## Testes de cadastro de paciente

- `npm run test:patients:unit` valida a logica do formulario e o mapeamento de payload/erros do cadastro de paciente.
- `npm run test:patients:integration` sobe uma API temporaria em memoria e verifica o payload do web criando paciente e recebendo erro de duplicidade.
- `npm run test:patients` executa os dois fluxos.
