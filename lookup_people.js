const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function getArgument() {
  return process.argv[2];
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  var queryParam = getArgument();
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [queryParam], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows); //output: 1
    client.end();
  });
});

function printResult (arr) {
  for (let nameElement of arr) {
    console.log(nameElement);
  }
}