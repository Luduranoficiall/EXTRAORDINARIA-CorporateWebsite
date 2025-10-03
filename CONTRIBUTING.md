# Contributing

Thank you for contributing! Please follow these guidelines to make your contributions smooth and consistent.

- Fork the repository and work on a feature branch.
- Keep commits small and focused. Use clear commit messages.
- Run `npm install` before making changes.
- Run `npm run lint` and `npm run test` locally before opening a PR.
- Use `main` branch for releases only. Create feature branches named like `feat/your-feature` or `fix/issue`.
- The project uses Husky + lint-staged to format staged files automatically. Please don't bypass pre-commit hooks.

## Code Style
- The project uses ESLint and Prettier. Run:

```bash
npm run lint
npm run format
```

## Tests
- Run unit tests with:

```bash
npm run test
```

## Pull Request
- Open a PR against `main` with a clear description and link to related issue if any.

*** End of file
