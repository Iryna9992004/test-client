<template>
<div class="test__variant">
    <input class="input" type="radio" id="dewey" name="drone" value="dewey" v-model='isChecked'/>
    <label for="dewey">{{text}}</label>
</div>
</template>

<script>
export default{
    props:{text:String},
    data(){
        return{
            isChecked:false,
        }
    },
    watch:{
        isChecked(){
            if(this.isChecked){
                this.$store.commit('setRightAnswer',this.text);
            }
        }
    }
}
</script>

<style scoped>
    .test__variant{
    padding: 6px;
    display:flex;
    align-items:center;
    text-align:center
}

</style>