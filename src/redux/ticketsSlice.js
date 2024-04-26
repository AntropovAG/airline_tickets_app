import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { sortByDuration } from "../../utils/supportFunctions";

// export const ticketsAdapter = createEntityAdapter({
//     selectId: (ticket) => ticket.id,
//     sortComparer: (a, b) => a.price - b.price,
// });

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
    initialState: {
        tickets: [],
        filteredTickets: [],
    },
    // initialState: ticketsAdapter.getInitialState(),
    reducers: {
        sortByPrice(state) {
            const sortedByPrice = state.tickets.sort((a, b) => a.price - b.price);
            state.tickets = sortedByPrice;
        },
        sortTicketByDuration(state) {
            const sortedByDuration = sortByDuration(state.tickets);
            state.tickets = sortedByDuration;
        },
        filterByTransfer(state, action) {
            const {value, value2} = action.payload;
            console.log(value, value2);
            if (value.length === 0 && value2.length === 0) {
                state.filteredTickets = state.tickets;
                return;
            }
            const filteredTickets = state.tickets.filter(function(ticket) {
                if (value.length !== 0) {
                    if (!value.includes(ticket.connectionAmount))
                        return false;
                }
                if (value2.length !== 0) {
                    if (!value2.includes(ticket.company))
                        return false;
                }
                return true;
            }
            );
            console.log(filteredTickets);
            state.filteredTickets = filteredTickets;
        }
        // filterByTransfer(state, action) {
        //     const {filters} = action.payload;
        //     console.log(action.payload)
            // if (filters.length === 0) {
            //     state.filteredTickets = state.tickets;
            //     return;
            // }
            // const filteredTickets = state.tickets.filter(ticket =>
            //     filters.includes(ticket.connectionAmount)
            // );
            // console.log(filteredTickets);
            // state.filteredTickets = filteredTickets;
        // }
        // sortTicketsByDuration(state) {
        //     const ticketsArray = Object.values(state.entities);
        //     const sortedByDuration = sortByDuration(ticketsArray);
        //     ticketsAdapter.setAll(state, sortedByDuration);
        // },    
        // sortByConnections(state) {
        //     const ticketsArray = Object.values(state.entities);
        //     const sortedByConnections = ticketsArray.sort((a, b) => a.connectionAmount - b.connectionAmount);
        //     console.log(sortedByConnections.map(ticket => ({ ...ticket })));
        //     ticketsAdapter.setAll(state, sortedByConnections);
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTickets.fulfilled, (state, action) => {
            // ticketsAdapter.setAll(state, action.payload);
            state.tickets = action.payload;
        });
    }
});


export const {sortByPrice, sortTicketByDuration, filterByTransfer} = ticketsSlice.actions;
// export const {sortTicketsByDuration, sortByConnections} = ticketsSlice.actions;

export default ticketsSlice.reducer;