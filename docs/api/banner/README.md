<!--  -->

## Banner API

```javascript
/******************************

  # [search/filter] [sort] params:
    - name
    - description
    - clicks

  # default pagination:
    - limit: 3
    - skip: 0

******************************/

// get matching banners or ALL
GET     "/api/banner"
// get a banner by its id
GET     "/api/banner/:id"
```

### get matching banners or ALL

```javascript
// get matching banners or ALL
GET     "/api/banner"
```

-   **Request**

```javascript
// possible query params
{
  // banner object properties
  name:"",
  clicks:"",
  description:"",
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
        name:"",
        clicks: , // datatype::number
        description:"",
        banner:{},
        details:{},
        createdAt:"",
        updatedAt:"",
      },
      ...rest

    ]
  }
}
```

### get a banner by its id

```javascript
// get a banner by its id
GET     "/api/banner/:id"
```

-   **Response**

```javascript
// response object
{
  data:{
    message:"", // success message
    body:{
      _id:"",
      name:"",
      clicks: , // datatype::number
      description:"",
      banner:{},
      details:{},
      createdAt:"",
      updatedAt:"",
    }
  }
}
```
