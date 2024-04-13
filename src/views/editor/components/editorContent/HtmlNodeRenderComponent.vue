<template>
	<div
    v-if="componentInstance.componentName === 'Div'"
    :id="componentInstance.componentId"
    :data-id="componentInstance.componentId"
    :style="componentInstance.style"
    class="component-common-style"
    :class="{
      isActive:
        componentInstance.componentId == activeComponentInstance?.componentId,
    }"
  >

  <render-component
    v-for="slotObj in componentInstance.slots.default"
    :key="slotObj.componentId"
    :componentInstance="slotObj"
    :activeComponentInstance="activeComponentInstance"
    :componentInstanceList="componentInstance.slots.default"
  ></render-component>
  </div>
  <span
    v-else-if="componentInstance.componentName === 'Span'"
    :id="componentInstance.componentId"
    :data-id="componentInstance.componentId"
    :style="componentInstance.style"
    class="component-common-style"
    :class="{
      isActive:
        componentInstance.componentId == activeComponentInstance?.componentId,
    }"
  >
    <render-component
      v-for="slotObj in componentInstance.slots.default"
      :key="slotObj.componentId"
      :componentInstance="slotObj"
      :activeComponentInstance="activeComponentInstance"
      :componentInstanceList="componentInstance.slots.default"
    ></render-component>
  </span>
  <ul
    v-else-if="componentInstance.componentName === 'Ul'"
    :id="componentInstance.componentId"
    :data-id="componentInstance.componentId"
    :style="componentInstance.style"
    class="component-common-style"
    :class="{
      isActive:
        componentInstance.componentId == activeComponentInstance?.componentId,
    }"
  >
    <render-component
      v-for="slotObj in componentInstance.slots.default"
      :key="slotObj.componentId"
      :componentInstance="slotObj"
      :activeComponentInstance="activeComponentInstance"
      :componentInstanceList="componentInstance.slots.default"
    ></render-component>
  </ul>
  <li
    v-else-if="componentInstance.componentName === 'Li'"
    :id="componentInstance.componentId"
    :data-id="componentInstance.componentId"
    :style="componentInstance.style"
    class="component-common-style"
    :class="{
      isActive:
        componentInstance.componentId == activeComponentInstance?.componentId,
    }"
  >
    <render-component
      v-for="slotObj in componentInstance.slots.default"
      :key="slotObj.componentId"
      :componentInstance="slotObj"
      :activeComponentInstance="activeComponentInstance"
      :componentInstanceList="componentInstance.slots.default"
    ></render-component>
  </li>
  <span v-else-if="componentInstance.componentName === 'Text'">
    {{ componentInstance.props.textContent }}
  </span>
</template>

<script>
export default {
  name: 'HtmlNodeRenderComponent',
  components: {
    RenderComponent: () => import('./RenderComponent.vue')
  },
	props: {
    componentInstance: {
      type: Object,
      default: () => {},
    },
    activeComponentInstance: {
      type: Object,
      default: () => null,
    },
    componentInstanceList: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    componentInstanceList: {
      handler: function() {
        this.$nextTick(() => {
          console.log('xxxxxxx')
          this.$forceUpdate()
        })
      },
      immediate: true
    }
  }
}
</script>

<style>

</style>