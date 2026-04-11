# Falha Google Auth

## Data

- 2026-04-10

## Atualizacao

- o bloqueio nao era apenas ausencia de variavel
- tambem havia desencontro de convencao entre a configuracao antiga de `next-auth` e o fluxo atual
- o frontend implementado hoje usa `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- variaveis como `AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET` nao sao lidas pelo fluxo atual da tela de login
- a API precisa de `GOOGLE_CLIENT_ID`
- a correcao aplicada foi alinhar os envs reais da web e da API para o mesmo client id Web do Google

## Objetivo desta anotacao

Registrar exatamente onde paramos na integracao de login com Google entre `api` e `web`, o que ja foi implementado, o que foi validado e qual foi a falha encontrada antes de encerrar o trabalho.

## Resumo rapido

A integracao de Google Auth foi implementada no codigo e a base de dados foi preparada com migration aplicada.

O bloqueio atual nao e de banco.
O bloqueio principal encontrado foi de configuracao local de variaveis de ambiente:

- `api/.env` precisa de `GOOGLE_CLIENT_ID`
- `web/.env` precisa de `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- o fluxo atual da web nao usa `AUTH_GOOGLE_ID` nem `AUTH_GOOGLE_SECRET`

## O que foi implementado

### API

Arquivos principais alterados:

- `api/app/config.py`
- `api/app/controllers/auth_controller.py`
- `api/app/services/auth_service.py`
- `api/app/schemas/auth_schema.py`
- `api/app/models/user_model.py`
- `api/app/repositories/user_repository.py`
- `api/migrations/versions/7f2c9b8e1a4d_add_google_subject_to_users.py`
- `api/requirements.txt`
- `api/tests/test_auth.py`

Implementacoes feitas:

- adicionada a configuracao `GOOGLE_CLIENT_ID` na API
- criado endpoint `POST /api/v1/auth/google`
- adicionada validacao de payload para `credential`
- implementada validacao do token Google usando `google-auth`
- conciliacao de usuario Google com usuario local por `email`
- vinculacao persistente via campo `google_subject`
- criacao automatica de usuario novo quando o email ainda nao existe
- emissao do mesmo JWT da aplicacao apos login Google
- testes automatizados cobrindo login Google e vinculacao de conta existente

### Banco

Implementacao feita:

- criada migration para adicionar `google_subject` em `users`
- migration aplicada com sucesso no banco configurado

Migration aplicada:

- `6c3a1e9d7b2c -> 7f2c9b8e1a4d`

### Web

Arquivos principais alterados:

- `web/src/shared/lib/google-auth.ts`
- `web/src/app/login/actions.ts`
- `web/src/app/login/components/LoginPageView.tsx`
- `web/docs/cadastro-auth.md`

Implementacoes feitas:

- criado cliente de integracao com Google Identity Services
- botao Google da tela de login deixou de ser placeholder
- a tela agora pede a `credential` ao Google
- a web envia a `credential` para `POST /api/v1/auth/google`
- a sessao continua sendo a sessao JWT da API
- o redirecionamento foi mantido:
- perfil incompleto -> `/cadastro/completar`
- perfil completo -> `/dashboard`

## Validacoes realizadas

### API

Comandos executados:

- `python -m pytest api\tests\test_auth.py`
- `python -m pytest`

Resultados:

- `11 passed` em `test_auth.py`
- `62 passed` na suite completa da API

### Web

Comandos executados:

- `npm run lint`
- `npm run build`

Resultados:

- lint OK
- build OK

### Dependencias e migration

Comandos executados:

- `python -m pip install -r requirements.txt`
- `python -m flask --app run:app db upgrade`

Resultados:

- `google-auth` instalado com sucesso
- migration aplicada com sucesso

## Falha encontrada ao final

Checagens executadas:

- API carregando config do app
- leitura do `.env` da web
- listagem de rotas Flask

Resultado das checagens:

- a API precisa expor `GOOGLE_CLIENT_ID`
- a web precisa expor `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- rota `POST /api/v1/auth/google` registrada corretamente

## Onde paramos

O codigo segue pronto, testado e com migration aplicada.
A configuracao correta das variaveis ficou definida e sem dependencia do padrao antigo.

## Proximo passo quando voltarmos

1. Garantir `GOOGLE_CLIENT_ID` em `api/.env`
2. Garantir `NEXT_PUBLIC_GOOGLE_CLIENT_ID` em `web/.env`
3. Subir a API local
4. Subir a web local
5. Testar login Google real na tela `/login`
6. Validar o redirecionamento para `/cadastro/completar` ou `/dashboard`
7. Se tudo funcionar localmente, repetir a configuracao no ambiente online

## Observacao importante

O fluxo atual do login Google nao depende de `next-auth`.
No frontend, a variavel correta e apenas `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
