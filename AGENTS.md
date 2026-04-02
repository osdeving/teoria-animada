# AGENTS.md

## Missao

Este repositorio publica um app React estatico no GitHub Pages para hospedar animacoes Manim de algoritmos de matematica.

## Regras do repositorio

- mantenha o frontend compativel com hospedagem estatica
- trate `src/data/lessons.ts` como a fonte de verdade dos modulos
- prefira assets em `public/manim/<slug>/scene.mp4` e `poster.webp`
- preserve `recipes/` como biblioteca Python reaproveitavel
- quando o fluxo didatico mudar, sincronize app, docs e assets esperados

## Validacao minima

```bash
npm run lint
npm run test:ci
npm run build
python3 -m compileall recipes
```

## Checklist para novas aulas

1. adicionar o novo item em `src/data/lessons.ts`
2. ligar o asset real ou deixar o caminho esperado documentado
3. atualizar `README.md` se a lista de modulos mudar
4. validar frontend e receitas Python antes de publicar
