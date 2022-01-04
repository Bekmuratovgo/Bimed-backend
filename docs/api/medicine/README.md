<!--  -->

## Medicine API

```javascript
/******************************

  # [search/filter] [sort] params:
    - name
    - category
    - subCategory
    - country
    - brand
    - company
    - composition
    - description
    - instructions

  # default pagination:
    - limit: 15
    - skip: 0

******************************/

// get matching medicine items or ALL
GET     "/api/medicine"
// get medicine by its id
GET     "/api/medicine/:id"

// get matching on sales medicine or ALL
GET     "/api/medicine/onSales"
// get an on sales medicine by its id
GET     "/api/medicine/onSales/:id"

// get matching top selling medicines or ALL
GET     "/api/medicine/topSelling"
// get a top selling medicine by its id
GET     "/api/medicine/topSelling/:id"
```

### get matching medicine items or ALL

```javascript
// get matching medicine items or ALL
GET     "/api/medicine"
```

-   **Request**

```javascript
// possible query params
{
  // medicine object properties
  name:"",
  category:"",
  subcategory:"",
  country:"",
  brand:"",
  company:"",
  composition:"",
  description:"",
  instructions:"",
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
        category:"",
        subcategory:"",
        country:"",
        brand:"",
        company:"",
        gallery:[ // this maybe updated in the future
          url:"",
          caption:""
        ],
        price: {
          commercial: ,
          noncommercial:
        },
        sales: {
          commercial: {
            status: ,
            original: ,
            current:
          },
          noncommercial: {
            status: ,
            original: ,
            current:
          }

        },
        composition:"",
        description:"",
        instructions:"",
        createdAt:"",
        updatedAt:"",
      },
      ...rest

    ]
  }
}
```

### get medicine by its id

```javascript
// get medicine by its id
GET     "/api/medicine/:id"
```

-   _get_ medicine image

```html
<img src="{baseUrl}/api/medicine/{medicineId}/image/{filename}"  />
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
      category:"",
      subcategory:"",
      country:"",
      brand:"",
      company:"",
      gallery:[ // this maybe updated in the future
        url:"",
        caption:""
      ],
      price: {
        commercial: ,
        noncommercial:
      },
      sales: {
        commercial: {
          status: ,
          original: ,
          current:
        },
        noncommercial: {
          status: ,
          original: ,
          current:
        }

      },
      composition:"",
      description:"",
      instructions:"",
      createdAt:"",
      updatedAt:"",
    }
  }
}
```

### get matching on sales medicine or ALL

```javascript
// get matching on sales medicine or ALL
GET     "/api/medicine/onSales"
```

### get an on sales medicine by its id

```javascript
// get an on sales medicine by its id
GET     "/api/medicine/onSales/:id"
```

### get matching top selling medicines or ALL

```javascript
// get matching top selling medicines or ALL
GET     "/api/medicine/topSelling"
```

### get a top selling medicine by its id

```javascript
// get a top selling medicine by its id
GET     "/api/medicine/topSelling/:id"
```
