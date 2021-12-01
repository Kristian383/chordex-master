<template>
  <base-card>
    <div class="section">
      
      <div class="todos">
        <span><h2>Useful websites</h2></span>
        <br />
        <div class="inputs">
          <input
            type="text"
            v-on:keyup.enter="$event.target.nextElementSibling.focus()"
            v-model.trim="website.name"
            placeholder="Website name"
            :class="{ error: badInput }"
            @blur="badInput = false"
          />
          <input
            type="text"
            v-model.trim="website.link"
            @keypress.enter="addTodo"
            placeholder="Website link: https://...."
            :class="{ error: badInput }"
            @blur="badInput = false"
          />
        </div>
        <div v-if="getWebsites.length">
          <transition-group tag="ul" name="list">
            <li
              v-for="website in getWebsites"
              :key="website.name"
              class="resource-element"
            >
              {{ website.name }}
              <a :href="website.link" target="_blank"
                >Go to {{ website.name }}</a
              >
              <font-awesome-icon
                @click="deleteWebsite(website.name)"
                :icon="['far', 'times-circle']"
              ></font-awesome-icon>
            </li>
          </transition-group>
        </div>
        <div class="example" v-else>
          <i>Currently no websites saved.</i><br />
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
      website: {
        name: null,
        // id: null,
        link: null,
      },
      // notes: null,
      // txtAreaHeight: null,
      badInput: false,
    };
  },

  methods: {
    addTodo() {
      if (this.website.name) {
        // const id = Math.random().toString(36).substring(2);
        if (this.website.name.length < 2 || this.website.name.length > 30) {
          this.badInput = true;
          return;
        }

        let link;
        try {
          link = new URL(this.website.link);
        } catch (error) {
          this.badInput = true;
          return;
        }

        this.$store.dispatch("addUserWebsite", {
          name: this.website.name,
          link: link.href,
        });

        this.website.name = "";
        this.website.link = "";
      } else {
        this.badInput = true;
      }
    },
    deleteWebsite(name) {
      this.$store.dispatch("deleteUserWebsite", name);
    },

    // updateNotes() {
    //   this.$store.dispatch("updateUsersNotes", {
    //     notes: this.notes,
    //     txtAreaHeight: this.$refs.txtHeight.offsetHeight,
    //   });
    // },
  },
  computed: {
    getWebsites() {
      return this.$store.getters.getUserWebsitesLinks;
    },
    // getTxtAreaHeight() {
    //   return this.$store.getters.getTxtAreaHeight;
    // },
    // getNotes() {
    //   return this.$store.getters.getUserNotes;
    // },
  },
  mounted() {
    // this.$store.dispatch("loadUsersNotes").then(() => {
    //   this.notes = this.getNotes;
    // });

    this.$store.dispatch("loadUserWebsites");
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
  /* margin-bottom: 20px; */
  outline: 0;
  width: 100%;
  border-radius: 8px;
  height: 100%;
  border: 2px solid #252934;
  /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */
}
.todos .inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin-bottom: 14px;
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
/* 

.notebook {
  border: 0;
  outline: 0;
  padding: 1em;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  width: 100%;
  min-height: 200px;
  line-height: 31px;
  font-size: inherit;

  margin-top: 1em;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: var(--f1_gray);
  resize: vertical;
  color: var(--font_black);
} */

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