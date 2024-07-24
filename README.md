# easy-gift

Enable family members or a group of friends to discuss gift ideas without seeing what others are preparing for them. A discussion thread would be dedicated to each member, allowing other members to exchange ideas for individual or collective gifts.

## Technology Stack

- Backend: TypeScript, Node.js, Apollo Server, GraphQL/TypeGraphQL, TypeORM
- Frontend: TypeScript, Next.js, Apollo Client, Tailwind CSS
- Containerization: Docker

## Project install

To launch the project, clone it, connect to you docker account and then run the following commands startig from the root of the project :
`cd frontend`  
`npm i`  
`cp .env.example .env`  
`cd ..`  
`cd backend`  
`npm i`  
`cp .env.example .env`  
`cd ..`  
`cd e2e-tests`  
`npm i`  
`cp .env.example .env`  
`cd ..`  
`npm run dev`  
The application is now available on localhost:3000  
The backend Apollo Studio is now available on localhost:4001  
You can now change the necessary variables inside `.env` such as the secret ket that needs to be the same in both frontend and backend.

## Load a first set of data via Docker

Once the project built, you can seed a first set of data by running the restDB file through Docker desktop:

Click on the backend container, go in the Exec section, and key in after "/app #" the following command:  
`npm run resetDB`  
You can now connect directly to an existing account such as `pierre@gmail.com` with password `test@1234`  
Or you can create your own account!

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

## Repository

Type: git
URL: https://github.com/KuzkinaOlga/easy-gift

## Homepage Pre-production

URL: https://staging.0923-bleu-3.wns.wilders.dev/

## Homepage Production

URL: https://easy-gift.0923-bleu-3.wns.wilders.dev/

## Setup

## Run test localy

Several test have been setup to secure the integrity of the website.
To run them localy:

1. Start by building an image of the website by runing the command in the terminal of the projet, from the root:  
   `npm run dev`

2. Go in the backend folder to run the integration tests. Start with initializing the test database, before lauching the actual test:  
   `cd backend`  
   `npm run testDB:wait`  
   `npm run test`

3. Go in the frontend folder to run the unit test:  
   `..`  
   `cd frontend`  
   `npm run test`

4. Go in the e2e folder to run the end to end test:

   In dockerhub, stop the backend/testDB-1 container, and start the easy-gift/testDB-1 container:  
   `..`  
   `cd e2e-tests`  
   `npm run test-headed`

Hopefully, by now, all the test should have passed !
