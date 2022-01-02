const { PrismaClient } = require("@prisma/client");
const fileUtils = require("../../utils/files/fileUtils");
const addMemberUtil = require("../../utils/members/addMembers");

const prisma = new PrismaClient();

const createController = async (req, res, next) => {
    try {
        req.body=JSON.parse(req.body.data);
        let resp = {};
        try {
            let resp = await prisma.teams.create({
                data: {
                    name: req.body.name,
                    status: 1
                }
            });       
        } catch (error) {
            res.statusCode = 400,
                res.json({
                    message: "Team Creation Failed!",
                    error: error,
                });
            return;
        }
        
        if((req.file!=undefined)&&(req.file!=null)){
            try {
                let newName=await fileUtils.rename(req.file.path, req.file.destination, resp.id)
                await prisma.teams.update({
                    where:{
                        id:resp.id
                    },
                    data:{
                        logoFile:newName
                    }
                });
            } catch (error) {
                console.log(error)   
            }
        }

        try {
            const memberAddition = await addMemberUtil({
                teamId: resp.id,
                members: req.body.members
            });

            resp['members'] = memberAddition;
        } catch (error) {
            console.log(error);
            res.statusCode = 205,
                res.json({
                    message: "Team Created but Member Addition Failed!",
                    error: error,
                });
            return;
        }

        
        // TODO: return team Data.
        res.statusCode = 201;
        res.json({
            "message": "Team Created!",
            data: resp
        });
    } catch (error) {
        res.statusCode = 500,
            res.json({
                error: error,
            });
    }
}

module.exports = createController;