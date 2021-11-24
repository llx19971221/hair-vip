<template>
  <el-radio-group
    v-model="achievementData.kindLabel"
    @change="achievementTypeChange"
  >
    <el-radio-button label="充值"></el-radio-button>
    <el-radio-button label="消费"></el-radio-button>
    <el-input
      placeholder="按照消息内容搜索"
      prefix-icon="el-icon-search"
      v-model="achievementData.params.keyword"
      @keypress.enter="handelGetAchievementTable"
      @input="inputBounceGetAchievementTable"
    />
  </el-radio-group>
  <div v-loading="achievementData.tableLoading">
    <el-table
      :data="achievementData.tableData"
      stripe
      style="width: 100%"
      @row-click="handleRowClick"
    >
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="account" label="金额(元)" width="180" />
      <el-table-column prop="msg" label="记录" />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, sizes"
      :total="achievementData.totalPage"
      :page-count="achievementData.totalPage"
      :current-page="achievementData.params.pageNum"
      @current-change="handlePageChange"
      @size-change="handlePageSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { debounce } from "@/utils"
export default defineComponent({
  setup() {
    const store = useStore();
    const router: any = useRouter();
    let enterPressed: boolean = false;
    enum AchievementType {
      充值 = 1,
      消费,
    }

    const achievementData = reactive({
      params: {
        pageNum: 1,
        pageSize: 10,
        keyword: "",
        kind: 1,
      },
      kindLabel: "充值",
      tableData: [],
      totalPage: 1,
      tableLoading: false,
    });

    const inputBounceGetAchievementTable =  debounce(() => {
      getAchievementTable()
    }, 1000)

    const handelGetAchievementTable = () => {
      getAchievementTable()
      enterPressed = true
    }

    const getAchievementTable = async () => {
      if (enterPressed) {
        enterPressed = false;
        return
      }
      const { params } = achievementData;
      achievementData.tableLoading = true;
      const {
        flag,
        data: {
          data: { items, totalPage },
        },
      } = await store.dispatch("achievementModel/achievementList", params);
      if (flag) {
        achievementData.tableData = items;
        achievementData.totalPage = totalPage;
      }
      achievementData.tableLoading = false;
    };

    const achievementTypeChange = async (kindLabel: any) => {
      const kind = parseInt(AchievementType[kindLabel]);
      achievementData.kindLabel = kindLabel;
      achievementData.params = {
        pageNum: 1,
        pageSize: 10,
        kind,
        keyword: "",
      };
      getAchievementTable();
    };

    const handlePageChange = async (pageNum: number) => {
      achievementData.params = { ...achievementData.params, pageNum };
      getAchievementTable();
    };

    const handlePageSizeChange = async (pageSize: number) => {
      achievementData.params = { ...achievementData.params, pageSize };
      getAchievementTable();
    };

    const handleRowClick = async (row: any) => {
      const { date } = row;
      const {
        params: { kind },
      } = achievementData;
      router.push({
        name: "achievementDetail",
        params: {
          date,
          kind,
        },
      });
    };

    onMounted(getAchievementTable);

    return {
      achievementData,
      achievementTypeChange,
      handlePageChange,
      handlePageSizeChange,
      handleRowClick,
      handelGetAchievementTable,
      inputBounceGetAchievementTable
    };
  },
});
</script>