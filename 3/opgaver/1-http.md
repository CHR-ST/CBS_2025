# HTTP metoder

Endpoints i Cookie App:

1. GET /

2. GET /image

3. GET /user

4. GET /user/:username

5. POST /user/create

6. PUT /user/update/:username

7. DELETE /user/delete/:username

## Cookie App

Hent projektet fra Canvas eller GitHub og installer dependencies.

```
npm install
```

Og start appen lokalt.

```
npm start
```

Lav HTTP kald til de fem endpoints med en webbrowser eller Postman.

Inspicer headers og console.log() både på klient og server.

## HTTP request logging middleware på server

```javascript
app.use((req, res, next) => {
    console.log("----- HTTP Request -----");
    console.log("method: ", req.method); // HTTP metode
    console.log("url:", req.originalUrl); // URL
    console.log("headers:", req.headers); // headers
    console.log("ip:", req.ip); // IP adresse
    console.log("body:", req.body); // body
    console.log("------------------------");
    next();
});
```

## 1. GET /

Returnerer Content-Type som text/html.

## 2. GET /image

Returnerer Content-Type som image/jpeg.

## 3. GET /user

Returnerer JSON data i body.

## 4. GET /user/:username

Bruger request parameter for HTTP og returnerer JSON data i body.

## 5. POST /user/create

Husk Content-Type: application/json som header og raw data { "key": "value" },

## 6. PUT /user/update/:username

Husk Content-Type: application/json som header og raw data { "key": "value" },

## 7. DELETE /user/delete/:username

Bruger request parameter for HTTP og returnerer JSON data i body.

# Postman

[Link til API dokumentation](https://documenter.getpostman.com/view/28835286/2sB3HqHyZR)