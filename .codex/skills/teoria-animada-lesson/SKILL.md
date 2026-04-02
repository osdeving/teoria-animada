---
name: teoria-animada-lesson
description: Adiciona ou atualiza modulos matematicos no app React, sincronizando manifesto das abas, assets Manim e documentacao.
---

# Teoria Animada Lesson Workflow

Use este skill quando a tarefa envolver:

- criar um novo modulo matematico no app
- conectar um render do Manim a uma aba existente
- atualizar roteiro, checkpoints ou ordem de exibicao
- sincronizar mudancas entre `src/`, `public/manim/`, `recipes/` e documentacao

## Fonte de verdade

- `src/data/lessons.ts`: titulo, resumo, passos, checkpoints e caminho esperado do asset
- `public/manim/`: videos, posters e legendas prontos para o app
- `recipes/`: tecnicas Python reaproveitaveis para construir as cenas
- `README.md` e `AGENTS.md`: contrato operacional do projeto

## Fluxo recomendado

1. identifique o slug da aula
2. atualize o manifesto em `src/data/lessons.ts`
3. conecte ou documente o asset em `public/manim/<slug>/`
4. ajuste componentes React apenas se a experiencia precisar de nova capacidade
5. se houver mudanca de linguagem visual na cena, atualize ou crie receitas em `recipes/`
6. rode:

```bash
npm run lint
npm run test:ci
npm run build
python3 -m compileall recipes
```

## Padrao de assets

- video principal: `public/manim/<slug>/scene.mp4`
- poster opcional: `public/manim/<slug>/poster.webp`
- captions opcionais: `public/manim/<slug>/captions.vtt`
