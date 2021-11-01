import { createStore } from "vuex";
import httpRequestApi from "@/utils/request"
import { vipModel, integralModel } from "./memeber"
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
        integralModel
    },
    state,
    actions,
    mutations
})