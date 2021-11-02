import httpRequestApi from "@/utils/request"
const {
    goodsAdd,
    goodsList,
    goodsModify,
    goodsDelete
} = httpRequestApi

const state = {

}

const actions = {
    async goodsAdd(_: any, params: {}) {
        const res = await goodsAdd(params)
        return res
    },
    async goodsModify(_:any, params: {}) {
        const res = await goodsModify(params)
        return res
    },
    async goodsDelete(_:any, params: {}) {
        const res = await goodsDelete(params)
        return res
    },
    async goodsList(_:any, params: {}) {
        const res = await goodsList(params)
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