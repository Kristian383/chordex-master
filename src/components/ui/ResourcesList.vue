<template>
  <base-card>
    <div class="section">
      <div>
        <textarea
          v-model="notes"
          class="notebook"
          placeholder="Notes about certain ideas..."
          ref="txtHeight"
          @click="watchHeight"
          @blur="updateNotes"
          :style="{ height: getTxtAreaHeight + 'px' }"
        ></textarea>
      </div>
      <div class="todos">
        <span><h2>Useful resources</h2></span>
        <br />
        <input
          type="text"
          v-model.trim="newTodo.text"
          @keypress.enter="addTodo"
          placeholder="Add name and link: https://...."
          :class="{ error: badInput }"
          @blur="badInput = false"
        />
        <div v-if="getResources.length">
          <transition-group tag="ul" name="list">
            <li
              v-for="todo in getResources"
              :key="todo.id"
              class="resource-element"
            >
              {{ todo.text }}
              <a :href="todo.link" target="_blank">Click Link</a>
              <font-awesome-icon
                @click="deleteTodo(todo.id)"
                :icon="['far', 'times-circle']"
              ></font-awesome-icon>
            </li>
          </transition-group>
        </div>
        <div v-else>
          Type name of website and its link e.g.
          <i>Chord finder https://www.chordex.com </i><br />
        </div>
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
      newTodo: {
        text: null,
        id: null,
      },
      notes: null,
      txtAreaHeight: null,
      badInput: false,
    };
  },

  methods: {
    addTodo() {
      if (this.newTodo.text) {
        const id = Math.random().toString(36).substring(2);
        let data = this.newTodo.text.split(" ");

        if (data.length < 2) {
          this.badInput = true;
          return;
        }

        let link;
        try {
          link = new URL(data[data.length - 1]);
        } catch (error) {
          this.badInput = true;
          return;
        }
        // console.log("tu", link.origin);
        let text = data.slice(0, data.length - 1).join(" ");
        this.$store.commit("addUserResourcesList", {
          text: text,
          id,
          link: link.origin,
        });

        this.newTodo.text = "";
      } else {
        this.badInput = true;
      }
    },
    deleteTodo(id) {
      this.$store.commit("deleteUserResourcesList", id);
    },
    watchHeight() {
      this.$store.commit(
        "updateTxtAreaHeight",
        this.$refs.txtHeight.offsetHeight
      );
    },
    updateNotes() {
      this.$store.commit("updateUserNotes", this.notes);
    },
  },
  computed: {
    getResources() {
      return this.$store.getters.getUserResourcesList;
    },
    getTxtAreaHeight() {
      return this.$store.getters.getTxtAreaHeight;
    },
    getNotes() {
      return this.$store.getters.getUserNotes;
    },
  },
  mounted() {
    this.notes = this.getNotes;
  },
};
</script>

<style scoped>
.error {
  border-color: var(--burgundy);
  -webkit-animation: shake 0.2s ease-in-out 0s 2;
  animation: shake 0.2s ease-in-out 0s 2;
}

@-webkit-keyframes shake {
  0% {
    margin-left: 0rem;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0rem;
  }
}

@keyframes shake {
  0% {
    margin-left: 0rem;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0rem;
  }
}

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
  border-radius: 8px;
  height: 100%;
  margin-bottom: 20px;
  border: 2px solid #252934;
  /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */
}
.todos ul {
  position: relative;
  padding: 0;
}
.todos .resource-element {
  list-style-type: none;
  display: flex;
  font-weight: 500;
  /* gap: 18px; */
  align-items: center;
  margin-bottom: 10px;
  padding: 14px;
  font-size: 18px;
  gap: 18px;
  border: 1px solid #eaeaea;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
}

.todos .resource-element a {
  color: #0d1117;
  font-weight: 600;
  text-decoration: none;
}
.todos .resource-element a:hover,
.todos .resource-element a:focus {
  color: #00c;
}
.resource-element svg {
  font-size: 24px;
  transition: 0.2s ease-in all;
  margin-left: auto;
}
.resource-element svg:hover {
  color: var(--burgundy);
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
  min-height: 200px;
  margin-top: 1em;
  font-size: inherit;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: var(--form_gray);
  resize: vertical;
  font-size: 18px;
  color: var(--font_black);
}

/* list transitions */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute; /* for move transition after item leaves */
}
.list-move {
  transition: all 0.3s ease;
}
</style>