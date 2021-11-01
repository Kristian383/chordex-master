<template>
  <base-card>
    <table>
      <thead>
        <tr class="table-headers">
          <th>Scale</th>
          <th>I</th>
          <th>ii</th>
          <th>iii</th>
          <th>IV</th>
          <th>V</th>
          <th>vi</th>
          <th>vii°</th>
          <!-- <th>Number of b / #</th> -->
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
  data() {
    return {
      formatedKeys: [],
    };
  },
  computed: {
    allKeys() {
      return this.formatedKeys;
    },
  },
  mounted() {
    this.$store.getters.getMusicKeys.forEach((element) => {
      let each = [];
      each.push(element.key, ...element.notes);
      this.formatedKeys.push(each);
    });
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
/* thead th:last-child {
  display:none;
} */
tbody td:first-child {
  font-weight: bold;
}
tbody tr:nth-last-child(-n + 7) {
  background-color: #e2e2e2;
}

tbody td:nth-child(7){
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

  /* thead th:last-child {
    display: block;
  } */
}
tr {
  background-color: #f2f2f2;
}

tr:hover td {
  background: #0d1117;
  color: #ffffff;
  cursor: pointer;
}

tr:hover td:nth-child(7)
{
  color: var(--burgundy);
}
</style>