import express from "express";
const app = express();
const port = 5000;
import createListing from "./service/createListing";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

createListing({
  name: "Lovely Loft",
  summary: "A charming loft in Paris",
  bedrooms: 1,
  bathrooms: 1,
});
