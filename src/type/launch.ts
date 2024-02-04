import { UUID } from "./uuid"

enum DatePrecision {
    "half" = "half",
    "quarter" = "quarter",
    "year" = "year",
    "month" = "month",
    "day" = "day",
    "hour" = "hour",
}

type Failure = {
    time: number
    altitude: number
    reason: string
}

type Core = {
    core?: UUID
    flight?: number
    gridfins?: boolean
    legs?: boolean
    reused?: boolean
    landing_attempt?: boolean
    landing_success?: boolean
    landing_type?: string
    landpad?: UUID
}

export type Launch = {
    id: string
    flight_number: number
    name: string
    date_utc: string
    date_unix: number
    date_local: string
    date_precision: DatePrecision
    static_fire_date_utc?: string
    static_fire_date_unix?: number
    tdb: boolean
    net: boolean
    window?: number
    rocket?: UUID
    success?: boolean
    failures: Failure[]
    upcoming: boolean
    details?: string
    fairings: {
        reused?: boolean
        recovery_attempt?: boolean
        recovered?: boolean
        ships: UUID[]
    }
    crew: UUID[]
    ships: UUID[]
    capsules: UUID[]
    payloads: UUID[]
    launchpad?: UUID
    cores: Core[]
    links: {
        patch: {
            small?: string
            large?: string
        }
        reddit: {
            campaign?: string
            launch?: string
            media?: string
            recovery?: string
        }
        flickr: {
            small: string[]
            original: string[]
        }
        presskit?: string
        webcast?: string
        youtube_id?: string
        article?: string
        wikipedia?: string
        mission_patch_small?: string
    }
    auto_update: boolean
}
