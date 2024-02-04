import { Launch } from "../type/launch"
import { Launchpad } from "../type/launchpad"
import { saveFavorites } from "../utils/persistence"

export interface FavoritesState {
    launches: Launch[]
    launchpads: Launchpad[]
}

export enum FavoritesActionType {
    TOGGLE_LAUNCH_FAVORITE,
    TOGGLE_LAUNCHPAD_FAVORITE,
}

export type FavoritesAction = ToggleLaunchFavoriteAction | ToggleLaunchpadFavoriteAction

export interface ToggleLaunchFavoriteAction {
    payload: Launch
    type: FavoritesActionType.TOGGLE_LAUNCH_FAVORITE
}

export interface ToggleLaunchpadFavoriteAction {
    payload: Launchpad
    type: FavoritesActionType.TOGGLE_LAUNCHPAD_FAVORITE
}

export const favoritesReducer = (
    state: FavoritesState,
    action: FavoritesAction
): FavoritesState => {
    switch (action.type) {
        case FavoritesActionType.TOGGLE_LAUNCH_FAVORITE: {
            const alreadyFavorited = state.launches.find((l) => l.id === action.payload.id)

            let newState

            if (alreadyFavorited) {
                newState = {
                    ...state,
                    launches: state.launches.filter((l) => l !== alreadyFavorited),
                }
            } else {
                newState = { ...state, launches: state.launches.concat(action.payload) }
            }

            saveFavorites(newState)

            return newState
        }
        case FavoritesActionType.TOGGLE_LAUNCHPAD_FAVORITE: {
            const alreadyFavorited = state.launchpads.find((l) => l.id === action.payload.id)

            let newState

            if (alreadyFavorited) {
                newState = {
                    ...state,
                    launchpads: state.launchpads.filter((l) => l !== alreadyFavorited),
                }
            } else {
                newState = { ...state, launchpads: state.launchpads.concat(action.payload) }
            }

            saveFavorites(newState)

            return newState
        }
    }
}
