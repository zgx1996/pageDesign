<template>
  <div class="the-style">
    <!-- <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="className" name="className">
        <el-input v-model="style.class"></el-input>
      </el-collapse-item>
      <el-collapse-item title="字体" name="font">
        <el-input v-model="fontSize"></el-input>
      </el-collapse-item>
      <el-collapse-item title="margin" name="margin">
        
      </el-collapse-item>
      <el-collapse-item title="position" name="position">
        
      </el-collapse-item>
      <el-collapse-item title="style" name="style">
        <textarea type="textarea" ref="styleRef" v-model="styleStr"></textarea>
      </el-collapse-item>
    </el-collapse> -->
    <div id="styleEdit" type="textarea" ref="styleRef"></div>
    <el-button @click="updateStyle" size="small" type="primary">确定</el-button>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor';
import 'monaco-editor/esm/vs/language/css/monaco.contribution'
export default {
  name: 'TheStyle',
  props: {
    activeComponent: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    this.fileEditor = null
    return {
      activeNames: ['className', 'style'],
      style: {},
      fontSize: '14px',
    }
  },
  mounted() {
  },
  methods: {
    createEditor() {
      if(this.fileEditor) {
        return
      }
      const dom = document.getElementById("styleEdit")
      if(!dom) {
        return
      }
      const fileEditor = monaco.editor.create(dom, {
        language: 'json',
        foldingStrategy: 'indentation',
        automaticLayout: true, // 自动布局
        folding: true, // 是否启用代码折叠
        theme: 'vs-dark'
      })
      this.fileEditor = fileEditor
    },
    changeLanguage() {
      monaco.editor.setModelLanguage(this.fileEditor.getModel(), this.getLanguage(this.fileType))
    },
    updateStyle() {
      console.log("this.editor", this.editor)
      const value = this.fileEditor.getValue()
      this.activeComponent.style = JSON.parse(value)
    }
  },
  watch: {
    activeComponent() {
      this.style = this.activeComponent.style || {}
      const styleStr = JSON.stringify(this.style||{})
      if(!this.fileEditor) {
        this.createEditor()
      }
      this.fileEditor.setValue(styleStr)
    }
  }
}
</script>

<style lang="less" scoped>
.the-style{
  height: 100%;
  #styleEdit{
    height: calc(100% - 60px);
  }
}

</style>