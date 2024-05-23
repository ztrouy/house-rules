const _apiUrl = "/api/chore"

export const getChores = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const deleteChore = (id) => {
    const deleteOptions = {method: "DELETE"}

    return fetch(`${_apiUrl}/${id}`, deleteOptions)
}