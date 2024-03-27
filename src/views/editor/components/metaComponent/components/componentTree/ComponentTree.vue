<template>
  <div class="component-tree">
    <el-tree :data="componentInstanceTree" default-expand-all draggable @node-drop="handleDrop" :props="defaultProps" @node-click="onNodeClick" @node-contextmenu="onNodeContextmenu"></el-tree>
    <template>
      <v-contextmenu ref="contextmenu">
        <v-contextmenu-item @click="deleteComponentInstance">删除</v-contextmenu-item>
      </v-contextmenu>
    </template>
  </div>
</template>

<script>
import { nanoid } from 'nanoid';
export default {
  name: "ComponentTree",
  props: {
    componentInstanceList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      componentInstanceTree: [],
      currentTreeItem: null,
      defaultProps: {
        id: 'componentId',
        label: 'label',
        children: 'children'
      }
    }
  },
  methods: {
    onNodeContextmenu(e, data) {
      this.currentTreeItem = data
      this.$refs.contextmenu.show({left: e.clientX, top: e.clientY})
    },
    deleteComponentInstance() {
      this.$emit('deleteComponentInstance', this.currentTreeItem)
    },
    makeTreeData() {
      let treeData = []
      this.componentInstanceList.forEach(item => {
        treeData.push(item)
        if(item.slots) {
          item.children = []
          Object.keys(item.slots).forEach(slotName => {
            const slotNode = { componentId: nanoid(), code: slotName, label: `${slotName}(插槽)`, children: [], _type: 'slot', _parent: item  }
            const slots = item.slots[slotName]
            slotNode.children.push(...slots)
            item.children.push(slotNode)
            slots.forEach(slot => {
              slot._parent = slotNode
              slot._belongSlot = slotName
              this.makeTreeData2(slot)
            })
          })
        }
      })
      this.componentInstanceTree = treeData
      console.log("this.componentInstanceTree", this.componentInstanceTree)
    },
    makeTreeData2(item) {
      if(item.slots) {
          item.children = []
          Object.keys(item.slots).forEach(slotName => {
            const slotNode = { componentId: nanoid(), code: slotName, label: `${slotName}(插槽)`, children: [], _type: 'slot',  _parent: item }
            const slots = item.slots[slotName]
            slotNode.children.push(...slots)
            item.children.push(slotNode)
            slots.forEach(slot => {
              slot._parent = slotNode
              slot._belongSlot = slotName
              this.makeTreeData2(slot)
            })
          })
        }
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      this.$emit('moveNode', { draggingNode, dropNode, dropType, ev, componentInstanceTree: this.componentInstanceTree })
    },
    onNodeClick(data) {
      this.$emit('nodeClick', data)
    }
  },
  watch: {
    componentInstanceList: {
      handler: function() {
        this.makeTreeData()
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.component-tree {
}
</style>