<template>
  <div class="banner drive-banner">
    <div class="drive-tit">
      <slot name="default" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'ResourcesBanner',
  props: ['bannerclass']
}
</script>
<style scoped>
  .drive-banner{background: url(../../assets/images/drive1.png);background-repeat: no-repeat;background-position: top center;}
  .drive-tit{font-size: 46px;color: #fff;text-align: center;padding-top: 160px;}
</style>
