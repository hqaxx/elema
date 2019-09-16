import Vuex from 'vuex'
import Vue from 'vue'
import localStorage from '../libs/localStorage.js'
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        score:0,
        cart:[],
        goods:[],
        seller:{},
        ratings:[],
        activeStore:false
    },
    mutations:{
        clean(state){
            for(let i=0;i<state.cart.length;i++){
                state.cart[i].count=0
            }
            for(let j=0;j<state.goods.length;j++){
                if(state.goods[j].cateCount){
                    state.goods[j].cateCount=0
                }
            }
            state.cart=[]
        },
        add(state,obj){
            let tag=true
            for(let i=0;i<state.cart.length;i++){
                if(state.cart[i].name==obj.food.name){
                   tag=false
                }
            }
            if(tag){
                obj.food.cateIndex=obj.index
                state.cart.push(obj.food)
            }
            localStorage.write('cart',state.cart)
        },
        sub(state,obj){
            if(obj.food.count==0){
                for(let i=0;i<state.cart.length;i++){
                    if(state.cart[i].name==obj.food.name){
                        state.cart.splice(i,1)
                    }
                }
            }
            localStorage.write('cart',state.cart)
        }
    }
})
export default store