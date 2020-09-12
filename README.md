# Xibit Server

Api for Xibit App

## To Do

- Create user database using mongoose
- Database for adding to profile
- API calls
- Server

## Done

- Installed Axios, bcryptjs, express, express-session, passport and passport-local to try and make a secure password. Installed cors.
- Made changes to the mongoose URI to make it easier to read and use.

- Created 3 models:
  - xibits :
    - Once you add the xibit to your profile it adds to this with the data from the api
  - plans :
    - Allow the user to add routes/ show distances referencing the xibits model
  - user :
    - This is for logging in the user
