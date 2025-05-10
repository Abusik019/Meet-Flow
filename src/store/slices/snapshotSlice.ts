import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ISnapshotState, SnapshotPayload, SnapshotResponse } from "../../types";

const API_URL = import.meta.env.VITE_API_URL;

const initialState: ISnapshotState = {
    snapshotID: '',
    loading: false,
    error: null,
};

export const saveSnapshot = createAsyncThunk<SnapshotResponse, SnapshotPayload, { rejectValue: string }>( 'snapshot/saveSnapshot', async ({ snapshot, authorId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/snapsot/save-board`, { 
            authorId,
            snapshot,
        }, 
        {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response.data
    } catch (error) {
        return rejectWithValue(
            axios.isAxiosError(error)
                ? error.response?.data?.message || 'Failed to save'
                : 'Unknown error'
        )
    }
})


export const snapshotSlice = createSlice({
    name: "snapshot",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
			.addCase(saveSnapshot.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(saveSnapshot.fulfilled, (state, action) => {
				state.loading = false
				state.snapshotID = action.payload.snapshotId;
			})
			.addCase(saveSnapshot.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload || 'Unknown error'
			})
    },
});

export default snapshotSlice.reducer;