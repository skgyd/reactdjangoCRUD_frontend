import axios from "axios"

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

export default{
    getAllPosts(){      //모든 글 불러오기
        return axios.get('/posts/')
    },

    createPost(data){   //글 작성하기
        return axios.post('/posts/',data)
    },

    deletePost(id){
        return axios.delete('/posts/'+String(id))
    }
}