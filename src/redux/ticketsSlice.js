import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { sortByDuration } from "../../utils/supportFunctions";

export const ticketsAdapter = createEntityAdapter({
    selectId: (ticket) => ticket.id,
    sortComparer: (a, b) => a.price - b.price,
});

export const fetchTickets = createAsyncThunk(
    "tickets/fetchTickets", 
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch("http://localhost:3000/tickets");
            if (!response.ok) {
                throw new Error(`Server error: ${response.status} (${response.statusText})`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: error.message, status: error.status || 'Network error' });
        }
    });

const ticketsSlice = createSlice({
    name: "tickets",
    initialState: ticketsAdapter.getInitialState(),
    reducers: {
        sortTicketsByDuration(state) {
            const ticketsArray = Object.values(state.entities);
            const sortedByDuration = sortByDuration(ticketsArray);
            ticketsAdapter.setAll(state, sortedByDuration);
        },    
        sortByConnections(state) {
            const ticketsArray = Object.values(state.entities);

            const sortedByConnections = ticketsArray.sort((a, b) => a.connectionAmount - b.connectionAmount);
            console.log(sortedByConnections.map(ticket => ({ ...ticket })));
            ticketsAdapter.setAll(state, sortedByConnections);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            ticketsAdapter.setAll(state, action.payload);
        });
    }
});


export const {sortTicketsByDuration, sortByConnections} = ticketsSlice.actions;

export default ticketsSlice.reducer;