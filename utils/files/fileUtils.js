const fs=require('fs');

const renameFunction=async(orgPath, onlyPath, newName)=>{
    let parts=orgPath.split('.');
    let extName=parts[parts.length-1];

    try {
        let newPath=onlyPath+"/"+newName+"."+extName;
        await fs.renameSync(orgPath, newPath);
        return newName+"."+extName;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports={
    rename:renameFunction
}