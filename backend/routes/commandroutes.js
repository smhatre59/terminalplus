let cmd=require('node-cmd');

exports.commandrun = function(req,res){
    console.log("command req",req.body.command);
    cmd.get(
        req.body.command,
        function(data){            
            res.send({
                "code":"200",
                "result":data
            })
        }
    );
}