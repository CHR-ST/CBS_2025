const http = require("http");

const ping = (targetHost) => {
  const startTime = Date.now();
  console.log("Sent ping");
  const req = http.get(targetHost, (res) => {
    res.on("data", (chunk) => {
      console.log("Received", chunk.toString());
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.log("GET request to", targetHost, "took", responseTime, "ms");   
      console.log("Response cookie header:", res.headers["set-cookie"]);
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error.message);
  });
};

// Kald funktionen ping() med parameter
ping("http://localhost:8000/ping");
