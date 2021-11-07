<template>
  <el-container class="total-wrap">
    <el-aside width="200px">
      <img style="width: 100%" src="/沐溪美发工作室/logo.png" alt="" />
      <el-menu :default-active="active" router class="el-menu-vertical-demo">
        <el-sub-menu :index="routes[0].meta.index">
          <template #title>
            <i :class="`el-icon-${routes[0].icon}`"></i>
            <span>{{ routes[0].zhName }}</span>
          </template>
          <el-menu-item
            v-for="item in routes[0].children"
            :route="{
              name: item.name,
            }"
            :index="item.meta.index"
          >
            <i v-if="!!item.icon" :class="`el-icon-${item.icon}`"></i>
            <template #title>{{ item.zhName }}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item :route="{name: itemOther.name}" :index="itemOther.meta.index" v-for="itemOther in routes.slice(1, -1)">
          <template #title>
            <i :class="`el-icon-${itemOther.icon}`"></i>
            <span>{{ itemOther.zhName }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-user"></i>{{userName}}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer height="30px">2021@沐溪美发工作室</el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, Ref, watch } from "vue";
import { routes } from "@/router";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex"
export default defineComponent({
  setup() {
    const store: any = useStore()
    const route: any = useRoute()
    const router: any = useRouter()
    let active: Ref<string> = ref(route.meta.index);
    const exitLogin = () => {
      localStorage.removeItem("token")
      localStorage.removeItem('username')
      router.replace("/login")
    }
    watch(route, (newVal: any, oldVal: any) => {
      active.value = newVal.meta.index
    })
    const userName = ref(localStorage.getItem('username'))
    return {
      routes: routes[0].children,
      active,
      userName,
      exitLogin
    };
  },
});
</script>

<style lang="less" scoped>
.el-main {
  padding: 8px 15px;
}
.el-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 25px 0 0; 
  .el-dropdown {
    font-size: 16px;
    i {
      font-size: 25px;
    }
  }
}
.el-aside {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-right: solid 1px #e6e6e6;
  box-sizing: content-box;
  .el-menu {
    flex: 1;
    border: none;
  }
}
.el-footer {
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: grey;
}
</style>
