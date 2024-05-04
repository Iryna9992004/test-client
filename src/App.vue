<template>
  <div class="body">
    <loader-comp v-if="isLoading" />
    
    <div v-else>
      <sign-in-page v-if="notAuthorized" />
      <user-page v-else-if="authorized && !isDevelop" />
      <test-page v-else-if="authorized && isDevelop" />
    </div>
  </div>
</template>

<script>
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';
import TestPage from './pages/TestPage';
import LoaderComp from './pages/LoaderComp'

export default {
  components: { SignInPage, UserPage, TestPage, LoaderComp },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    authorized() {
      return this.$store.state.isAuth === true;
    },
    notAuthorized() {
      return this.$store.state.isAuth === false;
    },
    isDevelop() {
      return this.$store.state.isDeveloping === true
    }
  },
  created() {
    this.$store.dispatch('refresh');
    if (localStorage.getItem('develop')) {
      this.$store.dispatch('develop')
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 1000); 
  }
}
</script>


<style>
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif;
}
.body{
  position:relative;
  width:100%;
  overflow-x:hidden
}
</style>