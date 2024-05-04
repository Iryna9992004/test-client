<template>
  <div class="subtest">
    <div>
      <div class="head">
        <h3>Question: {{ question }}</h3>
        <h4>Points: {{calcPoints}}/{{ points }}</h4>
      </div>
      <a :href="img" target="_blank" v-if="file" class="break">Click to see a file</a>
    </div>

    <div class="checkbox" v-if="checkbox">
      <div class="checkbox__item" v-for="item of answers" :key="item.variant" :class="isWrong(item.variant)">
        <input type="checkbox" :id="'item-' + item.variant" v-model="selectedCheckboxes[item.variant]" @change="logLabel(item.variant,$event)"/>
        <label :for="'item-' + item.variant">{{ item.variant }}</label>
      </div>
    </div>

    <div class="radio" v-if="radio">
      <div class="checkbox__item" v-for="item of answers" :key="item.variant" :class="isWrong(item.variant)">
        <input type="radio" :id="'item-' + item.variant" :value="item.variant" :name="'answer-' + _id" v-model="selectedAnswer[_id]" />
        <label :for="'item-' + item.variant">{{ item.variant }}</label>
      </div>
    </div>

    <my-input type="text" placeholder="Write an answer" v-if="shortText" v-model="text"/>

    <textarea class="textarea" placeholder="Long text" v-if="longText" v-model="text"></textarea>
   
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
import MyInput from '../UI/MyInput';

export default {
  components: {
    MyInput
  },
  data() {
    return {
      localIsRequired: this.isRequired,
      selectedAnswer: {},
      fewAnswers:[],
      answers: [],
      selectedCheckboxes: {},
      text:''
    };
  },
  props: {
    _id: String,
    question: String,
    points: Number,
    rightAnswers: Array,
    isRequired: Boolean,
    variants: Array,
    img: String,
  },
  computed: {
    radio() {
      return Array.isArray(this.rightAnswers) && this.rightAnswers.length === 1 && this.variants.length > 0;
    },
    checkbox() {
      return Array.isArray(this.rightAnswers) && this.rightAnswers.length > 1 && this.variants.length > 1;
    },
    file() {
      return !!this.img;
    },
    shortText() {
      return this.rightAnswers.length === 1 && this.variants && this.variants.length === 0;
    },
    longText() {
      return this.rightAnswers.length === 0 && this.variants && this.variants.length === 0;
    },
    isWrong() {
      return (param) => {
          const item = this.$store.state.answerArr.find(item => item._id === this._id && item.answer && item.answer.includes(param));
          const answer = item ? item.answer : null;
          if (this.$store.state.isChecked && answer && !answer.some(ans => this.rightAnswers.includes(ans))) {
            return 'ch wrong';
          } else {
            return this.$store.state.isChecked && this.rightAnswers.includes(param) ? 'ch right' : 'ch';
          }
      }
    },
    calcPoints() {
        if (!this.$store.state.isChecked) {
        return this.points;
        }
        else if(this.$store.state.isChecked){
          const item = this.$store.state.answerArr.find(item => item._id === this._id && item.answer);
          const answer = item ? item.answer : null;
          let count=0;
          if(this.rightAnswers.length===answer.length){
            for(const i of answer){
              if(this.rightAnswers.includes(i)){count=count+1}
            }
          }
          else{
            return 0
          }
          if(count===answer.length){
            return this.points
          }
          else if(count<answer.length){
            return 0;
          }
        }
        return null;
      } 
    },

  methods: {
    arr() {
      const res = [];
      for (const variant of this.variants) {
        res.push({ variant, isRight: false });
      }
      return res;
    },
    logLabel(variant,event) {
      const checked=event.target.checked;
      const labelText = this.answers.find(answer => answer.variant === variant).variant;
      this.$store.commit('setFewAnswers',{_id:this._id,checked:checked,answer:labelText});
    },
   
  },
  created() {
    this.answers = this.arr();
    this.$store.commit('setLengthAnswers',{_id:this._id,isRequired:this.isRequired});
  },
  watch: {
    selectedAnswer:{
      handler() {
      this.$store.commit('setOneAnswer',{_id:this._id, answer: this.selectedAnswer[this._id]});
    },
    deep: true
    },

    text(){
      this.$store.commit('setOneAnswer',{_id:this._id,answer:this.text})
    }
  },
};
</script>

<style scoped>

.subtest {
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 97%;
  height: fit-content;
  margin: 4px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.right {
  background: #d4efc1;
}
.choosen {
  background: rgb(244, 244, 244);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkbox {
  margin-top: 30px;
}
.checkbox__item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 2px;
  border-radius: 5px;
}
.check {
  display: flex;
  align-items: center;
}
.break {
  word-wrap: break-word;
  text-overflow: ellipsis;
}
.textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid lightgrey;
  height: 200px;
}
.subtest {
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 97%;
  height: fit-content;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
@media(mex-width:900){
  .subtest{
    margin-left:0px;
    margin-right:0px;
    width:100%
  }
}

.choosen {
  background: rgb(244, 244, 244);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.checkbox {
  margin-top: 30px;
}
.checkbox__item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 2px;
  border-radius: 5px;
}
.check {
  display: flex;
  align-items: center;
}
.break {
  word-wrap: break-word;
  text-overflow: ellipsis;
}
.textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid lightgrey;
  height: 200px;
}

.wrong{
  background:#FF7F7F
}
</style>
