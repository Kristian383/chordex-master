<template>
  <base-card>
    <div class="section">
      <div>
        <textarea
          v-model="notes"
          id="txt_area"
          name=""
          class="notebook"
          placeholder="My notes..."
        ></textarea>

        <!-- @keydown.tab.prevent="tabber($event)" -->
      </div>
      <div class="todos">
        <input
          type="text"
          v-model="newTodo.text"
          @keypress.enter="addTodo"
          placeholder="Add an useful resource link..."
        />
        <div v-if="todos.length">
          <ul>
            <li v-for="todo in todos" :key="todo.id" class="resource-element">
              {{ todo.text }}
              <font-awesome-icon
                @click="deleteTodo(todo.id)"
                :icon="['far', 'times-circle']"
              ></font-awesome-icon>
            </li>
          </ul>
        </div>
        <div v-else>Useful resources are empty.</div>
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "../ui/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
  data() {
    return {
      todos: [
        { text: "make the rgb(194, 42, 42)bed", id: 1 },
        { text: "play video games", id: 2 },
      ],
      newTodo: {
        text: null,
        id: null,
      },
      notes: null,
    };
  },

  methods: {
    addTodo() {
      if (this.newTodo.text) {
        const id = Math.random().toString(36).substring(2);
        this.todos = [{ text: this.newTodo.text, id }, ...this.todos];
        this.newTodo.text = "";
      } else {
        this.$emit("badValue");
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id != id);
    },
  },
};
</script>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
.todos {
  max-width: 700px;
  margin: 20px auto;
  position: relative;
  width: 100%;
}
input {
  font-size: 21px;
  padding: 14px;
  outline: 0;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  border: 1px solid #252934;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.todos ul {
  position: relative;
  padding: 0;
}
.todos .resource-element {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 14px;
  font-size: 18px;
  border-bottom: 2px solid #252934;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}
.resource-element svg {
  font-size: 24px;
  transition: 0.2s ease-in all;
}
.resource-element svg:hover {
  color: rgb(194, 42, 42);
}
.todos .resource-element:hover {
  cursor: pointer;
}

.notebook {
  border: 0;
  outline: 0;
  padding: 1em;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  /* display: inline-block;  */
  width: 100%;
  min-height: 250px;
  margin-top: 1em;
  font-size: inherit;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: #eaebea;
  resize: vertical;
  font-size: 18px;
  color: RGB(16, 17, 20);
}
</style>