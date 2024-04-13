<template>
    <div class="the-props">
      <el-form size="mini">
        <el-form-item :label="propsConfig[propKey].label" v-for="propKey in Object.keys(propsConfig)" :key="propKey">
          <form-item-content :propsItem="propsConfig[propKey]" :propsValue="props" :propKey="propKey"></form-item-content>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveProperty">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
<script>
import { PROPS_TYPES } from '@/common/constants'
import FormItemContent from './FormItemContent.vue'
import { cloneDeep } from 'lodash'
export default {
  components: { FormItemContent },
    name: 'TheProps',
    props: {
      activeComponent: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        props: {},
        propsConfig: {}
      }
    },
    methods: {
      saveProperty() {
        const props = cloneDeep(this.props)
        Object.keys(props).forEach(key => {
          if(this.propsConfig[key].type === PROPS_TYPES.objectArray) {
            props[key] = JSON.parse(props[key])
          }
        })
        this.activeComponent.props = props
        this.$store.commit("updateOneComponentInstance", this.activeComponent)
      }
    },
    watch: {
      activeComponent() {
        this.propsConfig = cloneDeep(this.activeComponent.propsConfig || {})
        const props = cloneDeep(this.activeComponent.props || {})
        Object.keys(props).forEach(key => {
          if(this.propsConfig[key]?.type === PROPS_TYPES.objectArray) {
            props[key] = JSON.stringify(props[key])
          }
        })
        this.props = props
      }
    }
  }
</script>
  
  <style lang="less" scoped>
  
  </style>