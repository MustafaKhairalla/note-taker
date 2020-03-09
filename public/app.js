let express = require("express");
let path = require("path");
var fs = require("fs");
let id = require("uuidv1");



let PORT = process.env.PORT || 3000;

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
//app.use("/api", apiRoutes);
//app.use("/", htmlRoutes);

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
app.get("/notes",(req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
  });


app.post("/api/notes" , function(req , res){
    let newNote = req.body;

    let newRead = fs.readFile("./db/db.json");

    let newFile = JSON.parse(newRead);
    let ID = newFile[newFile.length - 1].id;
    req.body.id = ID + 1 || 1;

    newFile.parse(req.body);
    // let newNote = {
    //     title: req.body.title,
    //     text: req.body.text,
    //     id: id()
    // };

    //newFile.push(newNote);
    console.log(newFile);

    //console.log("post function " + req.body);
    fs.WriteFile("../db/db.json", JSON.stringify(newFile), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
        res.json(req.body);
    });
});

// app.get("/api/notes", (req , res) =>{
//     let file = fs.readFile("../db/db.json", (err, data) => {
//         if (err) throw err;
//         let Note = JSON.parse(data);
//         console.log(Note);
//     } );

//     res.json(JSON.parse(file));
// })

app.get("/api/notes", (req,res) => {
    let file =  fs.readFile("./db/db.json","utf8", (err, data)=>{
        if (err) throw err;
        let read= JSON.parse(data)
        console.log(read);
    });
    
    res.json(JSON.parse(file));
});

app.delete("/api/notes/:id" , (req , res) =>{

})


//start the server
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });