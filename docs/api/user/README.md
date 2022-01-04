<!--  -->

## User API

```javascript
// create a user <client>
POST    "/api/user"
// get a user account by its id
GET     "/api/user/:id"
// update a user account by its id
PATCH   "/api/user/:id"
// delete a user account by its id
DELETE  "/api/user/:id"
```

### create a user <client>

```javascript
// create a user <client>
POST    "/api/user"
```

-   **Request**

```javascript
{
  firstname: "",
  lastname: "",
  phone: "",
  date_of_birth: ""
}
```

-   **Response**

```javascript
{
  data:{
    message: "", // success message
    body: {
        bonus: 0,
        account_type: "",
        frozen: false,
        _id: "",
        favoite_medicines: [],
        profile_photo: {},
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

### update a user account by its id

```javascript
// update a user account by its id
PATCH   "/api/user/:id"
```

-   _get_ profile photo

```html
<img src="{baseUrl}/api/user/{userId}/profile/photo/{filename}"  />
```

for the request to succeed, it must have the `x-auth-token` header with the `jwt`

-   _update_ profile photo

For security reasons: the upload limit is **2**_MB_ !!!
Request an update on that value if needed

```javascript
// use FormData
// use multi-part/form content-type header

let fd = new FormData();
fd.append("profile_photo", {})  // the profile photo file
// append other properties to update

// use the 'fd' object as the request body
{
  body: fd
}
```

-   _delete_ profile photo

```javascript
await axios.delete("/api/user/{userId}/profile/photo/{filename}")
```

for the request to succeed, it must have the `x-auth-token` header with the `jwt`

-   steps to _update_ user's _phone number_

    1.  send _otp_ to the **OLD** phone number

    ```javascript
      const types = [ "LOGIN", "UPDATE_PHONE", "CREATE_USER"]
      const response = axios.post("/api/otp/sendSmsOtp", {
        phone: "996#########", // type the old phone number
        sms_otp_type: "UPDATE_PHONE"
      });

      /*********************************************
        the response will contain the following:
        "sms_otp_id": "612e##################"
        you MUST keep the returned sms_otp_id and mark it as OLD_ID because it will be used in subsequent steps
      ***********************************************/

      const { sms_otp_id } = response.data;
    ```

    2.  confirm the old phone otp code

    ```javascript
      const response = axios.post("/api/otp/confirmSmsOtp", {
        phone: "996#########", // type the old phone number
        sms_otp: "823###" // type the sms otp code for the old phone number
      });
    ```

    3.  send _otp_ to the **NEW** phone number

    ```javascript
      const types = [ "LOGIN", "UPDATE_PHONE", "CREATE_USER"]
      const response = axios.post("/api/otp/sendSmsOtp", {
        phone: "996#########", // type the new phone number
        sms_otp_type: "UPDATE_PHONE"
      });

      /*********************************************
        the response will also contain the following:
        "sms_otp_id": "612e##################"
        you MUST keep the returned sms_otp_id and mark it as NEW_ID because it will be used in subsequent steps
      ***********************************************/
      const { sms_otp_id } = response.data;
    ```

    4.  confirm the old phone otp code

    ```javascript
      const response = axios.post("/api/otp/confirmSmsOtp", {
        phone: "996#########", // type the new phone number
        sms_otp: "823###" // type the sms otp code for the new phone number
      });
    ```

    5.  send the request with new phone and other data to be updated to user api

    ```javascript
      const response = axios.patch("/api/user/:user_id", {
        phone: "996#########", // type the new phone number
        sms_otp: "823###" // type the sms otp code for the new phone number
        sms_otp_old_id:"2if#############", // the id of the old phone otp
        sms_otp_new_id:"e2389###########" // id of the new phone otp,
        lastname:" new lastname"
        // any other data to update
      });
    ```


-   **Response**

```javascript
{
  data:{
    message: "" , // success message
    body: {
        bonus: 0,
        favorite_medicines: [],
        account_type: "",
        frozen: false,
        _id: "",
        profile_photo: {},
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

### get a user account by its id

```javascript
// update a user account by its id
PATCH   "/api/user/:id"
```

-   **Response**

```javascript
{
  data:{
    message: "" , // success message
    body: {
        bonus: 0,
        account_type: "",
        frozen: false,
        _id: "",
        favoite_medicines: [],
        profile_photo: {},
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

### delete a user account by its id

```javascript
// delete a user account by its id
DELETE  "/api/user/:id"
```

-   **Response**

```javascript
{
  data:{
    message: "" , // success message
    body: {
        bonus: 0,
        account_type: "",
        frozen: false,
        _id: "",
        favoite_medicines: [],
        profile_photo: {},
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
