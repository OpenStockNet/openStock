# openStock

## Local Setup

### Prerequisites

- Node and NPM installed locally
- MongoDB installed and running locally


### Setup Backend

0. Open new terminal window and go to openStock repo folder
1. `npm install`
2. Create a new file called `.env` and add the following content:
```
PORT=5500
SESSION_SECRET=xxx
MONGODB_URI=mongodb://localhost/openstock
```


### Setup Frontend

0. Open new terminal window and go to openStock repo folder
1. `cd client`
2. `npm install`


## Development

### Start Backend

0. Open new terminal window and go to openStock repo folder
1. `npm run dev`


### Start Frontend

0. Open new terminal window and go to openStock repo folder
1. `cd client`
2. `npm run start`
3. Open http://localhost:3000 in your browser


### Make Code Changes

0. Open new terminal window and go to openStock repo folder
1. `git checkout master`
2. `git pull`
3. `git checkout -b new-dev-branch`
4. Make code changes
5. `git add .`
6. `git commit -m 'my message'`
7. `git push`
8. Open new pull request on GitHub
9. Merge pull request


## Deployment to Heroku

0. Open new terminal window and go to openStock repo folder
1. `git checkout master`
2. `git pull`
3. `git checkout -b new-heroku-branch`
3. `cd client`
4. `npm run build`
5. `git add -f build`
6. `git commit -m 'frontend build'`
7. `git push -f heroku new-heroku-branch:master`

Before you make new code changes, start again with step 1 from the "Make Code Changes" section above.
