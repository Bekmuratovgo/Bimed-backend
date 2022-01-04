<!--  -->

## UTCAR -> Update To Commercial Account Request API

```javascript
// create an Update To Commercial Account Request
POST    "/api/utcar"
```

### create an Update To Commercial Account Request

```javascript
// create an Update To Commercial Account Request
POST    "/api/utcar"
```

-   **Request**

For security reasons: the upload limit is **2**_MB_ !!!
Request an update on that value if needed

```javascript
// data on the request body
// use FormData
// use multi-part/form content-type header

let fd = new FormData();
fd.append("name", "") // the name of the customer
fd.append("phone", "")  // the phone number of the customer
fd.append("license", {})  // the license file

// use the 'fd' object as the request body
{
  body: fd
}
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"success",
    body:[
      {
        _id:"",
        name: "", // the name of the customer
        phone: "", // the phone number of the customer
        license: {}, // the object containing the license file' information
        createdAt:"",
        updatedAt:"",
      },
      ...rest

    ]
  }
}
```
