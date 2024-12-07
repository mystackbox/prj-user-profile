# User Profile

![alt text](github-doc-img.png)

# Table of contents
- [Introduction](#introduction)
- [Environment](#environment)
- [Tech Stack](#tech-stack)
- [How to run the application](#how-to-run-the-application)
- [References](#references)
- [Licence](#licence)


# Introduction

User Profile is single-page application developed with `Angular 2+` framework, taht allows anonymous user to create profile (`registrastion`), and login into the system (`authentication`), and view their login attempts (failed and passed) metrics. 

[Back to the top](#table-of-contents)

# Environment
- Operating System - Windows 11
- Angular CLI - v16.1.8
- Node.js - v18.13.0
- Visual Studio Code
- Postman - testing the http methods. 

[Back to the top](#table-of-contents)

# Tech stack
- Responsive Web Design (HTML5, CSS 3, Bootstrap 5, FontAwesome).
- Angular/Typescript framework v16.2.12
- RxJs
- Charts.js
- Json server (Mock API) - ver 1.0.0-alpha.23


[Back to the top](#table-of-contents)

# How to run the application

### 1. Installation
Ensure that you have following items are installed in your computer:

- Visual Studio Code
- Node.js
- Angular CLI

### 2. Clone `GitHub` repository

Clone the project from Github repository into your local repository: [ [User Profile](https://github.com/my-recent-projects/Prj-User-Admin) ]. For more information on how to clone the GitHub repository, see ["Cloning GitHub repository"](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

### 3. Start the localhost server

Run the following command in your `CLI` to install all the rrequired packages:
```javascript
npm install
```
Run the following command in your `CLI` to start the `localhost` server.
```javascript
ng serve
``` 
Once the `localhost` server is running, navigate to `http://localhost:4200/` or copy/paste `http://localhost:4200/` in your browser address-bar, then press enter.  

### 4. Start the Mock API server
This application uses `json-server` Mock API to mimic real JSON RESTful services. To start json-server, run the following command:

```javascript
npm run api
``` 

Please read [ json-server documentation](https://github.com/typicode/json-server) mock API for more details.

[Back to the top](#table-of-contents)

## References

- For more information related to Angular setup, please check out the [Angular documentation](https://angular.io/docs) page.
- For more information related to Angular CLI, please check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
- For more information related to Node.js, please check out the [Introduction to Node.js](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) page.
- For more information related to Node Package Manager (NPM), please check out the [npm Docs](https://docs.npmjs.com/) page.

[Back to the top](#table-of-contents)

## Licence

MIT License

Copyright (c) [ 2024 ] [ Yingisani Chiqinda ]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE..

[Back to the top](#user-profile)
