<template>
    <div class="ratingStar">
       <span class='star' v-for='(star,index) in stars' :key=index :class='star'></span>
    </div>
</template>
<script>
export default {
    name:'star',
    props:{
        score:0
    },
    computed:{
        stars(){
            let full=parseInt(this.score)
            let half=this.score-full>0.5?1:0
            let result=['empty','empty','empty','empty','empty']
            for(let i=0;i<full;i++){
                result[i]='full'
            }
            if(half>0){
                result[full]='half'
            }
            return result
        }
    }
}
</script>
<style>
.star{
    display:inline-block;
    width:20px;
    height:20px;
    background-repeat:no-repeat;
}
.full{
    background-image:url('star24_on@2x.png');
}
.half{
    background-image:url('star24_half@2x.png');
}
.empty{
    background-image: url('star24_off@2x.png');
}
</style>