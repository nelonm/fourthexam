<script setup lang="ts">
import { ref } from "vue";
import { getHotels, getHotelsByName } from "./api";

type Hotel = {
  id: number;
  name: string;
  pricePerNightInUSD: number;
};
const minPrice = ref<number>(0);
const maxPrice = ref<number>(0);
const hotelName=ref<string>("")
const hotels = ref<Hotel[]>([]);
const outcome =ref<boolean | null> (null)

const handleQueryByPrice = async () => {
  const response = await getHotels(
    { min: minPrice.value, max: maxPrice.value },
  );
  console.log("min", minPrice.value, "max", maxPrice.value)
  if (!response.success) return;
  console.log("response", response);
  hotels.value = response.data;
  outcome.value=true

};

const handleQueryByName = async () =>{
    const response = await getHotelsByName (hotelName.value)
    console.log("response", response, hotelName.value)
    if (!response.success) return;
    hotels.value=response.data
    outcome.value=true
    console.log(hotels.value)
}
</script>

<template>
  <div class="card flex flex-col bg-teal-500 p-10 max-w-3xl object-center">
    <h1 class="font-bold">Our best hotels</h1>

    <label for=""> Type a name:</label>
    <input v-model="hotelName" type="text">
    <button
      class="btn bg-slate-700 text-gray-50 w-24 rounded"
      @click="handleQueryByName"
    >
      Find hotel by name
    </button>

    <label for="">Lowest price:</label>
    <input v-model="minPrice" type="number" />
    <label for="">Highest price:</label>
    <input v-model="maxPrice" type="number" />
    <button
      class="btn bg-slate-700 text-gray-50 w-24 rounded"
      @click="handleQueryByPrice"
    >
      Find hotel by price
    </button>
<div v-if="outcome">
<h3 class="font-bold">Check these hotels:
</h3>
<div v-for="hotel in hotels">
      <p>{{ hotel.name }}: a nigth for {{ hotel.pricePerNightInUSD }} $</p>
    </div>
  </div>
</div>
    
</template>

<style scoped></style>
