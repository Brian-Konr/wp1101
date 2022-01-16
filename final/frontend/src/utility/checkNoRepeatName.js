import instance from "../instance";

const nameCheck = async(name) => {
    try {
        let res = await instance.get("/camp/check-name/", {
            params: {
                name: name
            }
        })
        if(res.status !== 200) {
            console.log("not valid from status")
            return false;
        }
    } catch (error) {
        console.log(error);
    }
    return true;
}

export default nameCheck;