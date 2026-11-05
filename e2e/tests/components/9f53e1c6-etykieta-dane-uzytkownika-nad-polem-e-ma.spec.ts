import { test, expect } from '@playwright/test';

test("Etykieta 'Dane użytkownika' nad polem e-mail na stronie /login @E2E-9F53E1C6-1 @module:components", async ({ page }) => {
  // Step 1: Otwórz stronę /login
  await page.goto('/login');

  const emailField = page.getByRole('textbox', { name: 'Email' });
  const passwordLabel = page.getByText('Hasło', { exact: true });
  const loginButton = page.getByRole('button', { name: 'Logowanie' });

  // Step 1 expects: Wyświetla się formularz logowania z polem o placeholderze "Email", polem hasła z etykietą "Hasło" i przyciskiem "Logowanie"
  await expect(emailField).toBeVisible();
  await expect(emailField).toHaveAttribute('placeholder', 'Email');
  await expect(passwordLabel).toBeVisible();
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toHaveText(/Logowanie/);

  // Step 2: Sprawdź etykietę nad polem o placeholderze "Email"
  const userDataLabel = page.getByText('Dane użytkownika', { exact: true });

  // Step 2 expects: Etykieta ma treść "Dane użytkownika", a na stronie nie ma etykiety o treści "Login"
  await expect(userDataLabel).toBeVisible();
  await expect(userDataLabel).toHaveText('Dane użytkownika');
  const labelBox = await userDataLabel.boundingBox();
  const fieldBox = await emailField.boundingBox();
  expect(labelBox).not.toBeNull();
  expect(fieldBox).not.toBeNull();
  expect(labelBox!.y).toBeLessThan(fieldBox!.y);
  await expect(page.getByText('Login', { exact: true })).toHaveCount(0);
});
