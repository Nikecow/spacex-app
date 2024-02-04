import { queryFetcher } from "./use-space-x"
import { FetchMock } from "jest-fetch-mock"

beforeEach(() => {
    ;(fetch as FetchMock).resetMocks()
})

test("Query fetcher handles requests to SpaceX V4 Query API", async () => {
    ;(fetch as FetchMock).mockResponseOnce(JSON.stringify({ docs: [] }))

    const response = await queryFetcher("launches", {
        query: {},
        options: { limit: 10 },
    })
    expect(response).toEqual({ docs: [] })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("https://api.spacexdata.com/v4/launches/query", {
        body: '{"query":{},"options":{"limit":10}}',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    })
})

test("Query fetcher handles failing requests to SpaceX V4 Query API", async () => {
    ;(fetch as FetchMock).mockReject(() => Promise.reject("API is down"))

    const response = await queryFetcher("launchpads", {
        query: { _id: "2341235" },
        options: {},
    }).catch(() => null)

    expect(response).toBe(null)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith("https://api.spacexdata.com/v4/launchpads/query", {
        body: '{"query":{"_id":"2341235"},"options":{}}',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
    })
})
