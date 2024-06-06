<template>
  <div class="cards-container">
    <Card v-for="(name, index) in selectedNames" :key="name" :name="name" @remove="() => remove(index)" />
  </div>
</template>
<script setup lang="ts">
import Card from "./Card.vue";
interface CardsOptions {
  selectedNames: string[];
}
const props = defineProps<CardsOptions>();
const emit = defineEmits(["remove"])

const remove = (index: number) => {
    emit("remove", index)
}

</script>
<style scoped>
.cards-container {
  display: flex;
  margin-top: 3rem;
  flex-wrap: wrap;
}
</style>
