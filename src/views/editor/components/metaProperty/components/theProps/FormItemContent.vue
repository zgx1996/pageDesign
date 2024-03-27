<template>
    <el-input v-model="propsValue[propKey]" v-if="propsItem.type === PROPS_TYPES.string"></el-input>
    <el-input v-model="propsValue[propKey]" type="textarea" v-else-if="propsItem.type === PROPS_TYPES.objectArray"></el-input>
    <el-input-number v-model="propsValue[propKey]" v-else-if="propsItem.type === PROPS_TYPES.number"></el-input-number>
    <el-input v-model="propsValue[propKey]" type="textarea" v-else-if="propsItem.type === PROPS_TYPES.object"></el-input>
    <el-input v-model="propsValue[propKey]" type="textarea" v-else-if="propsItem.type === PROPS_TYPES.function"></el-input>
    <el-switch v-model="propsValue[propKey]" v-else-if="propsItem.type === PROPS_TYPES.boolean"></el-switch>
    <el-select v-model="propsValue[propKey]" v-else-if="propsItem.type === PROPS_TYPES.enum">
        <el-option v-for="option in propsItem.enumData" :key="option.label" :label="option.label" :value="option.value"></el-option>
    </el-select>
</template>

<script>
import { PROPS_TYPES } from "@/common/constants"

export default {
    data() {
        return {
            PROPS_TYPES
        }
    },
    props: {
        propKey: {
            type: String,
            default: ''
        },
        propsValue: {
            type: Object,
            default: () => {}
        },
        propsItem: {
            type: Object,
            default: () => {}
        }
    },
    created() {
        
    }
  }
</script>

