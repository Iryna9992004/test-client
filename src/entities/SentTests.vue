<template>
    <div class="tests">
        <sent-test-item v-for="item of sentTestList" class="test" :key="item._id" :points="item.points" :maxPoints="item.maxPoints" :student="item.student" :testName="item.test" :testId="item.testId"/>
        <h3 v-if="sentTestList.length===0" class="empty_list">Test list is empty!</h3>
    </div>
</template>

<script>
import SentTestItem from "../shared/SentTestItem";

import $api from '../http/index.js'
export default {
    components: { SentTestItem},
    data(){
        return{
            sentTestList:[]
        }
    },
    methods:{
        async getSent(){
            try{
                const response=await $api.post('/test/sentTest/list',{email:this.$store.state.iUser.email});
                this.sentTestList=response.data;
            }
            catch(e){
                console.log(e)
            }
        }
    },
    created(){
        this.getSent()
    },
    
}
</script>

<style scoped>
    .tests {
    margin-top: 120px;
    width: 59vw;
    display: flex;
    flex-direction: column;
    margin-bottom: 150px;
}

@media (max-width: 700px) {
    .tests {
        width: 88vw;
        justify-content: center;
    }
}

.test {
    width: 100%;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
    transition: all 2s on ease;
    text-align: center;
}

.test:hover {
    background-color: rgb(238, 238, 238);
}

.text {
    font-size: 17px;
    font-weight: 500;
    color: grey;
}

.bold {
    font-weight: 600;
}

.empty_list{
    color:gray;
    text-align:center;
}
</style>
