const router = require("express").Router();
const authorize = require("../middleware/authorization");
const db = require("../db");
const authorization = require("../middleware/authorization");

router.get("/dashboard", authorization, async (req, res) => {
  try {
    const user = await db.query(
      "SELECT * from s_users($1)",
      [req.user] 
    ); 
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;