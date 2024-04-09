<template>
  <div class="file-editor">
    <div id="theFileEditor" ref="theFileEditorRef"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
export default {
  name: 'FileEditor',
  props: {
    fileContent: {
      type: String,
      default: '',
    },
    fileType: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      fileEditor: null
    }
  },
  methods: {
    createEditor() {
      if(this.fileEditor) {
        return
      }
      const dom = document.getElementById("theFileEditor")
      if(!dom) {
        return
      }
      const fileEditor = monaco.editor.create(dom, {
        language: this.getLanguage(this.fileType),
        foldingStrategy: 'indentation',
        automaticLayout: true, // 自动布局
        folding: true, // 是否启用代码折叠
        theme: 'vs-dark'
      })
      window.monaco = monaco
      window.fileEditor = fileEditor
      this.fileEditor = fileEditor
    },
    changeLanguage() {
      monaco.editor.setModelLanguage(this.fileEditor.getModel(), this.getLanguage(this.fileType))
    },
    getLanguage(fileType) {
      let mapObj = {
        'js': 'javascript',
        'json': 'json',
        'md': 'markdown',
        'sh': 'shell'
      }
      if(mapObj[fileType]) {
        return mapObj[fileType]
      } else {
        return fileType
      }
    },
  },
  watch: {
    fileContent: {
      handler: function(newFileContent) {
        this.createEditor()
        if(this.fileEditor) {
          this.changeLanguage()
          this.fileEditor.setValue(newFileContent)
        }
      },
      immediate: true
    }
  }
  
}
</script>

<style scoped lang="less">
.file-editor{
  width: 100%;
  height: 100%;
  #theFileEditor{
    width: 100%;
    height: 100%;
  }
}
</style>