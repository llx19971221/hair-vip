<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  components: {},
  setup() {
    let isCollapse = ref(false);
    function handleOpen(key: string, keyPath: string) {
      console.log(key, keyPath);    
    }
    function handleClose(key: string, keyPath: string) {
      console.log(key, keyPath);
    }
    return {
      isCollapse,
      handleOpen,
      handleClose,
    };
  },
});
</script>

<style lang="less">
#app,
.total-wrap {
  height: 100%;
}
</style>
