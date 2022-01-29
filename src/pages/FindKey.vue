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
          v-model="notes"
          class="notebook"
          placeholder="Notes about certain ideas..."
          ref="txtHeight"
          @click="updateNotes"
          @blur="updateNotes"
          :style="{ height: getTxtAreaHeight + 'px' }"
        ></textarea>
      </div>
    </section>
  </base-card>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
  data() {
    return {
      notes: "",
      txtAreaHeight: null,
      errorMsg: "",
    };
  },
  computed: {
    allKeys() {
      let formatedKeys = [];
      this.$store.getters.getMusicKeys.forEach((element) => {
        let each = [];
        each.push(...element.notes);
        formatedKeys.push(each);
      });
      return formatedKeys;
    },

    getTxtAreaHeight() {
      return this.$store.getters.getTxtAreaHeight;
    },
    getNotes() {
      return this.$store.getters.getUserNotes;
    },
  },
  methods: {
    updateNotes() {
      if (this.notes && this.notes.length > 10000) {
        this.errorMsg =
          "You have exceeded maximum amount of text (10000), you have: " +
          this.notes.length +
          ".   Please shorten, otherwise it won't be saved.";

        return;
      }
      this.errorMsg = "";
      this.$store.dispatch("updateUsersNotes", {
        notes: this.notes,
        txtAreaHeight: this.$refs.txtHeight.offsetHeight,
      });
    },
  },
  mounted() {
    this.$store.dispatch("loadUsersNotes").then(() => {
      this.notes = this.getNotes;
    });
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