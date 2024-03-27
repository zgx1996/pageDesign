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
    <textarea type="textarea" ref="styleRef"></textarea>
    <el-button @click="updateStyle">确定</el-button>
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/css/css.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/css-hint.js'
export default {
  name: 'TheStyle',
  props: {
    activeComponent: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      activeNames: ['className', 'style'],
      style: {},
      fontSize: '14px',
    }
  },
  mounted() {
    const editor = CodeMirror.fromTextArea(this.$refs.styleRef, {
      lineNumbers: true,
      mode: 'text/css',
      theme: "base16-light", // 主题样式
      lint: true,
      tabSize: 2,
      lineWrapping: true, // 自动换行
            matchBrackets: true, // 括号匹配显示
            autoCloseBrackets: true, // 输入和退格时成对  
    });
    this.editor = editor
    editor.on('cursorActivity',() => {
      editor.showHint()
    })

  },
  methods: {
    updateStyle() {
      console.log("this.editor", this.editor)
      const value = this.editor.getValue()
      console.log('value', value)
      this.activeComponent.style = JSON.parse(value)
    }
  },
  watch: {
    activeComponent() {
      this.style = this.activeComponent.style || {}
      const styleStr = JSON.stringify(this.style||{})
      this.editor.setValue(styleStr)
    }
  }
}
</script>

<style lang="less" scoped>

</style>