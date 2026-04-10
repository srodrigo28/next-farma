# Falha Google Auth

## Data

- 2026-04-10

## Atualizacao

- o bloqueio nao era apenas ausencia de variavel
- tambem havia desencontro de convencao entre a configuracao antiga de `next-auth` e o fluxo atual
- o frontend implementado hoje usa `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- o arquivo `web/.env` ainda estava com `AUTH_GOOGLE_ID` e `AUTH_GOOGLE_SECRET`, que nao sao lidos pelo fluxo atual
- a API tambem estava sem `GOOGLE_CLIENT_ID`
- a correcao aplicada foi alinhar os envs reais da web e da API para o mesmo client id Web do Google

## Objetivo desta anotacao

Registrar exatamente onde paramos na integracao de login com Google entre `api` e `web`, o que ja foi implementado, o que foi validado e qual foi a falha encontrada antes de encerrar o trabalho.

## Resumo rapido

A integracao de Google Auth foi implementada no codigo e a base de dados foi preparada com migration aplicada.

O bloqueio atual nao e de banco.
O bloqueio principal encontrado foi de configuracao local de variaveis de ambiente:

- `api/.env` existia sem `GOOGLE_CLIENT_ID`
- `web/.env` existia, mas ainda seguia o padrao antigo de `next-auth`
- o fluxo atual da web precisa de `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

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

- `python -m pytest api	ests	est_auth.py`
- `python -m pytest`

Resultados:

- `11 passed` em `test_auth.py`
- `62 passed` na suite completa da API

### Web

Comandos executados:

- `npm run lint`
- `npm run build`

Resultados:

- lint OK com 1 warning antigo e nao relacionado em `web/src/shared/components/AppNavbar.tsx`
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

- `GOOGLE_CLIENT_ID_SET=False`
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID_SET=False`
- rota `POST /api/v1/auth/google` registrada corretamente

Detalhe encontrado:

### `api/.env`

O arquivo existe, mas no estado anterior continha somente chaves gerais da API e banco.
Nao continha a chave:

- `GOOGLE_CLIENT_ID=<client id web do Google>`

### `web/.env`

O arquivo existe no ambiente local atual.
Mas no estado anterior continha apenas as chaves antigas:

- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`

Essas chaves nao sao lidas pelo fluxo atual do login Google.
Por isso a web nao estava carregando:

- `NEXT_PUBLIC_GOOGLE_CLIENT_ID=<client id web do Google>`

## Onde paramos

O codigo segue pronto, testado e com migration aplicada.
Ajustamos tambem a configuracao local para o nome correto das variaveis usadas pelo fluxo atual.

## Proximo passo quando voltarmos

1. Adicionar `GOOGLE_CLIENT_ID` em `api/.env`
2. Criar `web/.env.local`
3. Adicionar `NEXT_PUBLIC_GOOGLE_CLIENT_ID` em `web/.env.local`
4. Subir a API local
5. Subir a web local
6. Testar login Google real na tela `/login`
7. Validar o redirecionamento para `/cadastro/completar` ou `/dashboard`
8. Se tudo funcionar localmente, repetir a configuracao no ambiente online

## Observacao importante

O problema final nao foi de implementacao do fluxo.
O problema final foi apenas a ausencia das variaveis locais do Google no momento da validacao.
