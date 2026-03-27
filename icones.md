# Mapa de Ícones

## Objetivo

Este arquivo serve para duas coisas:

- mostrar onde os ícones estão sendo usados no projeto
- facilitar a troca futura de ícones sem precisar procurar no app inteiro

A ideia é que vocês possam mudar a identidade visual aos poucos, mas com um ponto de consulta claro.

## Fonte principal dos ícones

Hoje o ponto principal é:

- [AppIcons.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/AppIcons.tsx)

Esse arquivo concentra os ícones SVG base do sistema.

## Catálogo atual disponível

### Navegação e estrutura

- `MenuIcon`
- `CloseIcon`
- `BrandPillIcon`
- `HospitalIcon`
- `HomeIcon`
- `OverviewIcon`
- `ArrowRightIcon`

### Features clínicas e operacionais

- `PatientsIcon`
- `MedicationsIcon`
- `ClipboardIcon`
- `HeartbeatIcon`
- `BellIcon`
- `BookIcon`
- `ScaleIcon`
- `HandoffIcon`
- `AlertTriangleIcon`

### Ações e apoio visual

- `CheckIcon`
- `CircleIcon`
- `PlusIcon`
- `SearchIcon`
- `GoogleIcon`

### Nova leva de ícones clínicos

- `ThermometerIcon`
- `LungsIcon`
- `OxygenIcon`
- `PainIcon`
- `SyringeIcon`
- `CalendarClockIcon`

## Regra de personalização

### Quando trocar só o desenho do ícone

Se vocês quiserem manter o mesmo significado, mas mudar o estilo visual:

- editem o componente correspondente dentro de `AppIcons.tsx`

Exemplo:

- trocar o desenho de `PatientsIcon`
- trocar o desenho de `BellIcon`
- trocar o desenho de `ScaleIcon`

Isso atualiza todos os lugares onde esse ícone é usado.

### Quando trocar o ícone de um contexto específico

Se vocês quiserem mudar o significado em uma tela específica:

- alterem o componente que usa o ícone
- ou troquem o `iconMap` local daquela tela

Exemplo:

- `SectionOverviewView.tsx`
- `AppDrawer.tsx`
- `DashboardPageView.tsx`

## Mapa global de ícones

### Navegação principal

Arquivo:

- [AppDrawer.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/AppDrawer.tsx)

Mapa atual:

- `overview` -> `OverviewIcon`
- `patients` -> `PatientsIcon`
- `medications` -> `MedicationsIcon`
- `os` -> `ClipboardIcon`
- `vitals` -> `HeartbeatIcon`
- `alerts` -> `BellIcon`
- `protocols` -> `BookIcon`
- `legal` -> `ScaleIcon`
- `handoff` -> `HandoffIcon`

Se quiserem trocar o ícone de uma rota do menu, esse é o primeiro lugar a editar.

### Marca e shell

Arquivos:

- [BrandMark.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/BrandMark.tsx)
- [AppNavbar.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/AppNavbar.tsx)
- [WorkspaceModeToggle.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/WorkspaceModeToggle.tsx)

Mapa atual:

- marca -> `BrandPillIcon`
- menu hambúrguer -> `MenuIcon`
- fechar drawer -> `CloseIcon`
- modo hospital -> `HospitalIcon`
- modo APS -> `HomeIcon`

## Mapa por feature

### Dashboard

Arquivo:

- [DashboardPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/dashboard/components/DashboardPageView.tsx)

Uso atual:

- medicações -> `MedicationsIcon`
- pendências -> `ClipboardIcon`
- pacientes -> `PatientsIcon`
- alerta crítico -> `AlertTriangleIcon`
- fallback informativo -> `HeartbeatIcon`

### Login

Arquivo:

- [LoginPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/login/components/LoginPageView.tsx)

Uso atual:

- login Google -> `GoogleIcon`

### Cadastro

Arquivos:

- [CadastroPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/cadastro/components/CadastroPageView.tsx)
- [OptionCard.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/OptionCard.tsx)

Uso atual:

- opção selecionada -> `CheckIcon`
- opção não selecionada -> `CircleIcon`
- navegação visual do card -> `ArrowRightIcon`

### Pacientes

Arquivos:

- [PacientesPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/pacientes/components/PacientesPageView.tsx)
- [page.tsx](/c:/dev/nubio_farma/next-farma/src/app/pacientes/novo/page.tsx)

Uso atual:

- ação novo paciente -> `PlusIcon`
- busca -> `SearchIcon`
- seta do item -> `ArrowRightIcon`

Sugestão futura:

- se quiserem reforçar a identidade da feature, podem usar `PatientsIcon` no cabeçalho da lista ou no topo do formulário.

### Sinais vitais

Arquivos:

- [SinaisVitaisPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/sinais-vitais/components/SinaisVitaisPageView.tsx)
- [page.tsx](/c:/dev/nubio_farma/next-farma/src/app/sinais-vitais/novo/page.tsx)

Uso atual:

- ação novo registro -> `PlusIcon`
- temperatura -> `ThermometerIcon`
- dor -> `PainIcon`
- frequência respiratória -> `LungsIcon`
- saturação -> `OxygenIcon`

Sugestão futura:

- adicionar ícones próprios para pressão arterial, glicemia e Glasgow, se a feature ganhar mais profundidade.

### Medicações

Arquivos:

- [MedicamentosPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/medicamentos/components/MedicamentosPageView.tsx)
- [page.tsx](/c:/dev/nubio_farma/next-farma/src/app/medicamentos/prescricao/nova/page.tsx)

Uso atual:

- tela principal e empty state -> `MedicationsIcon`
- ação prescrição -> `PlusIcon`
- item de medicação/lista -> `SyringeIcon`
- agendamento -> `CalendarClockIcon`

Sugestão futura:

- criar ícones específicos para dose, via de administração e frequência, caso a prescrição fique mais rica.

### Alertas

Arquivo:

- [AlertasPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/alertas/components/AlertasPageView.tsx)

Uso atual:

- cabeçalho da tela -> `BellIcon`
- item de medicação vencida -> `MedicationsIcon`

Sugestão futura:

- criar um ícone específico para “silenciar alerta”
- criar ícones por categoria de alerta, se o domínio crescer

### Protocolos, Legislação, OS e Passagem de plantão

Arquivos:

- [SectionOverviewView.tsx](/c:/dev/nubio_farma/next-farma/src/modules/workspace/views/SectionOverviewView.tsx)
- [Protocolos page](/c:/dev/nubio_farma/next-farma/src/app/protocolos/page.tsx)
- [Legislacao page](/c:/dev/nubio_farma/next-farma/src/app/legislacao/page.tsx)
- [OS page](/c:/dev/nubio_farma/next-farma/src/app/os/page.tsx)
- [Passagem page](/c:/dev/nubio_farma/next-farma/src/app/passagem-plantao/page.tsx)

Mapa atual do `iconMap` em `SectionOverviewView.tsx`:

- `protocols` -> `BookIcon`
- `legal` -> `ScaleIcon`
- `operations` -> `ClipboardIcon`
- `handoff` -> `HandoffIcon`
- `search` -> `SearchIcon`
- `alert` -> `AlertTriangleIcon`

Uso por tela:

- protocolos -> cabeçalho `BookIcon`, cards `BookIcon` e `SearchIcon`
- legislação -> cabeçalho `ScaleIcon`, cards `ScaleIcon` e `SearchIcon`
- OS -> cabeçalho `ClipboardIcon`, cards `ClipboardIcon` e `AlertTriangleIcon`
- passagem de plantão -> cabeçalho `HandoffIcon`, cards `ClipboardIcon` e `HandoffIcon`

## Como trocar os ícones depois

### Opção 1. Trocar só o desenho

Edite o componente em:

- [AppIcons.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/AppIcons.tsx)

Exemplo:

- manter `BellIcon`, mas trocar o SVG interno

### Opção 2. Trocar o ícone usado em uma feature

Edite o arquivo da feature.

Exemplos:

- [PacientesPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/pacientes/components/PacientesPageView.tsx)
- [MedicamentosPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/medicamentos/components/MedicamentosPageView.tsx)
- [AlertasPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/alertas/components/AlertasPageView.tsx)
- [SinaisVitaisPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/sinais-vitais/components/SinaisVitaisPageView.tsx)

### Opção 3. Trocar o mapa das telas conceituais

Edite:

- [SectionOverviewView.tsx](/c:/dev/nubio_farma/next-farma/src/modules/workspace/views/SectionOverviewView.tsx)
- ou os `icon` enviados por cada página conceitual

## Sugestão de evolução

Se vocês forem personalizar bastante a iconografia, o próximo passo ideal é criar estes blocos:

```text
src/shared/icons/
  navigation/
  actions/
  clinical/
  brand/
```

E depois mover os ícones de `AppIcons.tsx` para essa estrutura por grupo.

## Recomendação prática para o time

- usem `AppIcons.tsx` como fonte única enquanto o projeto ainda está consolidando padrão
- só dividam em vários arquivos quando o volume de ícones crescer de verdade
- ao trocar um ícone, atualizem este `icones.md` junto

## Fechamento

Hoje os pontos mais importantes de personalização ficam nestes arquivos:

- [AppIcons.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/AppIcons.tsx)
- [AppDrawer.tsx](/c:/dev/nubio_farma/next-farma/src/shared/components/AppDrawer.tsx)
- [DashboardPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/dashboard/components/DashboardPageView.tsx)
- [PacientesPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/pacientes/components/PacientesPageView.tsx)
- [SinaisVitaisPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/sinais-vitais/components/SinaisVitaisPageView.tsx)
- [MedicamentosPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/medicamentos/components/MedicamentosPageView.tsx)
- [AlertasPageView.tsx](/c:/dev/nubio_farma/next-farma/src/app/alertas/components/AlertasPageView.tsx)
- [SectionOverviewView.tsx](/c:/dev/nubio_farma/next-farma/src/modules/workspace/views/SectionOverviewView.tsx)
