# Notas

Version de Angular

```
Angular CLI: 15.1.3
Node: 18.12.1
Package Manager: npm 8.19.2
OS: win32 x64

Angular: 15.1.2
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

```

## Instalar - FrontEnd-Angular

Instalar NVM

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Instalar Angular Cli

```
npm install -g @angular/cli
```

### Levantar frontend en Angular

Configurar un nuevo proyecto

```
ng new frontend
```

### Instalar bootswatch

Utilizar bootswatch como tema

```
npm i bootswatch
```

### Instalar sweet alert 2

Utilizar bootswatch como tema

```
npm install sweetalert2
```

### Configurar bootswatch

Modificar el archivo angular.json

Agregar lo siguiente en projects -> frontend -> architect -> build -> options -> styles

```
node_modules/bootswatch/dist/materia/bootstrap.min.css
```

### Iniciar App

```
ng serve -o
```

# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
