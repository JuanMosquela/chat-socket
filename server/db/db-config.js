const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 4000,
      user : 'Juanma',
      password : 'mosquella96',
      database : 'test'
    }
  });