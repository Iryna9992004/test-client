<template>
  <div class="test__variant">
    <input type="checkbox" id="horns" name="horns" v-model="isChecked"/>
    <label for="horns">{{name}}</label>
  </div>
</template>

<script>
export default {
  props:{name:String},

  data() {
    return {
      isChecked: false
    }
  },

  watch: {
    isChecked(newValue) {
      if (newValue) {
        this.addToChecked(this.name); 
      } else {
        this.removeFromChecked(this.name);
      }
    }
  },

  methods: {
    addToChecked(name) {
      this.$store.commit('setAddToChecked', name); 
    },
    removeFromChecked(name) {
      this.$store.commit('setRemoveFromChecked', name);
    }
  }
};
</script>

<style scoped>
.test__variant {
  padding: 6px;
  display: flex;
  align-items: center;
}
</style>
