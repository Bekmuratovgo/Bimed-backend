<!--  -->

## About API

```javascript
/******************************

  # [search/filter] [sort] params:
    - title
    - body

  # default pagination:
    - limit: 1
    - skip: 0

******************************/

// get matching about sections or ALL
GET     "/api/about"
// get an about section by its id
GET     "/api/about/:id"
```

### get matching about sections or ALL

```javascript
// get matching about sections or ALL
GET     "/api/about"
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
        gallery:[
          {}, // photos info
          ...rest
        ],
        createdAt:"",
        updatedAt:"",
      },
      ...rest

    ]
  }
}
```

### get an about section by its id

```javascript
// get an about section by its id
GET     "/api/about/:id"
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
      gallery:[
        {}, // photos info
        ...rest
      ],
      createdAt:"",
      updatedAt:"",
    }
  }
}
```
