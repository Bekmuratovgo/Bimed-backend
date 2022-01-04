<!--  -->

## FAQ API

```javascript
/******************************

  # [search/filter] [sort] params:
    - title
    - body

  # default pagination:
    - limit: 10
    - skip: 0

******************************/

// get matching faq/help sections or ALL
GET     "/api/faq"
// get a faq/help section by its id
GET     "/api/faq/:id"
```

### get matching faq/help sections or ALL

```javascript
// get matching faq/help sections or ALL
GET     "/api/faq"
```

-   **Request**

```javascript
// possible query params
{
  // about object properties
  title:"",
  body:"",
  // sorting
  sortBy:"_property_:asc|desc", // add one of the properties above
  // pagination
  limit: , // datatype::number < number of items per page >
  skip: , // datatype::number < page number >
}
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"", // success message
    body:[
      {
        _id:"",
        title:"",
        body:"",
        createdAt:"",
        updatedAt:"",
      },
      ...rest

    ]
  }
}
```

### get a faq/help section by its id

```javascript
// get a faq/help section by its id
GET     "/api/faq/:id"
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"", // success message
    body:{
      _id:"",
      title:"",
      body:"",
      createdAt:"",
      updatedAt:"",
    }
  }
}
```
