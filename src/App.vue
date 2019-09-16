<template>
  <div id="app">
    <v-header></v-header>
    <div class="nav">
      <router-link to='/goods' class='nav-item' >商品</router-link>
      <router-link to='/rating' class='nav-item'>评价</router-link>
      <router-link to='/seller' class='nav-item'>商家</router-link>
    </div>
    <router-view></router-view>
    <foot></foot>
  </div>
</template>

<script>
import {Navbar,TabItem} from 'mint-ui'
import axios from 'axios'
import header from '@components/header/Header.vue'
import foot from '@components/foot/Foot.vue'
const errno=0
export default {
  name: 'app',
  components:{
    vHeader:header,
    foot
  },
  mounted(){
    axios.get('http://localhost:1900/header')
    .then(response=>{
      if(response.data.errno==errno){
        this.$store.state.seller=response.data.data
         this.$store.state.score=response.data.data.score;
      }
    })
  }
}
</script>

<style scroped>
.nav{
  display:flex;
  height:40px;
  border-bottom: 0.5px solid rgba(7,17,27,0.1);
}
.nav-item{
  flex-grow:1;
  font-size:17px;
  text-align:center;
  line-height:40px;
}
.router-link-active{
  border-bottom:1px solid red;
}
</style>
