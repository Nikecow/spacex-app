import { Box } from "@chakra-ui/react"
import { Star } from "react-feather"
import React from "react"
import { SquareProps } from "@chakra-ui/layout/src/box"

type FavoriteProps = SquareProps & {
    onClick: () => void
    enabled: boolean
}

export default function FavoriteStar({ onClick, enabled, ...rest }: FavoriteProps) {
    return (
        <Box
            className="favorite-star"
            onClick={(e) => {
                e.preventDefault()
                onClick()
            }}
            as={Star}
            height="auto"
            cursor="pointer"
            color="yellow.400"
            fill={enabled ? "yellow.400" : "transparent"}
            size="12%"
            maxWidth="5em"
            sx={{
                transition: "fill .1s",
                strokeWidth: 1.2,
            }}
            _active={{
                fill: enabled ? "transparent" : "yellow.400",
            }}
            _hover={{
                stroke: "yellow.600",
            }}
            {...rest}
        />
    )
}
