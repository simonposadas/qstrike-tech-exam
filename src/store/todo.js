import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: JSON.parse(localStorage.getItem("todos")) || [], // Load todos from localStorage, default to empty array
  }),
  getters: {
    completedTodos: (state) => state.todos.filter((todo) => todo.completed),
    todoCount: (state) => state.todos.length,
  },
  actions: {
    addTodo(text) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      this.todos.push(newTodo);
      this.saveToLocalStorage();
    },

    editTodo(id, newText) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
        this.saveToLocalStorage();
      }
    },

    toggleTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveToLocalStorage();
      }
    },

    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },

    updateTodoOrder(newOrder) {
      this.todos = newOrder;
      this.saveToLocalStorage();
    },
  },
});
