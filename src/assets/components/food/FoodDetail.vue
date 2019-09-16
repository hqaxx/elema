<template>
<div>
    <div class="FoodDetail" ref='foodDetailScroll' v-if='food'>
        <div class='content'>
        <div class="foodImg">
            <img :src='food.icon' alt="">
            <router-link class='iconfont hidden' to='/goods'>&#xe74b;</router-link></div>
        <div class="foodPro">
            <h5>{{food.name}}</h5>
            <p class='monthSell'><span>月售22p份</span><span>好评100%</span></p>
            <p><span class='nowPrice'>￥10</span><span class='oldPirce' v-if='food.oldPrice'>{{food.oldPrice}}</span>
            <span class='joinCart' @click='joinCart(food)' v-show='!showBuy||food.count==0'>加入购物车</span>
            <span class='foodBuy' v-show='showBuy&&food.count>0'>
                <span class='iconfont' @click.stop='sub(food)'>&#xe667;</span>
                <span class='foodCount'>{{food.count}}</span>
                <span class='iconfont' @click.stop='add(food)'>&#xe61f;</span>
            </span>
            </p>
        </div>
        <div class="trap"></div>
        <div class="foodInf">
            <h5>商品信息</h5>
            <p>{{food.info}}</p>
        </div>
        <div class="trap"></div>
        <div class="foodRating">
            <div class="ratingCate">
                <h5>商品评价</h5>
                <span class='all' @click='showAll'>全部{{all}}</span>
                <span class='recommend' @click='showRecommend'>推荐{{recommend}}</span>
                <span class='unlike' @click='showUnlike'>吐槽{{unlike}}</span>
            </div>
            <div class="chooseRating">
                <span class='iconfont gou' @click='onlyCon' :class='{onlyCon:onlycon}'>&#xe615;</span><span>只看有内容的评价</span>
            </div>
        </div>
        <div class="ratingDetail">
            <ul>
                <li v-for='(item,index) in ratings' :key=index>
                    <p><span class='rateTime'>{{item.rateTime | formatDate}}</span>
                    <span class='username'>
                        <span>{{item.username}}</span>
                        <span class='avatar' :style="{'backgroundImage': 'url(' +item.avatar + ')'}"></span>
                    </span>
                    </p>
                    <p><span class='iconfont' :class='hand[item.rateType]'></span><span v-if='item.text'>{{item.text}}</span></p>
                </li>
            </ul>
        </div>
    </div>
   </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'
import formatDate from '../../../../libs/date.js'
export default {
    name:'food',
    data(){
        return{
            hand:['icon-zan1','icon--cai'],
            ratingType:0,
            onlycon:false,
            food:{},
            showBuy:false,
            good:{},
            index:0
        }
    },
    filters:{
        formatDate(time){
            let date=new Date(time)
            return formatDate(date,'yyyy-MM-dd hh:mm')
        }
    },
    computed:{
        ratings(){
            if(this.ratingType==0){
                return this.food.ratings
            }else if(this.ratingType==1){
                return this.food.ratings.filter(item=>{return item.rateType==0})
            }else if(this.ratingType==2){
                return this.food.ratings.filter(item=>{return item.rateType==1})
            }else if(this.ratingType==3){
                return this.food.ratings.filter(item=>{return item.text!==''})
            }
        },
        all(){
            return this.food.ratings.length
        },
        recommend(){
            return (this.food.ratings.filter(item=>item.rateType===0)).length
        },
        unlike(){
            return (this.food.ratings.filter(item=>item.rateType==1)).length
        }
    },
    methods:{
        showAll(){
            this.ratingType=0
        },
        showRecommend(){
            this.ratingType=1
        },
        showUnlike(){
            this.ratingType=2
        },
        onlyCon(){
            if(this.ratingType==3){
                this.ratingType=0
            }else{
                this.ratingType=3
                this.onlycon=!this.onlycon
            }
        },
        hiddenDetail(){
           this.$emit('hiddenDetail')
        },
        joinCart(food){
            this.showBuy=!this.showBuy
            if(!food.count){
                this.$set(food,'count',1)
            }else{
                food.count++
            }
            if(!this.good.cateCount){
                this.$set(this.good,'cateCount',1)
            }else{
                this.good.cateCount++
            }
            let index=this.index
            this.$store.commit('add',{food,index})
        },
        sub(food){
          if(food.count>0&&this.good.cateCount>0){
              food.count--
              this.good.cateCount--
              let index=this.index
              this.$store.commit('sub',{food,index})
          }
      },
      add(food){
            if(!food.count){
                this.$set(food,'count',1)
            }else{
                food.count++
            }
            if(!this.good.cateCount){
                this.$set(this.good,'cateCount',1)
            }else{
                this.good.cateCount++
            }
            let index=this.index
            this.$store.commit('add',{food,index})
        },

        
    },
    created(){
        let index=this.$route.params.index
        let inx=this.$route.params.inx
        let goods=this.$store.state.goods
        this.good=goods[index]
        this.index=index
        this.food=goods[index].foods[inx]
    },
    mounted(){
        if(this.$refs.foodDetailScroll){
            this.$nextTick(()=>{
                this.foodDetailScroll=new BScroll(this.$refs.foodDetailScroll,{probType:3,click:true})
            })
        }
    }
}
</script>
<style>
.foodImg .hidden{
    position: absolute;
    color: white;
    top: 15px;
    left: 15px;
    font-size: 24px;
    transform: rotate(180deg);
}
.icon-zan1{
    color: #009FDB
}
.icon--cai{
    color:rgba(0,0,0,.5)
}
.foodImg img{
    width: 100%;
}
.foodPro{
    padding:18px;
}
.foodPro h5{
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;
}
.foodPro .monthSell{
    font-size: 10px;
    color: rgb(147,153,159);
    line-height: 10px;
    margin: 8px 0px 18px 0px;
}
.foodPro .nowPrice{
    font-size: 14px;
    font-weight: 700;
    color: red;
    line-height: 24px;
}
.foodPro .oldPrice{
    font-size: 10px;
    font-weight: 700;
    color: rgb(147,153,159);
    line-height:24px;
}
.foodPro .joinCart{
    display: inline-block;
    width: 74px;
    height: 24px;
    background-color: #00A0DC;
    border-radius: 12px;
    color: white;
    line-height: 24px;
    text-align: center;
    float: right;
}
.trap{
     height: 18px;
    background-color:#F2F4F6;
    border-top: 1px solid #E8EAEB;
    border-bottom:1px solid #E8EAEB;
}
.foodInf{
    padding:18px;
}
.foodInf h5,.foodRating h5{
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
}
.foodInf p{
    font-size: 12px;
    font-weight: 200;
    color: rgb(77,85,93);
    line-height: 24px;
    margin:6px 0px 0px 8px;
}
.foodRating h5{
    margin-bottom:20px
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
.recommend{
    background-color: #CBEBF7;
}
.unlike{
    background-color: #E8EAEB;
}
.chooseRating span:last-child{
    vertical-align: top;
    color:rgba(0,0,0,.5) ;
    padding-left:5px;
}
/* .chooseRating:after{
    content:'';
    display:inline-block;
    width:100%;
    height:1px;
    background-color: rgba(0,0,0,.1);
} */
.chooseRating{
    padding: 0px 18px 12px 18px;
    border-bottom:0.5px solid rgba(0,0,0,.1)
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
.gou{
    font-size: 21px;
    color: rgba(0,0,0,.5);
    vertical-align: top;
    line-height: 17px;
}
.foodDetail li{
    padding:16px;
    border-bottom:0.5px solid rgba(0,0,0,.1);
}
.ratingDetail li p:first-child{
    font-size:10px;
    color:rgb(147,153,159);
    line-height:12px;
}
.ratingDetail li p:last-child{
    font-size: 12px;
    line-height: 16px;
    margin-top:6px;
}
.ratingDetail .avatar{
    width:12px;
    height:12px;
    display: inline-block;
    background-size:100%;
    border-radius: 50%;
    margin-left:6px;
}
.ratingDetail .username{
    float:right;
}
.hidden{
    border-bottom: none;
}
.FoodDetail .ratingDetail{
    padding:18px;
}
.FoodDetail .ratingDetail ul li{
    padding: 16px 0px;
    border-bottom: 0.5px solid rgba(0,0,0,.1);
}
.FoodDetail .foodBuy{
    float: right;
    color: #00A0DC;
}
</style>