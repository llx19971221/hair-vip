const phoneNumValidate = (rule: any, value: string, cb: Function) => {
    if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
        cb(new Error("错误的手机号码"));
    } else {
        cb();  //如果不写这个，那验证是始终无法继续下去，promise会一直处于pending状态，代码无法继续向下执行
    }
};
export const amountPriceValidata = (rule: any, value: any, cb: Function) => {
    if(/(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/.test(value) && parseFloat(value) > 0) {
        cb()
    }else {
        cb(new Error("必须大于0"))
    }
}
export const memberRules = {
    phoneNum: [{ required: true, message: "必须输入电话"}, { validator: phoneNumValidate, trigger: "blur" }],
    name: [{ required: true, message: "必须输入会员名", trigger: "blur" }],
    amount: [{required: true, message: "必须输入金额", trigger: "blur"}, {validator: amountPriceValidata, trigger: "blur"}]
};