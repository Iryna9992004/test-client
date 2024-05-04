<template>
    <div>
        <my-input placeholder="Write a question" v-model="question"/>
        <my-input placeholder="Write a variant" v-model="variant" :value="variant"/>
        <my-button @click="addVariant">Add</my-button>

        <few-variant v-for="(variant, index) of $store.state.subtest.variants" :key="index" :name="variant"/>
    </div>
</template>

<script>
import MyButton from '../UI/MyButton';
import MyInput from '../UI/MyInput';
import FewVariant from './FewVariant';

export default {
    components: { MyButton, MyInput, FewVariant },
    data() {
        return {
            question: '',
            variant: '',
        };
    },
    methods: {
        addVariant() {
            if (this.variant !== '') {
                this.$store.commit('setVariants', this.variant);
                this.variant = '';
              //  console.log(this.$store.state.subtest.testId)
            }
        }
    },
    watch: {
        question() {
            this.$store.commit('setQuestion', this.question);
        },
    }
}
</script>

