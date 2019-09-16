<template>
<div class="goods">
    <div class="menu-wrapper" ref='menuScroll'>
        <ul class='menu'>
            <li v-for='(cate,index) in goods' :key='index' class='cate' :class='{active:currentIndex==index}' @click='selectIndex(index)'>
                <span>{{cate.name}}</span>
                <span class='cateCount' v-show='cate.cateCount>0'>{{cate.cateCount}}</span>
            </li>
        </ul>
    </div>
    <div class="food-wrapper" ref='foodsScroll'>
        <div class='content'>
        <div v-for='(good,index) in goods' :key=index class='food-list-hook'>
            <p class='cateName'><span>{{good.name}}</span></p>
            <ul>
                <router-link tag='li' v-for='(food,inx) in good.foods' :key=inx :to="'/goods/'+index+'/'+inx">
                    <img :src='food.icon' alt="" class='foodImg'>
                    <span class='foodDetail'>
                    <p class='foodName'>{{food.name}}</p>
                    <p class='foodType' v-show='food.description'>{{food.description}}</p>
                    <p class='foodSell'><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
                    <p class='foodPrice'><span>￥{{food.price}}</span><span v-show='food.oldPrice'>{{food.oldPrice}}</span>
                    <div class='foodBuy'>
                        <span v-if='food.count>0'><span class='iconfont' @click.stop='sub(food,good,index)'>&#xe667;</span>
                        <span class='foodCount'>{{food.count}}</span></span>
                        <span class='iconfont' @click.stop='add(food,good,index)'>&#xe61f;</span>
                    </div>
                    </span>
                </router-link>
            </ul>
            
        </div>
        </div>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import foodDetail from '../food/FoodDetail.vue'
import BScroll from 'better-scroll'
import axios from 'axios'
import localStorage from '../../../../libs/localStorage.js'
export default {
    name:'goods',
    data(){
        return{
            activeIndex:0,
            selFood:0,
            scrollY:0,
            listHeight:[],
            count:0,
            goods:[]
        }
    },
    components:{
        foodDetail
    },
    computed:{
        currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
                let height1=this.listHeight[i]
                let height2=this.listHeight[i+1]
                if((this.scrollY>=height1&&this.scrollY<height2)){
                    return i
                }
            }
        },
        cart(){
            return this.$store.state.cart
        }
    },
    methods:{
        hiddenDetail(){
            this.$nextTick(()=>{
                this.selectedFood=''
            })
        },
       getDetail(food){
           this.selectedFood=food
       },
      selectIndex(index){
          let foodList=this.$refs.foodsScroll.getElementsByClassName('food-list-hook')
          this.foodsScroll.scrollToElement(foodList[index],250)
      },
      calFoodHeight(){
          let foodList=this.$refs.foodsScroll.getElementsByClassName('food-list-hook')
          let height=0
          this.listHeight.push(height)
          for(let i=0;i<foodList.length;i++){
              height+=foodList[i].clientHeight;
              this.listHeight.push(height)
          }
      },
      add(food,good,index){
         
        if(!food.count){
            this.$set(food,'count',1)
        }else{
           food.count++
        }
        if(!good.cateCount){
            this.$set(good,'cateCount',1)
        }else{
            good.cateCount++
        }
        this.$store.commit('add',{food,index})
      },
      sub(food,good,index){
          if(food.count>0&&good.cateCount>0){
              food.count--
              good.cateCount--
              this.$store.commit('sub',{food,index})
          }
      }
    },
    mounted(){
        axios.get('http://localhost:1900/good')
        .then(response=>{
            if(response.data.errno==0){
                this.$store.state.goods=response.data.data
                this.goods=response.data.data
                this.$nextTick(()=>{
                    this.menuScroll=new BScroll(this.$refs.menuScroll,{probeType:3,click:true,tap:true})
                })
                this.$nextTick(() => {
                    this.foodsScroll = new BScroll(this.$refs.foodsScroll,{
                            probeType: 3,click:true,tap:true
                        })
                    this.foodsScroll.on('scroll',pos=>{
                        this.scrollY=Math.abs(Math.round(pos.y))
                    })
                    this.calFoodHeight()
                })
            }
        }).catch(err=>console.log(err))
    }
}
</script>

</script>

<style>
.foodType{
    width: 113px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.cateCount{
    width: 15px;
    height: 15px;
    display: inline-block;
    background-color: red;
    border-radius: 50px;
    position: absolute;
    top: 4px;
    right: 5px;
    color: white;
    line-height: 15px;
    text-align: center;
}
.food-wrapper .foodBuy{
    position: absolute;
    top: 55px;
    right: 18px;
}
.food-wrapper li{
    position:relative;
}
.food-wrapper .foodBuy .iconfont{
   color:#00A4FF;
   font-size:18px;
}
.foodBuy .foodCount{
    font-size:10px;
    color:rgb(147,153,159);
    line-height:24px;
    display: inline-block;
    width: 24px;
    text-align: center;
}
.goods{
    position:absolute;
    display:flex;
    width:100%;
    top:177px;
    bottom:70px;
    overflow: hidden;
}
.goods .menu-wrapper{
    flex:0 0 80px;
    /* 兼容安卓 */
    width:80px;
}
.goods .food-wrapper{
    flex:1;
    top:174px;
    bottom:70px;
}
.menu-wrapper .menu{
    background-color:#f3f5f7;
}
.menu-wrapper .cate{
    box-sizing: border-box;
    display:table;
    height:54px;
    font-size: 12px;
    color: rgb(0,0,0,.8);
    font-weight: 200;
    width:100%;
     padding:0 12px;
     position:relative;

}
.menu-wrapper .cate span:first-child{
    display:table-cell;
    vertical-align: middle;
     border-bottom:.5px solid rgba(1,17,27,0.1);
}
.active{
    background-color:white;
}
.food-wrapper .cateName{
    height: 26px;
    background-color: #f3f5f7;
}
.food-wrapper .cateName span{
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 26px;
    padding-left: 14px;
}
.food-wrapper .cateName::before{
    position: absolute;
    content:'';
    display:inline-block;
    height:26px;
    width:2px;
    background-color:#d9dde1;
}
.food-wrapper li{
    font-size: 0px;
    padding:0 18px;
}
.food-wrapper li:after{
    content:'';
    display:inline-block;
    width:100%;
    height:1px;
    background-color:rgba(7,17,27,0.1);
}
.food-wrapper .foodImg{
    display:inline-block;
    padding:18px 10px 18px 0px;
}
.food-wrapper .foodImg{
    width:55px;
}
.food-wrapper .foodDetail{
    display:inline-block;
    padding: 20px 18px 8px 0px;
    vertical-align: top;
}
.food-wrapper .foodName{
    font-size: 14px;
    color: rgb(7,17,27);
    line-height: 14px;
    font-weight: 700;
}
.food-wrapper .foodType,.food-wrapper .foodSell{
    font-size:10px;
    color:rgb(147,153,159);
    line-height:10px;
}
.food-wrapper .foodType{
    padding-top:8px;
}
.food-wrapper .foodSell{
    padding:8px 0px 8px 0px;
}
.food-wrapper .foodSell span:first-child{
    padding-right:12px;
}
.food-wrapper .foodPrice{
    font-size:14px;
    color:red;
    font-weight: 700;
    line-height:24px;
}
.FoodDetail{
    position: absolute;
    top: 0px;
    bottom: 52px;
    left: 0px;
    right: 0px;
    background-color: white;
} 
</style>