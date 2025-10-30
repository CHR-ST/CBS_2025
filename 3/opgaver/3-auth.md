# Auth

Endpoints:

1. POST /auth/login

2. POST /auth/logout

3. GET /auth/protected

## 1. POST /auth/login

Server sætter en Cookie værdi når en bruger er logget ind.

## 2. POST /auth/logout

Server sletter en Cookie værdi når en bruger logger ud.

## 3. GET /auth/protected

Endpoint kan kun tilgås med en slags Cookie værdi for login som server checker for.