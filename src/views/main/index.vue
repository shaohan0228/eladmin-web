<template>
  <div class="main">
    首页
    <div class="float-right-list">
      <li class="fr-kong text-center">
        <p class="fr-font">热</p>
        <p class="fr-font">度</p>
        <p class="fr-font">排</p>
        <p class="fr-font">行</p>
        <p class="fr-font">榜</p>
      </li>
      <li class="fr-kong1 bgposition50" />
      <li class="fr-kong1 bgposition100 fr-backtop" style="display: list-item;" @click="toTop($event)" />
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    // 此处true需要加上，不加滚动事件可能绑定不成功
    window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll() {
      const scrolltop = document.documentElement.scrollTop || document.body.scrollTop
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false)
    },
    toTop(e) {
      // e.style.display = 'display: none;'
      let top = document.documentElement.scrollTop || document.body.scrollTop
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50
        if (top <= 0) {
          clearInterval(timeTop)
        }
      }, 10)
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fr-font{
  font-size: 0.4em;
  color: white;
  line-height: .75rem;
  padding-top: .75rem;
}
.float-right-list {
  height: 248px;
  position: fixed;
  bottom: 50px;
  right: 80px;
  z-index: 9999;
  transform: translateZ(0);
}
.fr-kong {
  width: 40px;
  height: 136px;
  border: 0px solid #c40303;
  list-style: none;
  margin-bottom: 4px;
  background: #c40303;
  text-align: center;
  line-height: 36px;
  position: relative;
  cursor: pointer;
}
.fr-kong1 {
  width: 40px;
  height: 36px;
  border: 0px solid #c40303;
  list-style: none;
  margin-bottom: 4px;
  background: #fff url(../../assets/images/float-right-tb-tel.png) no-repeat 0 0;
  text-align: center;
  line-height: 36px;
  position: relative;
  cursor: pointer;
}
.bgposition50 {
  background-position: -37px -9px;
}
.bgposition100 {
  background-position: -154px -4px;
}
</style>
