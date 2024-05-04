<template>
<div class="container">
  <TestNavbar />
    <div class="tests" style="margin-top: 100px;">
        <div>
            <div class="tests__form">
                <my-input placeholder="Write a title . . ." v-model="title" :value="title"/>
                <my-input placeholder="Write a description . . ." v-model="description" :value="description"/> 
                <my-button class="btn" @click="setTitle">Save</my-button>
            </div>  
        </div>
        <subtest-item v-for="subtest of subtests" :key="subtest._id" :_id="subtest._id" :rightAnswers="subtest.rightAnswers" :variants="subtest.variants" :question="subtest.question" :points="subtest.points" :isRequired="subtest.isRequired" :img="subtest.img"/>
        <test-add :hasAnImage="hasImage" v-if="hasAdd"/>
    </div>
    <footer-menu @hasImage="hadleImage" @addForm="handleAdd"/>
</div>
</template>

<script>
import TestNavbar from '../widgets/TestNavbar';
import MyInput from '../UI/MyInput'
import MyButton from '../UI/MyButton'
import TestAdd from '../entities/TestAdd'
import FooterMenu from '../widgets/FooterMenu'
import $api from '../http/index.js'
import SubtestItem from '../entities/SubtestItem'
export default{
    components:{TestNavbar,MyInput,MyButton,TestAdd,FooterMenu,SubtestItem},
    data(){
        return{
            hasImage:false,
            hasAdd:false,
            title:'New document',
            description:'Welcome to the class!!!',
            subtests:[]
        }
    },
    methods:{
        hadleImage(value){
           this.hasImage = value;
        },
        handleAdd(value){
            this.hasAdd=value
        },
        async setTitle(){
        if(this.$store.state.testId){
            await $api.post('/test/title',{_id:this.$store.state.testId,title:this.title, description:this.description});
            alert('Title was added!')
        }
        else if(localStorage.getItem('dev')){
            const id=localStorage.getItem('dev')
            await $api.post('/test/title',{_id:id,title:this.title, description:this.description});
            alert('Title was added!')
        }
        },
        async getTitle(){
            const id=this.$store.state.testId || localStorage.getItem('dev');
            const response=await $api.post('/test/getById',{_id:id});
            return response.data;
        },
        async getSubtests(){
            const testId=this.$store.state.subtest.testId || localStorage.getItem('dev')
            const response=await $api.post('/subtest/get',{testId});
            this.subtests=response.data;
        }
    },
   created: async function() {
    const resp = await this.getTitle();
    this.title = resp.title;
    this.description = resp.description;
    this.getSubtests()
    },
    watch: {
    '$store.state.update': {
        handler() {
            this.getSubtests();
            console.log(this.$store.state.update);
        },
        deep: true
    }
}
}
</script>

<style scoped>
.container{
    display:flex;
    justify-content: center;
    position: relative;
    width:100%;
    margin-bottom:120px;
}

.tests{
    margin-bottom:150px;
    width:59vw    
}

@media(max-width:700px){
    .tests{
        width:100%;
        margin:20px;
    }
}

.tests__form{
    width:96%;
    padding:20px;
    background-color: #fff;
    border-radius: 10px;
    margin: 4px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
}

</style>