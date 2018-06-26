
const settings = require("./settings"); // settings.json
const moment = require("moment");

const knex = require('knex') ({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
})


function getArgument() {
  return process.argv[2];
}

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

knex
  .select('first_name', 'last_name', 'birthdate')
  .from('famous_people')
  .where('first_name', getArgument())
  .then(result => {
    printResult(result);
  })
  .catch(function(error) {
    console.error(error)
  })
  .finally(() => {
    console.log("Query is completed!");
    knex.destroy();
  })

