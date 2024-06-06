<template>
    <div>
        <div class="tabs">
            <span :class="activeTab === 0 ? 'active' : ''" @click="activeTab = 0">Seconds</span>
            <span :class="activeTab === 1 ? 'active' : ''" @click="activeTab = 1">Minutes</span>
            <span :class="activeTab === 2 ? 'active' : ''" @click="activeTab = 2">Hours</span>
            <span :class="activeTab === 3 ? 'active' : ''" @click="activeTab = 3">Days</span>
            <span :class="activeTab === 4 ? 'active' : ''" @click="activeTab = 4">Months</span>
            <span :class="activeTab === 5 ? 'active' : ''" @click="activeTab = 5">Year</span>
        </div>
        <div class="tab-content">
            <template v-if="activeTab === 0">
                <div>
                    <div class="form-group">
                        <label for="every-second">Every Second</label>
                        <input type="radio" name="second" id="every-second">
                    </div>
                    <br>
                    <div class="form-group">
                        <label for="custom-second">Specific second (choose one or many)</label>
                        <input type="radio" name="second" id="custom-second">
                    </div>
                    <br>
                    <div class="flex">
                        <div class="col" v-for="(secondGroup, index) in groupedSeconds" :key="index">
                            <div class="form-group" v-for="second in seconds" :key="second">
                                <label :for="'sec-' + second">{{ second }}</label>
                                <input type="checkbox" :id="'sec-' + second">
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-if="activeTab === 1">B</template>
            <template v-if="activeTab === 2">C</template>
            <template v-if="activeTab === 3">D</template>
            <template v-if="activeTab === 4">E</template>
            <template v-if="activeTab === 5">F</template>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from "vue"
    const activeTab = ref(0)

    const seconds = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

    const groupedSeconds = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'))
        .reduce((acc: any, num, index) => {
            const groupIndex = Math.floor(index / 6);
            acc[`Group${groupIndex + 1}`] = acc[`Group${groupIndex + 1}`] || [];
            acc[`Group${groupIndex + 1}`].push(num);
            return acc;
        }, {});

    console.log(groupedSeconds);

</script>
<style scoped>
.tabs {
    width: 100%;
    display: flex;
}

.tabs span {
    border: 1px solid #80808050;
    padding: 1rem 2rem;
    cursor: pointer;
}

.tabs span:nth-child(1) {
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
}
.tabs span:last-child {
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
}

.tabs span:hover {
    background-color: #90c8f030;
}

.tabs span.active {
    background-color: #90c8f030
}

.tab-content {
    margin-top: 1rem;
    border: 1px solid #80808050;
    border-radius: .25rem;
    padding: 1rem;
    background-color: #80808020;
}

.form-group {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
}

.form-group label {
    margin-bottom: 0;
}

.form-group input:is([type="radio"], [type="checkbox"]) {
    margin-bottom: 0;
    order: -1;
    width: max-content;
}
</style>