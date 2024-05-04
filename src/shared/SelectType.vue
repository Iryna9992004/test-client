<template>
  <select class="tests__select" v-model="value" @change="changeSelect">
    <option class="test__option" value="One from the list">One from the list</option>
    <option class="test__option" value="A few from the list">A few from the list</option>
    <option class="test__option" value="Long text">Long text</option>
    <option class="test__option" value="Short text">Short text</option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selected: 1,
      value: 'One from the list'
    }
  },
  methods: {
    changeSelect() {
      switch(this.value) {
        case 'One from the list':
          this.selected = 1; 
          break;
        case 'A few from the list':
          this.selected = 2; 
          break;
        case 'Long text':
          this.selected = 3; 
          break;
        case 'Short text':
          this.selected = 4; 
          break;
      }
      this.$emit('selected', this.selected);
      this.$store.commit('setClean');
    }
  },
  mounted(){
    this.selected = 1;
    this.changeSelect();
  }
}
</script>

<style scoped>
    .tests__select{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 5px;
    border:1px solid lightgrey;
    height: fit-content;
}
</style>