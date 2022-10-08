# crazy-dicey
Example code to teach testing with Typescript/Jest

# How to run
* Run **npm install**
* To run linting execute **npm run lint**
* To run the tests execute **npm test**

# Setup NodeJS Typescript project

If you have problems settings up your own Typescript project with Eslint and Jest these steps might help you.

1. Install NodeJS
2. Change to your application folder
3. Run `npm init -y`. This will initialize the NodeJS project and create a package.json file.
4. Run `npm i -D typescript eslint ts-jest @types/jest`. This will install the necessary devDependencies.
5. Run `npx tsc --init`. This will create a Typescript "tsconfig" file.
6. Run `npx ts-jest config:init`. This will initialize ts-jest config.
7. Run `npm init @eslint/config`. When asked if you want to use Typescript answer "yes".
8. Create "src" folder
9. Change "package.json" scripts to contain the scripts below.
10. Add the files in the "src" file.
11. To test eslint works add some unused variable and run `npm run lint`. This should indicate that unused code is found.
12. To test jest works add a test file and run `npm test`. This should run the test and show the test result.

Scripts in package.json file:
```json
"scripts": {
    "check": "tsc --noEmit --pretty",
    "lint": "eslint src/*.ts",
    "test": "jest"
}
```