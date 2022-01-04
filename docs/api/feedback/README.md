<!--  -->

## Feedback API

```javascript
// create a feedback
POST    "/api/feedback"
```

### create a feedback

```javascript
// create a feedback
POST    "/api/feedback"
```

-   **Request**

```javascript
// request body
{
  name:"",
  phone:"",
  email:"",
  title:"",
  body:""
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
      email:"",
      title:"",
      body:"",
      createdAt:"",
      updatedAt:"",
      ...rest
    },
  }
}
```
