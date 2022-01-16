import nameCheck from "./checkNoRepeatName";
import moment from 'moment';
import { message } from "antd";

const dateFormat = "YYYY-MM-DD";
const totalCheck = async(activityName, startDate, signupDate, place) => {
    /* need to check:
        1. name required and no duplicate
        3. camp_start_date required and larger than above two dates
        6. join_user_count required
    */

    // 1.
    if(!activityName.length || !await nameCheck(activityName) || activityName === "請輸入您的營隊名稱") {
        message.warn("目前的活動名稱已存在或尚未填寫", 1.5);
        return false;
    }
    
    // 3.
    let signupDue = moment(signupDate[1]).format(dateFormat);
    let startDay = moment(startDate[0]).format(dateFormat);
    if(moment(signupDue).isSameOrAfter(startDay)) {
        message.warn("活動報名截止日必須在活動起始日前!", 1.5);
        return false;
    }

    if(place === "請輸入活動地點" || !place.length) {
        message.warn("地點尚未填寫!", 1.5);
        return false;
    }

    return true;

   

}

export default totalCheck;