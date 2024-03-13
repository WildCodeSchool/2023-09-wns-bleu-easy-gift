
import { test, expect } from '@playwright/test';
import { User } from '../../backend/src/entities/user';
import {clearDB} from '../../backend/src/db';
import db from '../../backend/src/db';

test.beforeAll(async () => {
  await db.initialize()
})

test.beforeEach(async () => {
  await clearDB()
})

test('has a valid user name', async ({ page }) => {

  const pseudo = "Olga";
  const emailToCheck = "olga@gmail.com";
  const passwordToCheck = "test@1234";

  await User.create({
    pseudo: pseudo,
    email: emailToCheck,
    password:passwordToCheck
  }).save();


  await page.goto('http://localhost:3000/auth/login');
  await page.getByTestId('login-email').fill(emailToCheck);
  await page.getByTestId('login-password').fill(passwordToCheck);
  await page.getByRole("button", {name: "Se connecter"}).click();
  const disconenctButton = page.getByRole("button", {
    name: "Se déconnecter",
  });
  await expect(disconenctButton).toBeVisible();
  // await expect(
  //   page.getByRole("button", {name: "Se déconnecter"})
  // ).toBeVisible();

});
