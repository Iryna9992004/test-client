<template>
    <div class="body">
    <div class="subtest" v-for="item of testList" :key="item._id">
        <div class="head">
            <h2>Question: {{item.question}}</h2>
            <h3>Points: {{item.points}}</h3>
        </div>
        <ul class="list">
            <li class="list__variant" v-for="i of item.variants" :key="i">{{i}}</li>
        </ul>

        <h3 v-if="item.rightAnswers.length!==0">Right answers</h3>
             <ul class="list" v-if="item.rightAnswers.length!==0">
                <li class="list__item right" v-for="c of item.rightAnswers" :key="c">{{c}}</li>
             </ul>

        <h3 v-if="item.wrongAnswers.length!==0">Wrong answers</h3>
         <ul class="list" v-if="item.wrongAnswers.length!==0">
            <li class="list__item wrong" v-for="k of item.wrongAnswers" :key="k">{{k}}</li>
        </ul>

        <span class="" v-for="s of item.oneAnswer" :key="s" >{{s}}</span>
    </div>
    </div>
</template>

<script>
import $api from '../http/index.js'
export default{
    data(){
        return{
            testList:[]
        }
    },
    methods:{
        async getList(){
            const _id=this.$route.params._id;
            const response=await $api.post('test/getSent',{_id});
            this.testList=response.data;
        }
    },
    created(){
        this.getList()
    },
}
</script>

<style scoped>
.body{
    margin-top:40px;
    display:flex;
    justify-content:center;
    flex-direction:column;
}

.subtest {
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 59vw;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom:10px;
  margin-top:10px;
}

.list__variant{
    padding:8px;
    margin:3x;
    list-style-type:none;
    border-bottom:2px solid lightgray;  
}

.list__item{
    padding:8px;
    margin:2px;
    list-style-type:none;
    border-radius:5px;
}

answer{
    padding:10px;
}
.head{
    display:flex;
    align-items:center;
    justify-content:space-between;
}

.right {
  background: #d4efc1;
}

.wrong{
  background:#FF7F7F
}
</style>