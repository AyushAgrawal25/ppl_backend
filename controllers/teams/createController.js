const { PrismaClient } = require("@prisma/client");
const fileUtils = require("../../routes/files/fileUtils");
const addMemberUtil = require("../../utils/members/addMembers");

const prisma = new PrismaClient();

const createController = async (req, res, next) => {
    try {
        // TODO: test with flutter andchange accordingly.
        // TEMP Code.
        req.body=JSON.parse(req.body.data);
        // console.log(req.file)

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
        
        try {
            await fileUtils.rename(req.file.path, req.file.destination, resp.id)
        } catch (error) {
            // TODO: delete Image if wanted.
            console.log(error)   
        }

        try {
            const memberAddition = await addMemberUtil({
                teamId: resp.id,
                members: req.body.members
            });

            resp['members'] = memberAddition;
        } catch (error) {
            console.log(error);
            res.statusCode = 400,
                res.json({
                    message: "Team Created but Member Addition Failed!",
                    error: error,
                });
            return;
        }

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