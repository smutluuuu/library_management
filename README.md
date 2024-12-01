
# Library Management System

## Project Setup Instructions

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
Clone the repository to your local machine using the following command:
```bash
git clone <repository-url>
```

### 2. Navigate to the Project Directory
Change to the directory of the cloned repository:
```bash
cd library-management
```

### 3. Install Dependencies
Install all necessary dependencies for the project:
```bash
npm install
```

### 4. Database Setup

1. Ensure that PostgreSQL is installed and running on your local machine.
2. Create a PostgreSQL database named `library_management`:
   ```sql
   CREATE DATABASE library_management;
   ```

3. Run the provided `database_schema.sql` script to set up the necessary tables:
   ```bash
   psql -U postgres -d library_management -f database_schema.sql
   ```

4. Create a `.env` file in the root directory and define the database connection string:
   ```
   DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database-name>
   ```
   Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database-name>` with your database credentials. For example:
   ```
   DATABASE_URL=postgres://postgres:password@localhost:5432/library_management
   ```

### 5. Start the Application
Run the following command to start the server:
```bash
npm run dev
```
