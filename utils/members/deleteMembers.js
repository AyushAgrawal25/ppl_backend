const { PrismaClient, MemberType } = require("@prisma/client");

const prisma = new PrismaClient();

const deleteMembers = async ({
    ids
}) => {
    try {
        const resp = await prisma.members.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        return resp;
    } catch (error) {
        throw {
            message: "Deletion Failed!",
            error: error
        }
    }
};

module.exports = deleteMembers;