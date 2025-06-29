import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthMyInfo, AuthResponse, AuthState, LoginData, RegData } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;

const initialState: AuthState = {
    userInfo: {},
    token: localStorage.getItem("token") || null, 
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
        localStorage.setItem("token", token);
        return response.data;
    } catch (error) {
        return rejectWithValue(
            axios.isAxiosError(error) 
                ? error.response?.data?.message || 'Login failed'
                : 'Unknown error'
        );
    }
});

export const signUp = createAsyncThunk<AuthResponse, RegData, { rejectValue: string }>("auth/signUp", async (data: RegData, { rejectWithValue }) => {
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

export const getMyInfo = createAsyncThunk<AuthMyInfo, void, { rejectValue: string }>("auth/getMyInfo", async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_URL}/api/auth/get-my-info`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.status !== 200) {
            return rejectWithValue("Error obtaining data");
        }

        return response.data;
    } catch (error) {
        return rejectWithValue(
            axios.isAxiosError(error) 
                ? error.response?.data?.message || 'Error obtaining data'
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
            state.token = action.payload.token;

            state.loading = false;
            state.error = null;
        })

        .addCase(signIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        })

        // Получение моих данных
        .addCase(getMyInfo.pending, (state) => {
            state.loading = true;
        })

        .addCase(getMyInfo.fulfilled, (state, action) => {
            state.userInfo = action.payload;
            state.loading = false;
            state.error = null;
        })

        .addCase(getMyInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Login failed';
        })
    },
});

export default authSlice.reducer;