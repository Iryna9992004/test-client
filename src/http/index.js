import axios from 'axios';

export const API_URL=`http://16.171.236.23:4000/api`

const $api=axios.create({
    withCredentials:true,
    baseURL:API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
    return config
});

$api.interceptors.response.use((config)=>{
    return config;
}, async (error)=>{
    const originalRequest=error.config;
    if(error.status===401){
        try{
            const response=await axios.get(`${API_URL}/refresh`,{withCredentials:true});
            localStorage.setItem('token',response.data.accessToken);
            return $api.request(originalRequest);
        }
        catch(e){
            console.log('User not authorized')
        }
    }
})

export default $api;