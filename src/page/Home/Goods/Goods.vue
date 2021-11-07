<template>
  <el-row justify="end">
    <el-button
      title="添加商品"
      size="small"
      icon="el-icon-plus"
      type="primary"
      @click="addGoods"
      >添加商品</el-button
    >
  </el-row>
  <el-row :gutter="12">
    <transition-group name="fade" appear>
      <el-col
        v-for="(item, idx) in goodsListObj.data"
        :key="item.id"
        :md="{ span: 8 }"
        :sm="{ span: 12 }"
        :xs="{ span: 24 }"
      >
        <el-card class="custom-card" shadow="hover">
          <div>
            <div>{{ item.name }}</div>
            <strong>￥{{ item.price }}元</strong>
          </div>
          <div>
            <el-button size="small" @click="modifyGoods(item)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteGoods(item.id)"
              >删除</el-button
            >
          </div>
        </el-card>
      </el-col>
    </transition-group>
  </el-row>

  <!--商品添加/修改-->
  <el-dialog
    :title="goodsObj.data.type === 'add' ? '添加商品' : '修改商品'"
    width="300px"
    v-model="goodsObj.visible"
  >
    <el-form
      ref="addModifyFormEl"
      :rules="goodsObj.rules"
      :model="goodsObj.data"
      label-width="65px"
    >
      <el-form-item label="商品名" prop="name">
        <el-input
          :disabled="goodsObj.data.type === 'modify'"
          v-model="goodsObj.data.name"
          type="text"
          placeholder="商品名"
        />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input
          v-model="goodsObj.data.price"
          type="number"
          min="0"
          placeholder="价格"
        >
          <template #append> 元 </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="goodsObj.data.type === 'modify'" label="优先级" prop="sort">
        <el-input-number
          v-model="goodsObj.data.sort"
          type="number"
          min="0"
          placeholder="优先级"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button size="small" @click="addModifyGoodsRequest" type="primary">
          提交
        </el-button>
        <el-button @click="goodsObj.visible = false" size="small">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { useStore, Store } from "vuex";
import { defineComponent, onMounted } from "vue";
import {
  goodsObj,
  addGoods,
  addModifyGoodsRequestFactory,
  addModifyFormEl,
  modifyGoods,
} from "./goodsAddModify";
import {
  getGoodsListFactory,
  goodsListObj,
  deleteGoodsFactory,
} from "./goodsList";
export default defineComponent({
  setup() {
    const store: Store<{}> = useStore();
    const getGoodsList: () => any = getGoodsListFactory(store);
    const addModifyGoodsRequest: () => any = addModifyGoodsRequestFactory(
      store,
      getGoodsList
    );
    const deleteGoods: (id: number) => any = deleteGoodsFactory(
      store,
      getGoodsList
    );
    onMounted(() => getGoodsList());
    return {
      goodsObj,
      addGoods,
      goodsListObj,
      addModifyGoodsRequest,
      addModifyFormEl,
      modifyGoods,
      deleteGoods,
    };
  },
});
</script>
<style lang="less" scoped>
.el-col {
  margin-top: 5px;
}
:deep(.custom-card .el-card__body) {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:hover > div:nth-child(2) {
    display: block;
  }
  & > div:nth-child(1) {
    flex: 1;
    overflow: hidden;
    & > * {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      word-break: break-all;
      text-overflow: ellipsis;
    }
  }
  & > div:nth-child(2) {
    display: none;
    white-space: nowrap;
    overflow: auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>