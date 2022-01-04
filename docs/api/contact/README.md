<!--  -->

## Contact API

```javascript
/******************************

  # [search/filter] [sort] params:
    - field
    - data

  # default pagination:
    - limit: 10
    - skip: 0

******************************/

// get matching contacts or ALL
GET     "/api/contact"
// get a contact by its id
GET     "/api/contact/:id"
```

### get matching contacts or ALL

```javascript
// get matching contacts or ALL
GET     "/api/contact"
```

-   **Request**

```javascript
// possible query params
{
  // contact object properties
  field:"",
  data:"",
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
        field:"",
        data:"",
        createdAt:"",
        updatedAt:"",
      },
      ...rest

    ]
  }
}
```

### get a contact by its id

```javascript
// get a contact by its id
GET     "/api/contact/:id"
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"", // success message
    body:{
      _id:"",
      field:"",
      data:"",
      createdAt:"",
      updatedAt:"",
    }
  }
}
```
