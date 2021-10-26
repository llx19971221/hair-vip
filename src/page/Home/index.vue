<template>
  <el-container class="total-wrap">
    <el-aside width="200px">
      <el-menu 
      router
      :default-active="active"
      class="el-menu-vertical-demo">
        <el-menu-item
          v-for="(item, idx) in routes"
          :index="`${item.path}`"
        >
          <i :class="`el-icon-${item.icon}`"></i>
          <template #title>{{ item.zhName }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import { routes } from "@/router";
export default defineComponent({
  setup() {
    // console.log(routes);
    let active: Ref<string> = ref("member")
    return {
      routes: routes[0].children,
      active
    };
  },
});
</script>
