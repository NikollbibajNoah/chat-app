# Creating Node.js Server using TypeScript

**Install TypeScript and necessary dependencies: Run the following command to install TypeScript and the type definitions for Node.js:**
```shell
npm install --save-dev typescript @types/node ts-node
```
**Initialize a TypeScript configuration file: Create a tsconfig.json file by running:**

```shell
npx tsc --init
```

**Update your package.json scripts: Modify the scripts section in your package.json to include a build script for TypeScript:**

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "dev": "ts-node src/server.ts",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

**Rename your JavaScript files to TypeScript: Rename your `server.js` file to `server.ts` and update any other .js files to .ts.**


**Update your TypeScript configuration: Ensure your `tsconfig.json` includes the necessary settings. Here is a basic example:**

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

**Move your source files: Create a `src` directory and move your TypeScript files into it. Your project structure should look like this:**

```
package.json
tsconfig.json
src/
  server.ts
```

**Build and run your project: Run the build script to compile your TypeScript files:**

```shell
npm run build
```

**Then start your application:**

```shell
npm start
```

**Alternatively, you can run the following command to execute the typescript directly (dev mode)**

```shell
npm run dev
```