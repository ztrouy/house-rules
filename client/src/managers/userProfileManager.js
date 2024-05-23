const _apiUrl = "/api/userProfile"

export const getUserProfiles = () => {
    return fetch(_apiUrl).then(res => res.json())
}