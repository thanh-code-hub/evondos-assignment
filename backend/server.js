// Import required modules
const express = require("express");
const { Pool } = require("pg");

// Initialize the Express app
const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());

// PostgreSQL connection configuration
const pool = new Pool({
    user: "your_username", // Replace with your PostgreSQL username
    host: "localhost",     // Replace with your PostgreSQL host
    database: "your_database", // Replace with your PostgreSQL database name
    password: "your_password", // Replace with your PostgreSQL password
    port: 5432,             // Default PostgreSQL port
});

// API endpoint to fetch data from the database
app.get("/api/data", async (req, res) => {
    try {
        // Query the database
        const result = await pool.query("SELECT * FROM your_table_name"); // Replace with your table name

        // Return the data as JSON
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/data/patient/:id", (req, res) => {
    res.json({
        id: 1,
        name: 'check',
        dob: '01.01.1970',
        condition: 'good'
    });
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