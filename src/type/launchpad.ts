import { UUID } from "./uuid"

enum Status {
    "active" = "active",
    "inactive" = "inactive",
    "unknown" = "unknown",
    "retired" = "retired",
    "lost" = "lost",
    "under construction" = "under construction",
}

export type Launchpad = {
    id?: string
    details?: string
    name?: string
    full_name?: string
    status: Status
    locality?: string
    region?: string
    timezone?: string
    latitude?: number
    longitude?: number
    launch_attempts: number
    launch_successes: number
    launches: UUID[]
}
