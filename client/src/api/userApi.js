import API from "./client";

export const getUser=(userId)=>API.get(`/users/${userId}`);
export const updateUser=(userId,updatedData)=>API.put(`/users/${userId}`,updatedData)
export const deleteUser=(userId)=>API.delete(`/users/${userId}`)

