const { PrismaClient, MemberType } = require("@prisma/client");
const addMemberUtil = require("../../utils/members/addMembers");

const prisma= new PrismaClient();

const addController = async (req, res, next) => {
    try {
        const resp=await addMemberUtil({
            teamId: req.body.teamId,
            members: req.body.members
        })

        const teamData=await prisma.teams.findFirst({
            where:{
                id:req.body.teamId
            },
            include:{
                members:{
                    include:{
                        player:true
                    }
                }
            }
        });

        res.statusCode=201;
        res.json({
            "message":"Member Added!",
            data: resp,
            team:teamData
        });
    } catch (error) {
        res.statusCode=400,
        res.json({
            error:error,
        });
    }
}

module.exports=addController;