import instance from "../instance";

const checkLogin = async () => {
    let storedToken = localStorage.getItem("token");
    if(storedToken) {
        try {
            let res = await instance.post("/auth/jwt/verify/", {
                token: storedToken
            })
            console.log(res.status);
            if (res.status === 200) return true;

        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            return false;
        }
    }
    else return false;
}

export default checkLogin;