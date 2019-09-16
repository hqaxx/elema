<template>
<div class="sellerWrapper" ref='sellerWrapper'>
<div class="content">
    <div class="simplePro">
        <h5>{{seller.name}}</h5>
        <star :score='seller.score'></star><span class='monthSell'>月售{{seller.sellCount}}单</span>
        <div class='favorite' @click='store'><span class='iconfont' :class='{store: activeStore}'>&#xeca1;</span><p>{{stored}}</p></div>
    </div>
    <div class='sendingDetail'>
        <div><h5>起送价</h5><p class='minPrice'>{{seller.minPrice}}<span>元</span></p></div>
        <div><h5>商家配送</h5><p class='deliveryPrice'>{{seller.deliveryPrice}}<span>元</span></p></div>
        <div><h5>平均配送时间</h5><p class="deliveryTime">{{seller.deliveryTime}}<span>分钟</span></p></div>
    </div>
    <div class="trap"></div>
    <div class="detailPro">
        <h3>公告与活动</h3>
        <p>{{seller.bulletin}}</p>
        <ul class='margins'>
            <li v-for='(support,index) in seller.supports' :key=index>
                <span :class='mapClass[support.type]'></span><span>{{support.description}}</span>
            </li>
        </ul>
    </div>
    <div class="trap"></div>
    <h3 class='sellerPics'>商家实景</h3>
    <div class='picWrapper' ref='picWrapper'>
        <ul ref='piclist'>
            <li  v-for='(img,index) in seller.pics' :key=index><img :src="img" alt=""></li>
        </ul>
       
    </div>
    <div class="trap"></div>
    <div class="sellerInf">
        <h3>商家信息</h3>
        <ul>
            <li v-for='(info,index) in seller.infos' :key=index>
                <p>{{info}}</p>
            </li>
        </ul>
    </div>
</div>
</div>
</template>

<script>
import star from '../star/Star.vue'
import BScroll from 'better-scroll'
export default {
    name:'seller',
    data(){
        return{
            mapClass:["decrease","discount","unique","invoice","guarantee"],
        }
    },
    computed:{
        seller(){
            return this.$store.state.seller
        },
        stored(){
            return this.$store.state.activeStore?'已收藏':'未收藏'
        },
        activeStore(){
            return this.$store.state.activeStore
        }
    },
    components:{
        star
    },
    methods:{
        store(){
            this.$store.state.activeStore=!this.$store.state.activeStore
        }
    },
    mounted(){
        this.$nextTick(()=>{
             this.slllerScroll=new BScroll(this.$refs.sellerWrapper,{click:true,probType:3})
        })
        if(this.seller.pics){
            let picwidth=120
            let margin=12
            let width=(picwidth+margin)*this.seller.pics.length-margin
            this.$refs.piclist.style.width=width+'px'
            this.$nextTick(()=>{
                this.picScroll=new BScroll(this.$refs.picWrapper,{
                    scrollX:true,
                    eventPassthrough:'vertical'
                })
            })
        }
    }
}
</script>

<style>
.store{
    color: rgb(240,20,20);
}
.decrease {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("decrease_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.discount {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("discount_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.guarantee{
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("guarantee_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.unique{
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("special_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.invoice{
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("invoice_1@2x.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.sellerWrapper{
    position: absolute;
    left: 0;
    overflow: hidden;
    width:100%;
    height:75%;
}
.favorite{
    position: absolute;
    right: 18px;
    top: 18px;
    text-align: center;
}
.favorite .iconfont{
    font-size: 20px;
    line-height: 24px;
}
.favorite span:last-child{
    font-size: 10px;
    color: rgb(77,85,93);
    line-height: 10px;
}
.simplePro{
    padding:18px;
    position: relative;
    padding-bottom: 0px;
}
.simplePro .ratingStar{
    margin: 8px 8px 0px 0px;
}
.simplePro h5{
    font-size: 14px;
    line-height: 14px;
}
.simplePro>div{
    display:inline-block;
}
.simplePro .star{
    background-size:80%
}
.monthSell{
    font-size: 10px;
    color: rgb(77,85,93);
    line-height: 34px;
    vertical-align: top;
}
.simplePro:after{
     content:'';
    display:inline-block;
    width:100%;
    height:0.5px;
    background-color:  rgba(7,17,27,.1);
}
.sendingDetail{
    display: flex;
    height:40px;
    padding:18px;
}
.sendingDetail>div{
    text-align: center;
    flex-grow:1;
    border-right:0.5px solid rgba(7,17,27,.1);
}
.sendingDetail>div:last-child{
    border-right:none;
}
.sendingDetail h5{
    font-size: 10px;
    color: rgb(147,152,159);
    line-height: 10px;
}
.sendingDetail p{
    font-size: 24px;
    font-weight: 200;
    line-height: 24px;
    margin:4px 0px 18px 0px;
    color: black;
}
.sendingDetail p span{
    font-size: 10px;
}
.trap{
    height: 18px;
    background-color: #F2F4F6;
    border-top: 1px solid #E8EAEB;
    border-bottom: 1px solid #E8EAEB;
}
.detailPro{
    padding:18px;
}
.detailPro h3{
    font-size: 12px;
}
.detailPro p{
    font-size: 12px;
    font-weight: 200;
    color: rgb(240,20,20);
    line-height: 24px;
    padding-left: 10px;
    padding-bottom:16px;
}
.margins li{
    border-top: 0.5px solid rgb(0,0,0,.1);
    padding:12px;
}
.margins li span:last-child{
    font-size: 12px;
    font-weight: 200;
    line-height: 16px;
    vertical-align: super;
    margin-left: 4px;
}
.picWrapper img{
    width:120px;
    height:90px;
}
.picWrapper li{
    display: inline-block;
    margin:0px 6px;
}
.picWrapper li:first-child{
    margin-left:0px
}
.picWrapper li:last-child{
    margin-right:0px;
}
.sellerPics{
    margin: 18px 0px 12px 18px;
}
.sellerInf{
     padding:18px;
}
.sellerInf p{
    font-size: 12px;
    font-weight: 200;
    line-height: 16px;
}
.sellerInf h3{
    margin-bottom: 12px;
}
.sellerInf li{
    padding:16px 0px;
    border-top: 0.5px solid rgba(0,0,0,.1);
}
</style>