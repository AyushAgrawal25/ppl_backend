const { PrismaClient } = require("@prisma/client");
const addMemberUtil = require("../../utils/members/addMembers");

const prisma= new PrismaClient();

const createController = async (req, res, next) => {
    try {
        let resp={};
        try {
            resp=await prisma.teams.create({
                data:{
                    name: req.body.name,
                    status:1
                }
            });
        } catch (error) {
            res.statusCode=400,
            res.json({
                message: "Team Creation Failed!",
                error:error,
            });
            return;
        }

        try {
            const memberAddition=await addMemberUtil({
                teamId:resp.id,
                members:req.body.members
            });

            resp['members']=memberAddition;
        } catch (error) {
            console.log(error);
            res.statusCode=400,
            res.json({
                message: "Team Created but Member Addition Failed!",
                error:error,
            });
            return;
        }
        
        res.statusCode=201;
        res.json({
            "message":"Team Created!",
            data: resp
        });
    } catch (error) {
        res.statusCode=500,
        res.json({
            error:error,
        });
    }
}

module.exports=createController;