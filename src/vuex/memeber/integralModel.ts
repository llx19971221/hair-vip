import httpRequestApi from "@/utils/request"
const {
    integralAdd,
    integralDelete
} = httpRequestApi

const state = {

}

const actions = {
    async integralAdd(_: any, params: {}) {
        const res = await integralAdd(params)
        return res
    },
    async integralDelete(_: any, params: {}) {
        const res = await integralDelete(params)
        return res
    }
}

const mutations = {
    setVipData(state: any, payload: {}) {
        state.data = payload
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}