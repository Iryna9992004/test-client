<template>
<div class="container">
    <div class="form">
        <h2>TestForge</h2>

        <my-input placeholder="Write your full name . . ." v-model="student"/>

        <my-button @click="setStudent">Start the test</my-button>
    </div>
</div>
</template>

<script>
import MyInput from '../UI/MyInput';
import MyButton from '../UI/MyButton';

export default{
    components:{MyInput,MyButton},
    data(){
        return{
            student:""
        }
    },
    methods:{
        setStudent(){
            if(this.student){
                localStorage.setItem('student',this.student)
                this.$emit('student',2)
            }
            else{
                alert("Write your name, please!")
            }
       }
    },
}
</script>

<style scoped>
    .container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.form{
    padding: 30px;
    width:600px;
    height:fit-content;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
    padding-bottom:45px ;
    border-radius: 5px;
}

@media(max-width:640px){
    .form{
        width:fit-content;
    }
}

 .link{
    color: gray;
    cursor: pointer;
  }

  .underlined{
    text-decoration:underline;
  }

</style>