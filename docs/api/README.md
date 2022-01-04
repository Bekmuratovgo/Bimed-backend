# list of all APIs end endpoints

### A quick list

```javascript
/******************************
  quick APIs list
  allowed methods: GET POST DELETE PATCH
******************************/

POST "/api/otp/sendSmsOtp"

POST    "/api/auth"
POST    "/api/auth/login"
POST    "/api/auth/logout"
POST    "/api/auth/logout/all"

POST    "/api/user"
GET     "/api/user/:id"
PATCH   "/api/user/:id"
DELETE  "/api/user/:id"

POST    "/api/order"
GET     "/api/order/:id"

GET     "/api/medicine"
GET     "/api/medicine/:id"

GET     "/api/medicine/onSales"
GET     "/api/medicine/onSales/:id"

GET     "/api/medicine/topSelling"
GET     "/api/medicine/topSelling/:id"

GET     "/api/about"
GET     "/api/about/:id"

GET     "/api/faq"
GET     "/api/faq/:id"

GET     "/api/banner"
GET     "/api/banner/:id"


GET     "/api/news"
GET     "/api/news/:id"

GET     "/api/contact"
GET     "/api/contact/:id"

GET     "/api/pharmacy"
GET     "/api/pharmacy/:id"

POST    "/api/feedback"

POST    "/api/callOrder"

POST    "/api/utcar"

POST    "/api/nfpr"
```

### Filtering | Pagination | Sorting

```javascript
/******************************

  # to get matching items in a general GET request that does not have :id parameter you can customize the request using query params.

  # query/search/filter params
    - are different for each entity searched and will be noted under its respective api

  # pagination required params in the query
    - limit   [0 => number] number of results per page
    - skip    [0 => number] page number

  # sorting required params in the query
    - sortBy  [sort: asc | desc]

******************************/



'?limit={number}&skip={number}&sortBy={property}:desc'

// example: get the 3rd page and get 10 results only then sort them by their names in a descending order

let limit = 10
let skip = 20
let sortBy = "name:desc"

`${url}?limit=${limit}&skip=${skip}&sortBy=${sortBy}`
```

### General structure of the response object of a successful request

```javascript
// response object
  {
    data: {
      message: '', // Success message
      body:{} // data coming with the response,
      ...rest
    },
    ...rest
  }
```

### General structure of the response object of a failed request

```javascript
// response object
  {
    data: {
      error: '', // error message
      ...rest
    },
    ...rest
  }
```
