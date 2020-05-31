const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
  app.use(express.static(__dirname + "/public"))
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
// 

let PORT = 8080;
let dbJson = path.join(__dirname, "/db/db.json"); 

//-----------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
  res.sendFile(dbJson)
});

app.post("/api/notes", (req, res) => {
  fs.readFile(dbJson, (error, data) => {
    console.log(req.body)
    console.log(JSON.parse(data))
    let userNote = req.body;
    let storedNotes = JSON.parse(data);

    userNote.id = storedNotes.length;
    console.log(userNote)

    storedNotes.push(userNote);

    let notesJson = JSON.stringify(storedNotes)

    fs.writeFile(dbJson, notesJson, () => {
    });
  });
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile(dbJson, (error, data) => {
    let storedNotes = data;
    let cutNote = storedNotes.slice(id, 1);

    fs.writeFile(dbJson, cutNote, () => {});
  });

  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});