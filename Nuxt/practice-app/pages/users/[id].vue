<template>
    <div>
        Welcome user {{ id }}
    </div>
</template>
<script setup lang="ts">
    const { id } = useRoute().params
</script>