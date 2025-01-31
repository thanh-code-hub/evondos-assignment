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
        const result = await pool.query("SELECT * FROM patients");
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
        const {name, dob, condition, next_appointment } = req.body;
        // Query the database
        const result = await pool.query(`INSERT INTO patients (name, dob, condition, next_appointment) values ('${name}',  to_date('${dob}', 'YYYY-MM-DD'), '${condition}', to_date('${next_appointment}', 'YYYY-MM-DD'))`);
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
        const result = await pool.query(`SELECT * FROM patients WHERE id=${req.params.id} limit 1`);
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
        const {name, dob, condition,id, next_appointment } = req.body;
        console.log(req.body);
        // Query the database
        const result = await pool.query(`UPDATE patients
         set name = '${name}',
         dob = to_date('${dob}', 'YYYY-MM-DD'),
         condition = '${condition}',
         next_appointment = to_date('${next_appointment}', 'YYYY-MM-DD') WHERE id=${req.params.id}`);
        res.status(200).json({id, name, dob, condition, next_appointment});
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// delete patient
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
    res.send("Node backend is running smoothly ...")
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