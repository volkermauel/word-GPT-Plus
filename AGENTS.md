# Coding Conventions

## Formatting
- Use Prettier rules defined in `.prettierrc`.
  - 2 spaces for indentation
  - single quotes
  - no semicolons
  - line width 80
- Lint code with ESLint. Run `npm run lint` and ensure there are no lint errors.

## Language & Environment
- Codebase uses TypeScript and Vue 3.
- Node.js 18+ is required.

## Commit Messages
- Follow the emoji based Conventional Commit style enforced by commitlint.
  - Pattern: `:emoji: Type(scope): subject`
  - Examples of valid types include `:sparkles: Feature`, `:bug: Fix`, `:pencil: Docs` etc.

## Testing
- Run `npm run test` after changes to ensure tests pass.
- Add tests for new or changed features to avoid regressions.

