<template>
    <div class="tests">
       
        <add-form v-if="addForm" @added="added" /> 
        <div class="test">
            <div class="test__add" @click="add"><Icon icon="icon-park-twotone:add-one" class='add_icon size'/></div>
            <span class="text">Add test</span>
        </div>

       <test-item v-for="item in testList" :key="item._id" :name="item.name" :_id="item._id" :isImp="item.isImportant" @added="added" @editDelete="editDelete"/>

    </div>
</template>

<script>
import TestItem from "../entities/TestItem";
import {Icon} from '@iconify/vue';
import AddForm from '../shared/AddForm'
export default{
    components:{TestItem,Icon,AddForm},
    data(){
        return{
            addForm:false,
            testList:[]
        }
    },
    methods:{
        add(){this.addForm=!this.addForm},
        async added(){
            this.addForm=!this.addForm;
            await this.fetchData();
        },
        async fetchData(){
            const response=await this.$store.dispatch('getTests');
            this.testList=response.data;
        },
        async editDelete(){
          this.fetchData()
        }
    },
    created(){
        this.fetchData()
    }
}
</script>

<style scoped>
.tests{
 
  margin-top: 120px;
  width:59vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 150px;
}

@media(max-width:700px){
  .tests{
    width:88vw;
    justify-content: center;
  }
}

.test{
  width: fit-content;
  height: fit-content;
  text-align: center;
  margin:10px
}

.test__add{
  width:180px;
  height: 180px;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  transition:all 2s on ease;
  text-align: center;
}

.test__add:hover{
  background-color: rgb(238, 238, 238);
}

.test__add{
  display: flex;
  align-items: center;
  justify-content: center;
}

.add_icon{
  font-size: 72px;
  color:lightgray;
}

.add_icon:hover {
    color: gray;
}

.text{
  font-size: 17px;
  font-weight: 500;
  color: grey;
}

 .size{
        height:70px;
        width:70px;
    }
</style>