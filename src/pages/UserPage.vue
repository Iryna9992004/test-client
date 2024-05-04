<template>
<div class="container">
    <UserNavbar @menu="setMenu"/>
    <my-input placeholder="Tap to find a test"/>
    <user-tests v-if="menu===1" />
    <sent-tests v-if="menu===2" />
</div>

</template>

<script>
import UserNavbar from '../widgets/UserNavbar'
import UserTests from '../entities/UserTests'
import SentTests from '../entities/SentTests'
export default{
    components:{UserNavbar,UserTests,SentTests},
    data(){
      return{
        menu:1
      }
    },
    methods:{
      setMenu(value){
        this.menu=value;
      }
    }
}
</script>

<style scoped>
    .container{
        display: flex;
        justify-content: center;
    }

    .test__important{
        color:rgb(177, 177, 177);
        cursor: pointer;
    }

    .test__important:hover{
        color:gray;
    }

    .tests__input{
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border-radius: 5px;
        border:1px solid lightgrey
    }

</style>