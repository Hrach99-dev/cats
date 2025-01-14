import { useCatsListStore } from "~/modules/catsList/catsListStore";
import type { Cat } from "~/interfaces/types";
import { AxiosResponse } from "axios";

/**
 * A composable function that provides grouped actions and state management
 * for handling the cats list. This function includes store mutations such as
 * fetching data, setting state, and managing pagination.
 *
 * Note: This is a store mutation. To maintain a clean structure, consider
 * moving these mutations to a separate file dedicated to store management.
 */
export const useCatsListGroup = () => {
    const store = useCatsListStore();

    // Actions
    /**
     * Fetches the list of cats from the server and updates the store.
     * If the response contains a list of cats, the store is updated with the new data.
     */
    const fetchCats$ = async (): Promise<void> => {
        try {
            const response: AxiosResponse<Cat[]> = await store.getCatsList$();
            if (response.data?.length) {
                setCats(response.data);
            }
        } catch (error) {
            console.error("Error fetching cats:", error);
        }
    };

    // Setters
    /**
     * Updates the store with a new list of cats.
     * @param cats - An array of Cat objects to set in the store.
     */
    const setCats = (cats: Cat[]): void => {
        store.cats = cats;
    };

    /**
     * Resets the state of the store to its initial values.
     */
    const resetState = (): void => {
        store.$reset();
    };

    /**
     * Updates the current page index in the store.
     * @param pageIndex - The new page index to set.
     */
    const setPageIndex = (pageIndex: number): void => {
        store.currentPage = pageIndex;
    };

    // Getters
    /**
     * Retrieves the current list of cats from the store.
     * @returns An array of Cat objects.
     */
    const getCats = (): Cat[] => {
        return store.cats;
    };

    /**
     * Retrieves the current page index from the store.
     * @returns The current page index.
     */
    const getPageIndex = (): number => {
        return store.currentPage;
    };

    return {
        getCats,
        resetState,
        getPageIndex,
        setPageIndex,
        fetchCats$,
    };
};
