# Report website workflow

The user requests that each completed change to this report website also be published to its existing Vercel production project.

- Follow `CODEX_BRIEF.md` when the owner's local editorial brief is available. Published editing guidance is in `docs/HOW_TO_ADD_CONTENT.md`.
- After a set of changes, run `npm run check`, `npm test`, and `npm run build`.
- Once checks pass, deploy using `npx vercel@latest deploy --prod --yes` from this directory. Deployment is already authorized by the user.
- Verify public access to `https://aws-fcaj-report.vercel.app/`, a changed deep route, and its JavaScript/CSS assets. Report the production link and any unresolved deployment failure.
- The source project at `D:\Downloads\FPT\FPT\SEM-6\Final_Project\Project\repo` is read-only.
