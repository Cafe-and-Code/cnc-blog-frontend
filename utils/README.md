# ELIC-LINK

## Build Setup

# Enviroment

- [NodeJs v20.8.1](https://nodejs.org/en/download)
- [VSCode](https://code.visualstudio.com)
- [Vue Volar extension Pack](https://marketplace.visualstudio.com/items?itemName=MisterJ.vue-volar-extention-pack&ssr=false#overview)
- [Vue Devtool](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Yarn](https://www.npmjs.com/package/yarn)
- [Git](https://git-scm.com/downloads)
- Add setting visual code:

```bash
   {
   "eslint.alwaysShowStatus": true,
   "eslint.format.enable": true,
   "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.tslint": true
   },
   "editor.formatOnSave": true,
   "editor.defaultFormatter": "esbenp.prettier-vscode",
   "terminal.integrated.defaultProfile.windows": "Command Prompt",
   }
```

# Run Local

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn preview

# generate static project
$ yarn generate
```

# API:

# DB:

# Server

- Local: http://localhost:3000/
- Dev:

# Account

## Coding Rules

- **Styleguide**
- Use scss scoped
- Mix scss when there are multiple css in common use
- Create a file and import it for the screen. Name the file based on the screen name.
  Ex: `HomePage.scss` `SettingPage.vue`
- The distance between two functions is 1 enter
- Limit the use of const, let, var
- File names must be multiple words

- **Git flow**

1. Branch naming prefix:  
   **Accepted** prefix:  
   ✔️ `feat/` for adding / developing a feature in here  
   ✔️ `hotfix/` for adding / developing a hotfix that's not normal flow  
   ✔️ `fix/` for adding / developing a bug fix in here  
   ✔️ `cr/` for update customer change request after feature is merged in one sprint  
   ex: `feat/issue-001` `feat/issue-001-v2` `feat/issue-001-dev` `fix/issue-001-stg` `hotfix/banner-style`

2. Commit - Lint:  
   run `yarn lint` before commit -> fix wrong format to till it clean
   Tip: can use `yarn lintfix` to fix auto

3. Merge - double check (mindset):  
   resolve `conflict`  
   check `merge target`  
   remove all debugger: ex: `console.log` `console.error`  
   remove all variable created but not used
   double check code with previos revision (`diff check`), control `infulence level`

## Issues - Fix guide

1. **Husky Hooks and Windows Compatibility with GitHub Desktop**

   > If you're using a third-party GUI like GitHub Desktop for managing Git commits in Windows, you may get an error that `bash` is a command not found.
   >
   > This error commonly occurs when trying to run package manager based scripts, like the "npx lint-staged" command, as part of your husky pre-commit hooks.
   >
   > To fix this error, you'll need to add the Git for Windows tools to your PATH by either:
   >
   > 1. Choosing "Use Git and optional Unix tools from the command prompt" in the Git for Windows installer, or
   > 2. Adding "C:/Program Files/Git/bin" [or your appropriate installation location] to the PATH manually as an Environmental Variable in Windows. (Both: User variables, System variables)
   >
   > Similar issues have been reported for the Node Version Manager program nvm on \*nix systems, but those issues are addressed in the "command not found" section of the docs, which explains using a > ~/.huskyrc file.

2. **Windows git "warning: LF will be replaced by CRLF"**
   > run `git config --global core.autocrlf false`
