<template>
  <div class="editor">
    <splitpanes class="default-theme">
      <pane class="meta-component-wrapper" min-size="0" max-size="25">
        <meta-component :getComponentInstanceList="getComponentInstanceList" @instanceNodeClick="onInstanceNodeClick" @moveNode="onMoveNode" @deleteComponentInstance="onDeleteComponentInstance"></meta-component>
      </pane>
      <pane class="editor-content-wrapper">
        <editor-content ref="editorContentRef" @changeActiveComponent="changeActiveComponent"></editor-content>
      </pane>
      <pane class="meta-property-wrapper" max-size="20">
        <meta-property :activeComponent="activeComponent"></meta-property>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import MetaComponent from "./components/metaComponent/MetaComponent.vue";
import MetaProperty from "./components/metaProperty/MetaProperty.vue";
import EditorContent from "./components/editorContent/EditorContent.vue";
export default {
  name: "TheEditor",
  components: { Splitpanes, Pane, MetaComponent, MetaProperty, EditorContent },
  data() {
    return {
      activeComponent: null
    }
  },
  methods: {
    getComponentInstanceList() {
      return this.$refs.editorContentRef.getComponentInstanceList()
    },
    changeActiveComponent(componentInstance) {
      console.log("激活的组件实例 componentInstance", componentInstance)
      this.activeComponent = componentInstance;
    },
    onInstanceNodeClick(data) {
      this.activeComponent = data
      this.$refs.editorContentRef.setActiveComponentInstance(data)
    },
    onDeleteComponentInstance(data) {
      this.$refs.editorContentRef.deleteComponentInstance(data)
    },
    onMoveNode({draggingNode, dropNode, dropType, ev, componentInstanceTree}) {
      this.$refs.editorContentRef.moveNode({draggingNode, dropNode, dropType, ev, componentInstanceTree})
    },
  },
};
</script>

<style lang="less">
.editor {
  height: 100%;
}
</style>