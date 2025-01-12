This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

1. Install and start PostgreSQL in your local machine with default values
- **user**: postgres 
- **password**: admin
- **host**: localhost   
- **port**: 5432
- **database**: postgres

2. Connect to in `postgres` database and create table `patients`  with the following query
```
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    dob VARCHAR(10), //date of birth, should be DATE but for the simplicity of this assignment, I use VARCHAR
    condition TEXT
);
```

**Optional**: These queries can be used to add initial data to the table

```
INSERT INTO patients (name, dob, condition)
VALUES ('John Doe', '01.01.1970', 'good');

INSERT INTO patients (name, dob, condition)
VALUES ('Jane Doe', '02.01.1970', 'mid');

INSERT INTO patients (name, dob, condition)
VALUES ('Han Solo', '03.02.1971', 'bad');
```

2. Open terminal in `backend` directory, install and start the service
```bash
npm install
node server.js
```
Backend is served at `http://localhost:3001/`

3. Open terminal in `frontend` directory, install and start the service
```bash
npm install
npm run dev 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Objective:
Develop a simple web application for managing patient records in a healthcare organization.
The application should allow users to view, add, edit, and delete patient records.
A patient record should include the patient's name, date of birth, medical condition in a free text form, and the date of the next appointment.
The application should also include a search functionality to filter patient records by name or other fields.
- Requirements:
  - Use React and TypeScript to build the application frontend. If needed, you can use frameworks or components of your choice for a simple backend implementation.
  - Create a responsive and visually appealing user interface using HTML and CSS with a framework of your choice.
  - Use an SQL database to store patient information.
  - Consider accessibility best practices, ensuring also the application is user-friendly and intuitive.
  - Write some automated tests for key components and functionalities using a testing framework. No 100% coverage is expected, just a few examples is enough.

## REQUIREMENT ANALYSIS
- Allow users to view, add, edit, and delete patient records
  - different views and functionalities
    - use routes / NextJS
- A patient record should include the patient's name, date of birth, medical condition in a free text form, and the date of the next appointment.
  - Data object can be translated to form value
- search functionality to filter patient records by name or other fields
  - filter from either frontend or backend, depends on the size of database and use case.
    - For now: filter on the Frontend
- Backend: Node
  - => APIs for GET, POST, PUT, DELETE
- Database: PostgreSQL
- Testing: jest
- Responsive UI
  - Tailwind CSS
 
## Testing in frontend
```bash
npm run test
```