# openStock


## Development

1. `git checkout master`
2. `git pull`
3. `git checkout -b new-branch`
4. Make code changes
5. `git add .`
6. `git commit -m 'my message'`
7. `git push`
8. Open new pull request on GitHub
9. Merge pull request


## Deployment to Heroku

0. Go to openStock repo folder in terminal
1. `git checkout master`
2. `git pull`
3. `git checkout -b new-branch`
3. `cd client`
4. `npm run build`
5. `git add -f build`
6. `git commit -m 'front-end build'`
7. `git push heroku new-branch:master`

Before you make new code changes, start again with step 1 from the "Development" section above.
