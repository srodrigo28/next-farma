# Plano da tela de cadastro inicial

## Objetivo

Implementar a jornada de selecao da tela de cadastro inicial para:

- destacar visualmente a opcao escolhida em cada etapa;
- impedir avancar sem selecao;
- preparar a persistencia dessas escolhas no backend;
- manter um plano simples de acompanhamento para validarmos se a entrega esta correta.

## Escopo da tela

As tres escolhas da jornada sao:

1. perfil profissional;
2. contexto principal de atuacao;
3. unidade ou setor principal.

Essas informacoes agora ja sao tratadas como dados do onboarding no front e no backend.

## O que foi ajustado no front

- cada card reflete o estado selecionado;
- o botao principal fica bloqueado enquanto nenhuma opcao estiver marcada na etapa atual;
- a etapa salva a escolha no estado do formulario;
- o fluxo envia onboarding junto com o cadastro atual.

## Persistencia implementada

### Payload atual do frontend

Ao concluir o cadastro, o front envia junto com os dados basicos:

```json
{
  "name": "Nome do usuario",
  "email": "usuario@dominio.com",
  "password": "********",
  "coren": "COREN-SP 123456",
  "professional_profile": "enfermeiro",
  "work_context": "hospital",
  "primary_unit": "uti-adulto"
}
```

### API atual

O onboarding foi incorporado ao fluxo principal de cadastro:

- `POST /api/v1/auth/register`
  recebe cadastro + onboarding no primeiro envio.
- `GET /api/v1/users/me/onboarding`
  retorna a configuracao salva do usuario autenticado.
- `PATCH /api/v1/users/me/onboarding`
  permite atualizar onboarding depois do cadastro.

## Persistencia no banco

Os campos foram salvos diretamente na tabela de usuarios.

Campos utilizados:

- `professional_profile` varchar;
- `work_context` varchar;
- `primary_unit` varchar;
- `onboarding_completed_at` timestamp null.

## Regras de validacao

- `professional_profile` obrigatorio no cadastro;
- `work_context` obrigatorio no cadastro;
- `primary_unit` obrigatorio no cadastro;
- `coren` opcional no primeiro momento;
- aceitar apenas valores conhecidos do catalogo do front/backend.

## Ordem de implementacao

1. finalizar a experiencia visual de selecao no front.
2. manter as escolhas no estado do formulario.
3. definir contrato final da API.
4. criar migration no backend.
5. persistir onboarding no cadastro.
6. criar rota de leitura/edicao posterior.
7. validar tudo ponta a ponta.

## Checklist de acompanhamento

- [x] card destaca a opcao selecionada
- [x] botao nao avanca sem selecao
- [x] estado do front guarda a escolha da etapa
- [x] payload final inclui onboarding
- [x] endpoint aceita os novos campos
- [x] banco persiste os valores
- [x] leitura posterior devolve os dados corretos
- [ ] tela reabre com valores previamente salvos

## Criterios de aceite

- o usuario consegue selecionar apenas uma opcao por etapa;
- o estado visual deixa claro qual item esta ativo;
- nenhuma etapa avanca sem escolha;
- ao concluir o cadastro, os tres campos ficam disponiveis para persistencia;
- o backend salva e devolve os dados sem quebrar o cadastro atual.

## Status atual

Concluido no backend e no fluxo de cadastro inicial.

Ponto ainda aberto:

- criar na web uma tela dedicada para reabrir o onboarding com valores previamente salvos e permitir reediccao pelo usuario autenticado.
