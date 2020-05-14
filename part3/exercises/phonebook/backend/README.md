#### Deploying for the first time

1. Initiate repo if needed (note you might end up with an sub-repo just for deploying to heroku): `git init`
1. Create heroku app: `heroku create`
1. Build the FE app: `../frontend/yarn build`
1. Copy build over: `cp -r ../frontend/build ./`
1. Commit to heroku's repo: `git add .` & `git commit -m "deployment"`
1. Push to heroku: `git push heroku master`

Done.

#### Deploying thereafter

1. `npm run deploy:full`

#### Setting up env vars locally

```
touch .env
echo MONGODB_URI=mongodb+srv://myproj:<password>@myurl.mongodb.net/numbers-app?retryWrites=true&w=majority > .env
echo MONGODB_PW=mymongodbpassword > .env
```

#### Setting up env vars on heroku

```
heroku config:set "MONGODB_URI=mongodb+srv://myproj:<password>@myurl.mongodb.net/numbers-app?retryWrites=true&w=majority"
heroku config:set "MONGODB_PW=mymongodbpassword"
```
