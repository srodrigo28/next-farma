# Arquitetura Next Farma

## Estrutura proposta

```text
src/
  app/
    splash/
    login/
    cadastro/
    dashboard/
  modules/
    splash/
      controllers/
      models/
      services/
      views/
    auth/
      controllers/
      models/
      services/
      views/
    onboarding/
      controllers/
      models/
      services/
      views/
    dashboard/
      controllers/
      models/
      services/
      views/
  shared/
    components/
    types/
```

## Padrao adotado

- `app`: rotas do App Router.
- `modules`: cada funcionalidade fica isolada por dominio.
- `controllers`: conectam a view aos dados.
- `models`: definem dados padrao e estruturas de dominio.
- `services`: ponto de integracao para mock, API ou regras futuras.
- `views`: composicao visual da tela.
- `shared/types`: tipagens globais reutilizaveis.

## Proximas etapas

1. Trocar mocks por estados reais e formularios controlados.
2. Integrar login Google com Google Identity Services no frontend e autenticacao propria na API.
3. Criar API Flask para autenticacao, usuarios, unidades e dashboard.
