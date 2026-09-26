# OrangeHRM Login Test Plan

## Application Overview

Plan independent UI tests for the publicly accessible OrangeHRM Open Source 5.9 login and password-reset entry flows. Exploration confirmed the page itself displays demo credentials Admin / admin123, empty submissions show Required validation, invalid credentials show Invalid credentials, the reset form has Cancel and Reset Password controls, and the displayed demo credentials reach /dashboard/index. Each scenario starts from a fresh unauthenticated browser context and login URL. The user approved all five scenarios before test generation. Do not attempt auth bypass or submit an actual password-reset request.

## Test Scenarios

### 1. OrangeHRM Login Page

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with page-displayed demo credentials

**File:** `tests/orangehrm/login-success.spec.ts`

**Steps:**
  1. Start from a fresh browser context at https://opensource-demo.orangehrmlive.com/web/index.php/auth/login. Confirm the login page displays the demo username Admin and password admin123.
    - expect: The login page is unauthenticated and displays Username and Password inputs and a Login button.
    - expect: The page itself identifies Admin / admin123 as the demo credentials.
  2. Enter Admin in Username and admin123 in Password, then select Login.
    - expect: Authentication succeeds without bypassing the form.
    - expect: The browser navigates to https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index and displays the OrangeHRM dashboard.

#### 1.2. Empty login submission shows required validation for both fields

**File:** `tests/orangehrm/login-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh browser context at the login URL and leave Username and Password empty.
    - expect: The login form is displayed with both fields empty.
  2. Select Login without entering either value.
    - expect: A Required validation message is shown for Username.
    - expect: A Required validation message is shown for Password.
    - expect: The browser remains on the login page and no authenticated session is created.

#### 1.3. Required validation identifies whichever login field is missing

**File:** `tests/orangehrm/login-single-missing-field.spec.ts`

**Steps:**
  1. Start from a fresh browser context at the login URL. Enter Admin in Username, leave Password empty, and select Login.
    - expect: A Required validation message is shown for Password.
    - expect: Username is not reported as required while it contains Admin.
    - expect: The browser remains on the login page.
  2. Reload the login URL to reset the form. Leave Username empty, enter any non-empty value in Password, and select Login.
    - expect: A Required validation message is shown for Username.
    - expect: Password is not reported as required while it contains a value.
    - expect: The browser remains on the login page.

#### 1.4. Invalid credentials are rejected with visible feedback

**File:** `tests/orangehrm/login-invalid-credentials.spec.ts`

**Steps:**
  1. Start from a fresh browser context at the login URL. Enter invalid-user in Username and invalid-password in Password.
    - expect: Both fields accept the entered text before submission.
  2. Select Login.
    - expect: The page displays Invalid credentials.
    - expect: The browser remains on the login URL and does not enter the authenticated dashboard.

#### 1.5. Password-reset form requires a username and Cancel returns to login

**File:** `tests/orangehrm/password-reset-required-and-cancel.spec.ts`

**Steps:**
  1. Start from a fresh browser context at the login URL and select Forgot your password?.
    - expect: The browser opens the Reset Password page.
    - expect: The page explains that a username is needed to identify the account and provides a Username field, Cancel button, and Reset Password button.
  2. Leave Username empty and select Reset Password.
    - expect: A Required validation message is shown for Username.
    - expect: No password-reset request is submitted without a username.
  3. Select Cancel.
    - expect: The browser returns to the login URL.
    - expect: The login form is available and no password-reset confirmation is shown.
