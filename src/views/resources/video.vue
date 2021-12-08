<template>
  <div class="video">
    <resources-banner>
      <template>
        视频学习
      </template>
    </resources-banner>
    <div class="video-con">
      <div class="w1200 clearfix">
        <div class="videodiv mtop20 clearfix">
          <div class="video-play">
            <video id="video" ref="videoshow" :src="dataInfo.videoPath" controls="controls" style="width:100%; height:100%; object-fit: cover" />
          </div>
          <div class="video-infor" :style="theStyle">
            <div class="video-infor-tit">{{ dataInfo.title }} </div>
            <div class="video-infor-tip">
              <div>上传人：{{ dataInfo.author }}</div>
              <div>上传时间：{{ dataInfo.time }}</div>
            </div>
            <div class="fsize14 g9e9ea0 mtop20 fw">内容简介</div>
            <div class="video-infor-txt">{{ dataInfo.remark }}</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer'
import ResourcesBanner from '@/components/ResourcesBanner'
import { getVideoInfo } from '../../api/upload/video'
export default {
  components: { ResourcesBanner, Footer },
  data() {
    return {
      videoId: 0,
      theStyle: { height: '582px' },
      dataInfo: {
        videoPath: 'http://gainetvideo.kuaiyunds.com/gainetvideo/2019年/一副沙画，感动了所有人.mp4',
        title: '河南省信创综合服务保障中心',
        author: '河南省信创综合服务保障中心',
        remark: '党的主要思想包括指导思想和思想路线。 中国共产党 的指导思想:: 中国共产党以马克思列宁主义、毛泽东 思想、邓小平理论和“三个代表”重要思想作为自己 的行动指南。 党的思想路线基本内容是:一切从实际 出发,理论联系实际,实事求是,在实践中检验和发展真理。',
        time: '2021-11-12'
      }
    }
  },
  computed: {
  },
  created: {
    // this.getVideoInfo()
  },
  mounted() {
    this.init()
  },
  methods: {
    // 视频
    init() {
      const video = document.getElementById('video')
      video.addEventListener('canplay', function() {
        this.theStyle.height = this.videoHeight + 'px'
        console.info('this.height:' + this.videoHeight)
      })
    },
    getVideoInfo() {
      this.videoId = this.$route.query.videoId
      const result = getVideoInfo(this.videoId)
      this.dataInfo = result.data
    }
  }
}
</script>
<style scoped>
  @import "../../assets/styles/common.css";
  html,body{width: 100%;height: 100%;min-height: 100%;min-height: 100vh;background: #f8f8f8;}
  .video{background: #f8f8f8;}
  .video-con{padding:0px 0 40px;}
  .videodiv{width: 1200px;height:582px;}
  .video-play{width: 870px;float: left; height:582px;}
  .video-infor{background: #1e1e24;width: 330px;float: right;height: 100%;padding:10px 25px;box-sizing: border-box;}
  .video-infor-tit{font-size: 16px;color: #dcdcdc;font-weight: bold;margin-top:26px;}
  .video-infor-tip{color: #9c9c9f;font-size: 12px;margin-top:15px;line-height:26px;}
  .video-infor-txt{font-size: 12px;color: #dcdcdc;margin-top: 10px;line-height: 20px;opacity: 0.76;}
  video:focus{outline: 0;}
</style>
