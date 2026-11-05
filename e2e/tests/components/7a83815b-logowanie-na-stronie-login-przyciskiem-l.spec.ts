import { test, expect } from '@playwright/test';

test("Logowanie na stronie /login przyciskiem 'Logowanie' @E2E-7A83815B-1 @module:components", async ({ page }) => {
  // Step 1: Otwórz stronę /login
  await page.goto('/login');

  const loginButton = page.getByRole('button', { name: 'Logowanie' });

  // Step 1 expects: Wyświetla się formularz logowania z przyciskiem o etykiecie 'Logowanie' (przycisk nie zawiera już tekstu 'Zaloguj')
  await expect(page.getByLabel('Login')).toBeVisible();
  await expect(page.getByLabel('Hasło')).toBeVisible();
  await expect(loginButton).toBeVisible();
  await expect(loginButton).toHaveText(/Logowanie/);
  await expect(loginButton).not.toContainText('Zaloguj');
  await expect(page.getByRole('button', { name: 'Zaloguj', exact: true })).toHaveCount(0);

  // Step 2: Sprawdź tło przycisku 'Logowanie'
  const backgroundColor = await loginButton.evaluate(
    (element) => window.getComputedStyle(element).backgroundColor
  );

  // Step 2 expects: Przycisk ma kolor tła #1a2b3c (rgb(26, 43, 60))
  expect(backgroundColor).toBe('rgb(26, 43, 60)');

  // Step 3: Wypełnij pola formularza poprawnymi danymi logowania i kliknij przycisk 'Logowanie'
  await page.route('**/login', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ loggedIn: true }),
      });
      return;
    }
    await route.fallback();
  });
  await page.getByLabel('Login').fill('e2e-user@example.test');
  await page.getByLabel('Hasło').fill(`e2e-${Date.now()}`);
  await loginButton.click();

  // Step 3 expects: Formularz zostaje wysłany, użytkownik zostaje zalogowany (następuje przejście ze strony /login)
  await page.waitForURL((url) => !url.pathname.includes('/login'));
  expect(new URL(page.url()).pathname).not.toContain('/login');
});
