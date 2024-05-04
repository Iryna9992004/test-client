import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import { createWebHistory,createRouter } from 'vue-router';
import PassTest from './PassTest.vue'
import MainPage from './MainPage.vue'
import PassTestView from './pages/PassTestView'

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',component:App},
        {path:'/pass-test/:_id',component:PassTest},
        {path:'/pass-test/view/:_id',component:PassTestView}
    ]
})
const app=createApp(MainPage);

app.use(store);
app.use(router)
app.mount('#app')
