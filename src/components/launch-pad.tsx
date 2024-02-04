import React, { useContext } from "react"
import { useParams } from "react-router-dom"
import { MapPin, Navigation } from "react-feather"
import {
    Flex,
    Heading,
    Badge,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    SimpleGrid,
    Box,
    Text,
    Spinner,
    Stack,
    AspectRatio,
} from "@chakra-ui/react"

import { useSpaceXQuery } from "../utils/use-space-x"
import Error from "./error"
import Breadcrumbs, { NavLink } from "./breadcrumbs"
import { LaunchItem } from "./launches"
import { Launchpad } from "../type/launchpad"
import { Rocket } from "../type/rocket"
import { LaunchWithLaunchpadAndRocket } from "./launch"
import FavoriteStar from "./favorite-star"
import { FavoritesContext } from "../context/FavoritesContext"
import { FavoritesActionType } from "../context/FavoritesReducer"

type LaunchpadAndRockets = Launchpad & { rockets: Rocket[] }

export default function LaunchPad() {
    const { launchPadId } = useParams()
    const { data, error } = useSpaceXQuery("launchpads", {
        query: { _id: launchPadId },
        options: { populate: ["rockets"] },
    })
    const launchPad = data?.docs[0] as LaunchpadAndRockets | undefined

    const { data: launches } = useSpaceXQuery("launches", {
        query: { upcoming: false, launchpad: launchPadId },
        options: { limit: 3, sort: { date_utc: "desc" } },
    })

    if (error) return <Error />
    if (!launchPad) {
        return (
            <Flex justifyContent="center" alignItems="center" minHeight="50vh">
                <Spinner size="lg" />
            </Flex>
        )
    }

    const items: NavLink[] = [
        { label: "Home", to: "/" },
        { label: "Launch Pads", to: "/launch-pads" },
    ]

    if (launchPad.name) {
        items.push({ label: launchPad.name })
    }

    return (
        <div>
            <Breadcrumbs items={items} />
            <Header launchPad={launchPad} />
            <Box m={[3, 6]}>
                <LocationAndVehicles launchPad={launchPad} />
                <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
                    {launchPad.details}
                </Text>
                <Map launchPad={launchPad} />
                <RecentLaunches launches={launches?.docs} />
            </Box>
        </div>
    )
}

const randomColor = (start = 200, end = 250) => `hsl(${start + end * Math.random()}, 80%, 90%)`

type HeaderProps = {
    launchPad: Launchpad
}

function Header({ launchPad }: HeaderProps) {
    const { isFavoritedLaunchpad, favoritesDispatch } = useContext(FavoritesContext)

    const onFavorite = () => {
        favoritesDispatch({
            type: FavoritesActionType.TOGGLE_LAUNCHPAD_FAVORITE,
            payload: launchPad,
        })
    }

    const isFavorited = isFavoritedLaunchpad(launchPad)

    return (
        <Flex
            background={`linear-gradient(${randomColor()}, ${randomColor()})`}
            bgPos="center"
            bgSize="cover"
            bgRepeat="no-repeat"
            minHeight="15vh"
            position="relative"
            flexDirection={["column", "row"]}
            p={[2, 6]}
            alignItems="flex-end"
            justifyContent="space-between"
        >
            <Heading
                color="gray.900"
                display="inline"
                mx={[2, 4]}
                my="2"
                fontSize={["md", "3xl"]}
                borderRadius="lg"
            >
                {launchPad.full_name}
            </Heading>
            <Stack isInline spacing="3" justifyContent="end" alignItems="center">
                <Badge colorScheme="purple" fontSize={["sm", "md"]}>
                    {launchPad.launch_successes}/{launchPad.launch_attempts} successful
                </Badge>
                {launchPad.status === "active" ? (
                    <Badge colorScheme="green" fontSize={["sm", "md"]}>
                        Active
                    </Badge>
                ) : (
                    <Badge colorScheme="red" fontSize={["sm", "md"]}>
                        Retired
                    </Badge>
                )}
                <FavoriteStar onClick={onFavorite} enabled={isFavorited} />
            </Stack>
        </Flex>
    )
}

type LocationAndVehiclesProps = {
    launchPad: LaunchpadAndRockets
}

function LocationAndVehicles({ launchPad }: LocationAndVehiclesProps) {
    return (
        <SimpleGrid columns={[1, 1, 2]} borderWidth="1px" p="4" borderRadius="md">
            <Stat>
                <StatLabel display="flex">
                    <Box as={MapPin} width="1em" />{" "}
                    <Box ml="2" as="span">
                        Location
                    </Box>
                </StatLabel>
                <StatNumber fontSize="xl">{launchPad.locality}</StatNumber>
                <StatHelpText>{launchPad.region}</StatHelpText>
            </Stat>
            <Stat>
                <StatLabel display="flex">
                    <Box as={Navigation} width="1em" />{" "}
                    <Box ml="2" as="span">
                        Vehicles
                    </Box>
                </StatLabel>
                <StatNumber fontSize="xl">
                    {launchPad.rockets.map((r) => r.name).join(", ")}
                </StatNumber>
            </Stat>
        </SimpleGrid>
    )
}

type MapProps = {
    launchPad: Launchpad
}

function Map({ launchPad }: MapProps) {
    return (
        <AspectRatio ratio={16 / 5}>
            <Box
                as="iframe"
                src={`https://maps.google.com/maps?q=${launchPad.latitude}, ${launchPad.longitude}&z=15&output=embed`}
            />
        </AspectRatio>
    )
}

type RecentLaunchesProps = {
    launches: LaunchWithLaunchpadAndRocket[]
}

function RecentLaunches({ launches }: RecentLaunchesProps) {
    if (!launches?.length) {
        return null
    }
    return (
        <Stack my="8" spacing="3">
            <Text fontSize="xl" fontWeight="bold">
                Last launches
            </Text>
            <SimpleGrid minChildWidth="350px" spacing="4">
                {launches.map((launch) => (
                    <LaunchItem launch={launch} key={launch.flight_number} />
                ))}
            </SimpleGrid>
        </Stack>
    )
}
