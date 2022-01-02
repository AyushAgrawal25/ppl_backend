const path = require("path");

const getController = async (req, res, next) => {
    try {
        res.sendFile(path.resolve('public/uploads')+"/"+req.params.fileName);
    } catch (error) {
        console.log(error);
        res.json("Not Found");
    }
}

module.exports=getController;