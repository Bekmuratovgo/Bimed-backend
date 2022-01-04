<!--  -->

## Authentication API

```javascript
// check if a user is logged in
GET    "/api/auth"
// login a user
POST    "/api/auth/login"
// logout a user from current device
POST    "/api/auth/logout"
// logout a user from all connected devices
POST    "/api/auth/logout/all"
```

### check if a user is logged in

```javascript
// check if a user is logged in
GET    "/api/auth"
```

-   **Response**

```javascript
{
  data:{
    message: "you are logged in" ,
    body: {
        bonus: 0,
        account_type: "",
        frozen: false,
        _id: "",
        favoite_medicines: [],
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        date_of_birth: "",
        tokens: [
         {
           _id: "",
           token:""
         }
        ],
        createdAt: "2021-07-07T07:50:08.403Z",
        updatedAt: "2021-07-07T07:50:08.403Z",
        __v: 6,
        token:""
    }
  }
}
```

### login a user

```javascript
// login a user
POST    "/api/auth/login"
```

-   **Request**

```javascript
{
  phone: "",
  sms_otp: ""
}
```

-   **Response**

```javascript
{
  data:{
    message: "user successfully logged in" ,
    body: {
        bonus: 0,
        account_type: "",
        frozen: false,
        _id: "",
        favoite_medicines: [],
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        date_of_birth: "",
        tokens: [
         {
           _id: "",
           token:""
         }
        ],
        createdAt: "2021-07-07T07:50:08.403Z",
        updatedAt: "2021-07-07T07:50:08.403Z",
        __v: 6,
    }
  }
}
```

### logout a user from current device

```javascript
// logout a user from current device
POST    "/api/auth/logout"
```

-   **Response**

```javascript
{
  data:{
    message: "you have successfully logged out from this device" ,
    body: {}
  }
}
```

### logout a user from all connected devices

```javascript
// logout a user from all connected devices
POST    "/api/auth/logout/all"
```

-   **Response**

```javascript
{
  data:{
    message: "you have successfully logged out from all devices" ,
    body: {}
  }
}
```
