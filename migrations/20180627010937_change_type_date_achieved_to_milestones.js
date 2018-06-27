
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('milestones', table => {
    table.date('date_achieved').alter();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('milestones', table => {
    table.dropColumn('date_achieved');
  })
};
