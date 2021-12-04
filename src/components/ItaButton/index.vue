<template>
  <el-button v-bind="$attrs" class="ita-button" v-on="$listeners">
    <slot name="default" />
  </el-button>
</template>
<script>
export default {
  name: 'ItaButton'
}
</script>

<style lang="scss" scoped>

.ita-button {
  @apply border-red-600 text-red-600;
  &:hover {
    @apply border-red-600 bg-red-100 text-red-600
  }

  &.el-button--primary {
    @apply bg-red-600 text-white;
    &:hover {
      @apply bg-red-700
    }
  }
}
</style>

