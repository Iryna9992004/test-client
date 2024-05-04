<template>
  <div>
    <pass-login @student="handleStudent" v-if="int === 1" />
    <pass-send @student="handleStudent" v-if="int === 2" />
  </div>
</template>

<script>
import PassLogin from './pages/PassLogin'
import PassSend from './pages/PassSend'

export default {
  components: { PassLogin, PassSend },
  data() {
    return {
      int: 1
    }
  },
  mounted() {
    this.int = localStorage.getItem('student') ? 2 : 1;
    window.addEventListener('storage', this.handleLocalStorageChange);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleLocalStorageChange);
  },
  methods: {
    handleLocalStorageChange(event) {
      if (event.key === 'student') {
        this.int = localStorage.getItem('student') ? 2 : 1
      }
    },
    handleStudent(payload){
        this.int=payload
    }
  }
}
</script>
