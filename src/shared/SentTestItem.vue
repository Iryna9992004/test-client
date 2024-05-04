<template>
    <router-link :to='passTestLink' class="redirect">
            <Icon icon="carbon:rule-test" class="icon"/>
            <div class="text bold">Student: {{student}}</div>
            <div class="text">Test name: {{testName}}</div>
            <div class="text bold">Grade: {{points}}/{{maxPoints}}</div>
    </router-link>
</template>


<script>
import {Icon} from '@iconify/vue';
export default{
    components:{Icon},
    props:{
        _id:String,
        student:String,
        points:Number,
        testName:String,
        maxPoints:Number,
        testId:String
    },
    computed:{
        passTestLink(){
            return `/pass-test/view/${this.testId}`
        }
    }
}
</script>

<style scoped>
.icon{
    color:gray;
    height:30px;
    width:30px
}

.test{
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
    padding: 20px;
    background-color: rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
    transition:all 2s on ease;
    text-align: center;
    margin-bottom:10px;
    cursor:pointer;
}

.bold{
    font-weight:600;
}

.redirect{
    text-decoration:none;
    border: none; /* Додаємо стиль для рамки: видаляємо рамку */
    outline: none; 
}

</style>
