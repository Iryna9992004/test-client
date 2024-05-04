<template>
  <div class="body1">
    <div class="head">
      <h2>{{ header.title }}</h2>
      <span>{{ header.description }}</span>
    </div>
    <pass-item
      v-for="subtest of testList"
      :key="subtest._id"
      :rightAnswers="subtest.rightAnswers"
      :_id="subtest._id"
      :variants="subtest.variants"
      :question="subtest.question"
      :points="subtest.points"
      :isRequired="subtest.isRequired"
      :img="subtest.img"
    />
    <div class="buttons">
      <my-button class="gray" @click="cancelSending">Cancel</my-button>
      <my-button class="btn" @click="send">Send</my-button>
    </div>
  </div>
</template>

<script>
import PassItem from '../entities/PassItem';
import $api from '../http/index.js';
import MyButton from '../UI/MyButton';

export default {
  components: { PassItem, MyButton },
  data() {
    return {
      testList: [],
      header: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    async getSubtests() {
      const testId = this.$route.params._id;
      const response = await $api.post('/subtest/get', { testId });
      this.testList = response.data;
      this.$store.commit('setSubtestList', { arr: this.testList });
    },
    async getTitle() {
      const _id = this.$route.params._id;
      const response = await $api.post('/test/title', { _id });
      this.header.title = response.data.title;
      this.header.description = response.data.description;
    },
    cancelSending() {
      localStorage.removeItem('student');
      this.$emit('student', 1);
      this.$store.commit('setCheck', { checked: false });
    },
    async send() {
      const _id = this.$route.params._id;
      await this.sendToCheck(_id);
    },
async sendToCheck() {
    const _id = this.$route.params._id;
    try {
        const isEmpty = this.$store.state.answerArr.reduce((emptyItems, current) => {
            return current.isRequired && current.answer.length === 0 ? emptyItems + 1 : emptyItems;
        }, 0);

        if (isEmpty > 0) {
            alert('Please, fill all required fields!');
            return;
        }

        const answerArr = Array.from(this.$store.state.answerArr);

        const answer = answerArr.map(item => {
            const right = this.$store.state.subtest.find(i => item._id === i._id);

            if (!right) {
                throw new Error(`Subtest not found for item with _id ${item._id}`);
            }

            if (item.answer.length !== right.rightAnswers.length) {
                return {
                    sentTestId: _id,
                    subtestId: item._id,
                    answer: item.answer,
                    isRight: false,
                    points: 0
                };
            }

            const isRight = item.answer.every(ans => right.rightAnswers.includes(ans));

            return {
                sentTestId: _id,
                subtestId: item._id,
                answer: item.answer,
                isRight: isRight,
                points: isRight ? right.points : 0
            };
        });

        const summaryPoints=answer.reduce((sum,item)=>item.points+sum,0)
        const student = localStorage.getItem('student');
        const response = await $api.post('/test/send', { _id, student, answer,points:summaryPoints });
        if(response){
          alert('Your answer was send successfully!')
        }
        else if(!response){
          alert('You have already sent your work! Tou can`t send it again!')
        }
        this.$store.commit('setCheck', { checked: true });

    } catch (e) {
        console.error(e);
    }
}


},
  async created() {
    await this.getSubtests();
    await this.getTitle();
  },
  watch: {
    '$store.state.isChecked': async function() {
      await this.getSubtests();
    }
  }
}
</script>


<style scoped>
 *{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
}
.body1{
    position: relative;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 59vw;
    margin: 0 auto;
    margin-bottom: 40px;
}

@media(max-width:1024px){
    .body1{
        width:98vw;
    }
}
.head{
    margin-top: 30px;
    padding:30px 20px;
    border-radius:11px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.1);
    border-top:14px solid #3246bc;
    width:97%
}

.btn{
    margin-top:20px;
    width:fit-content
}
.buttons{
    display:flex;
    justify-content:space-between;
    width:97.5%
}
.gray{
    background:gray;
    width:fit-content
}
</style>