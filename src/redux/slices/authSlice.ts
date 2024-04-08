import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    userData: { userId: string; username: string } | null;
}

const initialState: AuthState = {
    userData: null
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => initialState,
        logIn: (state, action: PayloadAction<{ userId: string; username: string }>) => {
            const { userId, username } = action.payload;
            state.userData = { userId, username };
        }
    }
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
