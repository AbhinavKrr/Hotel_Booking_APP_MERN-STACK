npx tsc --init    to create tsconfig file


if you are facing problem to run, steps to run: at 10:40

install tsx gloablly insted of ts-node: npm i tsx --save-dev
then use nodemon -> npm run dev -> 

 "type": "module",
  "main": "./src/index.ts",
  "scripts": {
    "dev": "nodemon"


"scripts": {
    "dev": "nodemon --exec tsx src/index.ts"
  },




  video Timing: 1:56:16

  video Timing: 2:35:11

  video Timing: 3:37:19



End to End Tests -> automating tests like a user will use this application

first we will setup a test database server to recieve test data 

npm init playwright@latest
Need to install the following packages:
create-playwright@1.17.135
Ok to proceed? (y) y

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\tests\example.spec.ts - Example end-to-end test
  - .\tests-examples\demo-todo-app.spec.ts - Demo Todo App end-to-end tests 
  - .\playwright.config.ts - Playwright Test configuration

