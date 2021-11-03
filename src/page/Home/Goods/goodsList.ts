import { reactive } from "vue";
import { Store } from "vuex"
import { ElMessage, ElMessageBox } from "element-plus";
// const store: Store<{}> = useStore()
export const goodsListObj = reactive({
    data: []
})

export const getGoodsListFactory = (store: Store<any>) => {
    return async () => {
        const {
            flag,
            data: { data }
        } = await store.dispatch('goodsModel/goodsList')
        if (flag) {
            goodsListObj.data = data
        }
    }
}

export const deleteGoodsFactory = (store: Store<any>, cb: Function | null) => {
    return async (id: number) => {
        try {
            const confirm = await ElMessageBox.confirm(
                "确定要删除这个商品信息吗？",
                {
                    confirmButtonText: "删除",
                    cancelButtonText: "取消",
                    type: "error",
                }
            );
            if (confirm === 'confirm') {
                const {
                    flag
                } = await store.dispatch('goodsModel/goodsDelete', {
                    ids: [id]
                })
                if (flag) {
                    ElMessage.success("删除成功")
                    cb && cb()
                }
            }

        }
        catch (e) { }
    }
}