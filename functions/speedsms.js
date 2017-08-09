exports.sendsms = (to, smsContent, smsType, brandName, dlr) =>

    new Promise((resolve, reject) => {
        const SMS_TYPE_QC = 1; // loai tin nhan quang cao
        const SMS_TYPE_CSKH = 2; // loai tin nhan cham soc khach hang
        const SMS_TYPE_BRANDNAME = 3; // loai tin nhan brand name cskh

        const ROOT_URL = "http://api.speedsms.vn/index.php";
        const accessToken = "_9d_Kf2LvM2rvM-oi6UIDjgBzjvKezMy";
        if (!is_array(to) || empty(to) || empty(smsContent))
            return null;

        type = SMS_TYPE_CSKH;
        if (!empty(smsType))
            type = smsType;

        if (type < 1 && type > 3)
            return null;

        if (type === 3 && empty(brandName))
            return null;

        if (strlen(brandName) > 11)
            return null;

        if (type !== 2)
            dlr = 0;
        const result = [];
        const temp = {
            to: to,
            content: smsContent,
            sms_type : type,
            brandname : brandName,
            dlr  : dlr
        };
        result.push(temp);
        const ok = {
            result : result
        };
        console.log(result);




    });