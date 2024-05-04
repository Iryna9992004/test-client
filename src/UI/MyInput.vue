<template>
    <input class="tests__input" v-model="inputModel"  :placeholder="placeholder" />
</template>

<script>
    export default{
        props:{
            value:String,
            placeholder:String
        },
        data(){
            return{
                inputModel:this.value || ''
            }
        },

        watch:{
            value(newValue){
                this.inputModel=newValue;
            },
            inputModel(newValue){
                this.$emit('input',newValue)
            }
        }
    }
</script>

<style scoped>
    .tests__input{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 5px;
    border:1px solid lightgrey
  }
</style>