---
title: "Week 8 Worklog"
pre: "1.8."
weight: 8
status: "ready"
---

**Topic:** Interface redesign

**Dates:** 02/11/2026 – 06/11/2026

### Week 8 Objectives:

- Standardise CI and repository documentation.
- Redesign the whole interface in a nutrition-label style.

### Tasks carried out this week:

| Day | Task | Start Date | Completion Date | Reference Material |
| --- | --- | --- | --- | --- |
| Monday | Split CI steps, add PR/issue templates, README, licence; decide on a public ALB behind CloudFront | 02/11/2026 | 02/11/2026 | [GitHub Actions](https://docs.github.com/actions) |
| Tuesday | Choose the Nutrition Label design (D11); new design foundation, app shell, Phosphor icons | 03/11/2026 | 03/11/2026 | [React](https://react.dev/learn) |
| Wednesday | Accessibility review (D13): contrast, focus, keyboard; mobile tab bar | 04/11/2026 | 04/11/2026 | [WCAG 2.2](https://www.w3.org/TR/WCAG22/) |
| Thursday | Shared components with fail-closed nutrition display; split the admin page into focused parts | 05/11/2026 | 05/11/2026 | [React](https://react.dev/learn) |
| Friday | Rebuild home, products, detail, sign-in, cart, checkout, orders, chat, and admin pages | 06/11/2026 | 06/11/2026 | [React](https://react.dev/learn) |

### Week 8 Achievements:

- CI runs separate backend and frontend checks on every pull request.
- Every page was rebuilt in the nutrition-label style with consistent colours, type, and icons.
- The interface meets basic accessibility needs (contrast, focus, keyboard use) and works well on phones.
- Products with missing data show "no data" instead of zero.
