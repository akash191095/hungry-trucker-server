# Server

## Info

```
This is a (node and express) rest api.
We are using babel to transpile.
```

## Setup

```
1. Run `npm install` to install the dependencies.
2. Run `npm start` to start the application in dev mode.
3. Run `npm run build` to build for production.
4. Use netlify cli to do local deploy/serve.
```

## Environment Config

```
PORT = 5000
1. This is the port for our server.

DB_URL = mongoDB address string
2. This is the database address with the username and password.

JWT_SECRET = Some String
3. This is the session secret used for user's auth.
```

## Deployment

```
We are using netlify functions to deploy this, it is a serverless deployment. (only took a few hours to deploy)
Link: https://fervent-swirles-a9f568.netlify.app/.netlify/functions/server
```

## More Info

### Tech used

- Node.js with express and mongodb as database
- Jwt for authentication
