import { createStore } from "vuex";
import httpRequestApi from "@/utils/request"
import { vipModel, integralModel } from "./memeber"
import goodsModel from "./goodsModel"
import achievementModel from "./achievementModel"
const {
    login,
    backups
} = httpRequestApi

const state = {
    userName: '无用户'
}

const actions = {
    async login({ commit }: any, params: {
        username: string,
        password: number | string
    }) {
        const res = await login(params) as any
        const {
            flag,
            data: {
                data: {
                    username,
                    token
                }
            }
        } = res
        if(flag) {
            localStorage.setItem("token", token)
            localStorage.setItem("username", username)
        }
        return res
    },
    async backups(_: any) {
        const res = await backups({})
        return res
    }
}

const mutations = {
}

export default createStore({
    modules: {
        vipModel,
        integralModel,
        goodsModel,
        achievementModel
    },
    state,
    actions,
    mutations
})