let express = require("express");
let path = require("path");

let PORT = 3000;

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
app.get("/notes",(req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
  });


//start the server
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });