<template>
  <div class="card">
    <h4>{{ name }}</h4>
    <p @click="remove">x</p>
  </div>
</template>

<script setup lang="ts">
interface CardOption {
  name: string;
}
const prop = defineProps<CardOption>();
const emit = defineEmits(["remove"])

const remove = () => {
    emit("remove", null)
}

</script>

<style scoped>
.card {
  background-color: rgb(27, 60, 138);
  width: 28%;
  color: white;
  border-radius: 1rem;
  padding: 1rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
}

.card p {
  position: absolute;
  top: 0;
  left: 90.5%;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.17);
}
</style>
