const { PrismaClient } = require("@prisma/client");
const fileUtils = require("../../utils/files/fileUtils");
const addMemberUtil = require("../../utils/members/addMembers");

const prisma = new PrismaClient();

const createController = async (req, res, next) => {
    try {
        req.body = JSON.parse(req.body.data);
        let resp = {};
        try {
            resp = await prisma.teams.create({
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

        console.log(resp);
        if ((req.file != undefined) && (req.file != null)) {
            try {
                let newName = await fileUtils.rename(req.file.path, req.file.destination, resp.id)
                await prisma.teams.update({
                    where: {
                        id: resp.id
                    },
                    data: {
                        logoFile: newName
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

            let delResp = await prisma.teams.delete({
                where: {
                    id: resp.id
                }
            });

            res.statusCode = 400,
                res.json({
                    message: "Team Creation Failed due to member Addition.",
                    error: error,
                });
            return;
        }

        let teamData=await prisma.teams.findFirst({
            where:{
                id:resp.id
            },
            include:{
                members:{
                    include:{
                        player:true
                    }
                },
            }
        });
        
        res.statusCode = 201;
        res.json({
            "message": "Team Created!",
            data: resp,
            "team":teamData
        });
    } catch (error) {
        console.log(error);
        res.statusCode = 500,
            res.json({
                error: error,
            });
    }
}

module.exports = createController;