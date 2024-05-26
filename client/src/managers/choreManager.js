const _apiUrl = "/api/chore"

export const getChores = () => {
    return fetch(_apiUrl).then(res => res.json())
}

export const getChore = (id) => {
    return fetch(`${_apiUrl}/${id}`).then(res => res.json())
}

export const deleteChore = (id) => {
    const deleteOptions = {method: "DELETE"}

    return fetch(`${_apiUrl}/${id}`, deleteOptions)
}

export const createChore = (chore) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(chore)
    }

    return fetch(_apiUrl, postOptions).then(res => res.json())
}

export const completeChore = (id, userId) => {
    const postOptions = {method: "POST"}

    return fetch(`${_apiUrl}/${id}/complete?userId=${userId}`, postOptions)
}

export const assignChore = (id, userId) => {
    const postOptions = {method: "POST"}

    return fetch(`${_apiUrl}/${id}/assign?userId=${userId}`, postOptions)
}

export const unassignChore = (id, userId) => {
    const postOptions = {method: "POST"}

    return fetch(`${_apiUrl}/${id}/unassign?userId=${userId}`, postOptions)
}