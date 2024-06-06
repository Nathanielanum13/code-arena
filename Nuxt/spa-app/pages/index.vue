<template>
    <h1>Home page</h1>
    <NuxtLink to="about">About me</NuxtLink>
    <button @click="refresh()">refresh</button>
    <div style="padding: 2rem;"> 
        <div v-if="pending" style="padding: 2rem; background: #80808020; border-radius: .25rem;">Loading</div>
        <div v-else>
            {{ data }}
        </div>
    </div>
    
</template>
<script lang="ts" setup>
    const { refresh, data, pending } = useFetch("https://run.mocky.io/v3/f39e23fc-ab0e-4e6f-b6bd-3c8acba387ef")

</script>
<style scoped></style>