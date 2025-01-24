<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">To-Do List</h1>
    <!-- Text Area for adding new tasks -->
    <div class="flex justify-center items-center gap-2 mb-4">
      <textarea
        v-model="newTodoText"
        placeholder="Add a new to-do"
        class="border rounded px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="addTodo"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>

    <!-- Accordion for Inprogress Tasks -->
    <div class="">
      <button
        @click="toggleInProgressAccordion"
        class="w-full text-left bg-yellow-200 px-4 py-2 rounded mt-4 flex justify-between items-center"
      >
        In Progress Tasks ({{ activeTodos.length }})
        <span class="ml-2">{{ isInprogressAccordionOpen ? "▲" : "▼" }}</span>
      </button>
      <div v-show="isInprogressAccordionOpen" class="space-y-4 mt-2">
        <draggable
          :list="activeTodos"
          :group="{ name: 'todos', pull: 'clone', put: true }"
          item-key="id"
          class="space-y-4 flex flex-col justify-center w-full"
          :handle="'.drag-icon'"
          @end="onDragEnd"
        >
          <template #item="{ element: todo }">
            <li
              :key="todo.id"
              class="flex items-center w-[40%] p-4 border rounded shadow-sm bg-white mx-2"
              :class="{ 'bg-gray-100': todo.completed }"
            >
              <img
                alt="drag logo"
                src="../assets/drag.png"
                class="drag-icon h-5 w-5 object-contain mr-4 cursor-move"
              />

              <div class="flex items-center gap-2 flex-grow">
                <input
                  type="checkbox"
                  :checked="todo.completed"
                  @change="toggleTodo(todo.id)"
                  class="h-5 w-5 text-blue-600 border-2 flex-shrink-0"
                />

                <span
                  :class="{ 'line-through text-gray-500': todo.completed }"
                  class="text-lg flex-grow break-words whitespace-pre-line"
                >
                  {{ todo.text }}
                </span>
              </div>

              <div class="flex gap-2 ml-auto">
                <button
                  v-if="!todo.completed"
                  @click="openEditModal(todo)"
                  class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  @click="deleteTodo(todo.id)"
                  class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          </template>
        </draggable>
      </div>
    </div>

    <!-- Accordion for Completed Tasks -->
    <div>
      <button
        @click="toggleCompleteAccordion"
        class="w-full text-left bg-green-400 px-4 py-2 rounded mt-4 flex justify-between items-center"
      >
        Completed Tasks ({{ completedTodos.length }})
        <span class="ml-2">{{ isCompletedAccordionOpen ? "▲" : "▼" }}</span>
      </button>
      <div v-show="isCompletedAccordionOpen" class="space-y-4 mt-2">
        <div
          v-for="todo in completedTodos"
          :key="todo.id"
          class="p-4 border rounded shadow-sm bg-gray-100 w-lg"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <input
                type="checkbox"
                checked
                @change="toggleTodo(todo.id)"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
              <span
                class="text-lg line-through text-gray-500 flex-grow break-words whitespace-pre-line"
              >
                {{ todo.text }}</span
              >
            </div>
            <div class="flex gap-2">
              <button
                @click="deleteTodo(todo.id)"
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 text-center">
      <p>
        Active To-Dos: <span class="font-bold">{{ activeTodos.length }}</span>
      </p>
      <p>
        Total To-Dos: <span class="font-bold">{{ todoStore.todoCount }}</span>
      </p>
      <p>
        Completed To-Dos:
        <span class="font-bold">{{ completedTodos.length }}</span>
      </p>
    </div>

    <!-- Modal for edit-->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded shadow-lg w-96 text-center">
        <h3 class="text-2xl font-semibold mb-4">Edit To-Do</h3>

        <textarea
          v-model="modalTodoText"
          class="border rounded px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
          max-rows="10"
          style="max-height: 10em; overflow-y: auto"
          placeholder="Edit your to-do here"
        />

        <div class="flex justify-between">
          <button
            @click="saveEdit"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            @click="closeModal"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "@/store/todo";
import draggable from "vuedraggable";

const todoStore = useTodoStore();

// Local state for new to-do text
const newTodoText = ref("");

// Modal state
const isModalOpen = ref(false);
const modalTodoText = ref("");
const editingTodoId = ref(null);

// Accordion state
const isCompletedAccordionOpen = ref(false);
const isInprogressAccordionOpen = ref(true);

// Computed properties for sorted todos
const completedTodos = computed(() => {
  return todoStore.todos.filter((todo) => todo.completed);
});
const activeTodos = computed(() => {
  return todoStore.todos.filter((todo) => !todo.completed);
});

// Handler for updating of order
const onDragEnd = () => {
  console.log("updatehere", activeTodos.value);
  todoStore.updateTodoOrder([...activeTodos.value]);
};

// Add a new to-do
const addTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = ""; // Clear the input
  }
};

// Open the modal for editing
const openEditModal = (todo) => {
  isModalOpen.value = true;
  modalTodoText.value = todo.text;
  editingTodoId.value = todo.id;
};

// Save the edited to-do
const saveEdit = () => {
  if (editingTodoId.value !== null && modalTodoText.value.trim()) {
    todoStore.editTodo(editingTodoId.value, modalTodoText.value);
    closeModal();
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  modalTodoText.value = "";
  editingTodoId.value = null;
};

// Toggle completion status
const toggleTodo = (id) => {
  todoStore.toggleTodo(id);
};

const deleteTodo = (id) => {
  todoStore.deleteTodo(id);
};

const toggleCompleteAccordion = () => {
  isCompletedAccordionOpen.value = !isCompletedAccordionOpen.value;
};

const toggleInProgressAccordion = () => {
  isInprogressAccordionOpen.value = !isInprogressAccordionOpen.value;
};
</script>
