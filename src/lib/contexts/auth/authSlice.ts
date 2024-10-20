import { createSlice } from "@reduxjs/toolkit";
import { LoginResponse } from "../../types/types";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null as LoginResponse | null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
});

export const { setUser } = authSlice.actions;
