# Cookies

Endpoints:

1. GET /cookie/set

2. GET /cookie/get

3. GET /middleware

4. GET /cookie/set-session

5. GET /cookie/get-session

## 1. GET /cookie/set

Åben Developer Tools i Chrome og inspicer Cookies under Storage under Application.

Se HTTP logging i console.log() på server at der er en cookie værdi i headers.

## 2. GET /cookie/get

Se Cookie værdien i alert() på klient.

## 3. GET /middleware

Checker om der er en Cookie.

## 4. GET /cookie/set-session

Bruger express-session med en secret key på server til at holde styr på cookies for sessions.

## 5. GET /cookie/get-session

Sender Cookie værdien til klient.