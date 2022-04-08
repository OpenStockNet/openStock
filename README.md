# openStock

openStock is a MERN app with REST API promoting open-source alternatives.

## Demo on Heroku

https://openstock-berlin.herokuapp.com/


## Local Setup

### Prerequisites

- Node and NPM installed locally
- MongoDB installed and running locally


### Setup Backend

1. `npm install`
2. Create a new file called `.env` and add the following content:
```
PORT=5500
SESSION_SECRET=xxx
MONGODB_URI=mongodb://localhost/openstock
```


### Setup Frontend

1. `cd client`
2. `npm install`


## Development

### Run Backend

1. On Ubuntu, start database by running `sudo systemctl start mongod`
1. `npm run dev`

### Run Frontend

1. `cd client`
2. `npm run start`
3. Open http://localhost:3000 in your browser


### Run Frontend Tests

1. `cd client`
2. `npm run test`


## Manual Deployment to Heroku

1. `git checkout master`
2. `git pull`
3. `git push heroku master`

By default whenever there are new commits on the master branch, the changes will be automatically deployed.
