// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
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

// if no error on idel client, pool connects to database
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

// insert a record into our table
pool.query(
  `INSERT INTO UserEzinne2021 
                 (ID, NAME, EMAIL,BUSINESS_NAME , PASSWORD, PHONE, DATE_OF_BIRTH, ACCOUNT_PROVIDER, ACCOUNT_NUMBER, ACCOUNT_NAME, 
                 BUSINESS_DESCRIPTION, STAFF_SIZE, INDUSTRY,CATEGORY, LEGAL_BUSINESS_NAME, REGISTERATION_TYPE,BUSINESS_NAME_NUMBER,CERTIFICATE_OF_BUSINESS_REGISTRATION)
                 VALUES 
                 ('1', 'MARK', 'mark@gmail.com', 'MARKZZ' , 'Activated', '09099449933', 
                 '01-01-2020','ACCESS','0099887766','MARKg', 'FASHION','5','UTILITIESs',
                 'UTILITIES','FASHION', 'BUSINESS','BN12345','https://images.app.goo.gl/yi9VxyMezct1dfBd6'),
                 
                 ('2', 'MARKJ', 'mark@gmail.com', 'MARKZZ' , 'Activated', '09099449933', 
                 '01-01-2020','ACCESS','0099887766','MARKg', 'FASHION','5','UTILITIESs',
                 'UTILITIES','FASHION', 'BUSINESS','BN12345','https://images.app.goo.gl/yi9VxyMezct1dfBd6')
                 `,
  (err, res) => {
    if (err) {
      console.log('Error or issue with table creation');
    } else {
      console.log('Inserted data into table successfully')
      console.log(res);
    }
  }
);

pool.end();


// export connection
module.exports = pool;