<template>
  <template v-for="option in options" :key="option.id">
    <input
      :id="option.id"
      :value="option.value"
      :checked="modelValue === option.value"
      type="radio"
      name="radio"
      class="form-input-radio-field"
    />
    <label
      tabindex="0"
      :for="option.id"
      @click="$emit('update:modelValue', option.value)"
      @keydown.enter="$emit('update:modelValue', option.value)"
    >{{ option.label }}</label>
  </template>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

defineProps(['modelValue'])
const emit = defineEmits(["update:modelValue"]);

const options = ref(
  [{
    id: 'easy',
    model: 'difficulty',
    value: 'easy',
    label: 'Easy',
  }, {
    id: 'medium',
    model: 'difficulty',
    value: 'medium',
    label: 'Medium',
  }, {
    id: 'hard',
    model: 'difficulty',
    value: 'hard',
    label: 'Hard',
  }])

</script>