<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <table class="custom-table">
    <thead>
      <tr>
        <th v-for="header in props.headers" :key="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in props.rows" :key="index">
        <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ formatCell(cell) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Table {
  headers: any[]
  rows: any[]
}

const props = defineProps<Table>()

const formatCell = (cell: any) => {
  if (Array.isArray(cell)) {
    return cell.map((obj) => formatObject(obj)).join(', ')
  }
  return cell
}

const formatObject = (obj: any) => {
  const details = Object.entries(obj)
    .map(([key, value]) => `${capitalizeFirstLetter(key)}: ${value}`)
    .join(', ');

  return `${details}`;
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #90c8f030;
  color: rgb(39, 38, 38);
  text-transform: capitalize;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
