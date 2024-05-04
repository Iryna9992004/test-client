<template>
    <select class="tests__select" v-model="$store.state.subtest.points">
    <option class="test__option">Choose points</option>
    <option class="test__option">1</option>
    <option class="test__option">2</option>
    <option class="test__option">3</option>
    <option class="test__option">4</option>
    <option class="test__option">5</option>
</select>
</template>

<script>
export default{
    watch:{
        'this.$store.state.subtest.points'(){
            if(this.$store.state.subtest.points!=='Choose points'){
                this.$store.commit('setPoints',this.points);
            }
        }
    }
}
</script>

<style>
   .tests__select{
    width: 100%;
    padding: 8px 16px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 5px;
    border:1px solid lightgrey;
    height: fit-content;
}
</style>