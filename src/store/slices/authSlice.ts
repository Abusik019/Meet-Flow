import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
    userInfo: {},
    accessToken: localStorage.getItem("accessToken") || null, 
    loading: false,
    error: null,
};

export const signUp = createAsyncThunk("auth/signUp", async () => {
    try{
        const response = await axios.post(`${API_URL}/api/auth/login`, {}, {
            headers: {
                "Content-Type": "application/json" 
            },
        })

        if(response.status !== 200){
            throw new Error("Ошибка входа");
        }

        return response.data;
    } catch(error){
        console.error("Ошибка входа", error); 
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        
    },
});

export default authSlice.reducer;