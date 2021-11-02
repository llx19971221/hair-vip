import { reactive, ReactiveEffectOptions, ref, Ref } from "vue";
import { rules } from "./rules";
import { Store } from "vuex"
import { ElMessage } from "element-plus";

export const addModifyFormEl: Ref<any> = ref(null)
export const goodsObj = reactive({
    visible: false,
    rules,
    data: {
        id: "",
        name: "",
        price: 0,
        pid: 0,
        type: "add",
    },
});

export const addGoods = () => {
    goodsObj.data = {
        id: "",
        name: "",
        price: 0,
        pid: 0,
        type: "add",
    };
    goodsObj.visible = true;
};

export const modifyGoods = (item: {
    id: string,
    name: string,
    price: number
}) => {
    const {
        id,
        name,
        price
    } = item
    goodsObj.data = {
        id,
        name,
        price,
        pid: 0,
        type: "modify",
    };
    goodsObj.visible = true;
};

export const addModifyGoodsRequestFactory = (store: Store<{}>, cb: Function | null = null) => {
    return async () => {
        const { data } = goodsObj;
        const valid: boolean = await addModifyFormEl.value.validate();
        if (valid) {
            const { flag } = await (data.type === 'add' ? store.dispatch("goodsModel/goodsAdd", data) : store.dispatch("goodsModel/goodsModify", data));
            if (flag) {
                ElMessage.success(data.type === 'add' ? "添加成功" : '修改成功');
                goodsObj.visible = false;
                cb && cb()
            }
        }
    }
};
