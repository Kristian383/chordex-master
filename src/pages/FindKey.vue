<template>
  <base-card>
    <section class="section">
      <table>
        <thead>
          <tr class="table-headers">
            <th>Key (I)</th>
            <!-- <th>I</th> -->
            <th>ii</th>
            <th>iii</th>
            <th>IV</th>
            <th>V</th>
            <th>vi</th>
            <th>vii°</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="key of allKeys" :key="key">
            <template v-for="note in key" :key="note">
              <td>{{ note }}</td>
            </template>
          </tr>
        </tbody>
      </table>
      <p v-if="errorMsg" class="error-text">
        {{ errorMsg }}
      </p>
      <div class="notes-div">
        <textarea
          ref="txtHeight"
          v-model="notes"
          class="notebook"
          placeholder="Notes about certain ideas..."
          :style="{ height: getTxtAreaHeight + 'px' }"
          @click="updateNotes"
          @blur="updateNotes"
        ></textarea>
      </div>
    </section>
  </base-card>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const notes = ref("");
    const errorMsg = ref("");
    const txtHeight = ref(null);

    const store = useStore();

    const allKeys = computed(() => {
      let formatedKeys = [];
      store.getters.getMusicKeys.forEach((element) => {
        let each = [];
        each.push(...element.notes);
        formatedKeys.push(each);
      });

      return formatedKeys;
    });

    const getTxtAreaHeight = computed(() => {
      return store.getters.getTxtAreaHeight;
    });

    function updateNotes() {
      if (notes.value && notes.value.length > 10000) {
        errorMsg.value =
          "You have exceeded maximum amount of text (10000), you have: " +
          notes.value.length +
          ".   Please shorten, otherwise it won't be saved.";

        return;
      }
      errorMsg.value = "";
      store.dispatch("updateUsersNotes", {
        notes: notes.value,
        txtAreaHeight: txtHeight.value.offsetHeight,
      });
    }

    onMounted(() => {
      store.dispatch("loadUsersNotes").then(() => {
        notes.value = store.getters.getUserNotes;
      });
    });

    return {
      notes,
      errorMsg,
      allKeys,
      getTxtAreaHeight,
      txtHeight,
      updateNotes,
    };
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

table {
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
table th {
  font-size: 20px;
  background: #0d1117;
  background: #242424;
  background: var(--burgundy);

  color: #fff;
}
tbody td {
  font-size: 18px;
  font-weight: 400;
  padding: 2px;
  text-align: center;
}

tbody td:first-child {
  font-weight: bold;
}
tbody tr:nth-last-child(-n + 7) {
  background-color: #e5e5e5;
}

tbody td:nth-child(6) {
  font-weight: 600;
}

@media (min-width: 720px) {
  table th {
    font-size: 32px;
    padding: 8px;
  }
  tbody td {
    font-size: 21px;
    padding: 8px;
    width: 100px;
  }
}
tr {
  background-color: #f2f2f2;
}
tr:hover {
  border-bottom: 4px solid black;
}
tr:hover td {
  background: #b0b0b0;
  cursor: pointer;
}

tr td:nth-child(6) {
  text-decoration: underline;
}

/* notes */
.error-text {
  color: var(--burgundy);
  font-size: 14px;
  margin-top: 32px;
}

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

  margin-top: 3em;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: var(--light_gray);
  resize: vertical;
  color: var(--font_black);
}
</style>