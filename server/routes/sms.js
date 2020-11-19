const router = require("express").Router();
const db = require('../db/index.js');
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
require("dotenv").config();
router.post("/register",validInfo,async(req,res) => {
    try {
        const { name, email,password,type,id} = req.body;
        const user = await db.query('select * from set_users($1)',[email]);
        //console.log(req);
        if(user.rows.length > 0 ){
            return res.status(401).json("User already exits");
        }
        const saltRound = 10;
        const salt  = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password,salt);
        //console.log(req.body);
        let  newUser = await db.query("select * from create_users($1,$2,$3,$4,$5);",[name,email,bcryptPassword,type,id]);
        const token = jwtGenerator(newUser.rows[0].user_id);
        console.log(token);
       res.json({token});
    }catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
    }

});
router.post("/login",validInfo,async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await db.query('select * from set_users($1)',[email]);
        if(user.rows.length === 0 ){
            return res.status(401).json("Password or Email is incorrect");
        }
             const validPassword = await bcrypt.compare(password,user.rows[0].user_password);

             if(!validPassword || user.rows[0].user_type!=="AD"){
                return res.status(401).json("Password or Email is incorrect");
             }
             const token = jwtGenerator(user.rows[0].user_id);
             res.json({token});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }

    
});

router.post("/login/Students",validInfo,async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await db.query('select * from set_users($1)',[email]);
        if(user.rows.length === 0 ){
            return res.status(401).json("Password or Email is incorrect");
        }
             const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
             if(!validPassword || user.rows[0].user_type!=="STD"){
                return res.status(401).json("Password or Email is incorrect");
             }
             const token = jwtGenerator(user.rows[0].user_id);
             res.json({
                token, 
                userRefID: user.rows[0].ref_id});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    } 
});

router.post("/login/Teachers",validInfo,async (req,res)=>{
    try{
        const {email, password} = req.body;
        const user = await db.query('select * from set_users($1)',[email]);
        if(user.rows.length === 0 ){
            return res.status(401).json("Password or Email is incorrect");
        }
             const validPassword = await bcrypt.compare(password,user.rows[0].user_password);

             if(!validPassword || user.rows[0].user_type!=="TEA"){
                return res.status(401).json("Password or Email is incorrect");
             }
             const token = jwtGenerator(user.rows[0].user_id);
             res.json({token, userRefID : user.rows[0].ref_id});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }

    
});
router.get("/isverify",authorization,async(req,res) => {
    try {
        res.json(true);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})
module.exports = router;