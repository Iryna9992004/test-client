import $api from "@/http";

export default class TestService{
    static async add(name,email){
        return $api.post('/test/add',{name,email})
    }

    static async edit(_id,name){
       return $api.post('/test/edit',{_id,name})
    }

    static async get(email){
        return $api.post('/test/get',{email})
    }

    static async markAsImportant(_id){
        return $api.post('/test/important',{_id})
    }

    static async sendTest(_id,student,answer){
        return $api.post('/test/send',{_id,student:student,answer:answer})
    }
}