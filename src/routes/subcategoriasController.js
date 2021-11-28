const e = require('express');
const express=require('express');
const router=express.Router();
mysqlconnet=require('../db');



router.get('/subcategorias',(req,res)=>
{
    const sql='SELECT * FROM subcategorias';
    mysqlconnet.query(sql,(err,rows,fields)=>
    {
        
        console.log(rows);
        if(err) console.log(err);
        else res.status(200).json(rows);
    })
  
});



router.delete('/subcategorias:id',(req,res)=>
{
    const {id} = req.params;
    mysqlconnet.query('DELETE FROM subcategorias WHERE ID=?',[id],
    (err,rows,fields)=>
    {
        
        console.log(rows);
        if(rows)
        if(err) console.log(err);
        else res.status(204).json("Registro borrado sadisfactoriamente");
    })

});

module.exports=router;