exports.up = function (knex, Promise) {
    let createQuery = `CREATE TABLE asdf(
    id SERIAL PRIMARY KEY NOT NULL,
    username TEXT,
    token TEXT,
    password_digest TEXT,
    created_at TIMESTAMP
  )`;
    return knex.raw(createQuery);
};

exports.down = function (knex, Promise) {
    let dropQuery = `DROP TABLE asdf`;
    return knex.raw(dropQuery);
};