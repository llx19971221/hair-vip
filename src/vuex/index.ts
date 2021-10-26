import { createStore } from "vuex";
import httpRequestApi from "@/utils/request"
import vipModel from "./vipModel"
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
        vipModel
    },
    state,
    actions,
    mutations
})