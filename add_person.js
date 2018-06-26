const settings = require("./settings"); // settings.json

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

const param1 = process.argv[2];
const param2 = process.argv[3];
const param3 = process.argv[4];

knex('famous_people')
  .insert([{first_name: param1, last_name: param2, birthdate: param3}])
  .select('*')
  .catch(function(error) {
    console.error(error)
  })
  .finally(() => {
    console.log("Query is completed!");
    knex.destroy();
  });
