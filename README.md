# Grace Shopper - Team Virgo

Daniel Jacobson
Evan Forde Barden
Harrison J.K.
Kevin Zhang

## Welcome! 

Lucky you! You've just stumbled across the best emoji e-commerce website on the internet! 🥳

## Setup

To fetch our app, Fork and Clone this repo!

Once this is done, setup your database by running the following commands:

```
createdb grace-shopper-virgo
npm install
```

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

- **If you are creating a new app...**

  1.  `heroku create` or `heroku create grace-shopper-virgo` if you have a
      name in mind.
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
    ("provision") a postgres database to your heroku dyno (This creates your production database)

4.  `heroku config:set SEED=true` to get heroku to sync and seed your database

5.  note everytime your app restarts, the database tables will be dropped and re-created. To avoid this you can `config:unset SEED`

- **If you already have a Heroku app...**

  1.  `heroku git:remote grace-shopper-virgo` You'll need to be a
      collaborator on the app.

Now, you should be deployed!
