<template>
  <component
    v-model="componentInstance.props.value"
    v-if="componentInstance.componentName?.startsWith('El')"
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
    @dragenter.native.stop="handleComponentDragEnter($event, componentInstance)"
    @dragover.native.stop="handleComponentDragOver($event)"
  >
    <template
      v-for="slotName in Object.keys(componentInstance.slots)"
      :slot="slotName"
    >
      <template v-for="slotObj in componentInstance.slots[slotName]">
        <template v-if="slotObj.componentName == 'ElTabPane'">
          <ElTabPane
            v-bind="slotObj.props"
            :style="slotObj.style"
            :id="slotObj.componentId"
            :key="slotObj.componentId"
          >
            <template
              v-for="tabPaneSlotName in Object.keys(slotObj.slots)"
              :slot="tabPaneSlotName"
            >
              <RenderComponent
                v-for="tabPaneSlotItem in slotObj.slots[tabPaneSlotName]"
                :key="tabPaneSlotItem.componentId"
                :componentInstance="tabPaneSlotItem"
                :activeComponentInstance="activeComponentInstance"
                :componentInstanceList="tabPaneSlotItem.slots[slotName]"
              ></RenderComponent>
            </template>
          </ElTabPane>
        </template>
        <template v-else>
          <RenderComponent
            :key="slotObj.componentId"
            :componentInstance="slotObj"
            :activeComponentInstance="activeComponentInstance"
            :componentInstanceList="componentInstance.slots[slotName]"
          ></RenderComponent>
        </template>
      </template>
    </template>
  </component>
  <HtmlNodeRenderComponent v-else :componentInstance="componentInstance" :activeComponentInstance="activeComponentInstance" :componentInstanceList="componentInstanceList"
    @dragenter.native.stop="handleComponentDragEnter($event, componentInstance)"
    @dragover.native.stop="handleComponentDragOver($event)"></HtmlNodeRenderComponent>
</template>

<script>
import * as scheme from "@/views/editor/components/metaComponent/scheme/Scheme.js";
import { nanoid } from "nanoid";
import { cloneDeep } from "lodash";
import HtmlNodeRenderComponent from './HtmlNodeRenderComponent'
export default {
  name: "RenderComponent",
  components: { HtmlNodeRenderComponent },
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
    };
  },
  computed: {},
  methods: {
    handleComponentDrop(event, targetComponent, slotName = "default") {
      debugger
      const maskDiv = document.getElementById("slotMask");
      if (maskDiv) {
        maskDiv.parentElement.removeChild(maskDiv);
      }
      const componentStr = event.dataTransfer.getData("component");
      console.log("handleComponentDrop", componentStr);
      const sourceComponent = JSON.parse(componentStr);
      const { metaInfo, props } = sourceComponent;
      const componentName = metaInfo.__componentName;
      if (
        targetComponent.allowSubComponent &&
        targetComponent.allowSubComponent[slotName]
      ) {
        const allowSubComponentList =
          targetComponent.allowSubComponent[slotName];
        if (
          allowSubComponentList &&
          !allowSubComponentList.includes(componentName)
        ) {
          return;
        }
      }
      const componentScheme = scheme[componentName];
      const componentSchemeClone = cloneDeep(componentScheme);
      const componentId = nanoid();
      const slotObj = {
        componentId,
        componentName: componentName,
        label: metaInfo.label,
        style: cloneDeep(sourceComponent.style),
        props: cloneDeep(sourceComponent.props),
        class: [],
        ...componentSchemeClone,
      };
      if (!targetComponent.slots[slotName]) {
        targetComponent.slots[slotName] = [];
      }
      targetComponent.slots[slotName].push(slotObj);
      this.$nextTick(() => {
        const divElement = document.getElementById(componentId);
        slotObj._dom = divElement;
        this.$store.commit('updateOneComponentInstance', targetComponent)
      });
      event.stopPropagation();
    },
    handleComponentDragOver(event) {
      event.stopPropagation();
    },
    handleComponentDragEnter(event, targetComponent) {
      const componentStr = event.dataTransfer.getData("component");
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
          slotDiv.style.height = "100%";
          slotDiv.style.display = "flex";
          slotDiv.style.justifyContent = "center";
          slotDiv.style.alignItems = "center";
          slotDiv.style.border = "1px dashed gray";
          slotDiv.addEventListener("dragenter", (dragEnterEvent) => {
            if (
              targetComponent.allowSubComponent &&
              targetComponent.allowSubComponent[slotName]
            ) {
              const allowSubComponentList =
                targetComponent.allowSubComponent[slotName];
              const componentStr =
                dragEnterEvent.dataTransfer.getData("component");
              console.log("componentStr", componentStr);
              if (componentStr) {
                const sourceComponent = JSON.parse(componentStr);
                const { metaInfo, props } = sourceComponent;
                const componentName = metaInfo.__componentName;
                if (
                  allowSubComponentList &&
                  !allowSubComponentList.includes(componentName)
                ) {
                  slotDiv.style.cursor = "not-allowed";
                }
              }
            }
            // 阻止默认行为以允许放置
            dragEnterEvent.preventDefault();
          });
          slotDiv.addEventListener("dragover", (dragOverEvent) => {
            if (
              targetComponent.allowSubComponent &&
              targetComponent.allowSubComponent[slotName]
            ) {
              const allowSubComponentList =
                targetComponent.allowSubComponent[slotName];
              const componentStr =
                dragOverEvent.dataTransfer.getData("component");
              console.log("componentStr", componentStr);
              if (componentStr) {
                const sourceComponent = JSON.parse(componentStr);
                const { metaInfo, props } = sourceComponent;
                const componentName = metaInfo.__componentName;
                if (
                  allowSubComponentList &&
                  !allowSubComponentList.includes(componentName)
                ) {
                  slotDiv.style.cursor = "not-allowed";
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
        divElement.addEventListener("dragleave", (event) => {
          // 移除掉该 dom 节点
          if (divElement) {
            divElement.parentElement?.removeChild(divElement);
          }
        });
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