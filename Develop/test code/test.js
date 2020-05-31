const fs = require("fs");
const db = require("./db.json")
const json = [{"title":"Test Title","text":"Test text"}]
const jsonStr = '[{"title":"Test Title","text":"Test text"}]'

db.push(json);

// fs.writeFile("db.json", jsonStr, (error) => {
//   if (error) {
//     console.log("error")
//   } else console.log("not error")
// });
console.log("thing was pished")
