import React, { useContext } from "react"
import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/react"
import { format as timeAgo } from "timeago.js"
import { Link } from "react-router-dom"
import { useSpaceXPaginatedQuery } from "../utils/use-space-x"
import { formatDate } from "../utils/format-date"
import Error from "./error"
import Breadcrumbs from "./breadcrumbs"
import LoadMoreButton from "./load-more-button"
import { LaunchWithLaunchpadAndRocket } from "./launch"
import FavoriteStar from "./favorite-star"
import { FavoritesContext } from "../context/FavoritesContext"
import { FavoritesActionType } from "../context/FavoritesReducer"

const PAGE_SIZE = 12

export default function Launches() {
    const { data, error, isValidating, setSize } = useSpaceXPaginatedQuery("launches", {
        query: { upcoming: false },
        options: {
            limit: PAGE_SIZE,
            populate: ["rocket", "launchpad"],
            sort: { date_utc: "desc" },
        },
    })

    const launches = data?.map((page) => page.docs) as LaunchWithLaunchpadAndRocket[] | undefined

    return (
        <div>
            <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Launches" }]} />
            <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
                {error && <Error />}
                {launches?.flat().map((launch) => <LaunchItem launch={launch} key={launch.id} />)}
            </SimpleGrid>
            <LoadMoreButton
                loadMore={() => setSize((size) => size + 1)}
                data={data}
                isLoadingMore={isValidating}
            />
        </div>
    )
}

type LaunchItemProps = {
    launch: LaunchWithLaunchpadAndRocket
    small?: boolean
}

export function LaunchItem({ launch, small }: LaunchItemProps) {
    const { isFavoritedLaunch, favoritesDispatch } = useContext(FavoritesContext)

    const onFavorite = () => {
        favoritesDispatch({
            type: FavoritesActionType.TOGGLE_LAUNCH_FAVORITE,
            payload: launch,
        })
    }

    const isFavorited = isFavoritedLaunch(launch)

    return (
        <Box
            as={Link}
            to={`/launches/${launch.id}`}
            boxShadow="md"
            borderWidth="1px"
            rounded="lg"
            overflow="hidden"
            position="relative"
            minHeight={small ? "228px" : "auto"}
        >
            <Image
                src={launch.links.flickr.original[0] ?? launch.links.patch.small}
                alt={`${launch.name} launch`}
                height={small ? "100px" : ["200px", null, "300px"]}
                width="100%"
                objectFit="contain"
                objectPosition="bottom"
            />

            <Image
                position="absolute"
                top="5"
                right="5"
                src={launch.links.mission_patch_small}
                height="75px"
                objectFit="contain"
                objectPosition="bottom"
            />

            <Box p="3" d="flex" justifyContent="space-between" alignItems="center">
                <Box isTruncated flex={1}>
                    <Box
                        display="flex"
                        alignItems={small ? "flex-start" : "baseline"}
                        flexDirection={small ? "column" : "row"}
                    >
                        {launch.success ? (
                            <Badge px="2" variant="solid" colorScheme="green">
                                Successful
                            </Badge>
                        ) : (
                            <Badge px="2" variant="solid" colorScheme="red">
                                Failed
                            </Badge>
                        )}
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml={small ? "0" : "2"}
                        >
                            {launch.rocket?.name} &bull; {launch.launchpad?.name}
                        </Box>
                    </Box>

                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                        {launch.name}
                    </Box>
                    <Flex flexDirection={small ? "column" : "row"}>
                        <Text fontSize="sm">{formatDate(launch.date_utc)} </Text>
                        <Text color="gray.500" ml={small ? "0" : "2"} fontSize="sm">
                            {timeAgo(launch.date_utc)}
                        </Text>
                    </Flex>
                </Box>
                <FavoriteStar
                    onClick={onFavorite}
                    enabled={isFavorited}
                    position={small ? "absolute" : undefined}
                    top={small ? 18 : undefined}
                    right={small ? 18 : undefined}
                />
            </Box>
        </Box>
    )
}
