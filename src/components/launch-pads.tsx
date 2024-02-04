import React, { useContext } from "react"
import { Badge, Box, SimpleGrid, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

import Error from "./error"
import Breadcrumbs from "./breadcrumbs"
import LoadMoreButton from "./load-more-button"
import { useSpaceXPaginatedQuery } from "../utils/use-space-x"
import { Launchpad } from "../type/launchpad"
import { Rocket } from "../type/rocket"
import FavoriteStar from "./favorite-star"
import { FavoritesContext } from "../context/FavoritesContext"
import { FavoritesActionType } from "../context/FavoritesReducer"

const PAGE_SIZE = 12

export type LaunchPadWithRockets = Launchpad & { rockets: Rocket[] }
type LaunchPadsWithRockets = LaunchPadWithRockets[]

export default function LaunchPads() {
    const { data, error, isValidating, setSize } = useSpaceXPaginatedQuery("launchpads", {
        query: { upcoming: false },
        options: {
            limit: PAGE_SIZE,
            populate: ["rockets"],
            sort: { full_name: "asc" },
        },
    })

    const launchPads = data?.map((page) => page.docs) as LaunchPadsWithRockets | undefined

    return (
        <div>
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]} />
            <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
                {error && <Error />}
                {launchPads
                    ?.flat()
                    .map((launchPad) => <LaunchPadItem key={launchPad.id} launchPad={launchPad} />)}
            </SimpleGrid>
            <LoadMoreButton
                loadMore={() => setSize((size) => size + 1)}
                data={data}
                isLoadingMore={isValidating}
            />
        </div>
    )
}

type LaunchPadItemProps = {
    launchPad: LaunchPadWithRockets
    small?: boolean
}

export function LaunchPadItem({ launchPad, small }: LaunchPadItemProps) {
    const { isFavoritedLaunchpad, favoritesDispatch } = useContext(FavoritesContext)

    const onFavorite = () => {
        favoritesDispatch({
            type: FavoritesActionType.TOGGLE_LAUNCHPAD_FAVORITE,
            payload: launchPad,
        })
    }

    const isFavorited = isFavoritedLaunchpad(launchPad)

    return (
        <Box
            as={Link}
            to={`/launch-pads/${launchPad.id}`}
            boxShadow="md"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            position="relative"
        >
            <Box p="6">
                <Box
                    display="flex"
                    alignItems={small ? "flex-start" : "baseline"}
                    flexDirection={small ? "column" : "row"}
                >
                    {launchPad.status === "active" ? (
                        <Badge px="2" variant="solid" colorScheme="green">
                            Active
                        </Badge>
                    ) : (
                        <Badge px="2" variant="solid" colorScheme="red">
                            Retired
                        </Badge>
                    )}
                    <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml={small ? 0 : 2}
                    >
                        {launchPad.launch_attempts} attempted &bull; {launchPad.launch_successes}{" "}
                        succeeded
                    </Box>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {launchPad.full_name}
                </Box>
                <Text color="gray.500" fontSize="sm">
                    {launchPad.rockets.map((r) => r.name).join(", ")}
                </Text>
            </Box>
            <FavoriteStar
                onClick={onFavorite}
                enabled={isFavorited}
                position="absolute"
                maxWidth="2em"
                top="10px"
                right="10px"
            />
        </Box>
    )
}
