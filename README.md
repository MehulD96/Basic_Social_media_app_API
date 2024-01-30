
# Social Media App With user and admin panel

In this project we are going to signup a user and make his profile by uploding an image,and other credentials like username, phone no., email and password. similarly with Admin panel. Admin can update or delete the existing users credentials. 
Node.js, mongoDB and Express.js is used for the backend API and simple HTML, CSS and javascript is used for frontend. this API will use JWT tokens for authentication.


## Build With:-

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
## Folder structure

src
    ├───config
    ├───controller
    ├───middleware
    ├───models
    ├───routes
    ├───services
    ├───utils
    └───views
        └───Admin


## Getting Started

Before getting started ensure the prerequisites for runnig the application is available in the system.

- VS Code.
- Node.js.
- MongoDB.
- Postman.



## Installation

install nde modules

```bash
  npm install --y
```
### Install packages required, mentioned in package.json file

```bash
  npm install bcrypt, body-parser, cookie-parser, dotenv, ejs, express, express-rate-limit, http-status-codes, jsonwebtoken, mongoose, multer, path
```

### paste the link of your MongoDB server and PORT number in .env file

```bash
  configure your mogodb server
```
### Run the project

```bash
  node app.js
```
After the connection the console will look like this -

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)



## API Reference

Below are the USER and ADMIN routes - 

#### NOTE - since in the frontend HTML is used snd HTML cannot send PUT and DELETE request therefor only GET and POST request is used here. to use just the API (with Postman) change the POST and GET method to PUT and DELETE as mentioned below.

## USER ROUTES - 


#### for user login

```http
 GET "/login"
```

#### for user dashboard after login

```http
  GET "/userdashboard"
```

#### to update user credentials by user (USE PUT instead of GET if used without this frontend)

```http
  GET "/update"
```

#### for user Signup

```http
  POST "/signup"
```

#### to delete user (use DELET instead of POST if used without this frontend)

```http
  POST "/delete/:id"
```


## ADMIN ROUTES - 


#### for admin login

```http
 GET "/adminlogin"
```

#### for admin Signup

```http
 GET "/signup"
```

#### for admin dashboard after login to get all user in database.

```http
  GET "/admindashboard"
```

#### to edit/update user credentials by user (USE PUT instead of GET if used without this frontend)

```http
  GET "/update"
```

#### to delete user (use DELET instead of POST if used without this frontend)

```http
  POST "/admindelete"
```

## DEMO-

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)