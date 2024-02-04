import { FavoritesState } from "../context/FavoritesReducer"

const FAVORITES_KEY = "favorites"

export const saveFavorites = (data: FavoritesState) => {
    try {
        const stringifiedData = JSON.stringify(data)
        const encodedData = encodeURIComponent(stringifiedData)
        window.localStorage.setItem(FAVORITES_KEY, encodedData)
    } catch (ex) {
        console.error((ex as Error).message)
    }
}

export const loadFavorites = (): FavoritesState | null => {
    const data = window.localStorage.getItem(FAVORITES_KEY)
    if (data) {
        return JSON.parse(decodeURIComponent(data))
    } else {
        return null
    }
}
