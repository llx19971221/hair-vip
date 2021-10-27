<template>
  <div class="member-wrap">
    <div style="text-align: right" class="btn-wrap">
      <el-button background type="primary" size="small" @click="addMember"
        >添加会员</el-button
      >
      <el-button background type="danger" size="small" @click="delMembers"
        >删除选中的会员</el-button
      >
      <div style="margin: 10px 0">
        <el-input
          prefix-icon="el-icon-search"
          style="display: inline-block; width: fit-content"
          v-model="keyword"
          placeholder="请输入会员名或电话"
          @keypress.enter="handleSearch"
        />
      </div>
    </div>
    <!--会员列表-->
    <div v-loading="tableLoading" class="table-wrap">
      <el-table
        @selection-change="handleSelectionChange"
        ref="tableRef"
        :data="vipData.items"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column sortable prop="name" label="会员名">
          <template #default="{ row }">
            <el-link title="详情" @click="detailMember(row)" type="primary">{{
              row.name
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNum" label="电话" />
        <el-table-column sortable prop="amount" label="余额(元)" />
        <el-table-column prop="integral" label="会员积分" />
        <el-table-column
          sortable
          prop="lastConsumptionTime"
          label="最近一次消费"
        >
          <template #default="{ row }">
            {{
              row.lastConsumptionTime ? row.lastConsumptionTime : "无消费记录"
            }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button
              title="编辑"
              circle
              plain
              icon="el-icon-edit"
              type="primary"
              size="small"
              @click="editMember(row)"
            />
            <el-button
              title="充值"
              circle
              plain
              icon="el-icon-money"
              type="warning"
              size="small"
              @click="editMember(row)"
            />
            <el-button
              title="消费"
              circle
              plain
              icon="el-icon-goods"
              type="warning"
              size="small"
              @click="editMember(row)"
            />
            <!-- <el-button type="text" size="small">Edit</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :page-sizes="[10, 20, 30]"
        layout="prev, pager, next, sizes"
        :current-page="vipData.pageNum"
        :default-current-page="vipData.pageNum"
        :page-size="vipData.pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="vipData.totalPage"
      />
    </div>

    <!--会员添加编辑弹窗-->
    <el-dialog
      v-model="dialogFormVisible"
      :title="objData.memberForm.id ? '编辑会员' : '添加会员'"
    >
      <el-form
        ref="memberFormRef"
        :rules="memberRules"
        :model="objData.memberForm"
        label-width="65px"
      >
        <el-form-item label="会员名" prop="name">
          <el-input
            :disabled="!!objData.memberForm.id"
            v-model="objData.memberForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phoneNum">
          <el-input
            v-model.number="objData.memberForm.phoneNum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="￥" prop="amount">
          <el-input
            type="number"
            min="0"
            :disabled="!!objData.memberForm.id"
            v-model="objData.memberForm.amount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            show-password
            v-model="objData.memberForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary" @click="addEditMember">{{
            objData.memberForm.id ? "提交" : "添加"
          }}</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref,
  Ref,
  reactive,
  nextTick,
} from "vue";
import { useStore, Store } from "vuex";
import { memberRules } from "./rules";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  setup() {
    const store: Store<any> = useStore();
    let tableLoading: Ref<boolean> = ref(false); //table loading
    let dialogFormVisible: Ref<boolean> = ref(false); //添加，编辑会员弹窗是否显示
    const memberFormRef: Ref<any> = ref(null); //form dom元素
    const tableRef: Ref<any> = ref(null); //table dom元素
    const keyword: Ref<string | number> = ref(""); //输入会员名或者电话查询
    let objData = reactive({
      tableSelections: [],
      memberForm: {
        id: "",
        name: "",
        password: "",
        phoneNum: "",
        amount: 0,
      }, //添加，编辑会员表单数据
    });
    //得到vip的table数据
    const getVipData = async (params?: {
      pageNum?: number | null;
      pageSize?: number;
      keyword?: number | string;
    }) => {
      tableLoading.value || (tableLoading.value = true);

      await store.dispatch("vipModel/getVipList", params);
      tableLoading.value = false;
    };

    //添加会员
    const addMember: Function = async () => {
      dialogFormVisible.value = true;
      nextTick(() => {
        memberFormRef.value.resetFields();
      });
    };

    //编辑会员
    const editMember: Function = async (row: any) => {
      objData.memberForm = Object.assign({}, row);
      nextTick(() => {
        dialogFormVisible.value = true;
      });
    };

    //会员详情
    const detailMember: Function = async (row: any) => {
      console.log(row);
    };

    //删除会员
    const delMembers: Function = async () => {
      const ids: Array<any> = objData.tableSelections.map(
        (item: { id: string | number }) => item.id
      );
      if (ids.length > 0) {
        try {
          const confirm = await ElMessageBox.confirm(
            "确定要删除这些会员信息吗？",
            {
              confirmButtonText: "删除",
              cancelButtonText: "取消",
              type: "error",
            }
          );
          if (confirm === "confirm") {
            tableLoading.value = true;
            const { flag } = await store.dispatch("vipModel/vipDelete", {
              ids,
            });
            if (flag) {
              getVipData();
            } else {
              tableLoading.value = false;
            }
          }
        } catch (e) {}
      } else {
        ElMessage.warning("请选择要删除的会员");
      }
    };

    //通过关键词，查询会员
    const handleSearch: Function = async () => {
      getVipData({
        keyword: keyword.value,
      });
      keyword.value = "";
    };

    //发送请求添加或者修改会员
    const addEditMember: Function = async () => {
      const valid: boolean = await memberFormRef.value.validate();
      if (valid) {
        const formData = Object.assign({}, objData.memberForm);
        tableLoading.value = true;
        const { flag } = await store.dispatch("vipModel/vipAddEdit", formData);
        if (flag) {
          dialogFormVisible.value = false;
          getVipData();
        } else {
          tableLoading.value = false;
        }
      }
    };

    //第一次组件挂载时候执行一次
    onMounted(getVipData);

    //页码切换的时候执行一次
    const handleCurrentChange = async (currentPage: number) => {
      getVipData({
        pageNum: currentPage,
      });
    };

    //分页大小变化执行
    const handleSizeChange = async (pageSize: number) => {
      getVipData({
        pageSize,
      });
    };

    //选中的table变化
    const handleSelectionChange = async (val: []) => {
      objData.tableSelections = val;
    };

    let vipData = computed(() => store.state.vipModel.data);
    // const memebrForm = toRef(objData, 'memberForm')
    return {
      vipData,
      keyword,
      tableLoading,
      handleCurrentChange,
      handleSizeChange,
      handleSearch,
      tableRef,
      objData,
      dialogFormVisible,
      addMember,
      addEditMember,
      editMember,
      detailMember,
      delMembers,
      memberRules,
      memberFormRef,
      handleSelectionChange,
    };
  },
});
</script>
