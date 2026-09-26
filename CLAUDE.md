Test architecture — binding rules

Use folder structure like
├── tests/
│   ├── login/
│   ├── dashboard/
│   ├── timesheet/
│   └── ...
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── ...
├── utils/
│   ├── commonUtils.ts
│   ├── dateUtils.ts
│   └── ...
├── fixtures/
│   └── testSetup.ts
├── data/
│   └── testData.json
├── playwright.config.ts
└── tsconfig.json

E2E specs live in `tests/`; page objects live in `tests/pages/` and own ALL locators.
Specs NEVER touch the page directly: no `page.locator`, `page.getByRole`, `page.click`,
  `page.fill`, `page.goto` in a spec file. Every interaction and assertion goes through a
  page object method. Sole allowed direct use: URL waits/assertions
  (`expect(page).toHaveURL`, `page.waitForURL`).
If a method you need doesn't exist, add it to the right page object — never inline the
  interaction in a spec.
Specs import `test`/`expect` from `fixtures/testSetup.ts`, never from `@playwright/test`.
  Fixtures hand specs ready-made page objects: `homePage`, `cohortPage`, `privacyPage`.
The homepage is one `HomePage` composing section components: `homePage.nav`,
  `homePage.newsletter`, `homePage.deepShift`, `homePage.contact`.
Naming: `*.page.ts` for pages, `*-section.ts` for homepage components; methods are
  user-intent verbs (`submit`, `goToSection`) or `assert*` for assertions — never
  mechanics (`clickButton`).
Shared section data (hash / label / heading) lives in `tests/sections.ts`.
Any test that can trigger a form submission MUST intercept `formsubmit.co` with
  `page.route` inside the page object (see `WaitlistForm`, `ContactSection`). The
  endpoint is a live inbox — never let a test post to it for real.
EXCEPTION: `tests/visual.spec.js` is pixel-snapshot comparison, not user flows. It
  keeps its raw `page.*` calls, its `.js` extension, and its exact filename — the
  baseline directory `tests/visual.spec.js-snapshots/` is derived from that filename.
  Never rename, convert, or refactor it.

