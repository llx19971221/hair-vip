<template>
  <el-container class="total-wrap">
    <el-aside width="200px">
      <el-menu router :default-active="active" class="el-menu-vertical-demo">
        <el-sub-menu v-for="(item, idx) in routes" :index="`${item.path}`">
          <template #title>
            <i :class="`el-icon-${item.icon}`"></i>
            <span>{{ item.zhName }}</span>
          </template>
          <el-menu-item
            v-for="(item2, idx) in item.children"
            :index="`${item2.path}`"
          >
            <i v-if="!!item2.icon" :class="`el-icon-${item2.icon}`"></i>
            <template #title>{{ item2.zhName }}</template>
          </el-menu-item>
        </el-sub-menu>
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
    let active: Ref<string> = ref("member");
    return {
      routes: routes[0].children,
      active,
    };
  },
});
</script>
