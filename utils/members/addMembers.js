const { PrismaClient, MemberType } = require("@prisma/client");

const prisma = new PrismaClient();

const addMemberUtil = async ({
    teamId, members
}) => {
    let ownerCount = 0, totalCount = 0;
    const membersInfo = [];
    try {
        let membersCount = await prisma.members.groupBy({
            by: ['type'],
            _count: {
                id: true
            },
            where: {
                teamId: teamId
            }
        });
        membersCount.forEach((typeCount) => {
            totalCount += typeCount._count.id;
            if (typeCount.type == MemberType.owner) {
                ownerCount = typeCount._count.id;
            }
        });

    } catch (error) {
        throw {
            "message": "Team Info Invalid!",
            error: error
        };
    }

    let playersInfo=[];
    members.forEach(member => {
        let currMemberInfo = member;
        if (member.type == MemberType.owner) {
            ownerCount++;
        }

        if ((member.type == MemberType.player) && (member['player'] != undefined) && (member['player'] != null)) {
            const playerInfo = currMemberInfo['player'];
            currMemberInfo['player'] = {
                create: {
                    ...playerInfo, status:1
                }
            }
            playersInfo.push({
                ...currMemberInfo, teamId: teamId, status: 1
            });
        }
        else{
            membersInfo.push({
                ...currMemberInfo, teamId: teamId, status: 1
            });
        }
    });
    totalCount += members.length;

    if (ownerCount > 1) {
        throw {
            "message": "More than one owner!",
        };
    }

    if (totalCount > 30) {
        throw {
            message: "More than 30 members not allowed!"
        }
    }

    try {
        const resp = await prisma.members.createMany({
            data: membersInfo
        });


        const playersProms=[];
        playersInfo.forEach(async (playerInfo)=>{
            const prom=new Promise(async(resolve) =>{
                const playerResp=await prisma.members.create({
                    data:playerInfo
                });          
                resolve(playerResp);
            });
            playersProms.push(prom);
        });

        let playersResp=await Promise.all(playersProms);
        resp.count+=playersResp.length;

        return resp;
    } catch (error) {
        console.log(error);
        throw {
            "message": "Member Addition Failed!",
            error: error
        };
    }
}

module.exports = addMemberUtil;