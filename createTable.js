// we use pg library to request connection pool from postgres database
const { Pool } = require('pg')

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
})

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// if no error on idle client, pool connects to database
pool.connect((err, client, done) => {
  //if there is an error with our database connection strings
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  //if no error then we have successfully connected 
  console.log('Connected to database');
  // do not call done(); - because we want to use this connection 
  // to create/insert/delete or select records from our database
  // sometime we might also want to export this connection for other resources
});

// now lets create a new table called TeamManifest2021 - replace Manifest with your name
pool.query(
  `CREATE TABLE UserEzinne2021(
    ID SERIAL PRIMARY KEY, 
    NAME VARCHAR(40) NOT NULL, 
    EMAIL TEXT NOT NULL,
    BUSINESS_NAME TEXT NOT NULL, 
    PASSWORD TEXT NOT NULL, 
    PHONE VARCHAR(40) NOT NULL, 
    DATE_OF_BIRTH DATE NOT NULL,
    ACCOUNT_PROVIDER VARCHAR(40) NOT NULL,
    ACCOUNT_NUMBER CHAR(10) NOT NULL,
    ACCOUNT_NAME VARCHAR(40) NOT NULL,
    BUSINESS_DESCRIPTION TEXT,
    STAFF_SIZE INTEGER,
    INDUSTRY TEXT,
    CATEGORY TEXT,
    LEGAL_BUSINESS_NAME TEXT,
    REGISTERATION_TYPE TEXT,
    BUSINESS_NAME_NUMBER VARCHAR(20),
    CERTIFICATE_OF_BUSINESS_REGISTRATION VARCHAR(100)
    ) 
    `,
  (err, res) => {
    if (err) {
      console.log('Error or issue with table creation');
    } else {
      console.log('Team Table Created Successfully')
      console.log(res);
    }
  }
);

pool.end();

// export connection
module.exports = pool;
