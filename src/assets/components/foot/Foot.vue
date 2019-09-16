<template>
<div class="cart claerfix"  @click="userClick=false">
    <div class="cart-wrapper" @click='toggleCart' @click.stop="userClick=!userClick">
    <span class='cartIconOut'>
        <span class='cartCount' v-show='cartCount>0'>{{cartCount}}</span>
        <span class='cartIconIn' :class='{"shopCart":shopCart}'>
            <i class='iconfont'>&#xe620;</i>
            </span>
        </span>
    <span class='price'>￥{{total}}</span>
    <span class='sendingFee'>另需配送费￥{{seller.deliveryPrice}}元</span>
    <span  :class='{sending:sending}' class='sendingReq'><span v-if='minPrice>0'>还差￥{{minPrice}}元起送</span><span v-else class='goPay'>去结算</span></span>
    </div>
    <div class="cartDetail-wrapper" v-show='cartDetailShow' >
        <div class="cartDetail" ref='cartWrapper'>
            <p><span class='shoppingcart'>购物车</span><span class='clean' @click='clean'>清空</span></p>
            <ul>
                <li v-for='(cartFood,index) in cartFoods' :key=index>
                    <span class='cartFood-name'>{{cartFood.name}}</span>
                    <span class='cartFood-price'>￥{{cartFood.price}}</span>
                    <span class='iconfont sub' @click=sub(cartFood)>&#xe667;</span>
                    <span class='foodCount'>{{cartFood.count}}</span>
                    <span class='iconfont' @click=add(cartFood)>&#xe61f;</span>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import {MessageBox} from 'mint-ui'
export default {
   name:'foot',
   data(){
       return{
           cartDetailShow:false,
           sending:false,
           shopCart:false,
           userClick:false
       }
   },
   watch:{
    cartFoods(){
        if(this.cartFoods.length===0){
            this.cartDetailShow=false
            this.shopCart=false
        }else{
            this.shopCart=true 
        }
    }
   },
   computed:{
       seller(){
           return this.$store.state.seller
       },
       minPrice(){
           if(this.seller.minPrice-this.total>0){
               this.sending=false
            return this.seller.minPrice-this.total
           }else{
               this.sending=true
               return 0
           }
       },
       cartCount(){
           let count=0
           for(let i=0;i<this.cartFoods.length;i++){
               count+=this.cartFoods[i].count
           }
           return count
       },
       total(){
           let cart=this.$store.state.cart
           let total=0
           for(let i=0;i<cart.length;i++){
               if(cart[i]){
                 total+=cart[i].count*cart[i].price
               }
           }
           return total
       },
       cartFoods(){
           return this.$store.state.cart
       },
   },
   
   methods:{
       clean(){
           MessageBox.confirm('清空购物车')
           .then(action=>{
               if(action=='confirm'){
               this.$store.commit('clean')
           }})
           .catch(err=>{
               if(err=='cancel'){
                   console.log('cancel')
            } })
       },
       toggleCart(){
           if(!this.cartDetailShow){
               if(this.cartFoods.length>0){
                   this.cartDetailShow=true
               }
           }else{
               this.cartDetailShow=false
           }
       },
       add(food){
           food.count++
            this.$store.state.goods[food.cateIndex].cateCount++
            this.$store.commit('add',{food})
       },
       sub(food){
           food.count--
           this.$store.state.goods[food.cateIndex].cateCount--
           this.$store.commit('sub',{food})
       },
   },
    created(){
    　　document.addEventListener('click',(e)=>{
    　　　　if(!this.$refs.cartWrapper.contains(e.target)){
    　　　　　　this.cartDetailShow = false;
    　　　　}
    　　})
   }
}
</script>

<style>
.goPay{
    color:white
}
.cartCount{
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    text-align: center;
    line-height: 15px;
}
.cartDetail .sub{
    margin-left:5px;
}
.cartDetail .iconfont{
   color:#00A4FF;
   font-size:20px;
}
.cartDetail .foodCount{
    font-size: 12px;
    color: rgb(147,153,159);
    line-height: 24px;
    display: inline-block;
    width: 20px;
    text-align: center;
}
.cartFood-name{
    display: inline-block;
    width: 64%;
}
.cartFood-price{
    font-size: 14px;
    font-weight: 700;
    color: red;
}
.cartDetail li{
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: rgb(7,17,27);
    margin: 0 18px;
    border-bottom: 0.5px solid rgba(7,17,27,.1);
}
.clean{
    font-size: 12px;
    color: rgb(0,160,220);
    position: absolute;
    right: 18px;
    line-height: 40px;
}
.shoppingcart{
    font-size: 14px;
    font-weight: 200;
    color: rgb(7,17,27);
    line-height: 40px;
    margin-left: 18px;
}
.cartDetail p{
    height: 40px;
    background-color:#F2F4F6;
    border-bottom: rgba(7,17,27,0.1);
}
.cartDetail{
    position: absolute;
    bottom: 52px;
    width: 100%;
    background-color: white;
}
.cartDetail-wrapper{
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
    background-color: rgba(7,17,27,.6);
    /* filter: blur(10px); */
    z-index:-1;
}
.cart{
    width:100%;
    background-color: #141d27;
    height: 52px;
    position: fixed;
    bottom: 0px;
    background-color:#141d27;
}
.cart-wrapper{
    color: white;
}
.cartIconIn{
    display: inline-block;
    width: 44px;
    height: 44px;
    border-radius: 50px;
    background-color: #2B333B;
    position:absolute;
    top:6px;
    left:7px;
    text-align: center;
    line-height: 41px;
}
.shopCart{
    background-color:#007ACC;
    color: white;
}
.cartIconOut{
    display:inline-block;
    width:58px;
    height:58px;
    background-color:#121C25;
    border-radius:50px;
   position: absolute;
    left: 12px;
    bottom: 4px;
}

.cartIconOut .iconfont{
    font-size: 23px;
    color: #797D82;
}
.shopCart .iconfont{
    color: white;
}
.cart-wrapper .price{
    margin: 12px 12px 12px 80px;
    font-size: 16px;
    color: rgba(255,255,255,.4);
    font-weight: 700;
    line-height: 24px;
}
.cart-wrapper .price:after{
    content:'';
    display:inline-block;
    width:0.5px;
    height:27px;
    background-color:rgba(255,255,255,0.1);
    position: absolute;
    right:65%;
    top:25%;
}
.cart-wrapper .sendingFee{
    font-size: 12px;
    color: rgba(255,255,255,.4);
    font-weight: 700;
    line-height: 52px;
    padding-left: 12px;
}
.sendingReq{
    display: inline-block;
    width: 105px;
    height: 52px;
    background-color: #2A323A;
    position: absolute;
    right: 0;
    text-align: center;
    line-height: 52px;
    font-size: 12px;
    color: rgba(255,255,255,.4);
    font-weight: 700;
}
.sending{
    background-color:green;
}

</style>