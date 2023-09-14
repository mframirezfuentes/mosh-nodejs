const db = require("mongoose");


db.Promise = global.Promise;

async function connect() {
  await db.connect('mongodb+srv://mframirezfuentes:C5EVGzPcYJ40cfAq@cluster0.y0lcmo9.mongodb.net/', {
    useNewUrlParser: true,
  });
  console.log("[db] Connected");
}

module.exports = connect;