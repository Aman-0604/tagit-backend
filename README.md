# First two steps are for that person ==***which is making the backend from scratch***== but the ==***person who is cloning this repo***== must follow from the fourth step so as to have a fast hands on (if not done this type of thing earlier)


## First Step is to follow these substeps

1. `npm init ` enter enter and enter to the questions asked...
2. `npm i -D nodemon` the server will get restart whenever we save our file - this is the use of nodemon and we are making it dev dependency
3. `npm i express` we will make API's with the help of Express. It is a nodejs web framework
4. `npm i mongoose` it acts as an abstract action layer on top of mongoDB which helps establishing connection between MongoDB and Nodejs
5. `npm i cors` we can't call our express API's from our web server according to cors policy, hence installing it
6. `npm i express-validator`
7. `npm i bcryptjs`
8. `npm i jsonwebtoken`

---

## Second Step is to initialize git repository by typing `git init`

---

## Third Step is to make `index.js` file and `db.js` file respectively

---
 1. Note : index.js will be our entry point, also it is our express 
 2. Note : We can use ThunderClient or Postman to test our API's or http's requests(mainly GET, POST, PUT, DELETE)
 3. Note : Always add your node_modules in .gitignore
 
 
---

## Fourth Step

Type `nodemon .\index.js` in a new terminal to start your server

---

## ThunderClient Folder Structure

- tagit 
    1. Authentication
        1. Crate User [POST]
        2. User Login using credentials [POST]
        3. User Details [POST]
    2. Posts
        1. Fetch all posts [GET]
        2. Add post [POST]
        3. Update [PUT]
        4. Delete Posts [DELETE]

---

