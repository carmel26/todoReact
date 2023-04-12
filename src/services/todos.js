import axios from "axios";

class TodoDataService {


    getAll(token){
        axios.defaults.headers.common['Authorization'] = "Token "+token;
        return axios.get("https://carmel26.pythonanywhere.com/api/todos/");
    }

    createTodo(data, token){
        axios.defaults.headers.common["Authorization"] = "Token "+ token;
        return axios.post("https://carmel26.pythonanywhere.com/api/todos/create", data)
    }

    updateTodo(id, data, token){
        axios.defaults.headers.common["Authorization"] = "Token " +token;
        return axios.put(`https://carmel26.pythonanywhere.com/api/todos/${id}`, data)
    }

    deleteTodo(id, token){
        axios.defaults.headers.common["Authorization"] = "Token "+token;
        return axios.delete(`https://carmel26.pythonanywhere.com/api/todos/${id}`);
    }

    completeTodo(id, token){
        axios.defaults.headers.common["Authorization"] = "Token "+token;
        return axios.put(`https://carmel26.pythonanywhere.com/api/todos/${id}/complete`);
    }

    login(data){
        return axios.post("https://carmel26.pythonanywhere.com/api/login/", data);
    }

    signup(data){
        return axios.post("https://carmel26.pythonanywhere.com/api/signup/", data);
    }

}

export default new TodoDataService();