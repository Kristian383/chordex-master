<template>
  <base-card>
    <table>
      <thead>
        <tr class="table-headers">
          <th>Key</th>
          <th>I</th>
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
  </base-card>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },

  computed: {
    allKeys() {
      let formatedKeys = [];
      this.$store.getters.getMusicKeys.forEach((element) => {
        let each = [];
        each.push(element.key, ...element.notes);
        formatedKeys.push(each);
      });
      return formatedKeys;
    },
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
table th {
  font-size: 20px;
  background: #242424;
  background: #0d1117;
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
  background-color: #e2e2e2;
}

tbody td:nth-child(7) {
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
  background: var(--mid_gray);
  color: #ffffff;
  cursor: pointer;
}

tr td:nth-child(7) {
  text-decoration: underline;
}
</style>