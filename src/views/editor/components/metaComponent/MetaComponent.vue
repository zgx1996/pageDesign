<template>
  <div class="meta-component">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="组件" name="component">
        <component-panel :metaComponentData="categoryComponent"></component-panel>
      </el-tab-pane>
      <el-tab-pane label="已部署组件树" name="componentTree">
        <component-tree @moveNode="onMoveNode" @nodeClick="onComponentInstanceNodeClick" @deleteComponentInstance="onDeleteComponentInstance"></component-tree>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  
<script>
import ComponentPanel from './components/componentPanel/ComponentPanel.vue';
import ComponentTree from './components/componentTree/ComponentTree.vue';
import { componentCategory, elementUIComponentType } from './config/componentConfig'
export default {
  components: { ComponentPanel, ComponentTree },
  name: "MetaComponent",
  props: {
    getComponentInstanceList: {
      type: Function,
      default: () => {
        return () => []
      }
    }
  },
  data() {
    return {
      activeTab: 'component',
      componentInstanceList: [],
      categoryComponent: {}
    }
  },
  created() {
    this.loadMetaComponent()
  },
  methods: {
    onComponentInstanceNodeClick(data) {
      this.$emit('instanceNodeClick', data)
    },
    onDeleteComponentInstance(data) {
      this.$emit('deleteComponentInstance', data)
    },
    onMoveNode({draggingNode, dropNode, dropType, ev, componentInstanceTree}) {
      this.$emit('moveNode', {draggingNode, dropNode, dropType, ev, componentInstanceTree})
    },
    loadMetaComponent() {
      Object.keys(componentCategory).forEach(categoryKey => {
        const categoryName = componentCategory[categoryKey]
        Object.keys(elementUIComponentType).forEach(component => {
          const category = elementUIComponentType[component].category
          if((Array.isArray(category) && category.includes(categoryKey)) || category == categoryKey) {
            if(!this.categoryComponent[categoryName]) {
              this.categoryComponent[categoryName] = []
            }
            const components = elementUIComponentType[component].components
            Object.keys(components).forEach(componentName => {
              if(!components[componentName].metaInfo) {
                components[componentName].metaInfo = {}
              }
              components[componentName].metaInfo.__componentName = componentName
            })
            this.categoryComponent[categoryName].push(...Object.values(components))
          }
        })
      })
    }
  },
  watch: {
    activeTab() {
      this.componentInstanceList = this.getComponentInstanceList()
    }
  }
};
</script>
  
<style lang="less">
</style>