<template>
  <div class="test" >
    <div class="test__add">
        <input v-if="hasAnImage" type="file" сlass="tests__input" @change="handleFileChange"/>

        <one-from-list v-if="selected===1"/>
       <few-form-list v-if="selected===2"/>
       <long-text v-if="selected===3" />
       <short-text v-if="selected===4"/>   
    </div>
    <div>
       <select-type @selected="handleSelected"/>    
       <mark-imp />
       <grade-select />
    </div>
   
  </div>
</template>
<script>
import OneFromList from '../shared/OneFromList'
import SelectType from '../shared/SelectType'
import MarkImp from '../shared/MarkImp'
import LongText from '../shared/LongText'
import FewFormList from '../shared/FewFormList'
import ShortText from '../shared/ShortText'
import GradeSelect from '../shared/GradeSelect'
export default{
    components:{SelectType,MarkImp,OneFromList,LongText,FewFormList,ShortText,GradeSelect},
    data(){return{selected:4,hasImage:false}},
    props:{hasAnImage:Boolean},
    methods:{
        handleSelected(value){
            this.selected=value;
        },
        handleHasImage(value){
            this.selected=value
        },
        handleFileChange(event){
            const file=event.target.files[0];
            this.$store.commit('setSubtestFile',file);
        }
    },
    mounted(){
     window.scrollTo({
          top: document.documentElement.scrollHeight + 1000,
          behavior: 'smooth'
        });
    }
}
</script>

<style scoped>
.test{
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
    padding:20px;
    background-color: #fff;
    border-radius: 10px;
    width:96%;
    height: fit-content;
    margin: 4px;
    margin-top: 20px;
    display: grid;
    grid-template-columns: 52% 45%;
    justify-content: space-between;
}

@media(max-width:700px){
    .test{
        grid-template-columns: 100%;
    }
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