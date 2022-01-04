<!--  -->

## Pharmacy API

```javascript
/******************************

  # [search/filter] [sort] params:
    - name
    - address

  # default pagination:
    - limit: 8
    - skip: 0

******************************/

// get matching pharmacies or ALL
GET     "/api/pharmacy"
// get a pharmacy  by its id
GET     "/api/pharmacy/:id"
```

### get matching pharmacies or ALL

```javascript
// get matching pharmacies or ALL
GET     "/api/pharmacy"
```

-   **Request**

```javascript
// possible query params
{
  // pharmacy object properties
  name:"",
  address:"",
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
        address:"",
        contact:[],
        schedule: {from:"", to:""},
        coordinates: {longitude:"", latitude:""},
        image:{},
        createdAt:"",
        updatedAt:"",
      },
      ...rest

    ]
  }
}
```

### get a pharmacy by its id

```javascript
// get a pharmacy by its id
GET     "/api/pharmacy/:id"
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
      address:"",
      contact:[],
      schedule: {from:"", to:""},
      coordinates: {longitude:"", latitude:""},
      image:{},
      createdAt:"",
      updatedAt:"",
    }
  }
}
```
