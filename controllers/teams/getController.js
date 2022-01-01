const { PrismaClient } = require("@prisma/client");
const prisma= new PrismaClient();

const getController = async (req, res, next) => {
    try {
        const resp=await prisma.teams.findMany({
            include:{
                members:{
                    include:{
                        player:true
                    }
                }
            }
        });
        res.statusCode=200;
        res.json({
            "message":"Teams Fetched Successfully...",
            data: resp
        });
    } catch (error) {
        res.statusCode=500,
        res.json({
            error:error,
        });
    }
}

module.exports=getController;