<template>
<div class="add-form">
    <my-input v-model="testName" placeholder="Write a name of test . . ."></my-input><my-button @click="add">Add</my-button>
</div>
</template>

<script>
import MyInput from '../UI/MyInput';
import MyButton from '../UI/MyButton';
export default{
    components:{MyButton,MyInput},
    data(){
        return{
            testName:''
        }
    },
    methods:{
        add(){
            this.$store.dispatch('addTest', this.testName);
            this.$emit('added');
        }
    }
}

</script>

<style>
    .add-form{
        width:100%;
    }
</style>