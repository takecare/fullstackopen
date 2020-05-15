#### Deploying (for the first time)

1. Initiate repo if needed (note you might end up with an sub-repo just for deploying to heroku): `git init`
1. Create heroku app: `heroku create`
1. Build the FE app: `../frontend/yarn build`
1. Copy build over: `cp -r ../frontend/build ./`
1. Commit to heroku's repo: `git add .` & `git commit -m "deployment"`
1. Push to heroku: `git push heroku master`

Done.
