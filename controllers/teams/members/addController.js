const { PrismaClient, MemberType } = require("@prisma/client");
const addMemberUtil = require("../../../utils/members/addMembers");

const prisma= new PrismaClient();

const addController = async (req, res, next) => {
    try {
        const resp=await addMemberUtil({
            teamId: req.body.teamId,
            members: req.body.members
        })

        res.statusCode=201;
        res.json({
            "message":"Member Added!",
            data: resp
        });
    } catch (error) {
        res.statusCode=400,
        res.json({
            error:error,
        });
    }
}

module.exports=addController;