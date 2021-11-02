import { createStore } from "vuex";
import httpRequestApi from "@/utils/request"
import { vipModel, integralModel } from "./memeber"
import goodsModel from "./goodsModel"
const {
    login
} = httpRequestApi

const state = {
    
}

const actions = {
    async login(_: any, params: {
        username: string,
        password: number | string
    }) {
        const res = await login(params)
        return res
        
    }
}

const mutations = {

}

export default createStore({
    modules: {
        vipModel,
        integralModel,
        goodsModel
    },
    state,
    actions,
    mutations
})