var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root@123',
  database : 'cloudprint'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

exports.getAllRecords  = function(req,res){
    connection.query('SELECT * from collegeusers', function (error, results, fields) {
    if(error){
      console.log("error ocurred",error);
        res.send({
        "code":400,
        "failed":"error ocurred"
        })  
    }
    else{
        // console.log('The solution is: ', results);
        res.send({
        "code":200,
        "result":results
            });
    }
    });    
}