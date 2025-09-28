import API from "./client";
export const createSub=(data)=>API.post("/subscriptions",data);
export const getUserSubs=(userId)=>API.get(`/subscriptions/user/${userId}`);
export const updateSub=(subId,updatedData)=>API.put(`/subscriptions/${subId}`,updatedData);
export const deleteSub=(subId)=>API.delete(`/subscriptions/${subId}`);