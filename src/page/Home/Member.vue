<template>
  <div class="member-wrap">
    {{ vipData.items.length }}
    <div v-loading="tableLoading" class="table-wrap">
      <el-table :data="vipData.items" style="width: 100%">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="120" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" width="120" />
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default>
            <el-button type="text" size="small">Detail</el-button>
            <el-button type="text" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :current-page="vipData.pageNum"
        :default-current-page="vipData.pageNum"
        :page-size="vipData.pageSize"
        @current-change="handleCurrentChange"
        :total="vipData.totalPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, Ref } from "vue";
import { useStore, Store } from "vuex";
export default defineComponent({
  setup() {
    const store: Store<any> = useStore();
    let tableLoading: Ref<boolean> = ref(false);  //table loading

    //得到vip的table数据
    const getVipData = async (currentPage?: number) => {
      tableLoading.value = true;
      typeof(currentPage) !== 'number'
        ? await store.dispatch("vipModel/getVipList")
        : await store.dispatch("vipModel/getVipList", {
            pageNum: currentPage,
          });
      tableLoading.value = false;
    };
    //第一次组件挂载时候执行一次
    onMounted(getVipData);
    //页面切换的时候执行一次
    const handleCurrentChange = async (currentPage: number) => {
      await getVipData(currentPage)
    };

    // let vipData = computed(() => store.state.vipModel.data);
    return {
      vipData: store.state.vipModel.data,
      tableLoading,
      handleCurrentChange,
    };
  },
});
</script>
