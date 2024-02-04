import React from "react"
import { Routes, Route } from "react-router-dom"
import { Flex, Text } from "@chakra-ui/react"
import Launches from "./launches"
import Launch from "./launch"
import Home from "./home"
import LaunchPads from "./launch-pads"
import LaunchPad from "./launch-pad"
import FavoritesSidebar from "./favorites-sidebar"

export default function App() {
    return (
        <div>
            <NavBar />
            <FavoritesSidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/launches" element={<Launches />} />
                <Route path="/launches/:launchId" element={<Launch />} />
                <Route path="/launch-pads" element={<LaunchPads />} />
                <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
            </Routes>
        </div>
    )
}

function NavBar() {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="6"
            bg="gray.800"
            color="white"
            alignItems="baseline"
            justifyContent="flex-start"
        >
            <Text fontFamily="mono" letterSpacing="2px" fontWeight="bold" fontSize="lg">
                ¡SPACE·R0CKETS!
            </Text>
            <Text
                letterSpacing="1px"
                fontFamily="mono"
                sx={{ wordSpacing: -2 }}
                fontWeight="bold"
                fontSize="9px"
                color="yellow.200"
                marginLeft="5px"
                textTransform="uppercase"
            >
                by Nikecow
            </Text>
        </Flex>
    )
}
