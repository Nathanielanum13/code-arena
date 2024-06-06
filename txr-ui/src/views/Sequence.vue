<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <Dashboard>
            <div class="page-section">
                <h2>Sequence</h2>
                <br>
                <form>
                    <label for="">Application</label>
                    <input type="text" name="" id="">

                    <br>

                    <p class="label">Frequency</p>
                    <div>
                        <CronScheduler></CronScheduler>
                    </div>
                </form>
            </div>
        </Dashboard>
    </div>
</template>
<script setup lang="ts">
import Dashboard from '@/components/layouts/Dashboard.vue';
import CronScheduler from '@/components/CronScheduler.vue';
</script>
