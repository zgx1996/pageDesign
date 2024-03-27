<template>
  <component
    v-model="componentInstance.props.value"
    v-if="componentInstance.componentName.startsWith('El')"
    :is="componentInstance.componentName"
    :id="componentInstance.componentId"
    v-bind="componentInstance.props"
    :data-id="componentInstance.componentId"
    class="component-common-style"
    :class="{ isActive: componentInstance.componentId == activeComponentInstance?.componentId }"
    :style="componentInstance.style"
    @drop.native="handleComponentDrop($event, componentInstance)"
    @dragover.native.prevent="
      handleComponentDragOver($event, componentInstance)
    "
  >
    <slot
      v-for="slotName in Object.keys(componentInstance.slots)"
      :name="slotName"
    >
      <RenderComponent
        v-for="slotObj in componentInstance.slots[slotName]"
        :key="slotObj.componentId"
        :componentInstance="slotObj"
        :activeComponentInstance="activeComponentInstance"
        :componentInstanceList="componentInstance.slots[slotName]"
      ></RenderComponent>
    </slot>
  </component>
  <div v-else-if="componentInstance.componentName === 'Div'" :id="componentInstance.componentId"  :data-id="componentInstance.componentId"
    :style="componentInstance.style" @drop="handleComponentDrop($event, componentInstance)">
    <slot
      v-for="slotName in Object.keys(componentInstance.slots)"
      :name="slotName"
    >
      <RenderComponent
        v-for="slotObj in componentInstance.slots[slotName]"
        :key="slotObj.componentId"
        :componentInstance="slotObj"
        :activeComponentInstance="activeComponentInstance"
        :componentInstanceList="componentInstance.slots[slotName]"
      ></RenderComponent>
    </slot>
  </div>
</template>

<script>
import * as scheme from "@/views/editor/components/metaComponent/scheme/Scheme.js";
import 'element-ui/lib/theme-chalk/index.css'
import { nanoid } from "nanoid";
import { cloneDeep } from 'lodash'
export default {
  name: "RenderComponent",
  props: {
    componentInstance: {
      type: Object,
      default: () => {},
    },
    activeComponentInstance: {
      type: Object,
      default: () => null
    },
    componentInstanceList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      test: ''
    }
  },
  computed: {
    
  },
  methods: {
    handleComponentDrop(event, targetComponent, slotName = 'default') {
      const maskDiv = document.getElementById('slotMask')
      console.log("handleComponentDrophandleComponentDrophandleComponentDrop", maskDiv)
      debugger
      if(maskDiv) {
        maskDiv.parentElement.removeChild(maskDiv)
      }
      const componentStr = event.dataTransfer.getData("component");
      const sourceComponent = JSON.parse(componentStr);
      const { metaInfo, props } = sourceComponent;
      const componentName = metaInfo.__componentName;
      const componentScheme = scheme[componentName];
      const componentId = nanoid()
      const slotObj = {
        componentId,
        componentName: componentName,
        label: metaInfo.label,
        style: cloneDeep(sourceComponent.style),
        props: cloneDeep(sourceComponent.props),
        class: [],
        slots: cloneDeep(componentScheme.slots),
        propsConfig: cloneDeep(componentScheme.propsConfig),
      };
      if( targetComponent.slots[slotName]) {
        targetComponent.slots[slotName] = []
      }
      targetComponent.slots[slotName].push(slotObj);
      this.$nextTick(() => {
        const divElement = document.getElementById(componentId)
        slotObj._dom = divElement
      })
      event.stopPropagation();
      console.log("componentInstanceList", cloneDeep(this.componentInstanceList));
    },
    handleComponentDragOver(event, targetComponent) {
      // 创建slot的遮罩m
      console.log("TODO 创建slot遮罩", targetComponent)
      debugger
      if(targetComponent._dom) {
        const maskDiv = document.getElementById('slotMask')
        if(maskDiv) {
          maskDiv.parentElement.removeChild(maskDiv)
        }
        const { top, left, width, height } = targetComponent._dom.getBoundingClientRect()
        const divElement = document.createElement('div')
        divElement.id = 'slotMask'
        divElement.style.position = 'fixed'
        divElement.style.left = left + 'px'
        divElement.style.top = top + 'px'
        divElement.style.width = width + 'px'
        divElement.style.height = height + 'px'
        divElement.style.display = 'flex'
        Object.keys(targetComponent.slots).forEach(slotName=>{
          const slotDiv = document.createElement('div')
          slotDiv.style.flex = 1
          slotDiv.style.display = 'flex'
          slotDiv.style.justifyContent = 'center'
          slotDiv.style.alignItems = 'center'
          slotDiv.style.border = '1px dashed gray'
          slotDiv.addEventListener("dragover", (event) => {
            // 阻止默认行为以允许放置
            event.preventDefault();
          });
          slotDiv.addEventListener('drop', (event) => {
            this.handleComponentDrop(event, targetComponent, slotName)
            const componentStr = event.dataTransfer.getData("component");
            console.log('sourceComponentsourceComponent', componentStr)
            const sourceComponent = JSON.parse(componentStr);
          })
          const spanElement = document.createElement('span')
          spanElement.textContent = slotName
          slotDiv.appendChild(spanElement)
          divElement.appendChild(slotDiv)
        })
        document.body.appendChild(divElement)
      }
    },
  },
};
</script>

<style scoped lang="less">
.component-common-style{
  border: 2px dashed gray
}
.isActive{
  border-color: blue;
}
</style>