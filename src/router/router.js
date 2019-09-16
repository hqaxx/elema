//如果缩短导入的路径长度，可以在webpack.config.js里面配置别名，resolve内
import VueRouter from'vue-router'
import  Goods from '@components/goods/Goods.vue'
import Rating from '@components/rating/Rating.vue'
import Seller from '@components/seller/Seller.vue'
import FoodDetail from '@components/food/FoodDetail.vue'
const routes = [{
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    component:Goods
  },
  {
    path:'/goods/:index/:inx',
    component:FoodDetail
  },
  {
    path: '/rating',
    component:Rating
  },
  {
    path: '/seller',
    component:Seller
  }
]
export default new VueRouter({routes})
