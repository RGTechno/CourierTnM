# Backend Setup Guide

This guide will help you set up the project's backend on your local machine and get it up and running. Please follow the instructions carefully to ensure a smooth setup process.

## Steps
1. Run the command `npm install` in the terminal of the directory (backend).
2. Rename the `.env.example` file in the backend root to `.env`.
3. Open the `.env` file in a text editor and provide the required configuration values. This file would require you to enter mongodb connection string, [JWT Key](https://www.npmjs.com/package/jsonwebtoken), SMTP details.

## Running the Backend
1. Once the setup and configuration are complete, you can start the project by running the following command in the terminal of the directory (backend):

```npm run dev``` for nodemon (development) 
      or 
```npm run start```

2. By default the backend will run on port 4545. Therefore you can access the backend at ```http://localhost:4545```

<hr />

Congratulations! You have successfully set up the backend on your local machine. You can now start exploring and working on the project. If you have any issues or questions, reach out to me on [LinkedIn](https://www.linkedin.com/in/rgtechno/)
Happy coding!
