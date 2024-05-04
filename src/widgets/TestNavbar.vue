<template>
  <header class="navbar">
        <div class="navbar__text">
            <h4 class="navbar__name">New test</h4>
        </div>

        <div class="navbar__button">
            <my-button class="btn" @click="cancel">Cancel</my-button>
        </div>
    </header>
</template>

<script>
import MyButton from '../UI/MyButton'

export default{
    components:{MyButton},
    methods:{
        cancel(){
            localStorage.removeItem('develop');
            this.$store.dispatch('notDevelop')
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
    width:19px;
    height:19px;
}

.navbar__name{
    margin-right: 20px;
    color:#fff;
}

.navbar__button{
    display:flex;
}

</style>