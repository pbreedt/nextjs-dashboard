// necessary ro convert from vercel to local db
// see: https://medium.com/@dekadekadeka/next-js-tutorial-with-local-database-quick-start-guide-394d48a0aada
const { Pool } = require('pg');
// require ('dotenv').config();

const connPool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// console.log(connectionPool);

// module.exports = connectionPool;
export default connPool;