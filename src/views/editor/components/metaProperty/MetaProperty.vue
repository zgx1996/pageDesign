<template>
    <div class="meta-property">
      <el-tabs v-model="activeTab">
        <el-tab-pane name="style" label="样式">
          <the-style :activeComponent="activeComponent"></the-style>
        </el-tab-pane>
        <el-tab-pane name="props" label="组件props">
          <the-props :activeComponent="activeComponent"></the-props>
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
<script>
import TheProps from './components/theProps/TheProps.vue'
import TheStyle from './components/theStyle/TheStyle.vue'
export default {
  components: { TheStyle, TheProps },
  name: "MetaProperty",
  props: {
    activeComponent: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeTab: 'style'
    }
  },
  watch: {
    activeComponent() {
      console.log("activeComponent", this.activeComponent)
    }
  }
}
</script>
  
<style lang="less">
.meta-property{
  height: 100%;
  .el-tabs{
    height: 100%;
    .el-tabs__content{
      height: calc(100% - 40px);
      .el-tab-pane{
        height: 100%;
      }
    }
  }
}
</style>