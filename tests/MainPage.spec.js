import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import MainPage from "../src/components/MainPage.vue";
import { useTodoStore } from "../src/store/todo";
import { nextTick } from "vue";

describe("MainPage.vue", () => {
  let pinia;
  let todoStore;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    todoStore = useTodoStore();
  });

  // This ensures after each test cases, we're using a fresh new state of the store
  afterEach(() => {
    localStorage.clear();
    todoStore.$reset();
  });

  test("Adds a new to-do when the Add button is clicked", async () => {
    const wrapper = mount(MainPage, {
      global: {
        plugins: [pinia],
      },
    });

    // Simulate entering a new to-do text
    const input = wrapper.find("textarea");
    await input.setValue("New Task");

    // Simulate clicking the Add button
    const addButton = wrapper.find("button");
    await addButton.trigger("click");

    // Check if the store contains the new to-do
    expect(todoStore.todos).toHaveLength(1);
    expect(todoStore.todos[0].text).toBe("New Task");
  });

  test("Marks a task as completed when clicking its checkbox", async () => {
    const wrapper = mount(MainPage, {
      global: {
        plugins: [pinia],
      },
    });

    // Add a new task
    const input = wrapper.find("textarea");
    await input.setValue("Complete task");
    const addButton = wrapper.find("button");
    await addButton.trigger("click");

    // Ensure the task is added
    expect(todoStore.todos).toHaveLength(1);
    expect(todoStore.todos[0].text).toBe("Complete task");
    expect(todoStore.todos[0].completed).toBe(false);

    // Find the checkbox for the first task
    const checkBox = wrapper.find('input[type="checkbox"]');
    expect(checkBox.exists()).toBe(true); // Ensure checkbox is found

    // Click the checkbox to trigger completioon
    await checkBox.trigger("change"); // This simulates the clicking of the checkbox
    await nextTick();

    // Check if the completion status updated in the store
    expect(todoStore.todos[0].completed).toBe(true);

    // Verify the task is now in completedTodos
    expect(todoStore.completedTodos).toHaveLength(1);
    expect(todoStore.completedTodos[0].text).toBe("Complete task");

    // Ensure only completed tasks exist
    const inProgressTasks = todoStore.todos.filter((todo) => !todo.completed);
    expect(inProgressTasks).toHaveLength(0);
  });
});
