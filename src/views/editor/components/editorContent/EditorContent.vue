<!-- eslint-disable no-unused-vars -->
<template>
  <div class="editor-content" @drop="handleDrop($event)" @dragover.prevent>
    <div id="editor" @click="handleClick">
      <render-component
        :component-instance="componentInstance"
        :componentInstanceList="componentInstanceList"
        v-for="componentInstance in componentInstanceList"
        :key="componentInstance.componentId"
        :activeComponentInstance="activeComponentInstance"
      ></render-component>
    </div>
  </div>
</template>

<script>
import * as scheme from "@/views/editor/components/metaComponent/scheme/Scheme.js";
import { nanoid } from "nanoid";
import { groupBy, cloneDeep } from 'lodash'
import RenderComponent from "./RenderComponent.vue";
import { mapState } from "vuex";
export default {
  components: { RenderComponent },
  name: "EditorContent",
  data() {
    return {
      activeComponentInstance: null,
    };
  },
  computed: {
    ...mapState({
      componentInstanceList: 'componentInstanceList'
    })
  },
  methods: {
    getComponentInstanceList() {
      return this.componentInstanceList
    },
    handleDrop(event) {
      const componentStr = event.dataTransfer.getData("component");
      const component = JSON.parse(componentStr);
      this.addComponentInstance(component, event);
    },
    addComponentInstance(component, event) {
      const { metaInfo, props } = component;
      const componentName = metaInfo.__componentName;
      const componentScheme = scheme[componentName];
      const componentSchemeClone = cloneDeep(componentScheme)
      const { offsetX, offsetY } = event;
      const componentId = nanoid()
      const componentInstance = {
        componentId,
        componentName: componentName,
        label: metaInfo.label,
        style: {
          ...component.style,
        },
        props: {
          ...component.props,
        },
        class: [],
        ...componentSchemeClone
      };
      this.$store.commit('addComponentInstance', componentInstance)
      this.$nextTick(() => {
        const divElement = document.getElementById(componentId)
        componentInstance._dom = divElement
      })
    },
    setActiveComponentInstance(componentInstance) {
      this.activeComponentInstance = componentInstance
    },
    deleteComponentInstance(data) {
      this.$store.commit("deleteComponentInstance", data)
    },
    moveNode({draggingNode, dropNode, dropType, ev, componentInstanceTree}){
      const _componentInstanceTree = cloneDeep(componentInstanceTree)
      this.componentInstanceTreeToList(_componentInstanceTree)
      this.$store.commit('replaceComponentInstanceList', _componentInstanceTree)
    },
    componentInstanceTreeToList(componentInstanceTree) {
      componentInstanceTree.forEach((item, index) => {
        const children = item.children
        children.forEach(childItem => {
          if(childItem._type === 'slot') {
            if(Array(childItem.children)) {
              item.slots[childItem.code] = childItem.children
              this.componentInstanceTreeToList(childItem.children)
            }
          }
        })
      })
    },
    forEachComponentInstanceList(list, fn) {
      list.forEach((item, index) => {
        fn(item, index, list);
        if(item.slots) {
          Object.keys(item.slots).forEach(slotName => {
            const slots = item.slots[slotName]
            if(Array.isArray(slots)) {
              this.forEachComponentInstanceList(slots, fn)
            }
          })
        }
      })
    },
    handleClick(event) {
      let activeComponentInstance = null
      let map = new Map()
      this.componentInstanceList.forEach(componentInstance => {
        const dom = document.getElementById(componentInstance.componentId)
        componentInstance._dom = dom
        map.set(componentInstance, dom)
        this.findSlotDom(componentInstance.slots, map)
      })
      const clientX = event.clientX
      const clientY = event.clientY
      
      map.forEach((dom, componentInstance) => {
        componentInstance._dom = dom
        if(dom) {
          const clientRect = dom.getBoundingClientRect()
          const { x, y, width, height } = clientRect
          if(clientX > x && clientX < x + width && clientY > y && clientY < y + height) {
            activeComponentInstance = componentInstance
          }
        }
      })
      if(activeComponentInstance) {
        this.activeComponentInstance = activeComponentInstance
        this.$emit("changeActiveComponent", this.activeComponentInstance)
      }
    },
    findSlotDom(slots, map) {
      Object.values(slots).forEach(slot => {
        if(Array.isArray(slot)) {
          slot.forEach(slotItem => {
            const dom = document.getElementById(slotItem.componentId)
            map.set(slotItem, dom)
            if(slotItem.slots) {
              this.findSlotDom(slotItem.slots, map)
            }
          })
        }
      })
    },
    handleDragOver(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="less">
.editor-content {
  padding: 5px;
  height: calc(100% - 10px);
  #editor {
    height: 100%;
  }
}
</style>