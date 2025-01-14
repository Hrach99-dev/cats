import type { Cat, CatBreeds } from "~/interfaces/types";
import { AxiosResponse } from "axios";
import { useDetailsStore } from "~/modules/details/detailsStore";


/**
 * A composable function that provides grouped actions and state management
 * for handling cat details. This function includes actions to fetch a cat by
 * its ID and fetch cats by breed, as well as setters to update the store
 * and getters to retrieve the cat data.
 *
 * Note: This is a store mutation. For cleaner structure and maintainability,
 * consider separating these actions into a dedicated file for store management.
 */
export const useDetailsGroup = () => {
    const store = useDetailsStore();

    // Actions
    /**
     * Fetches a cat's details by ID.
     * @param id - The ID of the cat to fetch.
     */
    const fetchCatById$ = async (id: string): Promise<void> => {
        try {
            const response: AxiosResponse<Cat> = await store.getCatById$(id);
            setCat(response.data);

            // If the cat has breed data, fetch cats by breed
            if (response.data.breeds?.length) {
                await fetchCatsByBreeds$(response.data.breeds);
            }
        } catch (error) {
            console.error("Error fetching cat by ID:", error);
        }
    };

    /**
     * Fetches a list of cats by breed IDs.
     * @param breeds - The list of breeds to fetch cats for.
     */
    const fetchCatsByBreeds$ = async (breeds: CatBreeds[]): Promise<void> => {
        try {
            const breedsIds: string[] = breeds.map(breed => breed.id);
            const response: AxiosResponse<Cat[]> = await store.getCatByBreed$(breedsIds);

            if (response.data?.length) {
                setCatsByBreeds(response.data);
            }
        } catch (error) {
            console.error("Error fetching cats by breeds:", error);
        }
    };

    // Setters
    /**
     * Sets the cat data in the store.
     * @param cat - The cat data to store.
     */
    const setCat = (cat: Cat): void => {
        store.cat = cat;
    };

    /**
     * Sets the cats by breed data in the store.
     * @param cats - The list of cats to store.
     */
    const setCatsByBreeds = (cats: Cat[]): void => {
        store.subCatsByBreed = cats.slice(0, 3); // Limiting the number of cats to 3
    };

    /**
     * Resets the store's state.
     */
    const resetState = (): void => {
        store.$reset();
    };

    // Getters
    /**
     * Gets the current cat data from the store.
     * @returns {Cat | null} - The cat data or null if not set.
     */
    const getCat = (): Cat | null => {
        return store.cat;
    };

    /**
     * Gets the list of cats by breed from the store.
     * @returns {Cat[]} - The list of cats by breed.
     */
    const getCatsByBreeds = (): Cat[] => {
        return store.subCatsByBreed;
    };

    return {
        getCat,
        fetchCatById$,
        getCatsByBreeds,
        resetState,
    };
};
