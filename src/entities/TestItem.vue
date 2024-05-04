<template>
    <div class="test">
            <div class="test__add">
                <div>
                    <Icon icon="material-symbols:edit-outline" class="add_icon size" @click="startDeveloping"/>
                    <Icon icon="mdi:trash" @click="deleteTest" class="add_icon size"/>
                </div>
                 <div>
                 <div class="link" @click="copyToClipboard">
                    <Icon icon="ic:round-link" class="link__icon"/>
                    <span class="link__text">Copy link</span>
                </div>
            </div>
            </div>
            <div class="test__name">
                <Icon icon="material-symbols:star" :class="isImportant" @click="markAsImportant"/>
                <a :class="name" @click="setEdit" v-show="!isEdit">{{ name }}</a>
                <form @submit.prevent="editTest"><input v-model='editText' v-show="isEdit"/></form>
            </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import $api from '../http/index.js';

export default {
    components: {
        Icon
    },
    data(){
        return{
            isEdit:false,
            editText:this.name,
        }
    },
    props: {
        name:{type:String},
        _id:{type:String},
        isImp:{type:Boolean}
    },
    methods: {
        async deleteTest() {
            try{
                await $api.post('/test/delete',{_id:this._id});
                this.$emit('editDelete')
            }
            catch(e){
                console.log(e)
            }
        },
        setEdit(){
            this.isEdit=!this.isEdit;
        },
        async editTest(){
            try{
                await $api.post('/test/edit',{_id:this._id,name:this.editText});
                this.$emit('editDelete')
                this.setEdit();
                
            }
            catch(e){
                console.log(e)
            }
        },
        async markAsImportant(){
            try{
                await $api.post('/test/important',{_id:this._id});
                this.$emit('editDelete')
            }
            catch(e){
                console.log(e)
            }
        },
         startDeveloping() {
            this.$store.dispatch('develop');
            this.$store.dispatch('developingId',this._id);
            localStorage.setItem('dev',this._id)
            localStorage.setItem('develop',true)
        },
        copyToClipboard(){
            const data=`http://localhost:8080/pass-test/${this._id}`;
            navigator.clipboard.writeText(data)
            .then(()=>{alert('Link copied to the clipboard!')})
            .catch(()=>console.log('Not copied'))
        }
    },
    computed:{
        isImportant(){return this.isImp?'add_icon important':'add_icon'}
    }
};
</script>

<style scoped>
.test__add{
  width:180px;
  height: 180px;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  transition:all 2s on ease;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
}

.test__add:hover{
  background-color: rgb(238, 238, 238);
}

.test {
    width: fit-content;
    height: fit-content;
    text-align: center;
    margin: 10px;
}

.link {
    padding-top:10px;
    align-self: flex-end;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    color:gray;
    cursor:pointer;
}

.link:hover{
    color:#5A5A5A
}

.link__text{
    margin-left:5px;
    font-weight:500
}

.link__icon{
    height:23px;
    width:23px;
}
.test__name{
    display:flex;
    align-items:center;
    justify-content:center;
}

.add_icon {
    width:20px;
    height:20px;
    color: lightgray;
    cursor:pointer;
}

.important{
    color:gray;
}

.add_icon:hover {
    color: gray;
}

.size{
    height:50px;
    width:50px;
}

.text {
    font-size: 17px;
    font-weight: 500;
    color: grey;
    cursor:pointer
}
</style>
