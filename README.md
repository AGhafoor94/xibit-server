# Xibit Server

Api for Xibit App

## To Do

- Create user database using mongoose
- Database for adding to profile
- API calls
- Server

## Done

- Installed axios,express and cors.
- Made changes to the mongoose URI to make it easier to read and use.

- Created 3 models:

  - xibits :
    - Once you add the xibit to your profile it adds to this with the data from the api
  - plans :
    - Allow the user to add routes/ show distances referencing the xibits model
  - user :
    - This is for logging in the user

- Created 3 seed files and script called seed to run them:

  - seedUser: Adds generic users to the database
  - seedXibit: Adds generic information to the database relating to the schema
  - seedPlan: Adds 2 plans

- Created CRUD routes for Plans:
  - Get all plans
  - Get one plan by Id
  - Create plan
  - Update plan
  - Delete plan
