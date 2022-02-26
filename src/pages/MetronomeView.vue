<template>
  <base-card>
    <div>
        <the-metronome></the-metronome>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
import TheMetronome from "../components/ui/TheMetronome.vue";

export default {
  components: {
    BaseCard,
    TheMetronome,
  },
};
</script>

<style>
</style>