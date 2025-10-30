var express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fsPromises = require("fs").promises;
var router = express.Router();

// Opsæt multer til at midlertidigt opbevare billedfiler inden de uploades til Cloudinary
// Link: https://www.npmjs.com/package/multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Konfigurer med dine Cloudinary nøgler
// Link: https://cloudinary.com/documentation/node_integration
// Link: https://www.npmjs.com/package/cloudinary
// Find nøgler her: https://console.cloudinary.com/console/
cloudinary.config({
  cloud_name: "dx6xxxxxx", // cloud_name
  api_key: "xxxxxxx", // api_key
  api_secret: "xxxxxxx", // api_secret
  secure: true,
});

// Route til at håndtere upload af billeder
router.post("/upload", upload.single("image"), async (req, res, next) => {
  try {
    // Tilgå image buffer
    const imageBuffer = req.file.buffer;
    const tmpFilePath = "./public/images/" + req.file.originalname;

    // Lav en midlertidig billedfil med image buffer
    await fsPromises.writeFile(tmpFilePath, imageBuffer);

    // Definere hvilken mappe på Cloudinary der skal uploades til
    const uploadOptions = {
      public_id: "cdn-example/" + req.file.originalname.split(".")[0],
      resource_type: "auto"
    };

    try {
      // Uploader billedfilen til Cloudinary i mappen
      const result = await cloudinary.uploader.upload(
        tmpFilePath,
        uploadOptions
      );

      // Sletter den midlertidige billedfil
      await fsPromises.unlink(tmpFilePath);
      console.log(result);

      // Returnerer URL for billedet på Cloudinary
      res
        .status(201)
        .json({ message: "Billede er lagt op!", uploadUrl: result.secure_url });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "File upload to Cloudinary failed." });
    }
  } catch (error) {
    console.error(`Error `, error.message);
    return res.status(500).json(error);
  }
});

// GET route til at hente uploads fra cloudinary i cdn-example mappen
router.get("/uploads", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "cdn-example/",
      max_results: 30,
    });
    res.status(200).json(result.resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch uploads from Cloudinary." });
  }
});

module.exports = router;
