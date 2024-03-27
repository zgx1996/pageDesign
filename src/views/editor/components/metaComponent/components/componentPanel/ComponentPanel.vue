<template>
  <div class="component-panel">
    <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="searchKey" size="mini">
      <i slot="suffix" class="el-input__icon el-icon-s-grid"></i>
    </el-input>
    <el-collapse v-model="activeNames">
      <el-collapse-item :title="componentCategory" :name="componentCategory" :key="componentCategory" v-for="componentCategory in Object.keys(metaComponentData)">
        <el-row>
          <el-col :span="12" v-for="(component, index) in metaComponentData[componentCategory]" :key="index">
            <el-card draggable @dragstart.native="handleDragStart($event, component)">
              <div>
                {{ component.metaInfo.label }}
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'ComponentPanel',
  props: {
    metaComponentData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      searchKey: '',
      activeNames: Object.keys(this.metaComponentData)
    }
  },
  methods: {    
    handleDragStart(event, component) {
      event.dataTransfer.setData('component', JSON.stringify(component))      
    }
  }
}
</script>

<style lang="less">
.component-panel {
  .el-card{
    cursor: pointer;
  }
}
</style>