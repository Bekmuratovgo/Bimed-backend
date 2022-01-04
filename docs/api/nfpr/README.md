<!--  -->

## NFPR -> Not Found Product Request API

```javascript
// create a Not Found Product Request
POST    "/api/nfpr"
```

### create a Not Found Product Request

```javascript
// create a Not Found Product Request
POST    "/api/nfpr"
```

-   **Request**

```javascript
// request body
{
  name: "", // the name of the customer
  phone: "", // the phone number of the customer
  product: "" // the name of the missing/not-found product
}
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"", // success message
    body:{
      _id:"",
      name: "", // the name of the customer
      phone: "", // the phone number of the customer
      product: "", // the name of the missing/not-found product
      status:"not-found",
      createdAt:"",
      updatedAt:"",
      ...rest
    },
  }
}
```
