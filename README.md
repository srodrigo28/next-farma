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
NEXT_PUBLIC_API_URL="http://127.0.0.1:5000"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="seu-google-client-id-web.apps.googleusercontent.com"
```

Para usar a API online, troque para algo como:

```env
NEXT_PUBLIC_API_URL="https://sua-api-online-aqui"
```

## Como validar rapido

- Abra a web em `http://localhost:3000`
- Veja o selo `API online` ou `API indisponivel` no topo
- Teste login, dashboard, pacientes, medicacoes e sinais vitais

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
