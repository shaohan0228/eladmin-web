<template>
  <div class="video">
    <meta name="referrer" content="no-referrer">
    <resources-banner>
      <template>
        视频学习
      </template>
    </resources-banner>
    <div class="video-con">
      <div class="w1200 clearfix">
        <div class="videodiv mtop20 clearfix">
          <div class="video-play">
            <video id="video" ref="videoshow" :src="dataInfo.video_url_address" controls="controls" style="width:100%; height:100%; object-fit: cover" />
          </div>
          <div class="video-infor" :style="theStyle">
            <div class="video-infor-tit">{{ dataInfo.title }} </div>
            <div class="video-infor-tip">
              <div>上传人：{{ dataInfo.author }}</div>
              <div>上传时间：{{ dataInfo.create_time }}</div>
            </div>
            <div class="fsize14 g9e9ea0 mtop20 fw">内容简介</div>
            <div class="video-infor-txt">{{ dataInfo.introduce }}</div>
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
import { detailsVideo } from '../../api/upload/video'
export default {
  components: { ResourcesBanner, Footer },
  data() {
    return {
      videoId: 0,
      theStyle: { height: '582px' },
      dataInfo: {}
    }
  },
  async mounted() {
    await this.getVideoInfo()
  },
  methods: {
    // 视频
    async getVideoInfo() {
      this.videoId = this.$route.query.videoId
      detailsVideo(this.videoId).then(res => {
        if (res && res.code === 200) {
          this.dataInfo = res.data
        } else {
          Notification.success(`${res.msg || '发生错误'}`)
        }
      })
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
