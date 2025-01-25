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
        @click="handleAddTodo"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>

    <!-- In Progress Tasks Accordion -->
    <div class="w-full">
      <button
        @click="toggleInProgressAccordion"
        class="w-full text-left bg-yellow-200 px-4 py-2 rounded mt-4 flex justify-between items-center"
      >
        In Progress Tasks ({{ activeTodos.length }})
        <span class="ml-2">{{ isInprogressAccordionOpen ? "▲" : "▼" }}</span>
      </button>
      <div v-show="isInprogressAccordionOpen" class="space-y-4 mt-2 lg:px-6">
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
              class="flex items-center p-4 border rounded shadow-sm bg-white"
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
                  @change="completeTodo(todo.id)"
                  class="h-5 w-5 text-blue-600 border-2 flex-shrink-0"
                />
                <span
                  class="text-lg flex-grow text-left break-words whitespace-pre-line ml-2 mr-4"
                >
                  {{ todo.text }}
                </span>
              </div>
              <div class="flex gap-2 ml-auto">
                <button
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

    <!-- Completed Tasks Accordion -->
    <div class="w-full">
      <button
        @click="toggleCompleteAccordion"
        class="w-full text-left bg-green-400 px-4 py-2 rounded mt-4 flex justify-between items-center"
      >
        Completed Tasks ({{ completedTodos.length }})
        <span class="ml-2">{{ isCompletedAccordionOpen ? "▲" : "▼" }}</span>
      </button>
      <div v-show="isCompletedAccordionOpen" class="space-y-4 mt-2 lg:px-6">
        <div class="space-y-4 flex flex-col justify-center w-full">
          <li
            v-for="todo in completedTodos"
            :key="todo.id"
            class="flex items-center p-4 border rounded shadow-sm bg-gray-100"
          >
            <div class="flex items-center gap-2 flex-grow">
              <input
                type="checkbox"
                checked
                @change="toggleTodo(todo.id)"
                class="h-5 w-5 text-blue-600 border-2 flex-shrink-0"
              />
              <span
                class="text-lg text-left line-through text-gray-500 flex-grow break-words whitespace-pre-line ml-2 mr-4"
              >
                {{ todo.text }}
              </span>
            </div>
            <div class="flex gap-2">
              <button
                @click="deleteTodo(todo.id)"
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
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

// Computed properties for sorted to-dos
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
const handleAddTodo = () => {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value);
    newTodoText.value = ""; // Clear the input
  }

  isInprogressAccordionOpen.value = true;
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
const completeTodo = (id) => {
  todoStore.toggleTodo(id);
  isCompletedAccordionOpen.value = true;
};

// Uncheck completed task to In Progress
const toggleTodo = (id) => {
  todoStore.toggleTodo(id);
  isInprogressAccordionOpen.value = true;
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
