import { Box, Button, Heading, useMediaQuery } from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import { X } from "react-feather"
import { SquareProps } from "@chakra-ui/layout/src/box"
import { LaunchItem } from "./launches"
import { FavoritesContext } from "../context/FavoritesContext"
import { LaunchWithLaunchpadAndRocket } from "./launch"
import { LaunchPadItem, LaunchPadWithRockets } from "./launch-pads"

const SIDE_BAR_WIDTH = 500

export default function FavoritesSidebar() {
    const [filtered, setFiltered] = useState<"launches" | "launchpads">("launches")
    const { favorites } = useContext(FavoritesContext)

    const [expanded, setExpanded] = useState<boolean>(false)
    const [isDesktop] = useMediaQuery(`(min-width: 800px)`)

    const { launches, launchpads } = favorites

    return (
        <>
            <Button
                _active={{ backgroundColor: "auto" }}
                _hover={{ backgroundColor: "auto" }}
                _focus={{ boxShadow: "none" }}
                fontSize="sm"
                top="20%"
                position="fixed"
                right={-50}
                zIndex={25}
                paddingBottom={3}
                color="white"
                backgroundColor="gray.700"
                sx={{ transform: "rotate(270deg)" }}
                onClick={() => setExpanded(!expanded)}
                textTransform="uppercase"
            >
                Favorites
            </Button>
            <Box
                width={isDesktop ? SIDE_BAR_WIDTH : "100vw"}
                height="100vh"
                backgroundColor="gray.700"
                position="fixed"
                top={0}
                left={0}
                sx={{
                    transform: `translate3d(${
                        expanded
                            ? `calc(100vw - ${isDesktop ? SIDE_BAR_WIDTH : "100vw"}px)`
                            : "100vw"
                    }, 0, 0)`,
                    transition: "transform .3s cubic-bezier(0, .50, 0, 1)",
                }}
                zIndex={50}
            >
                <Close onClick={() => setExpanded(false)} position="absolute" top={5} right={5} />
                <Heading
                    color="white"
                    display="flex"
                    my={[15, 30]}
                    fontSize={["2xl", "3xl"]}
                    justifyContent="center"
                    userSelect="none"
                    textTransform="uppercase"
                >
                    Favorites
                </Heading>
                <Box
                    justifyContent="center"
                    display="flex"
                    gap={2}
                    userSelect="none"
                    textTransform="uppercase"
                >
                    <Filter
                        onClick={() => setFiltered("launches")}
                        title="Launches"
                        amount={launches.length}
                        enabled={filtered === "launches"}
                    />
                    <Box as="span" color="white">
                        |
                    </Box>
                    <Filter
                        onClick={() => setFiltered("launchpads")}
                        title="Launch Pads"
                        amount={launchpads.length}
                        enabled={filtered === "launchpads"}
                    />
                </Box>
                <Box
                    overflowY="auto"
                    height={isDesktop ? "calc(100% - 180px)" : "85%"}
                    p={[5, 10]}
                    mx={10}
                    my={5}
                    borderWidth="1px"
                    backgroundColor="white"
                    display="flex"
                    flexDirection="column"
                    gap={5}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "4px",
                            height: "3px",
                        },
                        "&::webkit-scrollbar-button": {
                            backgroundColor: "gray.600",
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "gray.300",
                        },
                        "&::-webkit-scrollbar-track-piece": {
                            backgroundColor: "transparent",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            height: "10px",
                            backgroundColor: "gray.600",
                            borderRadius: "3px",
                        },
                        "&::-webkit-scrollbar-corner": {
                            backgroundColor: "gray.300",
                        },
                        "&::-webkit-resizer": {
                            backgroundColor: "gray.600",
                        },
                    }}
                >
                    {filtered === "launchpads"
                        ? launchpads.map((launchPad) => (
                              <LaunchPadItem
                                  key={launchPad.id}
                                  launchPad={launchPad as LaunchPadWithRockets}
                                  small
                              />
                          ))
                        : launches.map((launch) => (
                              <LaunchItem
                                  launch={launch as LaunchWithLaunchpadAndRocket}
                                  key={launch.flight_number}
                                  small
                              />
                          ))}
                </Box>
            </Box>
        </>
    )
}

type CloseProps = SquareProps & {
    onClick: () => void
}

function Close({ onClick, ...rest }: CloseProps) {
    return (
        <Box
            className="close-side-bar"
            onClick={(e: React.MouseEvent) => {
                e.preventDefault()
                onClick()
            }}
            as={X}
            height="auto"
            cursor="pointer"
            color="white"
            size="2em"
            _hover={{
                fill: "yellow.400",
            }}
            {...rest}
        />
    )
}

type FilterProps = {
    onClick: () => void
    title: string
    amount: number
    enabled: boolean
}

function Filter({ onClick, title, amount, enabled }: FilterProps) {
    return (
        <Box
            as="span"
            onClick={onClick}
            cursor="pointer"
            boxSizing="border-box"
            color="white"
            paddingBottom={2}
            sx={{ borderBottom: `1px solid ${enabled ? "white" : "transparent"}` }}
            _hover={{ borderBottom: "1px solid white" }}
        >
            {`${title} (${amount})`}
        </Box>
    )
}
