# Teoria Animada

App React + Vite pensado para publicar animacoes matematicas em formato teletype, com a operacao ocupando praticamente a tela toda.

## Objetivo

- transformar algoritmos de matematica em microaulas visuais
- manter o roteiro didatico no frontend e os assets renderizados pelo Manim em `public/manim/`
- reaproveitar as receitas Python ja curadas em `recipes/`

## Modulos

- MMC por divisoes sucessivas em teletype
- MDC por fatoracao e encontro de fatores comuns
- divisao longa com descida guiada
- numero de divisores por produto dos expoentes somados de 1
- soma de fracoes com reducao ao mesmo denominador

## Stack

- React 19 + TypeScript + Vite
- Vitest + Testing Library
- ESLint + Prettier
- GitHub Actions para CI e deploy no GitHub Pages

## Comandos

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
python3 -m compileall recipes
```

## Estrutura

- `src/data/lessons.ts`: manifesto da lista e dos roteiros teletype
- `src/components/`: lista de modulos e player de animacao
- `public/manim/`: videos, posters e futuros captions exportados do Manim
- `recipes/`: biblioteca Python de tecnicas de animacao reutilizaveis
- `.codex/skills/teoria-animada-lesson/SKILL.md`: skill local para evoluir o projeto com consistencia
- `AGENTS.md`: contrato operacional para agentes e automacoes

## Como adicionar um novo topico

1. Adicione o manifesto do modulo em `src/data/lessons.ts`.
2. Renderize ou copie os assets para `public/manim/<slug>/`.
3. Se a cena exigir um novo padrao de movimento, atualize `recipes/`.
4. Rode `npm run lint`, `npm run test`, `npm run build` e `python3 -m compileall recipes`.

## Deploy

Pushes em `main` executam CI e publicam a build estatica via `.github/workflows/deploy-pages.yml`.

URL esperada de publicacao:

- `https://osdeving.github.io/teoria-animada/`
