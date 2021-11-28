const mysql=require('mysql');

const mysqlconnect=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'3912481@Vv',
    port:3306,
    database:'tienda'
});

mysqlconnect.connect(function(err){
    if(err) {
        console.log(err)
        return;
    } else {
        console.log('Database is conected')
    }
})

module.exports=mysqlconnect;
