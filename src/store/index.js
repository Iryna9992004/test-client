import { createStore } from "vuex";
import AuthService from '../services/AuthService';
import TestService from "@/services/TestService";

export default createStore({
    state:{
        isAuth:false,
        isActivated:false,
        iUser:{},
        isDeveloping:false,
        testId:null,
        update:false,
        deleteId:null,
        subtest:{
            question:'',
            variants:[],
            rightAnswers:[],
            isRequired:false,
            points:5,
            testId:null,
            file:''
        },
        answerArr:[],
        isChecked:false
    },
    getters:{
        getAuth(){return this.isAuth},
        getActivated(){return this.isActivated},
        getUser(){return this.iUser}
    },
    mutations:{
        setDeleteId(state,payload){
            state.deleteId=payload;
        },
        setAuth(state, bool) {
            state.isAuth = bool;
            console.log(state.isAuth);
        },
        setActivated(state, bool) {
            state.isActivated = bool;
            console.log(state.isActivated);
        },
        setUser(state, payload) {
            state.iUser = payload;
        },
        setDeveloping(state){
            state.isDeveloping=true
        },
        setNotDeveloping(state){
            state.isDeveloping=false
        },
        setDevelopingId(state,_id){
            state.testId=_id
        },
        setQuestion(state,question){
            state.subtest.question=question;
        },
        setRightAnswer(state,answer){
            state.subtest.rightAnswers[0]=answer;
        },
        setChecked(state,payload){
            state.subtest.isRequired=payload;
            console.log(state.subtest.isRequired)
        },
        setPoints(state,payload){
            state.subtest.points=payload;
        },
        setVariants(state,variant){
            if(variant!=='' && !state.subtest.variants.includes(variant)){
                state.subtest.variants.push(variant);
            }
        },
        setAddToChecked(state,payload){
            if(!state.subtest.rightAnswers.includes(payload)){
            state.subtest.rightAnswers.push(payload)}
        },
        setRemoveFromChecked(state,payload){
            if(state.subtest.rightAnswers.includes(payload)){
                state.subtest.rightAnswers = state.subtest.rightAnswers.filter((item)=>item!=payload)
            }
        },
        setSubtestFile(state, file) {
            state.subtest.file = file;
        },
        setClean(state){
            state.subtest={
                question:'',
                variants:[],
                rightAnswers:[],
                isRequired:false,
                points:5,
                testId:null,
                file:null
            }
        },
        setUpdate(state){
            state.update=!state.update;
            console.log(state.update)
        },
        setLengthAnswers(state,{_id,isRequired}){
            state.answerArr.push({_id,answer:[],isRequired})
        },
        setOneAnswer(state, { _id, answer }) {
            state.answerArr.map(item=>{
                if(item._id===_id){
                    item.answer[0]=answer;
                }
                if(item._id===_id && answer===''){
                    item.answer.pop()
                }
            })
        },
        setFewAnswers(state, { _id, checked, answer }) {
            state.answerArr.map(item=>{
                if(checked){
                    if(item._id==_id){
                        item.answer.push(answer)
                    }
                }
                else{
                    if(item._id==_id){
                        item.answer = item.answer.filter(a => a !== answer);
                    }
                }
            })
        },
        setCheck(state,{checked}){
            state.isChecked=checked;
        },
        setSubtestList(state,{arr}){
            state.subtest=arr;
        }
    },
    actions:{
        async registration({ commit }, { name, email, password }){
            try{
            const response = await AuthService.registration(name, email, password);
            console.log(response);
            localStorage.setItem('token',response.data.accessToken);
            commit('setActivated', response.data.user.isActivated);
            localStorage.getItem('token') ? commit('setAuth', true) : commit('setAuth', false);
            commit('setUser', { email: response.data.user.email });
            }
            catch(e){
                alert('User is not authorized!')
            }
        },
        async login({ commit }, { email, password }){
            try{
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('token',response.data.accessToken);
            commit('setActivated', response.data.user.isActivated);
            localStorage.getItem('token') ? commit('setAuth', true) : commit('setAuth', false);
            commit('setUser', {email: response.data.user.email });
            }
            catch(e){
                alert('User is not authorized!')
            }
        },
        async refresh({ commit }) {
            try {
                const response = await AuthService.refresh();
                console.log(response)
                localStorage.setItem('token', response.data.accessToken);
                commit('setActivated', response.data.user.isActivated);
                localStorage.getItem('token') ? commit('setAuth', true) : commit('setAuth', false);
                commit('setUser', { email: response.data.user.email });
            } catch (error) {
                console.error('Error during refresh:', error);
            }
        },

        async logout({commit}){
            try{
                const response=await AuthService.logout();
                console.log(response);
                commit('setUser',{});
                commit('setActivated',false);
                commit('setAuth',false)
                localStorage.removeItem('token')
            }
            catch(e){
                console.log(e)
            }
        },

        async addTest({state},name){
            return await TestService.add(name,state.iUser.email)
        },

        async getTests({state}){
            let response= await TestService.get(state.iUser.email)
            return response;
        },

        async develop({commit}){
            return commit('setDeveloping')
        },

        async notDevelop({commit}){
            return commit('setNotDeveloping')
        },

        async developingId({commit},_id){
            return commit('setDevelopingId',_id)
        },

        async addSubtest({ state,commit }) {
            const testId1 = state.testId || localStorage.getItem('dev');
            if (testId1 === null || state.subtest.question === '') {
              alert('Can`t create a subtest! Question is missing!');
              return;
            }
            else if(state.subtest.variants.length >= 1 && state.subtest.rightAnswers.length === 0){
                alert('Choose at least one right answer!');
                return;
            }
            const formData = new FormData();
            formData.append('question', state.subtest.question);
            formData.append('variants', JSON.stringify(state.subtest.variants));
            formData.append('rightAnswers', JSON.stringify(state.subtest.rightAnswers));
            formData.append('isRequired', state.subtest.isRequired);
            formData.append('points', state.subtest.points);
            formData.append('testId', testId1);
            formData.append('file', state.subtest.file ? state.subtest.file : null);
          
            try {
              const response = await fetch('http://localhost:4000/api/subtest/add', {
                method: 'POST',
                body: formData,
              });
              if (response.ok) {
                commit('setClean')
                commit('setUpdate')
                
                return response;
              } else {
                console.error('Failed to add subtest');
              }
            } catch (error) {
              console.error('Error:', error);
            }
        },

        async sendToCheck({ state }, _id) {
            try {
                const isEmpty = state.answerArr.reduce((emptyItems, current) => {
                    return current.isRequired && current.answer.length === 0 ? emptyItems + 1 : emptyItems;
                }, 0);
        
                if (isEmpty > 0) {
                    alert('Please, fill all required the fields!');
                    return;
                }
        
                const answers = state.answerArr.map(item => {
                    const right = state.subtest.find(i => item._id === i._id);
                    
                    if (item.answer.length !== right.rightAnswers.length) {
                        return {
                            sentTestId: _id,
                            subtetstId: item._id,
                            answer: item.answer,
                            isRight: false
                        };
                    }
                    
                    const isRight = item.answer.every(ans => right.rightAnswers.includes(ans));
        
                    return {
                        sentTestId: _id,
                        subtetstId: item._id,
                        answer: item.answer,
                        isRight: isRight
                    };
                });
        
                console.log(answers[12]);
                const student=localStorage.getItem('student')
                const response=await TestService.sendTest(_id,student,answers);
                console.log(response)
                this.commit('setCheck',{checked:true});
                
            } catch (e) {
                console.log(e);
            }
        }
    },
})