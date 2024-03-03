# Musicfly Backend Codebase

First do start mysql server and the update username and password in `.env`

## API Endpoints (working)

`localhost:3000\user\login`
`localhost:3000\user\register`

## More on Endpoints
### 1. Login API Endpoint

_Method_: `POST`

_Parameters_: `username` and `password` **"email bhejne ki bakchodi na kare"**

_Return values_:
- Return user data if exist or returns status code. 
        `user data` if authenticated user.
        `401` if unauthorized user.
        `500` if error occured in server.

### 2. Register API Endpoint

_Method_: `POST`

_Parameters_: `username`, `email` and `password`. **"username pe unique key nhi lagayi hai toh same username ke do users ban sakte hai, I will solve this till today's noon"**

_Return values_:
- `201` if user created successfully
        `400` if you fucked up while sending request.
        `500` if I fucked up in server.

**User `<form>` tag and use the correct `<name>` in the form as in the parameter and don't forget to put `<form method='POST'>` as they are post request.**