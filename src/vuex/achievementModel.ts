import httpRequestApi from "@/utils/request"
const {
    achievementList,
    achievementDetail
} = httpRequestApi

const state = {

}

const actions = {
    async achievementList(_: any, params: {}) {
        const res = await achievementList(params)
        return res
    },
    async achievementDetail(_: any, params: {}) {
        const res = await achievementDetail(params)
        return res
    }
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}