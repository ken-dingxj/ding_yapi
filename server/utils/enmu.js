module.exports={
    systemErr:{
        code:-10000,
        msg:"服务器出错...",
        success:false
    },
    success:{
        code:10000,
        msg:"成功",
        success:true
    },
    emailIsNotNull:{
        code:10001,
        msg:"email不能为空",
        success:false
    },
    passwordIsNotNull:{
        code:10002,
        msg:"密码不能为空",
        success:false
    },
    userIsNotExit:{
        code:10003,
        msg:"该用户不存在",
        success:false
    },
    passwordErr:{
        code:10004,
        msg:"密码错误",
        success:false
    },
    disableReg:{
        code:10005,
        msg:"禁止注册，请联系管理员",
        success:false
    },
    isExitemail:{
        code:10006,
        msg:"该email已经注册",
        success:false
    }
}