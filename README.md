<h1 align="center"> 
	💻 Harpia (NodeJS) 💻
</h1>

- [🏃 Quick Start](#-quick-start)
- [📝 Description](#-description)
- [➕ Dependencies](#-dependencies)
- [📁 Setting up database](#-setting-up-database)
- [🔨 Building the project](#-building-the-project)
- [🚀 Running the app](#-running-the-app)
  - [🔸 Important!](#-important)
- [✅ Testing](#-testing)

## 🏃 Quick Start

- Create `.env` file based on `.env.example` in the project folder
- For security reasons, change values of `JWT_SECRET` and and `POSTGRES*` in `.env` file
- If you will use Docker, also change `PGADMIN_DEFAULT_PASSWORD` and `PGADMIN_DEFAULT_EMAIL` in `docker-compose.yml` file
- Install dependencies using `yarn` or `npm install`
- Start the project for development using `yarn start:dev` or `npm run start:dev`

## 📝 Description

This project is a boilerplate for Nodejs/Typescript server-side applications. It already includes:

- 🟢 docker-compose file including postgres and pgadmin container setup
- 🟢 Database connection with TypeORM configured 
- 🟢 JWT Authentication with Passport
- 🟢 Routes configured
- 🟢 Password encryptation
- 🟢 Unit tests configured
- 🟢 Enviroments configured (for development, production, stage and qa)
- 🟢 Validation schemas (using Joi)
- 🔴 Swagger

## ➕ Dependencies

These tecnologies listed below are required to run the project properly:

- Node >= v14.18
- NPM => v8.1.2
- (optional) Docker >= 20.10.12

To install the dependencies, use `yarn` or `npm install`.

## 📁 Setting up database

- Start docker containers using `docker-compose up`
- (optional) To create tables, run `yarn schema:sync` or `npm run schema:sync`

## 🔨 Building the project

- Use `yarn build` or `npm run build`
- Create a `.env.production` file and change the `TYPEORM_DIR*` variables (specified in `.env.example`)
- Use `yarn start` or `npm run start`

## 🚀 Running the app

- Start docker containers using `docker-compose up`
- Install dependencies using `yarn` or `npm install`
- Production: `yarn start` or `npm start`
- Development: `yarn start:dev` or `npm run start:dev`

### 🔸 Important!

Each `start:*` script will run node/nodemon with an specific `*.env` file. Here are the `.env` files for each one:

- `yarn start:dev` default env file is `.env`
- `yarn start` default env file is `production.env`

**Note** that except `start:dev`, all the other scripts will run
the builded project. It means that it will not use Typescript, but Javascript, so make sure to change the `TYPEORM_DIR*` in the `.env*` files as specified in `.env.example`

## ✅ Testing

- Use `yarn test` or `npm test`
