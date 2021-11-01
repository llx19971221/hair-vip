<template>
  <div class="member-wrap">
    <div style="text-align: right" class="btn-wrap">
      <el-button
        size="small"
        background
        type="primary"
        @click="addMember"
        >添加会员</el-button
      >
      <el-button
        size="small"
        background
        type="danger"
        @click="delMembers"
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
            <el-link
              title="消费详情"
              @click="detailMember(row)"
              type="primary"
              >{{ row.name }}</el-link
            ><i v-if="!!row.integralFlag" class="integral-flag el-icon-coin"
              >vip</i
            >
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
        <el-table-column fixed="right" width="190">
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
              @click="handleRecharge(row)"
            />
            <el-button
              title="结账"
              circle
              plain
              icon="el-icon-goods"
              type="warning"
              size="small"
              @click="editMember(row)"
            />
            <el-button
              title="积分会员"
              circle
              plain
              icon="el-icon-postcard"
              type="success"
              size="small"
              @click="intergralMember(row)"
            />
            <!-- <el-button type="text" size="small">Edit</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next, sizes"
        :current-page="vipData.pageNum"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :total="vipData.totalPage"
        :page-count="vipData.totalPage"
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
          <el-button size="small" type="primary" @click="addEditMember">{{
            objData.memberForm.id ? "提交" : "添加"
          }}</el-button>
          <el-button size="small" @click="dialogFormVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--会员充值弹窗-->
    <el-dialog v-model="rechargeFormVisible" title="充值" width="300px">
      <el-form :model="objData.rechargeForm" label-width="75px">
        <el-form-item label="会员名" prop="name">
          <el-input
            disabled
            v-model="objData.rechargeForm.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="充值金额" prop="amount">
          <el-input
            type="number"
            min="1"
            v-model="objData.rechargeForm.amount"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button size="small" type="primary" @click="rechargeFunc"
            >充值</el-button
          >
          <el-button size="small" @click="rechargeFormVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <el-input readonly :value="rechargeForm.name" /> -->
    </el-dialog>

    <!--会员详情弹窗-->
    <el-dialog
      custom-class="member-detail-dialog"
      v-model="memberDetailObj.memberDetailVisible"
      width="400px"
    >
      <template #title>
        <h4 style="margin: 0">消费详情</h4>
        <p style="margin: 0">{{ memberDetailObj.memebrConsumeDetail.name }}</p>
        <strong style="font-size: 14px"
          >({{ memberDetailObj.memebrConsumeDetail.phoneNum }})</strong
        >
      </template>
      <el-input
        placeholder="消费记录部分信息，如（充值，xx元，注册）"
        v-model="memberDetailObj.keyword"
        @keypress.enter="searchVipDetal"
        size="small"
        style="margin-bottom: 5px"
      />
      <el-collapse
        v-infinite-scroll="infiniteLoad"
        style="height: 400px; overflow: auto"
      >
        <el-collapse-item
          v-for="(item, idx) in memberDetailObj.memebrConsumeDetail.items"
        >
          <template #title>
            {{ item.name
            }}<i
              v-if="item.detail.indexOf('充值') >= 0"
              class="el-icon-money"
            ></i
            ><span style="margin: 0 0 0 5px">{{ item.gmtCreate }}</span>
          </template>
          {{ item.detail }}
        </el-collapse-item>
      </el-collapse>
    </el-dialog>

    <!--积分会员-->
    <el-dialog
      v-model="integralMemberObj.integralMemberVisible"
      width="400px"
      title="积分会员"
    >
      <el-form :model="integralMemberObj.rechargeForm" label-width="75px">
        <el-form-item label="会员名" prop="name">
          <el-input
            disabled
            v-model="integralMemberObj.rechargeForm.name"
            autocomplete="off"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="充值积分" prop="amount">
          <el-input
            type="number"
            min="1"
            v-model="integralMemberObj.rechargeForm.integral"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button
            size="small"
            type="primary"
            @click="rechargeIntegralFunc"
            >{{
              integralMemberObj.rechargeForm.integralFlag == 0 ? "开通" : "充值"
            }}</el-button
          >
          <el-button
            v-if="!!integralMemberObj.rechargeForm.integralFlag"
            type="danger"
            size="small"
            @click="delIntegralMember"
            >删除积分会员</el-button
          >
          <el-button
            size="small"
            @click="integralMemberObj.integralMemberVisible = false"
            >取消</el-button
          >
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
    const tableLoading: Ref<boolean> = ref(false); //table loading
    const dialogFormVisible: Ref<boolean> = ref(false); //添加，编辑会员弹窗是否显示
    const rechargeFormVisible: Ref<boolean> = ref(false); //会员充值弹窗
    const integralFormVisible: Ref<boolean> = ref(false); //积分会员弹窗
    const memberDetailObj = reactive({
      memebrConsumeDetail: {
        id: "", //点击的会员ID
        name: "",
        keyword: "",
        phoneNum: null,
        pageNum: 1,
        pageSize: 10,
        items: [],
      }, //会员详情信息
      memberDetailVisible: false, //弹窗显示
      keyword: "",
    }); //会员详情
    const integralMemberObj = reactive({
      rechargeForm: {
        id: "",
        name: "",
        integral: 0,
        integralFlag: 0,
      },
      integralMemberVisible: false,
    }); //积分会员
    const memberFormRef: Ref<any> = ref(null); //form dom元素
    const tableRef: Ref<any> = ref(null); //table dom元素
    const keyword: Ref<string | number> = ref(""); //输入会员名或者电话查询
    const objData = reactive({
      tableSelections: [], //选中的table项
      rechargeForm: {
        id: "",
        name: "",
        amount: 0,
      }, //充钱
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
      let { id, name, phoneNum } = row;
      if (phoneNum) {
        const val = String(phoneNum);
        phoneNum = val.slice(0, 3) + "*".repeat(4) + val.slice(7);
      }
      const {
        flag,
        data: {
          data: { items: data },
        },
      } = await store.dispatch("vipModel/vipDetail", {
        pageNum: 1,
        pageSize: 10,
        id,
      });
      memberDetailObj.memebrConsumeDetail = {
        pageNum: 1,
        pageSize: 10,
        items: flag ? data : [],
        keyword: "", //敲了回车，这个值才会更新会输入框当前的值
        id,
        name,
        phoneNum,
      }; //会员详情信息重置
      memberDetailObj.memberDetailVisible = true; //弹窗显示
      memberDetailObj.keyword = ""; //输入框的值
    };

    //会员详情搜索
    const searchVipDetal = async (e: InputEvent) => {
      const { id } = memberDetailObj.memebrConsumeDetail;
      const keyword = (e.target as HTMLInputElement).value;
      const {
        flag,
        data: {
          data: { items: data },
        },
      } = await store.dispatch("vipModel/vipDetail", {
        pageNum: 1,
        pageSize: 10,
        keyword,
        id,
      });
      memberDetailObj.memebrConsumeDetail = {
        ...memberDetailObj.memebrConsumeDetail,
        pageNum: 1,
        pageSize: 10,
        items: flag ? data : [],
        keyword, //敲了回车，更新值为当前值
      };
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

    //删除积分会员
    const delIntegralMember = async () => {
      const { id } = integralMemberObj.rechargeForm;
      try {
        const confirm = await ElMessageBox.confirm(
          "确定要删除该积分会员信息吗？",
          {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            type: "error",
          }
        );
        if (confirm === "confirm") {
          tableLoading.value = true;
          const { flag } = await store.dispatch(
            "integralModel/integralDelete",
            {
              ids: [id],
            }
          );
          if (flag) {
            integralMemberObj.integralMemberVisible = false;
            getVipData();
          } else {
            tableLoading.value = false;
          }
        }
      } catch (e) {}
    };
    //充值请求
    const rechargeFunc = async () => {
      const { id, amount } = objData.rechargeForm;
      tableLoading.value = true;
      const { flag } = await store.dispatch("vipModel/vipRecharge", {
        id,
        amount,
      });
      if (flag) {
        ElMessage.success("充值成功！");
        rechargeFormVisible.value = false;
        getVipData();
      } else {
        tableLoading.value = false;
      }
    };
    //充值积分请求
    const rechargeIntegralFunc = async () => {
      const { id, integral, integralFlag } = integralMemberObj.rechargeForm;
      tableLoading.value = true;
      const { flag } = await store.dispatch("integralModel/integralAdd", {
        id,
        integral,
        integralFlag,
      });
      if (flag) {
        ElMessage.success(integralFlag == 0 ? "开通成功！" : "充值成功！");
        integralMemberObj.integralMemberVisible = false;
        getVipData();
      } else {
        tableLoading.value = false;
      }
    };
    //积分会员弹窗
    const intergralMember = async (row: any) => {
      const { id, integralFlag, name } = row;
      integralMemberObj.rechargeForm = {
        id,
        name,
        integral: 0,
        integralFlag,
      };
      integralMemberObj.integralMemberVisible = true;
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

    //充值
    const handleRecharge = (row: any) => {
      rechargeFormVisible.value = true;
      objData.rechargeForm = {
        id: row.id,
        name: row.name,
        amount: 0,
      };
    };

    //无限滚动加载会员详情
    const infiniteLoad = async () => {
      const { pageNum, pageSize, id, keyword } =
        memberDetailObj.memebrConsumeDetail;
      const {
        flag,
        data: {
          data: { items: data },
        },
      } = await store.dispatch("vipModel/vipDetail", {
        pageNum: pageNum + 1,
        pageSize,
        keyword,
        id,
      });
      if (data.length > 0 && flag) {
        memberDetailObj.memebrConsumeDetail = {
          ...memberDetailObj.memebrConsumeDetail,
          pageNum: pageNum + 1,
          items: memberDetailObj.memebrConsumeDetail.items.concat(data),
        };
      } else {
        ElMessage.warning("消费记录全部加载完毕");
      }
    };
    const compVipData = computed(() => store.state.vipModel.data);

    // const memebrForm = toRef(objData, 'memberForm')
    return {
      vipData: compVipData,
      keyword,
      tableLoading,
      handleCurrentChange,
      handleSizeChange,
      handleSearch,
      tableRef,
      objData,
      dialogFormVisible,
      rechargeFormVisible,
      memberDetailObj,
      addMember,
      addEditMember,
      editMember,
      detailMember,
      delMembers,
      memberRules,
      memberFormRef,
      handleSelectionChange,
      handleRecharge,
      rechargeFunc,
      rechargeIntegralFunc,
      integralFormVisible,
      infiniteLoad,
      searchVipDetal,
      integralMemberObj,
      intergralMember,
      delIntegralMember,
    };
  },
});
</script>
<style lang="less" scoped>
:deep(.member-detail-dialog .el-dialog__body) {
  padding: 5px 20px 10px;
}
.integral-flag {
  background-color: #f56c6c;
  color: #ffffff;
  padding: 2px 3px;
  border-radius: 2px;
  margin-left: 2px;
}
</style>
