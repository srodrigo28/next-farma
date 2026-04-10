# Cadastro e Auth

## Proxima acao critica

- [ ] Publicar o codigo atualizado do backend online em `https://99dev.pro/api-farma`

## Objetivo

Organizar a entrega do fluxo de autenticacao e cadastro nesta ordem:

1. estabilizar o backend online
2. garantir cadastro normal e completar cadastro antes do dashboard
3. implementar login/cadastro com Google via NextAuth

## Estado atual

### Frontend

- [x] A web usa URL dinamica de API por `NEXT_PUBLIC_API_URL`.
- [x] O fallback da helper aponta para `https://99dev.pro/api-farma`.
- [x] O fluxo de login redireciona para `/cadastro/completar` quando `needsProfileCompletion(...)` retorna `true`.
- [x] O fluxo `/cadastro/completar` existe na web.
- [x] A tela de cadastro principal existe e envia payload completo.
- [x] O frontend mostra erro dinamico usando a API configurada.
- [x] O botao Google autentica de verdade via Google Identity Services + API JWT.

### API online

Base atual:
- `https://99dev.pro/api-farma`

Situacao verificada:
- [x] `GET /api/v1/health` responde corretamente.
- [x] A web esta apontando para a API online.
- [x] `POST /api/v1/auth/register` conclui o cadastro com payload completo.
- [x] As rotas novas de onboarding/perfil aparecem no indice online.
- [x] A API online esta alinhada com o backend local.

### Banco online

- [x] O banco `next_farma` foi inspecionado.
- [x] O estado inconsistente do `alembic_version` foi corrigido.
- [x] As migrations foram aplicadas ate `6c3a1e9d7b2c`.
- [x] A tabela `users` existe.
- [x] O schema base e as colunas novas foram criados.

## Fase 1: Backend primeiro

### Meta

Fazer funcionar:
- cadastro normal
- completar cadastro antes do dashboard
- bloqueio de acesso ao dashboard ate concluir os dados obrigatorios

### 1. Publicar codigo na API online

Arquivos que precisam subir:

- [ ] `api/app/controllers/auth_controller.py`
- [ ] `api/app/controllers/user_controller.py`
- [ ] `api/app/services/auth_service.py`
- [ ] `api/app/services/user_service.py`
- [ ] `api/app/schemas/auth_schema.py`
- [ ] `api/app/models/user_model.py`
- [ ] `api/app/repositories/user_repository.py`
- [ ] `api/app/routes.py`

### Script sugerido para deploy da API

Arquivo criado:
- `api/deploy-api.ps1`

Uso basico:
- `pwsh .\deploy-api.ps1`

Com branch explicita:
- `pwsh .\deploy-api.ps1 -Branch main`

Com restart automatico:
- `pwsh .\deploy-api.ps1 -Branch main -RestartCommand "systemctl restart api-farma"`

O script faz:
- `git fetch` e `git pull`
- `flask db upgrade`
- restart opcional do servico
- validacao de `healthcheck`

### 2. Rodar migrations no banco online

Rodar nesta ordem:

- [x] `api/migrations/versions/42a4a7f9d9a1_add_user_onboarding_fields.py`
- [x] `api/migrations/versions/6c3a1e9d7b2c_add_user_contact_and_address_fields.py`

### 3. Confirmar schema esperado em `users`

Onboarding:
- [x] `professional_profile`
- [x] `work_context`
- [x] `primary_unit`
- [x] `onboarding_completed_at`

Contato e endereco:
- [x] `phone`
- [x] `coren`
- [x] `cep`
- [x] `street`
- [x] `number`
- [x] `neighborhood`
- [x] `city`
- [x] `state`
- [x] `complement`

### 4. Reiniciar a API online

- [ ] Reiniciar a aplicacao depois de publicar codigo e migrations.

### 5. Validar superficie da API online

No indice da API precisam aparecer:

- [x] `POST /api/v1/auth/register`
- [ ] `POST /api/v1/auth/login`
- [ ] `GET /api/v1/auth/me`
- [x] `GET /api/v1/users/me/onboarding`
- [x] `PATCH /api/v1/users/me/onboarding`
- [x] `PATCH /api/v1/users/me/profile`

### 6. Validar jornada funcional da fase 1

- [ ] Abrir `https://99dev.pro/api-farma/`
- [ ] Confirmar que `/users/me/onboarding` e `/users/me/profile` aparecem no indice
- [ ] Testar cadastro em `/cadastro`
- [ ] Fazer login com usuario incompleto
- [ ] Confirmar redirecionamento para `/cadastro/completar`
- [ ] Concluir `/cadastro/completar`
- [ ] Confirmar acesso ao dashboard apenas apos completar os dados

### Criterio de pronto da fase 1

A fase 1 so termina quando:

- [x] `register` deixa de retornar erro 500
- [ ] `/cadastro/completar` salva com sucesso
- [ ] o dashboard continua bloqueado enquanto faltarem dados obrigatorios

## Fase 2: NextAuth depois

### Meta

Implementar login/cadastro com Google sem quebrar a regra de completar cadastro antes do dashboard.

### Direcao recomendada

Usar NextAuth apenas como entrada OAuth Google e, depois do callback:
- se o usuario estiver incompleto -> `/cadastro/completar`
- se o usuario estiver completo -> `/dashboard`

### 1. Implementacao Google

- [x] Implementar autenticacao Google real na tela de login
- [x] Integrar callback do Google com sessao do app
- [x] Reconciliar usuario Google com a API

### 2. Regras de redirecionamento

- [ ] Aplicar a mesma regra de `needsProfileCompletion(...)` ao login Google
- [ ] Garantir que login comum e login Google sigam a mesma decisao
- [ ] Bloquear dashboard enquanto perfil/endereco obrigatorios estiverem incompletos

### 3. Validacao da fase 2

- [ ] Fazer login com Google
- [ ] Confirmar ida para `/cadastro/completar` quando faltar dado
- [ ] Completar cadastro
- [ ] Confirmar ida ao dashboard depois da conclusao

## Ordem oficial de trabalho

- [x] Publicar codigo atualizado do backend online
- [x] Reiniciar a API online
- [ ] Validar cadastro normal
- [ ] Validar completar cadastro antes do dashboard
- [ ] Implementar NextAuth com Google
- [ ] Validar jornada completa Google -> completar cadastro -> dashboard

## Scripts de diagnostico

### Script sugerido para diagnostico do banco

Arquivos criados:
- `api/check-db-state.ps1`
- `api/check-db-state.py`

Uso dentro da pasta `api`:
- `pwsh .\check-db-state.ps1`

O diagnostico faz:
- `flask db current`
- `flask db history`
- lista tabelas reais do schema `public`
- verifica se `users` existe
- verifica se `alembic_version` existe
- mostra as revisoes gravadas em `alembic_version`

### Script sugerido para reparo do banco inconsistente

Arquivos criados:
- `api/repair-db-state.ps1`
- `api/repair-db-state.py`

Uso dentro da pasta `api`:
- `pwsh .\repair-db-state.ps1`

O reparo faz:
- detecta o caso em que so existe `alembic_version`
- remove a tabela `alembic_version` inconsistente
- roda `flask --app run:app db upgrade`

## Configuracao necessaria para Google

API (`api/.env`):
- `GOOGLE_CLIENT_ID=<client id web do Google>`

Web (`web/.env.local`):
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID=<client id web do Google>`
- `NEXT_PUBLIC_API_URL=https://99dev.pro/api-farma`

Implementacao atual:
- a tela `/login` abre o Google Identity Services no frontend
- a web envia `credential` para `POST /api/v1/auth/google`
- a API valida o token Google, vincula ou cria o usuario e devolve o mesmo JWT usado no login por senha
- se faltarem dados obrigatorios, o usuario segue para `/cadastro/completar`
- se o perfil estiver completo, o usuario vai direto para `/dashboard`

Pendencias operacionais:
- aplicar a migration `7f2c9b8e1a4d_add_google_subject_to_users.py`
- instalar a dependencia nova da API (`google-auth`) no ambiente de deploy
- cadastrar no Google Cloud o dominio real da web para o login funcionar sem bloqueio do provedor
