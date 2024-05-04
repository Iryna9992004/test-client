<template>
<div class="container">
    <div class="form">
        <h2>TestForge</h2>
        <div>
            <a class="link" :style="buttonLogin" @click="login">Login</a> / <a class="link" :style="buttonRegistration" @click="registration">Registration</a>
        </div>

        <div v-if="loginOrRegistration">
            <my-input placeholder="Write an email" v-model="email"/>
            <my-input placeholder="Write a password" v-model="password"/>
        </div>

        <div v-if="loginOrRegistration">
            <my-button class="btn" @click="loginUser">Login</my-button>
        </div>

        <div v-if="!loginOrRegistration">
            <my-input placeholder="Write a name" v-model="name"/>
            <my-input placeholder="Write an email" v-model="email"/>
            <my-input placeholder="Write a password" v-model="password"/>
        </div>

        <div v-if="!loginOrRegistration">
            <my-button class="btn" @click="registrateUser">Registration</my-button>
        </div>
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
            name:'',
            email:'',
            password:'',
            loginOrRegistration:false,
            isUnderlined:false
        }
    },
    methods:{
        login(){this.loginOrRegistration=true},
        registration(){this.loginOrRegistration=false},
        async registrateUser(){
            const {name,email,password}=this;
            await this.$store.dispatch('registration',{name,email,password})
        },
        async loginUser(){
            const {email,password}=this;
            await this.$store.dispatch('login',{email,password})
        }
    },
    computed:{
        buttonLogin(){
            return this.loginOrRegistration ? { 'text-decoration': 'underline' } : {};
        },
        buttonRegistration(){
             return !this.loginOrRegistration ? { 'text-decoration': 'underline' } : {};
        }
    }
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
    padding-bottom:60px ;
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