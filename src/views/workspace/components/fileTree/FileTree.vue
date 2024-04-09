<template>
  <div class="file-tree">
    <template v-if="loadedDir">
      <el-tree :data="fileTree" :props="defaultProps" node-key="id" @node-click="onNodeClick"></el-tree>
    </template>
    <el-button v-else @click="initFileTree">
      打开文件夹
    </el-button>
  </div>
  
</template>

<script>
import { nanoid } from 'nanoid'
export default {
  name: 'FileTree',
  data() {
    return {
      loadedDir: false,
      fileTree: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  mounted() {
  },
  methods: {
    async initFileTree() {
      
      const handle = await window.showDirectoryPicker()
      const traverse = async (handle, parent) => {
        if(handle.entries) {
          const dirs = handle.entries()
          for await (const entry of dirs) {
            if(!Array.isArray(parent.children)) {
              parent.children = []
            }
            const fileHandle = entry[1]
            if(fileHandle.kind == 'file') {
              const file = await fileHandle.getFile()
              parent.children.push({
                id: nanoid(),
                name: file.name,
                fileHandle: fileHandle,
                type: 'file'
              })
            } else {
              if(entry[0] != 'node_modules') {
                const dir = {
                  name: entry[0],
                  type: 'dir',
                  id: nanoid(),
                }
                parent.children.push(dir)
                await traverse(fileHandle, dir)
              }
            }
          }
        }
      }
      const root = {id: nanoid(), name: handle.name, type: handle.kind, isRoot: true}
      await traverse(handle, root)
      this.sortTree(root.children)
      this.fileTree = root.children
      this.loadedDir = true
    },
    sortTree(list) {
      list.sort((a,b) => {
        const aTypeIndex = ['dir', 'file'].findIndex(t => t == a.type) 
        const bTypeIndex = ['dir', 'file'].findIndex(t => t == b.type) 
        return aTypeIndex - bTypeIndex
      })
      list.forEach(item => {
        if(item.children) {
          this.sortTree(item.children)
        }
      })
    },
    onNodeClick(data) {
      this.$emit('nodeClick', data)
    },
    async getTextContent(item) {
      const file = await item.fileHandle.getFile()
      const text = await file.text()
      return text
    }
  }
}
</script>

<style scoped lang="less">

</style>