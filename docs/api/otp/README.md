<!--  -->

## OTP API

```javascript
// send one time password (otp) via sms to phone
POST    "/api/otp/sendSmsOtp"
// confirm one time password (otp) sent via sms to phone
POST    "/api/otp/confirmSmsOtp"
```

### send one time password (otp) via sms to phone

```javascript
// send one time password (otp) via sms to phone
POST    "/api/otp/sendSmsOtp"
```

-   **Request**

```javascript
// request body
{
  phone:"",
  sms_otp_type:"",
}
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"", // success message
    body:{
      phone:"",
      sms_otp_id:"",
      sms_otp_type:"",
      sms_otp_expiration:/timestamp/
    }
  }
}
```

### confirm one time password (otp) sent via sms to phone

```javascript
// confirm one time password (otp) sent via sms to phone
POST    "/api/otp/confirmSmsOtp"
```

-   **Request**

```javascript
// request body
{
  phone:"",
  sms_otp:"",
}
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"", // success message
    body:{}
  }
}
```
