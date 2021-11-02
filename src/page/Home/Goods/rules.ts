import { amountPriceValidata } from "@/page/Home/Member/rules"

export const rules = {
    name: [{required: true, message: '请输入名字', trigger: 'blur'}],
    price: [{validator: amountPriceValidata, trigger: 'blur'}]
}