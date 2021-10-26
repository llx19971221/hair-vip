import httpRequestApi from "@/utils/request"
const {
    vipList
} = httpRequestApi

const state: {
    data: {
        pageNum: number,
        pageSize: number,
        items: Array<{}>,
        totalPage: number,
    }
} = {
    data:{
        pageNum: 1,
        pageSize: 10,
        totalPage: 1,
        items: []
    }
}

const actions = {
    async getVipList({ state, commit }: any, params?: {}) {
        const {
            pageNum,
        } = state
        params = params ? {pageNum, ...params} : {}
        const res: any = await vipList(params)
        const {
            flag,
            data: {
                data
            }
        } = res      
        if(flag) {
            commit('setVipData', data)
        }
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