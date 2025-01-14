import { defineStore } from "pinia";
import type { Cat } from "~/interfaces/types";
import axios, { AxiosResponse } from "axios";

// State interface defines the structure of the store's state
interface State {
    cat: Cat | null;          // A single cat object, or null if not fetched
    subCatsByBreed: Cat[];    // Array of cats fetched by breed
}

// Define the Pinia store for managing cat details
export const useDetailsStore = defineStore("details", {
    // The initial state of the store
    state: (): State => ({
        cat: null,               // Initial state for a single cat is null
        subCatsByBreed: []       // Initial state for subcats is an empty array
    }),

    // Actions for fetching cat data from the API
    actions: {
        /**
         * Fetches a single cat's details by ID.
         * @param id - The ID of the cat to fetch.
         * @returns {Promise<AxiosResponse<Cat>>} - The Axios response with cat details.
         */
        async getCatById$(id: string): Promise<AxiosResponse<Cat>> {
            return axios.get<Cat>(`https://api.thecatapi.com/v1/images/${id}`);
        },

        /**
         * Fetches a list of cats by breed IDs.
         * @param breed_ids - The breed IDs to fetch cats for.
         * @returns {Promise<AxiosResponse<Cat[]>>} - The Axios response with a list of cats.
         */
        async getCatByBreed$(breed_ids: string[]): Promise<AxiosResponse<Cat[]>> {
            return axios.get<Cat[]>('https://api.thecatapi.com/v1/images/search', {
                params: {
                    limit: 3,             // Limit the number of results to 3 but in docs its 10
                    breed_ids: breed_ids.join(',')  // Pass breed IDs as query parameter
                }
            });
        }
    }
});
