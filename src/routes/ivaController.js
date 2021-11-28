const e = require('express');
const express=require('express');
const router=express.Router();
mysqlconnet=require('../db');



router.get('/iva',async (req,res)=>
{
    const sql='SELECT * FROM iva'
    await mysqlconnet.query(sql,(err,rows,fields)=>
    {
        console.log(rows);
        if(err) console.log(err);
        else res.status(200).json(rows);
    })
})



router.delete('/iva:id',async (req,res)=>
{
    const {id} = req.params;
    await mysqlconnet.query('DELETE FROM subcategorias WHERE ID=?',[id],
    (err,rows,fields)=>
    {
        
        console.log(rows);
        if(rows)
        if(err) console.log(err);
        else res.status(204).json("Registro borrado sadisfactoriamente");
    })

});

module.exports=router