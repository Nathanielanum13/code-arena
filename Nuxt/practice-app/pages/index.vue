<template>
  <div>
    <h1>Welcome to the homepage 2</h1>
    <p>This is an auto-imported component</p>

    <hr />

    <div>
      <div v-for="(user, index) in data?.users || []">
        <b>{{ index + 1 }}. </b>
        <b>{{ user.name }}</b>
        <p>
          {{ user.email }}.
          <NuxtLink :to="'/users/' + user.id" class="link">Read more</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

const data = ref<any>({ users: [] });

// await useFetch(
//   "https://run.mocky.io/v3/4d5e8cdc-724f-4569-85a8-63ab4208bf6b"
// ).then((response) => {
//   data.value = response.data.value;
// });

onMounted(() => {
  setTimeout(async () => {
    await useFetch(
      "https://run.mocky.io/v3/4d5e8cdc-724f-4569-85a8-63ab4208bf6b"
    ).then((response) => {
      data.value = response.data.value;
    });
  }, 0);
});
</script>

<style>
.link {
  color: blue;
}
</style>
