<template>
  <div class="workspace">
    <splitpanes class="default-theme">
      <Pane :size="30" min-size="10">
        <FileTree @nodeClick="onNodeClick" ref="fileTreeRef"></FileTree>
      </Pane>
      <Pane>
        <el-tabs v-model="activeTab">
          <el-tab-pane name="code" label="文件内容">
            <FileEditor :fileContent="fileContent" :fileType="fileType"></FileEditor>
          </el-tab-pane>
          <el-tab-pane name="design" label="设计区域">
            <Editor></Editor>
          </el-tab-pane>
        </el-tabs>
      </Pane>
    </splitpanes>
  </div>
</template>

<script>
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import FileTree from './components/fileTree/FileTree.vue'
import FileEditor from './components/fileEditor/FileEditor.vue'
import Editor from '../editor/Editor.vue'
export default {
  name: 'Workspace',
  components: { Splitpanes, Pane, FileTree, FileEditor, Editor },
  data() {
    return {
      activeTab: 'code',
      fileContent: '',
      fileType: 'plaintext'
    }
  },
  methods: {
    async onNodeClick(nodeData) {
      if(nodeData.type === 'file') {
        const fileContent = await this.$refs.fileTreeRef.getTextContent(nodeData)
        const fileName = nodeData.name
        if(fileName.indexOf('.') > 0) {
          this.fileType = fileName.substr(fileName.lastIndexOf(".") + 1)
        } else {
          this.fileType = 'plaintext'
        }
        this.fileContent = fileContent
      }
    }
  }
}
</script>

<style scoped lang="less">
.workspace{
  width: 100%;
  height: 100%;
  .el-tabs{
    height: 100%;
    ::v-deep{
      .el-tabs__content{
      height: calc(100% - 40px);
      .el-tab-pane{
        height: 100%;
      }
    }
    }
  }
}
</style>