<template>
<div>
  <div class="header" @click='showDetail'>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span>{{seller.name}}</span>
        </div>
        <div class="description">
          <span>{{seller.description}}</span>
          <span>{{seller.deliveryTime}}/分钟送达</span>
        </div>
        <div class="supports" v-if="seller.supports">
          <span :class="classMap[seller.supports[0].type]"></span>
          <span class='description'>{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="count-wrapper" v-if='seller.supports'>
          {{seller.supports.length}}个<span style='padding-left:4px;'>></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
        <span class='gg'></span>
        <span class='bulletin'>{{seller.bulletin}}</span>
        <span class='iconfont jiantou'>&#xe74b;</span>
    </div>
    <div class="wrapper">
      <img :src="seller.avatar" alt />
    </div>

   <div v-show='detail' class="detail">
     <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <p class='detailName'>{{seller.name}}</p>
          <star :score='score'></star>
          <div class='bargin' v-if='seller.supports'>
              <h5><span>优惠信息</span></h5>
              <ul class='barginInf'>
                <li v-for='(inf,index) in seller.supports' :key=index>
                  <span class="barginIcon" :class='classMap[seller.supports[index].type]'></span>
                  <span class="barginCon">{{seller.supports[index].description}}</span>
                </li>
              </ul>
          </div>
          <div class="sellerBulletin">
            <h5><span>商家公告</span> </h5>
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click.stop='closeDetail'>
        <span class='iconfont'>&#xe641;</span>
    </div>
     
   </div>
  </div>
</div>
</template>

<script>
import star from '../star/Star.vue'
export default {
  name:'vHeader',
  components:{
    star
  },
  data(){
    return{
      classMap:[],
      detail:false
    }
  },
  computed:{
    score(){
      return this.$store.state.score
    },
    seller(){
      return this.$store.state.seller
    }
  },
  methods:{
      showDetail(){
        this.detail=!this.detail
        console.log(this.detail)
      },
      closeDetail(){
        console.log('close')
        this.detail=!this.detail
        console.log(this.detail)
      }
  },
  mounted() {
    this.classMap = ["decrease", "discount", "invoice", "guarantee","special"];
  },
  update(){
    this.closeDetail()
  }
};
</script>

<style>

.header {
  position: relative;
  background-color: rgba(7, 17, 27, 0.5);
  overflow: hidden;
}
.header .wrapper {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  filter: blur(10px);
  z-index: -1;
}
.header .content-wrapper {
  margin-top: 24px;
  margin-left: 24px;
  font-size: 0;
}
.header .content-wrapper > div {
  display: inline-block;
}
.content-wrapper .count-wrapper{
  position:absolute;
  bottom:45px;
}
.header .avatar img {
  width: 64px;
  height: 64px;
  border-radius: 4px;
}
.header .content {
  margin-left: 16px;
}
.header .content .title {
  font-size: 16px;
  color: rgb(255, 255, 255);
  font-weight: bold;
  line-height: 18px;
}
.header .content .brand {
  background-image: url("./brand@2x.png");
  width: 30px;
  display: inline-block;
  height: 18px;
  background-repeat: no-repeat;
  background-size: 100%;
}
.header .content .description {
  font-size: 12px;
  color: rgba(255, 255, 255);
  font-weight: 200;
  line-height: 12px;
  margin-top: 8px;
  margin-bottom: 10px;
}
.supports .description{
    margin-left: 4px;
    vertical-align: top;
}
.header .content .supports {
  font-size: 10px;
  color: rgba(255, 255, 255);
  font-weight: 200;
  line-height: 12px;
}
.header .description {
  font-size: 12px;
  font-weight: 200;
  line-height: 12px;
  margin-bottom: 10px;
}
.header .supports {
  font-size: 10px;
  font-weight: 200;
  line-height: 12px;
}
.header .decrease {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("decrease_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.header .discount {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("discount_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.header .guarantee{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("guarantee_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.header .special{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("special_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.header .invoice{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: url("invoice_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.count-wrapper{
    position:absolute;
    color:rgba(255,255,255);
    right:12px;
    bottom:18px;
    height:24px;
    padding:0px 8px;
    line-height:24px;
    font-size: 10px;
    font-weight:200 ;
    background:rgba(0,0,0,0.2);
    border-radius: 14px;
}
.bulletin-wrapper{
    background-color:rgb(7,17,27,.2);
    height:28px;
    margin-top: 18px;
    color:white;
}
.bulletin-wrapper .gg{
    width: 24px;
    height: 21px;
    background-image: url('bulletin@2x.png');
    margin-left: 12px;
    margin-right: 4px;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100%;
}
.bulletin{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    font-weight: 200;
    line-height: 28px;
    height: 28px;
    width: 300px;
    white-space: nowrap;
   
}
.header .gt{
    margin-left:2px;
    line-height: 28px;
    vertical-align: top;
}
.detail{
  position:fixed;
		z-index:1;
		top:0px;
		left:0px;
		width:100%;
		height:100%;
		overflow: auto;
		background:rgba(7,17,27,0.8);
}
.detail .clearfix::after {
    display: block;
    content: ".";
    height: 0;
    clear: both;
    visibility: hidden;
}
.header .detail-wrapper{
		height: auto;
    min-height: 100%;
	}
.header .detail-main{
    color: white;
    padding-bottom: 30px;
    margin: 40px 24px 0px 24px;
}
.detail-main .detailName{
  font-size:16px;
  font-weight:700;
  color:white;
  line-height:16px;
}
.detail-main h5{
  font-size:14px;
  font-weight:700;
  line-height:14px;
  text-align:center;
  position: relative;
  margin-bottom:24px;
}
.detail-main h5 span:before{
  content:'';
  position:absolute;
  width:112px;
  height:0.5px;
  background-color:rgba(255,255,255,0.2);
  top:40%;
  left:0px;
}
.detail-main h5 span:after{
  content:'';
  position:absolute;
  width:112px;
  height:0.5px;
  background-color:rgba(255,255,255,0.2);
  top:40%;
  right:0px;
}
.detail-main p{
  text-align:center;
}
.detail-main .bargin{
  margin-top:17px;
}
.detail-main .barginCon{
  padding-left: 6px;
  font-size: 12px;
  line-height: 12px;
}
.detail-main .sellerBulletin{
  margin-top:28px;
}
.detail-main .sellerBulletin p{
  text-align:left;
  font-size:12px;
  font-weight:200;
  line-height:24px;
}
.detail-main .ratingStar{
  text-align:center;
  margin-top:16px;
}
.detail-main .ratingStar span{
   background-size: 90%;
   margin:6px;
}
.detail-close{
  text-align: center;
    position: relative;
    margin-top: -30px;
    height: 30px;
    clear: both;
}
.header .iconfont{
  color: white;
  transform: rotate(90deg);
}
.barginInf li{
  height: 24px;
}
.header .jiantou{
  position: absolute;
  transform: rotate(0deg);
  font-size: 12px;
  line-height: 28px;
}
</style>