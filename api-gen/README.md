# api-generator nodejs + ts application

A [Rest](https://restfulapi.net/) api application. Built in [Nodejs](https://nodejs.org/) and [Typescript](https://www.typescriptlang.org/)

- Readme content
  - [Note](#note-)
  - [Requirements](#requirements)
  - [Running the application](#hello-world)
  - [Building the application](#hello-world)

## Note -

1. All commands and scripts used here are written for the linux bash terminal. Kindly find the appropriate commands to use if you are in a different environment.

## Requirements -

Before you can successfully run and build this nodejs application, ensure you have the following:

1. Installed [Node](https://nodejs.org/) on your local PC.
2. Globally install the following `npm` packages on your local PC.
    ``` bash
    # typescript
    npm install -g typescript
    # nodemon
    npm install -g nodemon
    ```
3. A log directory in your local PC. This will be used to store logs generated from the application at runtime. If your log directory is `app-log` and it is located at `/home/nathaniel/app-log`, you should add the directory url to the `.env` file in the root of the project. Example `API_GENERATOR_ERROR_LOG_DIR=/home/nathaniel/app-log`.

## Running the application

Before starting the application you need to cross check your environment variables in the `.env` file. Or copy its content into your system environment path. e.g `/etc/environment`

1. Run the following commands from a terminal to install all required [npm](https://npmjs.com/) modules.

    ``` bash
    cd project_directory
    npm install
    ```
    This will create a node_modules directory in the project that holds all the downloaded modules.
2. Run the following commands from a terminal to run the application in development mode.

    ``` bash
    npm run dev
    ```
    This should print out the following
    ``` bash
    [INFO] [::] 2022-08-29T10:12:13.478Z [::] Application running in development environment on port 8008
    ```
## Building the application
To build the application, follow the steps below
1. Run the following commands from a terminal to build the application.
    ``` bash
    cd project_directory
    npm run build
    ```
    This would create a `dist` directory in your application root. This `dist` folder contains the compiled javascript of your project

2. Test out the built application by running the following commands:
    ``` bash
    npm run start
    ```
    This should print out the following the first time you run it
    ``` bash
    [INFO] [::] 2022-08-29T10:12:13.478Z [::] Application running in development environment on port 8008
    ```