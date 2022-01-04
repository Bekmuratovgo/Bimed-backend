<!--  -->

## Call Order API

```javascript
// create a call order
POST    "/api/callOrder"
```

### create a call order

```javascript
// create a call order
POST    "/api/callOrder"
```

-   **Request**

```javascript
// request body
{
  name:"",
  phone:""
}
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"success",
    body:{
      _id:"",
      name:"",
      phone:"",
      createdAt:"",
      updatedAt:"",
      ...rest
    },
  }
}
```
