<template>
<div ref='ratingScroll' class='ratingWrapper'>
    <div class="content">
    <div class='scoreDetail'>
        <div class="score">
            <span class='scoreVal'>{{seller.score}}</span>
            <p>综合评分</p>
            <p class='rankRate'>高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="scoreItem">
            <p><span>服务态度</span><star :score='seller.serviceScore' class='serviceScore'></star><span class='serviceVal'>{{seller.serviceScore}}</span></p>
            <p><span>商品评分</span><star :score='seller.foodScore' class='foodScore'></star><span class='foodVal'>{{seller.foodScore}}</span></p>
            <p><span>送达时间</span><span class='deliveryTime'>{{seller.deliveryTime}}分钟</span></p>
            
        </div>
    </div>
    <div class="trap"></div>
    <div class="ratingCate">
        <span class='all' @click='showAll'>全部{{all}}</span>
        <span class="satisfied" @click='showSatisfied'>满意{{satisfied}}</span>
        <span class='dispionted' @click='showDispionted'>不满意{{dispointed}}</span>
    </div>
    <div class="chooseRating">
        <span class='iconfont gou' @click='onlyCon' :class='{onlyCon:onlycon}'>&#xe615;</span><span>只看有内容的评价</span>
    </div>
    <div class='ratingDetail'>
            <div class='userRating' v-for='(rating,index) in ratings' :key=index>
                <span class='userAvatar' :style="{'backgroundImage': 'url(' +rating.avatar + ')'}"></span>
                <div>
                    <p><span class="username">{{rating.username}}</span><span class='orderTime'>{{rating.rateTime | formatDate}}</span></p>
                    <p>
                        <star class="userXing" :score='rating.score'></star>
                        <span class='sendingTime'>{{rating.deliveryTime}}分钟送达</span></p>
                    <h5 class='userCon'>{{rating.text}}</h5>
                    <p class='recommendDetail'><span class='iconfont' :class='hand[rating.rateType]'></span>
                        <span v-for='(recommend,inx) in rating.recommend' :key=inx class='recommend'>{{recommend}}</span>
                    </p>
                </div>
                
            </div>
    </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import star from '../star/Star.vue'
import formatDate from '../../../../libs/date.js'
const errno=0
export default {
    name:'rating',
    data(){
        return{
            hand:['icon-zan1','icon--cai'],
            ratingType:0,
            active:'satisfied',
            onlycon:false
        }
    },
    filters:{
        formatDate(time){
            let date=new Date(time)
            return formatDate(date,'yyyy-MM-dd hh:mm')
        }

    },
    components:{
        star
    },
    computed:{
        ratings(){
            if(this.ratingType==0){
                return this.$store.state.ratings
            }else if(this.ratingType==1){
                return this.$store.state.ratings.filter(item=>{return item.rateType==0})
            }else if(this.ratingType==2){
                return this.$store.state.ratings.filter(item=>{return item.rateType==1})
            }else if(this.ratingType==3){
                return this.$store.state.ratings.filter(item=>{return item.text!==''})
            }
        },
        goods(){
            return this.$store.state.goods
        },
        seller(){
            return this.$store.state.seller
        },
        all(){
            return this.$store.state.ratings.length
        },
        satisfied(){
            let satisfied=0
            for(let i=0;i<this.$store.state.ratings.length;i++){
                if(this.$store.state.ratings[i].rateType==0){
                    satisfied++
                }
            }
            return satisfied
        },
        dispointed(){
            let dispionted=0
            for(let j=0;j<this.$store.state.ratings.length;j++){
                if(this.$store.state.ratings[j].rateType==1){
                    dispionted++
                }
            }
            return dispionted
        }
    },
    methods:{
        showSatisfied(){
          this.ratingType=1
          this.active='satisfied'
        },
        showDispionted(){
           this.ratingType=2
           this.active='dispionted'
        },
        showAll(){
            this.ratingType=0
        },
        onlyCon(){
            if(this.ratingType==3){
                this.ratingType=0
            }else{
                this.ratingType=3
                this.onlycon=!this.onlycon
            }
        }
    },
    mounted(){
        axios.get('http://localhost:1900/rating')
        .then(response=>{
            if(response.data.errno==errno){
                this.$store.state.ratings=response.data.data
                if(this.$refs.ratingScroll){
                    this.$nextTick(()=>{
                    this.ratingScroll=new BScroll(this.$refs.ratingScroll,{ probeType: 3,click:true})
                })
            }
            }
        })
        .catch(err=>console.log(err))
    }
}
</script>
<style>
.userXing span{
    background-size: 70%;
}
.userXing{
    width: 100px;
    display: inline-block;
    vertical-align: middle;
    margin-bottom:-8px;
    
}
.recommendDetail{
    overflow: hidden;
    height: 22px;
    width: 80%;
}
.recommend{
    width: 50px;
    height: 17px;
    border: 1px solid rgba(7,17,27,.1);
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
    color: rgb(147,153,159);
    margin:0px 4px;
}
.icon-zan1{
    color: #197CCE;
    vertical-align: text-bottom;
}
.userRating{
    height:102px;
    padding:18px;
}
.userRating:after{
     content:'';
    display:inline-block;
    width:100%;
    height:1px;
    background-color:  rgba(7,17,27,.1);
}
.orderTime{
    font-size: 10px;
    font-weight: 200;
    color: rgb(147,153,159);
    line-height: 12px;
    position: absolute;
    right: 18px;
}
.userCon{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 18px;
    margin: 6px 0px 8px 0px;
}
.sendingTime{
    font-size: 10px;
    font-weight: 200;
    color: rgb(147,153,159);
    line-height: 12px;
}
.userRating>div{
    display:inline-block;
    margin-left:12px;
    width:86%;
}
.username{
    font-size: 10px;
    color: black;
    line-height: 12px;
}
.userAvatar{
    width: 28px;
    height: 28px;
    display: inline-block;
    border-radius: 50px;
    background-size: 100%;
    vertical-align: top;
}
.ratingWrapper{
    height:75%;
    position: absolute;
    left: 0;
    overflow: hidden;
    width:100%;
}
.chooseRating span:last-child{
    vertical-align: top;
    color:rgba(0,0,0,.5) ;
    padding-left:5px;
}
.chooseRating:after{
    content:'';
    display:inline-block;
    width:100%;
    height:1px;
    background-color: rgba(0,0,0,.1);
}
.chooseRating{
    padding:0px 18px;
}
.gou{
    font-size: 21px;
    color: rgba(0,0,0,.5);
    vertical-align: top;
    line-height: 17px;
}
.ratingCate:after{
    content:'';
    display:inline-block;
    width:100%;
    height:1px;
    background-color: rgba(0,0,0,.1);
}
.ratingCate{
    padding: 18px 13px;
}
.ratingCate span{
    width: 60px;
    height: 30px;
    display: inline-block;
    border-radius: 2px;
    font-size: 14px;
    color: black;
    text-align: center;
    line-height: 30px;
    margin-right: 6px;
}
.all{
     background-color: #009FDB;
}
.satisfied{
    background-color: #CBEBF7;
}
.dispionted{
    background-color: #E8EAEB;
}
.trap{
    height: 18px;
    background-color:#F2F4F6;
    border-top: 1px solid #E8EAEB;
    border-bottom:1px solid #E8EAEB;
}
.score:after{
    content:'';
    display:inline-block;
    width:0.5px;
    height:60%;
    background-color: #ddd;
    position: absolute;
    top:20%;
    right:-15%;
}
.scoreItem p span{
    vertical-align: top;
}
.scoreItem .serviceScore,.scoreItem .foodScore{
   width: 100px;
    display: inline-block;
    margin:0 12px;
}
.serviceScore span,.foodScore span{
    background-size: 85%;
}
.serviceVal,.foodVal{
    font-size: 12px;
    color: rgb(255,153,0);
    line-height: 18px;
}
.deliveryTime{
    font-size: 12px;
    color: rgba(147,153,159);
    line-height: 18px;
    margin-left: 12px;
}
.scoreItem p{
    font-size: 12px;
    color: rgb(17,17,27);
    line-height: 18px;
    margin: 8px;
}
.scoreDetail{
    display:flex;
}
.score{
    flex-grow:1;
    text-align: center;
    position: relative;
}
.score p{
    font-size: 12px;
    color: rgb(7,17,27);
    line-height: 12px;
    padding-left:19px;
}
.score .rankRate{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin: 8px 0px 18px 0px;
}
.scoreItem{
    flex-grow:2;
    padding:10px 23px;
}
.scoreVal{
    font-size: 24px;
    color: rgb(255,153,0);
    line-height: 28px;
    margin: 18px 0px 6px 0px;
    display: inline-block;
}
.sat{
    background-color: #009FDB
}
.dis{
    background-color: #CBEBF7;
}
.onlyCon{
    color: green;
}
</style>