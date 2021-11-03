import httpRequestApi from "@/utils/request"
const {
    vipList,
    vipDetail,
    vipAddEdit,
    vipDelete,
    vipRecharge,
    vipConsume
} = httpRequestApi

const state: {
    data: {
        pageNum: number,
        pageSize: number,
        items: Array<{}>,
        totalPage: number,
    }
} = {
    data: {
        pageNum: 1,
        pageSize: 10,
        totalPage: 1,
        items: []
    }
}

const actions = {
    //得到vip列表，分页
    async getVipList({ state, commit }: any, params?: {}) {
        const {
            data: {
                pageNum,
                pageSize
            }
        } = state
        // console.log(params)
        params = params ? { pageSize, pageNum, ...params } : {}
        const res: any = await vipList(params)
        const {
            flag,
            data: {
                data
            }
        } = res
        if (flag) {
            commit('setVipData', data)
        }
        return res
    },

    //会员消费详情 
    async vipDetail(_:any, params: {}) {
        const res: any = await vipDetail(params)
        return res
    },

    //添加，编辑会员
    async vipAddEdit(_: any, params: {}) {
        const res: any = await vipAddEdit(params)
        return res
    },

    //删除会员
    async vipDelete(_: any, params: {}) {
        const res: any = await vipDelete(params)
        return res
    },

    //充钱
    async vipRecharge(_: any, params: {}) {
        const res: any = await vipRecharge(params)
        return res
    },

    //结账
    async vipConsume(_: any, params: {}) {
        const res: any = await vipConsume(params)
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