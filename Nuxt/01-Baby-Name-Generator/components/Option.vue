<template>
  <div class="option-container">
    <h4>{{ option.title }}</h4>
    <div class="option-button">
      <button
        v-for="(button, index) in option.buttons"
        :key="button"
        :class="[
          'option',
          index === 0
            ? 'option-left'
            : index === option.buttons.length - 1
            ? 'option-right'
            : '',
          optionState[option.category] === button ? 'option-active' : '',
        ]"
        @click="optionState[option.category] = button"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gender, Length, Popularity } from "~~/data";

interface OptionsProps {
  option: {
    title: string;
    category: string;
    buttons: Gender[] | Popularity[] | Length[];
  };
  optionState: {
    gender: Gender;
    popularity: Popularity;
    length: Length;
  };
}

const props = defineProps<OptionsProps>();
</script>

<style scoped>
.option-container {
  margin-bottom: 2rem;
}

.option {
  background-color: white;
  outline: 0.15rem solid rgb(249, 87, 89);
  border: none;
  padding: 0.75rem;
  width: 12rem;
  font-size: 1rem;
  color: rgb(27, 60, 138);
  cursor: pointer;
}

.option-left {
  border-radius: 1rem 0 0 1rem;
}

.option-right {
  border-radius: 0 1rem 1rem 0;
}

.option-active {
  background-color: rgb(249, 87, 89);
  color: white;
}
</style>
