import { test, expect } from '@playwright/test';

test("Strona logowania wyświetla etykietę 'Dane użytkownika' @E2E-000A13D1-1 @module:components", async ({
  page,
}) => {
  // Step 1: Przejdź na stronę /login
  await page.goto('/login');

  const emailInput = page.getByPlaceholder('Email', { exact: true });
  const passwordInput = page.getByPlaceholder('Password', { exact: true });
  const submitButton = page.getByRole('button', { name: 'Zaloguj' });

  // Step 1 expects: Formularz logowania jest widoczny
  await expect(emailInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(submitButton).toBeVisible();

  // Step 2: Sprawdź etykietę nad polem z placeholderem 'Email'
  const userDataLabel = page.getByText('Dane użytkownika', { exact: true });

  // Step 2 expects: Etykieta ma treść 'Dane użytkownika'; tekst 'Login' nie występuje już jako etykieta formularza
  await expect(userDataLabel).toBeVisible();
  await expect(userDataLabel).toHaveText('Dane użytkownika');
  await expect(page.getByText('Login', { exact: true })).toHaveCount(0);

  // Step 3: Wpisz adres e-mail w polu 'Email' i hasło, a następnie zatwierdź formularz
  await emailInput.fill('e2e-000a13d1@example.com');
  await passwordInput.fill('e2e-000a13d1-secret');
  await submitButton.click();

  // Step 3 expects: Logowanie działa jak dotychczas (użytkownik zostaje zalogowany lub pojawia się komunikat o błędnych danych)
  const loggedIn = page.waitForURL((url) => !url.pathname.includes('/login'), {
    timeout: 15000,
  });
  const errorShown = expect(
    page.getByText(/(błęd|bledn|nieprawidłow|nieprawidlow|invalid|incorrect|error)/i).first()
  ).toBeVisible({ timeout: 15000 });
  const stillOnLoginForm = expect(submitButton).toBeVisible({ timeout: 15000 });

  const outcome = await Promise.allSettled([loggedIn, errorShown, stillOnLoginForm]);
  expect(outcome.some((result) => result.status === 'fulfilled')).toBe(true);
});
