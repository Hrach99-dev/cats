<script setup lang="ts">
import { useDetailsGroup } from "~/modules/details/detailsGroup";
import { ref } from "vue";

// Properties
const { getCat, getCatsByBreeds, resetState, fetchCatById$ } = useDetailsGroup();
const route = useRoute();

// Pinia getters
const catDataComputed = computed(() => getCat());
const catsDataByBreedsComputed = computed(() => getCatsByBreeds());

// Lifecycle Hook
onMounted(async () => {
  const catId = route.params.id as string;
  if (catId) {
    await fetchCatById$(catId);
  }
});

onBeforeUnmount(() => {
  resetState();
});
</script>

<template>
  <div class="cat">
    <div v-if="catDataComputed">
      <h1 class="text-black text-center text-4xl mb-7 font-bold">Cat Details</h1>
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto relative">
        <NuxtLink to="/" class="absolute z-10 -left-14 rotate-180 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </NuxtLink>
        <div class="overflow-hidden max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto relative">
          <img class="w-full h-64 object-fill" :src="catDataComputed.url" alt="Cat" />
        </div>
        <div class="p-5" v-if="catDataComputed.breeds">
          <div class="mb-3" v-for="breed in catDataComputed.breeds" :key="breed.id">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{breed.name}}
            </h5>
            <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
              Child friendly rate` {{breed.child_friendly}}
            </p>
            <div v-if="breed.weight">
              <p v-if="breed.weight.imperial" class="mb-1 font-normal text-gray-700 dark:text-gray-400">
                Imperial` {{breed.weight.imperial}}
              </p>
              <p v-if="breed.weight.metric" class="mb-1 font-normal text-gray-700 dark:text-gray-400">
                Metric` {{breed.weight.metric}}
              </p>
            </div>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{breed.description}}
            </p>
            <div v-if="catsDataByBreedsComputed?.length" class="flex align-baseline justify-between mt-10">
              <div v-for="catBreed in catsDataByBreedsComputed" :key="catBreed.id" class="w-3/12 hover:scale-110 duration-200">
                <NuxtLink :to="catBreed.id">
                  <img class="w-full max-h-16 object-contain" :src="catBreed.url" alt="Medium avatar">
                </NuxtLink>
              </div>
            </div>
            <p v-else>The cat has no breed.</p>
          </div>
        </div>
        <p class="text-amber-50 mt-3 mb-6 p-5" v-else>We have no information about this breed.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
