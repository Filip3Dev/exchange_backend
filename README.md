# API Exclusible data

Basic API structure using TypeORM as a data repository


## Tech

It uses a modular architecture and has multi language support.

- [NestJS] - A progressive Node.js framework.
- [TypeORM] - MultiSQL Database Service.
- [ESLint] - ESLint statically analyzes your code to quickly find problems.
- [JWT] - Allows you to decode, verify and generate JSON Web Tokens.

## Postman documentation

https://documenter.getpostman.com/view/1175570/2s847LMWSc


## Install and run

Install the dependencies and devDependencies and start the server.

```sh
npm install
```
Change the `.env.example` to `.env`

```sh
npm run build
npm start
```
To run in developer mode using Hot Reload, package similar to nodemon:

```sh
npm run start:dev
```

## Production mode

Fill the `.env` with correct values.

Make sure you have intalled:
- `docker`
- `docker-compose`

Then run:

```sh
docker-compose up --build
```