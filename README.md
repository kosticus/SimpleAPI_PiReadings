Readings
========
### Database Configuration
###### A. Creating a New Database
    1. Install/Verify PostgreSQL
          Navigate to root directory
          In terminal, run `postgres` -> if nothing happens then postgres is not installed
          > Run `brew install postgres` to install PostgreSQL
      2. Initialize Database System
          Navigate to root directory
          In terminal run, `initdb db/` -> a folder of 'db/' should be in the directory
          In .gitignore file, add description (ie ## ignore db files) and add `db/`
###### B. Starting The Database
    1. Connecting Postgres and the Database
        In terminal, run `postgres -D db/`
    2. Creating a Table
        In new terminal window, run `createdb development` -> creates a database named `development`
###### C. Install/Verify Knex.js
    1. Navigate to root directory
    2. In new terminal window, run `knex` -> if nothing happens then Knex.js is not installed
    3. Run `npm install -g knex` to install Knex.js globally
###### D. Check Database
    1. In terminal, run `psql development` to open command-line database explorer
    2. Run `\d` to look at tables
    > `no relations exist` should be shown (schema is created by starting server)
    3. Can run PostgreSQL commands here (with semicolons)
    
### App Configuration
###### A. Install Dependencies
    1. Navigate to root directory
    2. In terminal, run `npm install` to install dependencies from `package.json`
###### B. Start Server
    1. In terminal, run `npm run start`
    
###### Endpoints
    1. `/count`
        GET request is made to bring count of records from database
        > An object {count: currentCount} is sent back and logged to console
    2. `/`
        Expects endpoint in the following form: `/?serial=:serial&reading=:reading`
        GET request is made to insert serial and reading numbers into database
          (GET request can be made by parsing query parameters from url request)
        > A success string is sent back and logged to console


###### Notes
    1. Front-end is included for API testing purposes
    2. Only basic validation has been included
    3. Knex.js is used to interact with PostgreSQL
    4. Conforms to Airbnb Style Guide