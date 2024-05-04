<template>
<footer class="menu">
        <div class="menu__icons">
            <Icon icon="icon-park-solid:add" class='menu__icon' @click="addSubtest"/>
            <Icon icon="fluent:save-28-filled" class='menu__icon' @click="saveSubtest"/>
            <Icon icon="mdi:trash" class='menu__icon' @click="deleteSubtest"/>
            <Icon icon="mdi:image-add" class='menu__icon' @click="addImage"/>
        </div>
    </footer>
</template>

<script>
import {Icon} from '@iconify/vue';
import $api from '../http/index.js'
export default{
    components:{Icon},
    data(){return{image:false,subtest:false}},
    methods:{
      addImage(){
        this.image = !this.image;
        this.$emit('hasImage', this.image);
      },
      addSubtest(){
        this.subtest=!this.subtest;
        this.$emit('addForm',this.subtest);
      },
      async saveSubtest() {
        try {
          console.log(this.$store.state.subtest)
          const response = await this.$store.dispatch('addSubtest');
          await response.json();
          this.$store.commit('setUpdate')
          //console.log(data);

      } catch (error) {
        console.error('Error:', error);
      }
      },
      async deleteSubtest(){
        try{
          await $api.post('/subtest/delete', { _id: this.$store.state.deleteId });
          this.$store.commit('setUpdate')
        }
        catch(e){
          console.log(e)
        }
      }
    }
}
</script>

<style scoped>
.menu{
    position:fixed;
    bottom:0;
    width:100vw;
    height:fit-content;
    padding:10px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
    margin: 0;
}

.menu__icons{
  width:fit-content;
  display: flex;
  justify-content: space-between;
}

.menu__icon{
  height:30px;
  width:30px;
  color:rgb(186, 186, 186);
  font-size: 24px;
  margin-right: 20px;
  transition: all 2s on ease;
}

.menu__icon:hover{
  color:gray;
}
</style>