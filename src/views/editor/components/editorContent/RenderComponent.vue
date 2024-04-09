<template>
  <component
    v-model="componentInstance.props.value"
    v-if="componentInstance.componentName.startsWith('El')"
    :is="componentInstance.componentName"
    :id="componentInstance.componentId"
    v-bind="componentInstance.props"
    :data-id="componentInstance.componentId"
    class="component-common-style"
    :class="{
      isActive:
        componentInstance.componentId == activeComponentInstance?.componentId,
    }"
    :style="componentInstance.style"
    @dragenter.native.stop="
      handleComponentDragEnter($event, componentInstance)
    "
    @dragover.native.stop="handleComponentDragOver($event)"
  >
    <template
      v-for="slotName in Object.keys(componentInstance.slots)"
      :slot="slotName"
    >
      <RenderComponent
        v-for="slotObj in componentInstance.slots[slotName]"
        :key="slotObj.componentId"
        :componentInstance="slotObj"
        :activeComponentInstance="activeComponentInstance"
        :componentInstanceList="componentInstance.slots[slotName]"
      ></RenderComponent>
    </template>
  </component>
  <div
    v-else-if="componentInstance.componentName === 'Div'"
    :id="componentInstance.componentId"
    :data-id="componentInstance.componentId"
    :style="componentInstance.style"
    class="component-common-style"
    :class="{
      isActive:
        componentInstance.componentId == activeComponentInstance?.componentId,
    }"
  >
    <template
      v-for="slotName in Object.keys(componentInstance.slots)"
      :slot="slotName"
    >
      <RenderComponent
        v-for="slotObj in componentInstance.slots[slotName]"
        :key="slotObj.componentId"
        :componentInstance="slotObj"
        :activeComponentInstance="activeComponentInstance"
        :componentInstanceList="componentInstance.slots[slotName]"
      ></RenderComponent>
    </template>
  </div>
  <span
    v-else-if="componentInstance.componentName === 'Span'"
    :id="componentInstance.componentId"
    :data-id="componentInstance.componentId"
    :style="componentInstance.style"
    class="component-common-style"
    :class="{
      isActive:
        componentInstance.componentId == activeComponentInstance?.componentId,
    }"
  >
    <template
      v-for="slotName in Object.keys(componentInstance.slots)"
      :slot="slotName"
    >
      <RenderComponent
        v-for="slotObj in componentInstance.slots[slotName]"
        :key="slotObj.componentId"
        :componentInstance="slotObj"
        :activeComponentInstance="activeComponentInstance"
        :componentInstanceList="componentInstance.slots[slotName]"
      ></RenderComponent>
    </template>
  </span>
  <span v-else-if="componentInstance.componentName === 'Text'">
    {{ componentInstance.props.textContent }}
  </span>
</template>

<script>
import * as scheme from "@/views/editor/components/metaComponent/scheme/Scheme.js";
import "element-ui/lib/theme-chalk/index.css";
import { nanoid } from "nanoid";
import { cloneDeep } from "lodash";
export default {
  name: "RenderComponent",
  props: {
    componentInstance: {
      type: Object,
      default: () => {},
    },
    activeComponentInstance: {
      type: Object,
      default: () => null,
    },
    componentInstanceList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      test: "",
    };
  },
  computed: {},
  methods: {
    handleComponentDrop(event, targetComponent, slotName = "default") {
      const maskDiv = document.getElementById("slotMask");
      if (maskDiv) {
        maskDiv.parentElement.removeChild(maskDiv);
      }
      const componentStr = event.dataTransfer.getData("component");
      console.log("handleComponentDrop", componentStr)
      const sourceComponent = JSON.parse(componentStr);
      const { metaInfo, props } = sourceComponent;
      const componentName = metaInfo.__componentName;
      if(targetComponent.allowSubComponent && targetComponent.allowSubComponent[slotName]) {
        const allowSubComponentList = targetComponent.allowSubComponent[slotName]
        if(allowSubComponentList && !allowSubComponentList.includes(componentName)) {
          return
        }
      }
      const componentScheme = scheme[componentName];
      const componentSchemeClone = cloneDeep(componentScheme)
      const componentId = nanoid();
      const slotObj = {
        componentId,
        componentName: componentName,
        label: metaInfo.label,
        style: cloneDeep(sourceComponent.style),
        props: cloneDeep(sourceComponent.props),
        class: [],
        ...componentSchemeClone
      };
      if (!targetComponent.slots[slotName]) {
        targetComponent.slots[slotName] = [];
      }
      targetComponent.slots[slotName].push(slotObj);
      this.$nextTick(() => {
        const divElement = document.getElementById(componentId);
        slotObj._dom = divElement;
      });
      event.stopPropagation();
    },
    handleComponentDragOver(event) {
      event.stopPropagation()
    },
    handleComponentDragEnter(event, targetComponent) {
      const componentStr = event.dataTransfer.getData("component");
      console.log('xxxxx', componentStr)
      if (targetComponent._dom) {
        const maskDiv = document.getElementById("slotMask");
        if (maskDiv) {
          maskDiv.parentElement.removeChild(maskDiv);
        }
        const { top, left, width, height } =
          targetComponent._dom.getBoundingClientRect();
        const divElement = document.createElement("div");
        divElement.id = "slotMask";
        divElement.style.position = "fixed";
        divElement.style.left = left + "px";
        divElement.style.top = top + "px";
        divElement.style.width = width + "px";
        divElement.style.height = height + "px";
        divElement.style.display = "flex";
        Object.keys(targetComponent.slots).forEach((slotName) => {
          const slotDiv = document.createElement("div");
          slotDiv.style.flex = 1;
          slotDiv.style.height = '100%';
          slotDiv.style.display = "flex";
          slotDiv.style.justifyContent = "center";
          slotDiv.style.alignItems = "center";
          slotDiv.style.border = "1px dashed gray";
          slotDiv.addEventListener("dragenter", (dragEnterEvent) => {
            if(targetComponent.allowSubComponent && targetComponent.allowSubComponent[slotName]) {
              const allowSubComponentList = targetComponent.allowSubComponent[slotName]
              const componentStr = dragEnterEvent.dataTransfer.getData("component");
              console.log("componentStr", componentStr)
              if(componentStr) {
                const sourceComponent = JSON.parse(componentStr);
                const { metaInfo, props } = sourceComponent;
                const componentName = metaInfo.__componentName;
                if(allowSubComponentList && !allowSubComponentList.includes(componentName)) {
                  slotDiv.style.cursor = 'not-allowed'
                }
              }
            }
            // 阻止默认行为以允许放置
            dragEnterEvent.preventDefault();
          });
          slotDiv.addEventListener("dragover", (dragOverEvent) => {
            if(targetComponent.allowSubComponent && targetComponent.allowSubComponent[slotName]) {
              const allowSubComponentList = targetComponent.allowSubComponent[slotName]
              const componentStr = dragOverEvent.dataTransfer.getData("component");
              console.log("componentStr", componentStr)
              if(componentStr) {
                const sourceComponent = JSON.parse(componentStr);
                const { metaInfo, props } = sourceComponent;
                const componentName = metaInfo.__componentName;
                if(allowSubComponentList && !allowSubComponentList.includes(componentName)) {
                  slotDiv.style.cursor = 'not-allowed'
                }
              }
            }
            // 阻止默认行为以允许放置
            dragOverEvent.preventDefault();
          });
          slotDiv.addEventListener("drop", (dropEvent) => {
            this.handleComponentDrop(dropEvent, targetComponent, slotName);
          });
          slotDiv.textContent = slotName;
          divElement.appendChild(slotDiv);
        });
        divElement.addEventListener('dragleave', (event) => {
          // 移除掉该 dom 节点
          if (divElement) {
            divElement.parentElement?.removeChild(divElement);
          }
        })
        document.body.appendChild(divElement);
      }
      event.stopPropagation();
    },
  },
};
</script>

<style scoped lang="less">
.component-common-style {
  border: 2px dashed gray;
}
.isActive {
  border-color: blue;
}
</style>