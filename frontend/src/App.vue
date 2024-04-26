<script setup lang="ts">
import { ref } from 'vue';
import { getHotels } from './api';

const minPrice=ref(0)
const maxPrice=ref(0)
const hotels= ref<string[]>([])

const handleQuery = async () =>{
const response = await getHotels({min: minPrice.value, max: maxPrice.value}, "hotel")
if (!response.success) return;
console.log("response", response)
hotels.value=response.data
}
</script>

<template>
<div class="card flex flex-col bg-teal-500 p-10 max-w-3xl object-center">
    <h1 class="font-bold"> Our best hotels</h1>
    
    <label  for="">Lowest price</label>
    <input v-model="minPrice"type="number">
    <label for="">Highest price</label>
    <input v-model="maxPrice" type="number">
    <button class="btn bg-slate-700 text-gray-50 w-24 rounded" @click="handleQuery">Find Hotel</button>
    <div v-for="hotel in hotels">
    <p>{{ hotel }}</p>
</div>
</div>
</template>

<style scoped>

</style>
