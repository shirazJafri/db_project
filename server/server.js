const Pool = require("pg").Pool;
require('dotenv').config()

/*const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.DATABASE,
    port: process.env.PORT
}*/

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}: ${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const proConfig = {
    connectionString: process.env.DATABASE_URL
}

const pool = new Pool({
    connectionString: process.env.NODE_ENV === "production" ? proConfig: devConfig
})

const express = require('express');
const router = require("express").Router();
const cors = require("cors")
const db = require('./db')
const morgan = require('morgan')
const app = express();
const port = process.env.PORT || 3001;
const path = require('path')


app.use(cors())
app.use(express.json())
app.use(express.static("client/build"))
app.use("", require("./routes/sms"));
app.use("", require("./routes/dashboard"));

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}.`);
});

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")))
}

console.log(__dirname)

//get all the subjects
app.get("/getSubjects", async (req, res) => {
    try {
        const results = await db.query("select * from get_subjects();");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                subjects: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//get all students
app.get("/getStudents", async (req, res) => {
    try {
        const results = await db.query("select * from get_students();");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                students: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//get an individual subject
app.get("/getSubject/:id", async (req, res) => {
    try {
        const results = await db.query("select * from get_subjects() where subject_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                subjects: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//get an individual student
app.get("/getStudent/:id", async (req, res) => {
    try {
        const results = await db.query("select * from get_students() where student_id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                student: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//creating a subject
app.post("/createSubject", async (req, res) => {
    try {
        const results = await db.query(
            "SELECT * FROM create_subject($1, $2, $3);",
            [req.body.subject_name, req.body.credits, req.body.class_id]
        );
        res.status(200).json({
            status: "success",
            data: {
                subject: results.rows[0],
            },
        });
    }

    catch (err) {
        console.log(err);
    }
});

//creating a student
app.post("/createStudent", async (req, res) => {
    try {
        const results = await db.query(
            "SELECT * FROM create_student($1, $2, $3, $4, $5, $6);",
            [req.body.class, req.body.name, req.body.address, req.body.dob, req.body.gender, req.body.father_name]
        );
        res.status(200).json({
            status: "success",
            data: {
                student: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//update a subject
app.put("/updateSubject/:id", async (req, res) => {
    try {
        const results = await db.query(
            "Select * from update_subjects($1,$2,$3,$4)", [req.body.subject_name, req.body.credits, req.body.class_id, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                subject: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//update a student
app.put("/updateStudent/:id", async (req, res) => {
    try {
        const results = await db.query(
            "Select * from update_students($1,$2,$3,$4,$5,$6,$7)", [req.body.class, req.body.name, req.body.address, req.body.dob, req.body.gender, req.body.father_name, req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                student: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//deleting a subject
app.delete("/deleteSubject/:id", async (req, res) => {
    try {
        const results = await db.query(
            "Select * from delete_subjects($1)", [req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                subject: "None",
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});


//deleting a student
app.delete("/deleteStudent/:id", async (req, res) => {
    try {
        const results = await db.query(
            "Select * from delete_student($1)", [req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                student: "None",
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//retrieving the subjects of a student
app.get("/getStudentSubjects/:id", async (req, res) => {
    try {
        const results = await db.query("Select * from subjects_enrolled($1)", [req.params.id]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                subjects: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

// ADDING SUBJECT TO A STUDENT
app.put("/addStudentSubject/:id", async (req, res) => {
    try {
        const results = await db.query("Select * from adding_subject($1,$2)", [req.params.id, req.body.subject_id]); res.status(200).json({
            status: "success",
            data: {
                subject: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

// REMOVING SUBJECT FROM A STUDENT
app.delete("/deleteStudentSubject/:id", async (req, res) => {
    try {

        const results = await db.query(
            "Select * from remove_subjects($1,$2)", [req.params.id, req.body.subject_id]
        );
        res.status(200).json({
            status: "success",
            data: {
                subject: "None",
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//retrieving all students enrolled in a subject
app.get("/studentsEnrolled/:id", async (req, res) => {
    try {
        const results = await db.query("select * from students_enrolled($1)", [req.params.id]);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                students: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

// get all teachers
app.get("/getTeachers", async (req, res) => {
    try {
        const results = await db.query("select * from get_teachers();");
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                teachers: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//deleting a teacher
app.delete("/deleteTeacher/:id", async (req, res) => {
    try {
        const results = await db.query(
            "Select * from delete_teacher($1)", [req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                teacher: "None",
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//creating a teacher
app.post("/createTeacher", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM create_teacher($1, $2, $3, $4, $5, $6, $7);", [req.body.name, req.body.address, req.body.designation, req.body.dob, req.body.gender, req.body.hours_worked, req.body.salary]);
        res.status(200).json({
            status: "success",
            data: {
                teacher: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//get an individual teacher
app.get("/getTeacher/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const results = await db.query("select * from get_teachers() where teacher_id = $1", [req.params.id]);

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                teacher: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//update a teacher
app.put("/updateTeacher/:id", async (req, res) => {
    try {
        const results = await db.query(
            "Select * from update_teachers($1,$2,$3,$4,$5,$6,$7,$8)", [req.body.name, req.body.address, req.body.designation, req.body.dob, req.body.gender, req.body.hours_worked, req.body.salary, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                teacher: results.rows[0],
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});

//retrieving all the subjects taught by a teacher
app.get("/subjectsTeachers/:id", async (req, res) => {
    try {
        const results = await db.query("select * from subjects_teachers($1)", [req.params.id]);

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                subjects: results.rows,
            },
        });
    }
    catch (err) {
        console.log(err);
    }
});