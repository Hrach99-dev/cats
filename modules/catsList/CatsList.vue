<script setup lang="ts">
import { useCatsListGroup } from "~/modules/catsList/catsListGroup";
import { ComputedRef } from "vue";

// Properties: Destructure relevant methods from the composable
const { getCats, resetState, getPageIndex, setPageIndex, fetchCats$ } = useCatsListGroup();

// Pinia getters: Computed properties for the cats data and the current page index
const catsDataComputed = computed(() => getCats());  // List of cats data from store
const currentPageIndexComputed = computed(() => getPageIndex());  // Current page index from store

// Total pages, can be replaced with dynamic data if needed
const totalPages = 100;

// Computed property for calculating page numbers to display in pagination
const pages: ComputedRef<string[]> = computed(() => {
  const pageList: string[] = [];
  const currentPage = getPageIndex();

  // Handle case where total pages are less than or equal to 4
  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pageList.push(i.toString());
    }
  } else {
    // Add first page if the current page is more than 2
    if (currentPage > 2) {
      pageList.push('1');
      // Add ellipsis if there is a gap in the pagination
      if (currentPage > 3) {
        pageList.push('...');
      }
    }

    // Add the previous and next page numbers around the current page
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pageList.push(i.toString());
    }

    // Add the last page if the current page is not close to it
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pageList.push('...');
      }
      pageList.push(totalPages.toString());
    }
  }

  return pageList;
});

// Functions
/**
 * Changes the page based on the selected page number.
 * @param page - The page number to set.
 */
const changePage = (page: string) => {
  setPageIndex(+page);  // Set the page index to the selected page
  fetchCats$();  // Fetch the new list of cats for the selected page
}

// Lifecycle Hook
onMounted(() => {
  fetchCats$();  // Fetch the list of cats when the component is mounted
});

onBeforeUnmount(() => {
  resetState();  // Reset the state of the store when the component is unmounted
});
</script>

<template>
  <div class="cat" v-if="catsDataComputed?.length">
    <h1 class="text-black text-center text-4xl mb-7 font-bold">Cats List</h1>
    <table class="border-collapse table-auto w-6/12 text-sm ml-auto mr-auto">
      <thead>
      <tr>
        <th class="border-b dark:border-slate-300 w-5/12 font-bold p-4 pl-8 pt-0 pb-3 text-black text-left ">ID</th>
        <th class="border-b dark:border-slate-300 w-5/12 font-bold p-4 pt-0 pb-3 text-black text-left">Image</th>
        <th class="border-b dark:border-slate-300 w-1/12 font-bold p-4 pl-8 pt-0 pb-3 text-black text-left "></th>
      </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-400">
      <tr v-for="cat in catsDataComputed" :key="cat.id" class="cursor-pointer hover:bg-slate-600 h-24">
        <td class="border-b border-slate-100 dark:border-slate-300 w-5/12 p-4 pl-8 dark:text-black">{{cat.id}}</td>
        <td class="border-b border-slate-100 dark:border-slate-300 w-5/12 p-4">
          <img class="w-12" :src="cat.url" alt="Cat">
        </td>
        <td class="border-b border-slate-100 dark:border-slate-300 w-1/12 p-4 dark:text-black hover:text-white">
          <NuxtLink :to="{path: cat.id}">
            Click
          </NuxtLink>
        </td>
      </tr>
      </tbody>
    </table>

    <nav class="flex justify-center mt-5">
      <div class="inline-flex -space-x-px text-base h-10">
        <button
            v-for="page in pages"
            :key="page"
            @click="changePage(page)"
            :disabled="page === '...'"
            :class="{'text-white dark:text-white dark:bg-gray-900': currentPageIndexComputed.toString() === page, 'cursor-not-allowed': page === '...' }"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          {{ page }}
        </button>
      </div>
    </nav>
  </div>
</template>
