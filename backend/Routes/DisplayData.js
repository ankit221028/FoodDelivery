const express = require('express');
const router = express.Router();
//console.log(global.food_items);
router.post('/foodData',(req,res)=>{
    try{
    
        res.send([global.food_items,global.foodCategory]);
    } catch(error){
        console.error("No data")
        res.send("Server Error")
    }
})

module.exports = router;