<template>
  <base-card>
    <table>
      <thead>
        <tr class="table-headers">
          <th>Major Scale</th>
          <th>I</th>
          <th>ii</th>
          <th>iii</th>
          <th>IV</th>
          <th>V</th>
          <th>vi</th>
          <th>VII°</th>
          <th>Number of b/#</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="key in allKeys" :key="key">
              <td></td>
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
  data(){
      return {

      }
  },
  computed: {
      allKeys() {
          return true 
      }
  },
};
</script>

<style scoped>
table th{
    font-size: 24px;
}
</style>