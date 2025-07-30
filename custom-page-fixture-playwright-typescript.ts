import {test as basetest, Page} from "@playwright/test"

// You're not "just using a type" here.

// Think of the type mycustometestfixtur = { custometestfixture:Page } as a contract you are writing between:

// The person defining the fixture (you, or your framework team)

// The person consuming the fixture (test writers, or your future self)

// You're saying:

// "Hey test runner, I promise:
// If a test says ({ customPage }) => {},
// I’ll make sure customPage is available and it's a Page object."

// So this is not just a type anymore — it becomes a guarantee between layers of the testing framework.

type mycustometestfixture={
  custometestfixture:Page
}

const custometestfixture = async function ({page}, use) {
  await page.goto("")
  await use(page)  
}

// Let’s reword it in plain English:

// “Hey Playwright, I’m extending your test with some custom fixtures.
// Here's the list of what I’ll provide:
// → It’s defined in MyFixtures.”

// By passing the type as a generic (<MyFixtures>), you're telling Playwright:

// ✅ what names you're going to provide
// ✅ what types they will be
// ✅ how to inject them into the test

export const test = basetest.extend<mycustometestfixture>({custometestfixture})

export { expect } from '@playwright/test';

// You're writing framework-level contracts for dependency injection.

// You're telling Playwright how to prepare a value and inject it automatically into the test.

// That’s a powerful way of thinking — and it’s exactly how large-scale test frameworks, plugins, and tooling are designed.