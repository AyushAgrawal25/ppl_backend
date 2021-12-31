const { PrismaClient, MemberType } = require("@prisma/client");
const deleteMembers = require("../../../utils/members/deleteMembers");

const prisma= new PrismaClient();

const deleteController = async (req, res, next) => {
    try {
        const resp=await deleteMembers({
            ids: req.body.memberIds
        })

        res.statusCode=201;
        res.json({
            "message":"Member Deleted!",
            data: resp
        });
    } catch (error) {
        res.statusCode=400,
        res.json({
            error:error,
        });
    }
}

module.exports=deleteController;