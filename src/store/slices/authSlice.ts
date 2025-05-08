import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthResponse, AuthState, LoginData, RegData } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;

const initialState: AuthState = {
    userInfo: {},
    accessToken: localStorage.getItem("accessToken") || null, 
    loading: false,
    error: null,
};

export const signIn = createAsyncThunk<AuthResponse, LoginData, { rejectValue: string }>("auth/signIn", async (data: LoginData, { rejectWithValue }) => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status !== 200) {
            return rejectWithValue("Login failed");
        }

        const { token } = response.data;
        localStorage.setItem("accessToken", token);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            axios.isAxiosError(error) 
                ? error.response?.data?.message || 'Login failed'
                : 'Unknown error'
        );
    }
});

export const signUp = createAsyncThunk<AuthResponse, RegData, { rejectValue: string }>("auth/signIn", async (data: RegData, { rejectWithValue }) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if(data.image){
        formData.append("image", data.image);
    }

    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/api/auth/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status !== 201) {
            return rejectWithValue("Registration failed");
        }

        return response.data;
    } catch (error) {
        return rejectWithValue(
            axios.isAxiosError(error) 
                ? error.response?.data?.message || 'Registration failed'
                : 'Unknown error'
        );
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        
        // Вход
        .addCase(signIn.pending, (state) => {
            state.loading = true;
        })

        .addCase(signIn.fulfilled, (state, action) => {
            state.accessToken = action.payload.token;

            state.loading = false;
            state.error = null;
        })

        .addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        })
    },
});

export default authSlice.reducer;