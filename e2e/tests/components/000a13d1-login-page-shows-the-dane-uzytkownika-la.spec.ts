import { test, expect } from '@playwright/test';

test("Login page shows the 'Dane użytkownika' label above the email field @E2E-000A13D1-1 @module:components", async ({ page }) => {
  // Step 1: Navigate to /login
  await page.goto('/login');

  const emailInput = page.getByPlaceholder('Email', { exact: true });

  // Step 1 expects: The login form is displayed with an input whose placeholder is 'Email'
  await expect(emailInput).toBeVisible();

  // Step 2: Look at the label shown above the email input field
  const userDataLabel = page.getByText('Dane użytkownika', { exact: true });
  await expect(userDataLabel).toBeVisible();

  // Step 2 expects: The label reads 'Dane użytkownika' and the text 'Login' is no longer shown as the label of the email field
  await expect(userDataLabel).toHaveText('Dane użytkownika');
  await expect(page.getByText('Login', { exact: true })).toHaveCount(0);
});
