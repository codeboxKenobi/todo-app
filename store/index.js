import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        todos: null
    },
    getters: {
        TODOS: state => {
            return state.todos
        }
    },
    mutations: {
        ADD_TODOS: (state, loadData) => {
            state.todos.push(loadData)
            console.log(loadData);
        },
        SET_TODOS: (state, loadData) => {
            state.todos = loadData
        }, 
 
    },
    actions: {
        GET_TODOS: async (context, loadData) => {
            let {data} = await Axios.get('http://localhost:5000/api/todo')
            context.commit('SET_TODOS', data)
        },
        SAVE_TODOS: async (context, loadData) => {
            let {data} = await Axios.post('http://localhost:5000/api/todo', {
                todoText: loadData
            })
            context.commit('ADD_TODOS', data)
        },
        UPDATE_TODOS: async (context, loadData) => {
            let {data} = await Axios.put(`http://localhost:5000/api/todo/${loadData.id}`, {
                todoChecker: loadData.checked
            })
            context.commit('ADD_TODOS', data)
        },
        DELETE_TODOS: async (context, loadData) => {
            for (let i = 0; i < loadData.length; i++) {
                let {data} = await Axios.delete(`http://localhost:5000/api/todo/${loadData[i]}`)
                context.commit('ADD_TODOS', data)
            }
            location.reload()
        },

    },
})