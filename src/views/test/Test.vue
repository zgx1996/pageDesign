<template>
  <div>
	<MyElTab value="config">
		<!-- <el-tab-pane name="role" label="角色">
			角色
		</el-tab-pane> -->
		<SubTabPane v-for="item in list" :key="item.name" :item="item"></SubTabPane>
	</MyElTab>	
  </div>
</template>

<script>
import SubTabPane from './SubTabPane.vue'
import MyElTab from 'element-ui/packages/tabs'
export default {
  components: { SubTabPane, MyElTab },
  name: 'Test',
	data() {
		return {
			list: [ { name: 'user', label: '用户' }, { name: 'config', label: '配置' } ]
		}
	}
}
</script>

<style>

</style>