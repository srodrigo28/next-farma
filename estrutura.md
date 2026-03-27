# Estrutura Proposta

## Leitura rápida

A estrutura atual funciona, mas está custando navegação.

Hoje uma tela simples costuma ficar espalhada em 3 lugares:

- rota em `src/app/...`
- regra/composição em `src/modules/...`
- peças reutilizadas em `src/shared/...`

Isso é válido em times grandes ou projetos muito maduros, mas no estágio atual do `next-farma` está criando mais salto mental do que benefício.

Minha recomendação para vocês é sair do MVC clássico espalhado e adotar **arquitetura por domínio/rota**, deixando cada área com seus próprios arquivos perto da `page.tsx`.

## O que eu recomendo

### 1. Organizar por feature/rota

Cada domínio principal deve ter sua própria pasta com tudo que pertence a ele.

Exemplo:

```text
src/
  app/
    (public)/
      login/
        page.tsx
        components/
        types.ts
        schema.ts
        actions.ts
      cadastro/
        page.tsx
        components/
        types.ts
        schema.ts
        actions.ts
      splash/
        page.tsx
        components/
        content.ts

    (app)/
      dashboard/
        page.tsx
        components/
        types.ts
        queries.ts
        mappers.ts
        constants.ts
        icons/
      pacientes/
        page.tsx
        components/
        types.ts
        queries.ts
        mappers.ts
        constants.ts
        icons/
      medicamentos/
        page.tsx
        components/
        types.ts
        queries.ts
        mappers.ts
        constants.ts
        icons/
      alertas/
        page.tsx
        components/
        types.ts
        queries.ts
      protocolos/
        page.tsx
        components/
        types.ts
        queries.ts
      sinais-vitais/
        page.tsx
        components/
        types.ts
        queries.ts
      passagem-plantao/
        page.tsx
        components/
        types.ts
        queries.ts
      legislacao/
        page.tsx
        components/
        types.ts
        queries.ts
      os/
        page.tsx
        components/
        types.ts
        queries.ts

    api/
    layout.tsx
    page.tsx

  shared/
    ui/
      button/
      input/
      card/
      drawer/
      navbar/
    icons/
    utils/
    lib/
      cn.ts
      formatters.ts

  core/
    auth/
      guards.ts
      session.ts
      permissions.ts
    http/
      client.ts
      errors.ts
    config/
      env.ts
      routes.ts
    rules/
      patient-rules.ts
      medication-rules.ts

  middleware.ts
```

## Resumo de cada estrutura

### `page.tsx`

Entrada oficial da rota no App Router.

Use para:

- montar a tela
- chamar `queries`
- compor a página com os componentes da feature

### `components/`

Componentes visuais da própria feature.

Use para:

- header da tela
- filtros
- listas
- cards específicos da rota

Não use em `shared` se o componente só serve para uma feature.

### `types.ts`

Tipos locais da feature.

Use para:

- tipos de payload adaptado
- tipos de estado da UI
- tipos auxiliares da tela

### `schema.ts`

Contrato e validação de dados.

Use para:

- validar formulários
- validar resposta da API
- gerar tipos a partir do schema

Muito útil quando a API ainda está evoluindo.

### `queries.ts`

Leitura de dados.

Use para:

- `GET` da API
- funções de busca da feature
- centralizar leitura do backend

### `actions.ts`

Escrita e mutações.

Use para:

- criar
- editar
- excluir
- enviar formulários
- ações do usuário

### `mappers.ts`

Transformação entre API e UI.

Use para:

- adaptar payload do backend
- normalizar campos
- converter nomes e formatos

Exemplo: `snake_case` da API para nomes mais claros no front.

### `constants.ts`

Constantes locais da feature.

Use para:

- tabs
- labels
- filtros
- textos fixos
- enums simples de tela

### `icons/`

Ícones específicos da feature.

Use só quando os ícones não fizerem sentido no `shared/icons`.

### `content.ts`

Conteúdo estático de uma rota simples.

Bom para:

- splash
- onboarding textual
- textos institucionais

### `shared/ui/`

Base visual compartilhada do app.

Use para:

- botão base
- input base
- modal base
- drawer base
- navbar base

### `shared/icons/`

Ícones reutilizáveis entre várias features.

### `shared/utils/`

Funções pequenas e puras.

Use para:

- formatadores
- helpers de data
- utilitários simples

### `shared/lib/`

Infra pequena reutilizável.

Use para:

- `cn.ts`
- helpers mais estruturados
- formatadores compartilhados

### `core/auth/`

Regras globais de autenticação e permissão.

Use para:

- sessão
- roles
- guards
- regras de acesso

### `core/http/`

Cliente HTTP e tratamento base da comunicação com API.

Use para:

- cliente `fetch`
- interceptação de erro
- headers padrão
- token

### `core/config/`

Configuração global do projeto.

Use para:

- env
- rotas centrais
- flags
- chaves compartilhadas

### `core/rules/`

Regras de domínio compartilhadas entre várias features.

Use para:

- permissão clínica
- validações de negócio
- regras que não pertencem só a uma tela

### `middleware.ts`

Ponto obrigatório do Next para interceptar navegação.

Use para:

- proteger rotas
- redirecionar usuário
- validar sessão na borda

O ideal é deixar pouca lógica aqui e importar de `core/auth/guards.ts`.

## Checklist das telas em `preview/`

### Grupo 1. Início, login e dashboard

- `1-login.png`: tela de login.
  Status: pronta no app em `/login`, pode continuar refinando integração real com auth.
- `cadastro-1.png`: etapa 1 do cadastro.
  Status: pronta em `/cadastro`, pode continuar.
- `cadastro-2.png`: etapa 2 do cadastro.
  Status: pronta em `/cadastro`, pode continuar.
- `cadastro-3.png`: etapa 3 do cadastro.
  Status: pronta em `/cadastro`, pode continuar.
- `cadastro-3-selecao.png`: variação com seleção ativa.
  Status: parcialmente pronta; falta seleção real por clique.
- `dashboard.jpeg`: dashboard principal.
  Status: pronto em `/dashboard`, pode continuar.
- `menu.jpeg`: drawer/menu lateral.
  Status: pronto em `/dashboard` e nas telas internas, pode continuar.

### Grupo 2. Pacientes

- `pacientes_lista.jpeg`: lista de pacientes com busca e filtros.
  Status: parcialmente pronto; rota `/pacientes` existe, mas ainda não tem lista real.
- `paciente_novo.jpeg`: modal/formulário de novo paciente.
  Status: ainda não implementado; deve virar subfluxo da feature `pacientes`.

### Grupo 3. Sinais vitais

- `sinais_vitais.jpeg`: lista/monitoramento de sinais vitais.
  Status: parcialmente pronto; rota existe, mas ainda é visão conceitual.
- `sinais_vitais-novo.jpeg`: formulário de novo lançamento de sinais vitais.
  Status: ainda não implementado; deve virar subfluxo em `sinais-vitais`.

### Grupo 4. Outros fluxos assistenciais

- `medicacoes.jpeg`: lista de medicações com tabs e CTA de prescrição.
  Status: parcialmente pronto; rota existe, mas precisa evoluir para lista real.
- `alerta_lista.jpeg`: lista de alertas ativos.
  Status: parcialmente pronto; rota existe, mas ainda não renderiza coleção real.
- `protocolos_lista.jpeg`: lista de protocolos com busca e filtros.
  Status: parcialmente pronto; rota existe, mas precisa virar catálogo real.
- `legislacao.jpeg`: catálogo/lista de legislação.
  Status: parcialmente pronto; rota existe, mas ainda é institucional.
- `passagem_plantao.jpeg`: lista de registros de passagem de plantão.
  Status: parcialmente pronto; rota existe, mas ainda sem coleção real.
- `passagem_nota.jpeg`: detalhe ou anotação da passagem de plantão.
  Status: ainda não implementado; pode virar detalhe/modal da feature.
- `prescicao_nova.jpeg`: nova prescrição.
  Status: ainda não implementado; idealmente entra em `medicamentos` ou `prescricoes`.
- `tarefas_lista.jpeg`: lista de tarefas.
  Status: ainda não implementado e sem rota atual dedicada.
- `tarefa_nova.jpeg`: modal/formulário de nova tarefa.
  Status: ainda não implementado e sem rota atual dedicada.

## Leitura executiva do checklist

### Telas já prontas no app e que podem continuar

- login
- cadastro em etapas
- dashboard
- menu lateral

### Telas com rota criada, mas ainda conceituais

- pacientes
- sinais vitais
- medicamentos
- alertas
- protocolos
- legislação
- passagem de plantão
- OS

### Telas que ainda precisam entrar no mapa de produto

- novo paciente
- novo lançamento de sinais vitais
- nova prescrição
- detalhe/anotação de passagem de plantão
- lista de tarefas
- nova tarefa

## Navegação preparada para API

A navegação precisa nascer pensando em **listas, detalhe, criação e edição**, não só em páginas estáticas.

### Estrutura recomendada de navegação por domínio

```text
src/app/
  (app)/
    dashboard/
      page.tsx

    pacientes/
      page.tsx
      novo/
        page.tsx
      [patientId]/
        page.tsx
      [patientId]/
        editar/
          page.tsx
      components/
      queries.ts
      actions.ts
      mappers.ts
      schema.ts
      types.ts

    medicamentos/
      page.tsx
      prescricao/
        nova/
          page.tsx
      [medicationId]/
        page.tsx
      components/
      queries.ts
      actions.ts
      mappers.ts
      schema.ts
      types.ts

    alertas/
      page.tsx
      [alertId]/
        page.tsx
      components/
      queries.ts
      actions.ts
      mappers.ts
      types.ts

    protocolos/
      page.tsx
      [protocolId]/
        page.tsx
      components/
      queries.ts
      mappers.ts
      types.ts

    sinais-vitais/
      page.tsx
      novo/
        page.tsx
      [recordId]/
        page.tsx
      components/
      queries.ts
      actions.ts
      schema.ts
      types.ts

    passagem-plantao/
      page.tsx
      novo/
        page.tsx
      [handoffId]/
        page.tsx
      [handoffId]/
        nota/
          page.tsx
      components/
      queries.ts
      actions.ts
      schema.ts
      types.ts

    tarefas/
      page.tsx
      nova/
        page.tsx
      [taskId]/
        page.tsx
      components/
      queries.ts
      actions.ts
      schema.ts
      types.ts
```

## Como isso conversa com a API

### Cada domínio deve pensar em 4 blocos

- listagem
- detalhe
- criação
- atualização

### Exemplo mental para pacientes

- `GET /patients`
- `GET /patients/:id`
- `POST /patients`
- `PUT /patients/:id`

### Exemplo mental para alertas

- `GET /alerts`
- `GET /alerts/:id`
- `POST /alerts/:id/snooze`
- `POST /alerts/:id/resolve`

### Exemplo mental para protocolos

- `GET /protocols`
- `GET /protocols/:id`

### Exemplo mental para passagem de plantão

- `GET /handoffs`
- `GET /handoffs/:id`
- `POST /handoffs`
- `POST /handoffs/:id/notes`

## O que isso muda na arquitetura

Em vez de pensar só em "uma página por menu", vocês passam a pensar em **um domínio por fluxo**.

Exemplo:

- `pacientes` não é só uma tela
- `pacientes` é um domínio com lista, formulário, detalhe e edição

Isso prepara o front para receber a API sem precisar reorganizar tudo depois.

## Por que essa estrutura é melhor para vocês

### Fica fácil de achar

Se você quer mexer em `dashboard`, entra em `dashboard/` e quase tudo está ali.

### Menos salto entre pastas

Você não precisa abrir `app`, depois `modules`, depois `shared/types`, depois `services` para entender uma tela.

### Cresce melhor com API

Quando a API entrar, cada rota pode ganhar seu `queries.ts`, `actions.ts` ou `api.ts` sem desmontar o projeto.

### Facilita onboarding

Qualquer pessoa nova entende rápido:

- `page.tsx`: entrada da rota
- `components/`: peças da rota
- `types.ts`: tipos da rota
- `queries.ts`: busca de dados
- `mappers.ts`: transformação de payload
- `constants.ts`: labels e enums locais

## Sobre MVC

### Minha leitura honesta

O MVC atual está mais para uma separação formal do que para uma necessidade real.

Exemplo atual:

- `page.tsx` chama controller
- controller chama service
- service chama model
- model devolve mock
- view renderiza

Isso cria várias camadas, mas pouca delas está entregando valor hoje.

### O que eu manteria

- Separação entre UI compartilhada e UI da feature
- Tipos organizados
- Regras de domínio fora do JSX
- Cliente HTTP centralizado

### O que eu simplificaria

- Remover `controllers/` na maioria das telas
- Remover `services/` onde só existe repasse de função
- Remover `models/` quando o arquivo só guarda mock estático simples

## Então vamos usar `service`?

### Resposta curta

**Não por padrão.**

Se tudo vai vir de API, eu recomendo este critério:

- use `queries.ts` para leitura de dados
- use `actions.ts` para escrita, submit e mutações
- use `mappers.ts` para adaptar payload da API para UI
- use `types.ts` para contratos locais da feature
- use `constants.ts` para textos fixos, tabs, filtros e labels

### Quando `service` faz sentido

Use `service` só quando houver regra de orquestração real, por exemplo:

- combinar várias chamadas de API
- cache ou fallback
- regra de negócio que não é só render
- integração com storage, sessão ou token

Se o arquivo só faz isto:

```ts
export function getDashboardData() {
  return api.get('/dashboard')
}
```

isso pode morar em `queries.ts` sem problema.

## Onde entram middleware, auth e regras globais

### Middleware do Next

O arquivo executável do Next precisa continuar em:

```text
src/middleware.ts
```

ou na raiz do projeto, dependendo da convenção adotada.

### Mas as regras não precisam ficar soltas

Você pode colocar a lógica em:

```text
src/core/auth/guards.ts
src/core/auth/permissions.ts
src/core/config/routes.ts
```

E o `middleware.ts` só importa essas regras.

Exemplo mental:

```ts
// src/middleware.ts
import { applyAuthGuard } from '@/core/auth/guards'

export default applyAuthGuard
```

Assim o arquivo obrigatório do Next continua no lugar certo, mas a regra fica organizada.

## Convenção prática por pasta

### Para rotas simples

```text
dashboard/
  page.tsx
  components/
  types.ts
  constants.ts
```

### Para rotas com API

```text
pacientes/
  page.tsx
  components/
  types.ts
  queries.ts
  actions.ts
  mappers.ts
  constants.ts
```

### Para rotas muito grandes

```text
pacientes/
  page.tsx
  components/
    PatientHeader.tsx
    PatientFilters.tsx
    PatientList.tsx
    PatientCard.tsx
  hooks/
    usePatientFilters.ts
  types.ts
  queries.ts
  actions.ts
  mappers.ts
  constants.ts
  icons/
```

## O que deve continuar em `shared`

Só o que realmente é transversal.

Exemplos bons:

- botão base
- input base
- modal base
- drawer base
- navbar base
- ícones reutilizáveis
- utilitários de formatação

Exemplos que **não** devem ir para `shared` cedo demais:

- `DashboardHeader`
- `PatientFilters`
- `MedicationTimeline`
- `AlertSummaryCard`

Esses devem morar dentro da própria feature.

## Estrutura sugerida para começar agora

Se eu fosse reorganizar este projeto com o menor atrito possível, eu faria assim:

```text
src/
  app/
    (public)/
      splash/
      login/
      cadastro/
    (app)/
      dashboard/
      pacientes/
      medicamentos/
      alertas/
      protocolos/
      sinais-vitais/
      passagem-plantao/
      legislacao/
      os/
      tarefas/
    layout.tsx
    page.tsx

  shared/
    ui/
    icons/
    utils/

  core/
    auth/
    http/
    config/
    rules/

  middleware.ts
```

E dentro de cada rota:

```text
dashboard/
  page.tsx
  components/
  types.ts
  constants.ts
  queries.ts
  mappers.ts
```

## O que eu não recomendo

### Não recomendo manter MVC rígido em tudo

Para app frontend com App Router, isso costuma gerar burocracia.

### Não recomendo criar `types/`, `icons/`, `models/`, `services/` como obrigação em toda pasta

Melhor regra:

- criou porque precisa, não porque a pasta “tem que existir”

Se `dashboard` só precisa de `page.tsx`, `components/` e `types.ts`, ótimo.

### Não recomendo espalhar regra de autenticação pela UI

Auth, permissão, sessão e proteção de rota devem ficar em `core/auth` + `middleware.ts`.

## Minha sugestão final de decisão

### Melhor escolha para vocês agora

Adotar **feature-first dentro de `app`**, com suporte de `shared` e `core`.

Resumo:

- `app`: rotas e arquivos da própria rota
- `shared`: UI e utilitários realmente compartilhados
- `core`: auth, http, config e regras globais
- `middleware.ts`: ponto obrigatório do Next

### Em vez de

- `controllers/`
- `services/`
- `models/`
- `views/`

### Preferir

- `page.tsx`
- `components/`
- `types.ts`
- `queries.ts`
- `actions.ts`
- `mappers.ts`
- `constants.ts`

## Plano de migração sem trauma

1. Criar `core/` para auth, http e config.
2. Renomear `shared/components` para `shared/ui` se fizer sentido para o time.
3. Começar pelas rotas novas já no formato feature-first.
4. Migrar `dashboard`, `login` e `cadastro` primeiro.
5. Migrar `pacientes`, `sinais-vitais` e `medicamentos` em seguida, pois as previews já pedem lista e formulário.
6. Criar `tarefas/` como novo domínio, porque ele já aparece nas previews e ainda não existe no app.
7. Deixar mocks temporários em `data.ts`, `constants.ts` ou `mock.ts` dentro da própria feature.
8. Quando a API entrar, substituir `data.ts` por `queries.ts` e `actions.ts` sem mover a pasta da rota.

## Fechamento

Se o objetivo é **achar tudo rápido**, **reduzir estranheza** e **preparar o projeto para uma jornada longa**, eu escolheria esta direção:

**rota com seus arquivos perto dela, `shared` só para o que é compartilhado, e `core` para regras globais.**

Essa é a estrutura mais simples, mais legível e mais sustentável para o estágio atual do projeto.
