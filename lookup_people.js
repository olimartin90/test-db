const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require("moment");

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
    printResult(result.rows); //output: 1
    client.end();
  });
});

function printResult (arr) {
  let arrLength = arr.length;
  console.log(`Searching...\n Found ${arrLength} person(s) by the name ${process.argv[2]}:`);
  let count = 0;
  for (let people of arr) {
    count += 1;
    let bd = moment(people.birthdate).format('YYYY-MM-DD');
    console.log(`- ${count}: ${people.first_name} ${people.last_name}, born ${bd}`);
  }
};

