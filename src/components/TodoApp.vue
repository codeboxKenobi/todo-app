<template>
  <div class="todo-app">
    <div class="app-wrapper">
<!-- =============================================================================== -->
      <header class="header">
        <input v-model="inputValue" v-on:keyup.enter="goEnter" class="todo-input" placeholder="What needs to be done?" type="text" >
      </header>
<!-- =============================================================================== -->
<!-- =============================================================================== -->
      <section class="todo-list">

        <div v-for="todo in sortList" :key="todo._id" class="list-item">
            <input @click="checker"
                    class="custom-check"
                    type="checkbox"
                    :checked="todo.todoChecker"
                    :id="todo._id"
                    :name="todo.todoText" />
            <label class="label-check" for="todo._id">{{todo.todoText}}</label>
            <span  class="list-item-text"></span>
        </div>

      </section>
<!-- =============================================================================== -->

<!-- =============================================================================== -->
      <footer class="footer">
        <div class="item-counter">{{itemLeft()}} item left</div>
        <div @click="getAllList" class="items-filter">
          <button @click="getList" value="all" class="footer-button button-all" type="button" >All</button>
          <button @click="activeList()" value="active" class="footer-button button-active" type="button" >Active</button>
          <button @click="completedList()" value="completed" class="footer-button button-completed" type="button" >Completed</button>
        </div>
        <div class="completed-items">
          <button v-if="showClearButton" @click="removeTodo" class="footer-button button-clear-completed" type="button" >Clear completed</button>
        </div>
      </footer>
<!-- =============================================================================== -->
    </div>
  </div>
</template>

<script>


export default {
  name: 'TodoApp',
  data () {
    return {
      inputValue: '',
      sortList: null,
      showClearButton: null
    }
  },
  methods: {
    checkButton () {
      let x = this.$store.getters.TODOS.filter(item => item.todoChecker === true).length
      console.log(x);
    },
    goEnter (event) {
      if (event.keyCode === 13) {
        this.$store.dispatch('SAVE_TODOS', this.inputValue)
        this.inputValue = ''
      }
    },
    getList () {
       document.location.href = '/'
    },
    activeList () {
      this.sortList = this.$store.getters.TODOS.filter(item => item.todoChecker === false)
    },
    completedList () {
      this.sortList = this.$store.getters.TODOS.filter(item => item.todoChecker === true)
    },
    checker (event) {
      let chk = event.target
      if (chk.tagName === 'INPUT' && chk.type === 'checkbox') {
        console.log(chk.name, chk.id, chk.checked)
        this.$store.dispatch('UPDATE_TODOS', chk)
        location.reload()
      }
    },
    itemLeft () {
      return this.$store.getters.TODOS.filter(item => item.todoChecker === true).length
    },
    removeTodo (event) {
      let removeList = this.$store.getters.TODOS.filter(item => item.todoChecker === true)
      let removeData = removeList.map(item => item._id)
      this.$store.dispatch('DELETE_TODOS', removeData)
    },
    checkLeftTodo() {
      console.log(this.$store.getters.TODOS.filter(item => item.todoChecker === true).length);
    },
  },
  computed: {
    getAllList () {
      if (this.$store.getters.TODOS.filter(item => item.todoChecker === true).length != 0) {
        this.showClearButton = true
      }
      return this.sortList = this.$store.getters.TODOS
    },
  },
  mounted () {
    this.$store.dispatch('GET_TODOS')
  },
}
</script>

<style scoped>
/* ===========================app================================= */
.todo-app {
  height: 100vh;
  width: 100%;
  background-color: rgb(250, 250, 250);
  display: flex;
  justify-content: center;
  align-items: center;
}
/* ===========================app================================= */

/* ==========================app-wrapper========================== */
.app-wrapper {
  height: 80%;
  width: 70%;
  border: 1px solid rgb(114, 112, 112, 0.7);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
/* ===========================app-wrapper========================= */

/* ============================header============================= */
.header {
  height: 80px;
  width: 100%;
  border-bottom: 2px solid rgb(114, 112, 112, 0.7);
  display: flex;
  align-items: center;
}
.todo-input {
  height: 60px;
  width: 100%;
  border-bottom: 1px solid rgb(114, 112, 112, 0.7);
  color: rgb(114, 112, 112, 0.9);
  border: none;
  outline: none;
  font-size: 34px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 664px) {
 .todo-input {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid rgb(114, 112, 112, 0.7);
    color: rgb(114, 112, 112, 0.9);
    border: none;
    outline: none;
    font-size: 24px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}@media screen and (max-width: 446px) {
 .todo-input {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid rgb(114, 112, 112, 0.7);
    color: rgb(114, 112, 112, 0.9);
    border: none;
    outline: none;
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/* =============================header============================ */

/* ============================todo-list===========================*/
.todo-list {
  height: calc(100% - 120px);
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.todo-list::-webkit-scrollbar {
  display: none;
}
.list-item {
  min-height: 60px;
  width: 100%;
  border-bottom: 1px solid rgb(114, 112, 112, 0.7);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

input[type=checkbox]:checked + label.label-check{
  text-decoration: line-through;
}
.custom-check {
  height: 18px;
  width: 18px;
  margin-left: 20px;
}
.label-check {
  margin-left: 20px;
  font-size: 20px;
  color: rgb(85, 84, 84);
  margin-left: 10px;
}
.list-item-text {
  font-size: 20px;
  color: rgb(85, 84, 84);
  margin-left: 10px;
}

/* ============================todo-list===========================*/

/* =============================footer============================ */
.footer {
  height: 40px;
  width: 100%;
  border-top: 1px solid rgb(114, 112, 112, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 664px) {
  .footer {
    height: 150px;
    flex-direction: column;
  }
}
.item-counter {
  height: 100%;
  width: 150px;
  padding-left: 20px;
  color: rgb(114, 112, 112, 0.9);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
@media screen and (max-width: 664px) {
  .item-counter {
    height: 100%;
    width: 100%;
    padding-left: 0px;
    color: rgb(114, 112, 112, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.items-filter {
  height: 100%;
  width: calc(100% - 300px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-button {
  margin: 5px;
  outline: none;
  border: 1px solid  transparent;
  border-radius: 2px;
  background-color: rgb(250, 250, 250);
  color: rgb(114, 112, 112, 1);
}
.footer-button:hover {
  border: 1px solid  rgb(114, 112, 112, 0.7);
}

.completed-items {
  height: 100%;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* =============================footer============================ */
</style>
