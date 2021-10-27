const phoneNumValidate = (rule: any, value: string, cb: Function) => {
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
        cb(new Error("错误的手机号码"));
    } else {
        cb();  //如果不写这个，那验证是始终无法继续下去，promise会一直处于pending状态，代码无法继续向下执行
    }
};
export const memberRules = {
    phoneNum: [{ validator: phoneNumValidate, trigger: "blur" }],
    name: [{ required: true, message: "必须输入会员名", trigger: "blur" }],
};