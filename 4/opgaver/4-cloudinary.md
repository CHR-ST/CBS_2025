# Opgave 4 - CDN med Cloudinary

Åben mappen cdn-app i Terminalen og kør npm install og derefter npm start.

[Link til npm pakke](https://www.npmjs.com/package/cloudinary)

Åben localhost:3000 i en browser.

Upload en fil til Cloudinary gennem deres API.

[Link til Cloudinary dokumentation](https://cloudinary.com/documentation/node_integration)

Opret en bruger på Cloudinary og tilgå dine API nøgler via Dashboard og Product Environment.

[Link til at finde API nøgler](https://console.cloudinary.com/console/)

API nøgler skal indsættes i cloudinary.config()

```javascript
cloudinary.config({
  cloud_name: "dxas213123123", // cloud_name
  api_key: "xxxxx", // api_key
  api_secret: "xxxxx", // api_secret
  secure: true,
});
```

Kig efter cloudinary.xxx i /routes/cdn.js for at se API kald til Cloudinary.

```javascript
const result = await cloudinary.uploader.upload(
    tmpFilePath,
    uploadOptions
);
```

```javascript
const result = await cloudinary.api.resources({
    type: "upload",
    prefix: "cdn-example/",
    max_results: 30,
});
```

Bemærk multer og filesystem (fs) anvendes til at håndtere den midlertidige fil inden den uploades til Cloudinary.
