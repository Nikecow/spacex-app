import React, { createContext, Dispatch, ReactNode, useReducer } from "react"
import { FavoritesAction, favoritesReducer, FavoritesState } from "./FavoritesReducer"
import { Launch } from "../type/launch"
import { Launchpad } from "../type/launchpad"
import { loadFavorites } from "../utils/persistence"

interface ContextProps {
    isFavoritedLaunch: (launch: Launch) => boolean
    isFavoritedLaunchpad: (launchpad: Launchpad) => boolean
    favorites: FavoritesState
    favoritesDispatch: Dispatch<FavoritesAction>
}

export const FavoritesContext = createContext<ContextProps>({} as ContextProps)

interface ProviderProps {
    children: ReactNode
}

const defaultState: FavoritesState = { launches: [], launchpads: [] }

export const FavoritesProvider = ({ children }: ProviderProps) => {
    const [favorites, favoritesDispatch] = useReducer(
        favoritesReducer,
        loadFavorites() ?? defaultState
    )

    const isFavoritedLaunch = (launch: Launch) =>
        !!favorites.launches.find((l) => l.id === launch.id)
    const isFavoritedLaunchpad = (launchpad: Launchpad) =>
        !!favorites.launchpads.find((l) => l.id === launchpad.id)

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                favoritesDispatch,
                isFavoritedLaunch,
                isFavoritedLaunchpad,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    )
}
