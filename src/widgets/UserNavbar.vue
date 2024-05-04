<template>
 <header class="navbar">
        <div class="navbar__text">
            <Icon icon="fa6-solid:circle-user" class='navbar__icon'></Icon>
            <div class="navbar__name">{{userName}}</div>
        </div>

        <div>
            <a :class="setTests" @click="setTest">Tests</a>
            <a :class="setSentTest" @click="setSent">Sent</a>
        </div>

        <div class="navbar__button">
            <my-button class="btn" @click="$store.dispatch('logout')">Log out</my-button>
        </div>
    </header>
</template>

<script>
import MyButton from '../UI/MyButton';
import {Icon} from '@iconify/vue'
export default{
    components:{MyButton,Icon},
    data(){
        return{
            menu:1,
        }
    },
    methods:{
        setTest(){
            this.menu=1;
            this.$emit('menu',this.menu);
        },
        setSent(){
            this.menu=2;
            this.$emit('menu',this.menu)
        }
    },
    created(){
        this.userName=this.$store.state.iUser.email
    
    },
    computed:{
        setTests(){
            return {
                'navbar__link':true,
                'underline':this.menu===1
            }
        },
        setSentTest(){
            return {
                'navbar__link':true,
                'underline':this.menu===2
            }
        }
    }
}
</script>

<style scoped>
.navbar{
    position:fixed;
    height:fit-content;
    width:100%;
    background: #3246bc;
    padding:10px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1001;
}

.navbar__text{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:fit-content;
}

.navbar__icon{
    color:#fff;
    margin-right: 20px;
    font-size: 20px;
}

.navbar__name, .navbar__link{
    margin-right: 20px;
    color:#fff;
    cursor: pointer;
}

@media(max-width:450px){
    .navbar__name{
        display:none;
    }
}
.underline{
    text-decoration:underline
}
</style>