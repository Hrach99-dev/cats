import { defineStore } from "pinia";
import type { Cat } from "~/interfaces/types";
import axios, { AxiosResponse } from "axios";

// Define the structure of the state managed by the store
interface State {
    cats: Cat[],           // Array to store the list of cat objects
    currentPage: number,   // Current page index for pagination
    limit: number          // Number of cat items to fetch per page
}

// Define the Pinia store for managing the cats list
export const useCatsListStore = defineStore("catsList", {
    // The initial state of the store
    state: (): State => ({
        cats: [],            // Initialize with an empty list of cats
        currentPage: 1,      // Start at the first page
        limit: 10            // Default limit of 10 items per page
    }),

    // Actions to manipulate or retrieve data from the store
    actions: {
        /**
         * Fetches a list of cat images from The Cat API.
         * The request is made with the current page and limit parameters,
         * and returns a promise with the Axios response.
         *
         * @returns {Promise<AxiosResponse<Cat[]>>} - Promise containing the response with cat data
         */
        async getCatsList$(): Promise<AxiosResponse<Cat[]>> {
            return axios.get<Cat[]>(`https://api.thecatapi.com/v1/images/search`, {
                params: {
                    page: this.currentPage,
                    limit: this.limit,
                    order: 'DESC'
                }
            });
        }
    }
});
