# Middleware for response-time

Dette modul opretter et middleware, der registrerer svartiden for forespørgsler over HTTP. Svartiden er defineret som den tid, der går fra en forespørgsel rammer dette middleware, til headerne bliver sendt til klienten.

Prøv at implementer denne middleware for en Express app og kig i HTTP headers efter X-Response-Time.

```javascript
var express = require('express')
var responseTime = require('response-time')

var app = express()

app.use(responseTime())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

[Link til npm pakke](https://www.npmjs.com/package/response-time)

På klient-side kan vi console.log(response) vores svar fra serveren for at se HTTP headers.

```javascript
const response = await fetch('/mail', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ sendTo, sendSubject, sendText })
});
const data = await response.json();
console.log(response)
```