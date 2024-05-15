# easy-gift

Enable family members or a group of friends to discuss gift ideas without seeing what others are preparing for them. A discussion thread would be dedicated to each member, allowing other members to exchange ideas for individual or collective gifts.

## Technology Stack

- Backend: Node.js, Apollo Server, GraphQL, TypeORM
- Frontend: [Technologies used]
- Containerization: Docker

### Project Configuration

## Package Information

Name: easy-gift
Version: 1.0.0
Main File: index.ts
License: ISC
Authors:
Aurélie Lozach - https://github.com/Caudrel
Lejeune Morgane - https://github.com/Mauh33
Léopold Lesaulnier - https://github.com/dlopoelinreverse
Jérémie Pourageaux - https://github.com/Jeremie-Po
Olga Kuzkina - https://github.com/KuzkinaOlga

## Scripts

test

# backend

Start Development Server: npm run start
Build Project: npm run build
Start Production Server: npm run start:prod
Reset Database: npm run resetDB

# frontend

## Repository

Type: git
URL: https://github.com/KuzkinaOlga/easy-gift

## Homepage

URL:

## Setup

## Run test localy

Several test have been setup to secure the integrity of the website.
To run them localy:

1. Start by building an image of the website by runing the command in the terminal of the projet, from the root :
   `npm run dev`

2. Go in the backend folder to run the integration tests. Start with initializing the test database, before lauching the actual test
   `cd backend`
   `npm run testDB:wait`
   `npm run test`

3. Go in the frontend folder to run the unit test
   `..`
   `cd frontend`
   `npm run test`

4. Go in the e2e folder to run the end to end test. But first, in dockerhub, stop the backend/testDB-1 container, and start the easy-gift/testDB-1 container.
   `..`
   `npm run test-headed`

Hopefully, by now, all the test should have passed !

## Docker Setup

Build Docker containers:

`docker compose up --build`

Start Docker containers:

`docker compose up`

### Install dependencies

For backend and frontend installations of dependencies:

```npm i

```

### Environement variables

```cp .env.example .env

```

And then change variables inside `.env` to match your own environment.
If you ever want to add an environment variable, please add it to `.env.example`.
