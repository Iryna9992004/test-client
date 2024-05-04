<template>
<div :class="choosenClass" @click="addToChoosen">
    <div>
        <div class="head"><h3>Question: {{question}}</h3><h4>Points: {{points}}</h4></div>
        <a :href="img" v-if="file" class="break">{{img}}</a>
    </div>

    <div class="checkbox" v-if="!radio">
       <div class="checkbox__item" v-for="item of answers" :key="item.variant" :class="rightClass(item.isRight)" >
            <input type="checkbox" :id="'item-' + item.variant" :checked="item.isRight" disabled class="ch" />
        <label :for="'item-' + item.variant">{{item.variant}}</label>
    </div>

    </div>

    <div class=radio v-if="radio">
        <div class="checkbox__item" v-for="item of answers" :key="item.variant" :class="rightClass(item.isRight)">
        <input type="radio" :id="'item-' + item.variant" :checked="item.isRight" disabled class="ch"/>
        <label :for="'item-' + item.variant">{{item.variant}}</label>
    </div>
    </div>

    <my-input type="text" :value="rightAnswers[0]" v-if="text"/>
   
   <div class="check">
        <div>
            <input type="checkbox" v-model="localIsRequired" disabled/>
            <label class="toggle"><span></span></label>
        </div>
    <h5>Is required</h5>
</div>

</div>
</template>

<script>
import MyInput from '../UI/MyInput'
export default{
    components:{MyInput},
    data() {
    return {
      localIsRequired: this.isRequired,
      answers:[]
    };
},
    props:{
        _id:String,
        question:String,
        points:Number,
        isRequired:Boolean,
        rightAnswers:[String],
        variants:[String],
        img:String,
    },
    computed:{
        radio(){
            return Array.isArray(this.rightAnswers) && this.rightAnswers.length === 1;
        },
        checkbox(){
            return Array.isArray(this.rightAnswers) && this.rightAnswers.length > 1;
        },
        text(){
            return this.rightAnswers.length===1 && this.variants.length===0;
        },
        file(){
            return this.img?true:false
        },
        choosenClass(){
            return this._id===this.$store.state.deleteId?'subtest choosen':'subtest'
        }
        
    },
    methods:{
        arr(){
            const res=[]
            const right=this.rightAnswers.map(item=>item);
            for(const variant of this.variants){
                if(right.includes(variant)){
                    res.push({variant, isRight:true})
                }
                else{
                    res.push({variant, isRight:false})
                }
            }
            return res;
        },
        rightClass(obj){
            return obj?'right':''
        },
        addToChoosen(){
            this.$store.commit('setDeleteId', this._id)
        },
    },
    created(){
        this.answers=this.arr()
    }
}
</script>

<style scoped>
.subtest{
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
    padding:20px;
    background-color: #fff;
    border-radius: 10px;
    width:96%;
    height: fit-content;
    margin: 4px;
    margin-top: 20px;
    display:flex;
    flex-direction:column
}
.right{
    background:#d4efc1
}
.choosen{
    background:rgb(244, 244, 244);
}
.head{
    display:flex;
    justify-content:space-between;
    align-items:center;
}
.checkbox{
    margin-top:30px,
}

.checkbox__item{
    display:flex;
    align-items:center;
    padding:10px;
    margin:2px;
    border-radius:5px;
}

.check{
    display:flex;
    align-items:center
}

.break{
    word-wrap: break-word;
    text-overflow: ellipsis;
}

</style>