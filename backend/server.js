// Import required modules
const express = require("express");
const { Pool } = require("pg");
const cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Initialize the Express app
const app = express();
const port = 3001;

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// PostgreSQL connection configuration
const pool = new Pool({
    user: "postgres", // Replace with your PostgreSQL username
    host: "localhost",     // Replace with your PostgreSQL host
    database: "postgres", // Replace with your PostgreSQL database name
    password: "admin", // Replace with your PostgreSQL password
    port: 5432,             // Default PostgreSQL port
});

pool.connect()

// API endpoint to fetch data from the database
app.get("/api/data/patients/", async (req, res) => {
    try {
        // Query the database
        const result = await pool.query("SELECT * FROM patients"); // Replace with your table name

        // Return the data as JSON
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// create new patient
app.post("/api/data/patient", async (req, res) => {
    try {
        const {name, dob, condition } = req.body;

        // Query the database
        const result = await pool.query(`INSERT INTO patients (name, dob, condition) values ('${name}', '${dob}', '${condition}')`); // Replace with your table name
        console.log(result.rows);
        // Return the data as JSON
        res.status(200).json({message: 'DONE'});
    } catch (error) {
        console.error("Error creating data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//fetch patient by id
app.get("/api/data/patient/:id", async (req, res) => {
    try {
        // Query the database
        const result = await pool.query(`SELECT * FROM patients WHERE id=${req.params.id} limit 1`); // Replace with your table name

        // Return the data as JSON
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//update patient
app.put("/api/data/patient/:id", async (req, res) => {
    try {
        const {name, dob, condition,id } = req.body;
        // Query the database
        const result = await pool.query(`UPDATE patients
         set name = '${name}',
         dob = '${dob}',
         condition = '${condition}' WHERE id=${req.params.id}`);
        res.status(200).json({id, name, dob, condition});
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.delete("/api/data/patient/:id", async (req, res) => {
    try {
        // Query the database
        const result = await pool.query(`DELETE FROM patients WHERE id=${req.params.id}`);
        res.status(200).json({message: 'DONE'});
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get("/", (req, res) => {
    res.json([
        {
        id: 1,
        name: 'check',
        dob: '01.01.1970',
        condition: 'good'
    },{
            id: 2,
            name: 'aaa',
            dob: '01.01.1970',
            condition: 'good'
        },{
            id: 3,
            name: 'bbbb',
            dob: '01.01.1970',
            condition: 'mid'
        },{
            id: 4,
            name: 'ccc',
            dob: '01.01.1970',
            condition: 'bad'
        },

    ])
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
    console.log("Shutting down server...");
    pool.end(() => {
        console.log("Database pool has ended.");
        process.exit(0);
    });
});