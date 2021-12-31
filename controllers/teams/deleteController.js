const { PrismaClient } = require("@prisma/client");

const prisma= new PrismaClient();

const deleteController = async (req, res, next) => {
    try {
        const resp=await prisma.teams.delete({
            where:{
                id: req.body.teamId
            }
        });

        res.statusCode=200;
        res.json({
            "message":"Team Deleted!",
            data: resp
        });
    } catch (error) {
        res.statusCode=500,
        res.json({
            error:error,
        });
    }
}

module.exports=deleteController;