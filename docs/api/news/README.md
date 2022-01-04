<!--  -->

## News API

```javascript
/******************************

  # [search/filter] [sort] params:
    - title
    - body
    - date

  # default pagination:
    - limit: 8
    - skip: 0

******************************/

// get matching news or ALL
GET     "/api/news"
// get a news item by its id
GET     "/api/news/:id"
```

### get matching news or ALL

```javascript
// get matching news or ALL
GET     "/api/news"
```

-   **Request**

```javascript
// possible query params
{
  // news object properties
  title:"",
  body:"",
  image:{},
  date: ,
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
        image:{},
        date: ,
        createdAt:"",
        updatedAt:"",
      },
      ...rest

    ]
  }
}
```

### get a news item by its id

```javascript
// get a news item by its id
GET     "/api/news/:id"
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
      image:{},
      date: ,
      createdAt:"",
      updatedAt:"",
    }
  }
}
```
