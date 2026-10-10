---
title: Herdr
description: "Pasa trabajo a otro agente de código en un panel de Herdr, en cualquier máquina, y recibe una única respuesta autorizada. Planes que delegan, con registro."
kind: addon
lang: es
order: 7
---

# Addon de Herdr

[Herdr](https://herdr.dev) coloca agentes de programación en paneles, en tu máquina y en las máquinas a las que llega por SSH. Este addon permite que un Deep Work Plan use esos agentes como **pares**: un plan puede pasar una tarea acotada a un agente en otro panel, recibir exactamente una respuesta autorizada y conservar un registro del intercambio.

Es un addon opcional de **DWP v7** (`v7.0.0`). La metodología funciona igual sin él: con el addon ausente o deshabilitado, cada tarea se ejecuta en la sesión actual, exactamente como antes.

## Qué integra

El addon es un integrador delgado. El trabajo lo hace **[herdr-peers](https://github.com/DailybotHQ/herdr-peers)**, una skill independiente con licencia MIT fijada en **`v0.1.0`** que es útil sin Deep Work Plan. Define lo que Herdr deja abierto: quién puede responder, cómo vuelve la respuesta a través de máquinas, cómo evitan dos agentes responderse indefinidamente y dónde vive el registro de "pregunté, respondió".

| Elemento | Valor |
|---|---|
| Producto | `DailybotHQ/herdr-peers`, tag `v0.1.0`, protocolo 1 |
| Clave de registro | `herdr` en `.dwp/config.json` |
| Transporte | interactivo: un par en un panel de Herdr |
| Proporciona | `subagents`, `cancel_children` |
| Requiere | la concesión `agent_delegation` del contrato del plan |

## Instalación

Instala herdr-peers y la skill oficial de Herdr, de la que depende. Toda máquina cuyos agentes deban responder también necesita la skill.

```bash
npx --yes skills add https://github.com/DailybotHQ/herdr-peers/tree/v0.1.0 --skill herdr-peers -g -y
npx --yes skills add https://github.com/herdrdev/herdr/tree/v0.9.3 --skill herdr -g -y
```

Requisitos: Herdr 0.9.1 o posterior, `bash` y `python3` 3.9 o posterior (solo biblioteca estándar). El onboarding ofrece el addon y registra tu respuesta en el registro de addons; nunca se habilita sin consentimiento.

## Qué agrega a un plan

- **Delegación a un par.** En un plan v7 cuyo contrato concede `agent_delegation`, `execute` puede pasar una tarea `parallel_safe`, o una pregunta de solo lectura, a un agente en otro panel, en esta máquina o en otra.
- **Una respuesta autorizada.** La solicitud lleva un sello que autoriza exactamente una respuesta. El par responde una vez a través del helper, y la respuesta lleva un sello propio.
- **Un registro antes de confiar.** Cada delegación se escribe en `analysis_results/delegations.ndjson` del plan antes de usar la respuesta, y corresponde al evento de diario `delegation` de v7.
- **Los resultados siguen siendo afirmaciones hasta verificarse.** La respuesta de un par es evidencia `asserted` hasta que el propio ejecutor de compuertas del plan la observa. Nunca cierra una tarea por sí sola.

## Modelo de seguridad

| Regla | Qué significa |
|---|---|
| Concesión primero | La delegación solo se ejecuta cuando el contrato del plan concede `agent_delegation`. |
| Límite de profundidad 1 | Un mensaje sellado con `depth=1` o `reply-to=` nunca se responde, y un delegado nunca delega. |
| Límite de fan-out | Como máximo cuatro pares por solicitante de forma predeterminada. |
| Datos, no instrucciones | Una respuesta nunca otorga una autoridad que el receptor no tuviera ya. |
| Un escritor por ruta | Un par que escribe trabaja en su propio worktree de git. |

herdr-peers no autentica al remitente: el campo `from=` de un sello es una afirmación. La mitigación es la lista de permitidos `HERDR_PEERS_SCOPE`, que limita los espacios de trabajo y las máquinas que acepta un par.

## Herdr o agentkit

Ambos addons implementan la misma interfaz de delegación —`launch`, `observe`, `collect`, `cancel`— con transportes distintos.

| Situación | Usar |
|---|---|
| Una tarea `parallel_safe` acotada con una salida declarada | [agentkit](/kit/agentkit) (`ak run` sin interfaz en un worktree) |
| La tarea necesita interacción, dura mucho o vive en otra máquina | Herdr (un par en un panel) |

## Notas

Opcional y nunca obligatorio. Un repositorio es plenamente conforme con cero addons opcionales, y ningún flujo depende de este. El recorrido de ida y vuelta entre dos paneles y entre máquinas está cubierto por pruebas contra un Herdr simulado; planifica una primera ejecución supervisada.
