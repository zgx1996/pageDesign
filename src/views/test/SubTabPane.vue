<template>
    <el-tab-pane :key="item.name" :name="item.name" :label="item.label">
    {{ item.label }}
    </el-tab-pane>
</template>

<script>
export default {
    name: 'SubTabPane',
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            list: [ { name: 'user', label: '用户' }, { name: 'config', label: '配置' } ]
        }
    }
}
</script>

<style>

</style>