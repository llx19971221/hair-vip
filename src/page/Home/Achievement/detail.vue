<template>
  <div v-loading="achievementDetail.tableLoading">
    <el-input
      placeholder="按照消息内容搜索"
      prefix-icon="el-icon-search"
      v-model="achievementDetail.params.keyword"
      @keypress.enter="getAchievementTable"
    />
    <el-table :data="achievementDetail.tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="会员名" width="180px" />
      <el-table-column prop="phoneNum" label="电话" width="180px" />
      <el-table-column prop="detail" label="详细信息" />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, sizes"
      :total="achievementDetail.totalPage"
      :page-count="achievementDetail.totalPage"
      :current-page="achievementDetail.params.pageNum"
      @current-change="handlePageChange"
      @size-change="handlePageSizeChange"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const {
      params: { kind, date: myDate },
    }: any = useRoute();
    const achievementDetail = reactive({
      params: {
        kind,
        keyword: "",
        date: myDate,
        pageSize: 10,
        pageNum: 1,
      },
      totalPage: 1,
      tableLoading: false,
      tableData: [],
    });

    const getAchievementTable = async () => {
      const { params } = achievementDetail;
      achievementDetail.tableLoading = true;
      const {
        flag,
        data: {
          data: { items, totalPage },
        },
      } = await store.dispatch("achievementModel/achievementDetail", params);
      if (flag) {
        achievementDetail.tableData = items;
        achievementDetail.totalPage = totalPage;
      }
      achievementDetail.tableLoading = false;
    };

    const handlePageChange = async (pageNum: number) => {
      achievementDetail.params = { ...achievementDetail.params, pageNum };
      getAchievementTable();
    };

    const handlePageSizeChange = async (pageSize: number) => {
      achievementDetail.params = { ...achievementDetail.params, pageSize };
      getAchievementTable();
    };

    onMounted(getAchievementTable);
    return {
      achievementDetail,
      handlePageChange,
      handlePageSizeChange,
      getAchievementTable
    };
  },
});
</script>
