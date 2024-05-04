<template>
    <my-input placeholder="Write a question" v-model="question" />
    <my-input placeholder="Write a variant" v-model="variant" :value='variant'/>
    <my-button @click="addVariant">Add</my-button>
    <test-variant v-for="(variant,index) of $store.state.subtest.variants" :key="index" :text="variant"/>
</template>
<script>

import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import TestVariant from './TestVariant';

export default{
    data(){
        return{
            question:'',
            variant:''
        }
    },
    components:{MyButton,MyInput,TestVariant},
    methods:{
        addVariant(){
            this.$store.commit('setVariants',this.variant);
            this.variant=''
        },
    },
    watch:{
        question(){
            this.$store.commit('setQuestion',this.question);
        },
    }
}
</script>