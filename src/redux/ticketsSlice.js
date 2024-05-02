import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { sortByDuration } from "../../utils/supportFunctions";

// export const ticketsAdapter = createEntityAdapter({
//     selectId: (ticket) => ticket.id,
//     sortComparer: (a, b) => a.price - b.price,
// });

export const fetchTickets = createAsyncThunk(
    "tickets/fetchTickets",
    async (_, { rejectWithValue }) => {
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
        currentSorting: "price",
        displayedFilters: [],
    },
    // initialState: ticketsAdapter.getInitialState(),
    reducers: {
        setSortingType(state, action) {
            state.currentSorting = action.payload;
        },
        sortTickets(state) {
            if (state.currentSorting === 'price') {
                const sortedByPrice = state.filteredTickets.sort((a, b) => a.price - b.price);
                state.filteredTickets = sortedByPrice;
            }
            if (state.currentSorting === 'duration') {
                const sortedByDuration = sortByDuration(state.filteredTickets);
                state.filteredTickets = sortedByDuration;
            }
            if (state.currentSorting === 'optimal') {
                state.filteredTickets = state.filteredTickets.sort((a, b) => {
                    if (a.price !== b.price) {
                        return a.price - b.price;
                    }
                    return a.duration - b.duration;
                });
            }
        },
        setDisplayedFilters(state, action) {
            const { connectionsFilter, companyFilter } = action.payload;
            state.displayedFilters = []; // Clear the existing filters before setting new ones

            // Add connection filter info or default if empty
            if (connectionsFilter.length !== 0) {
                state.displayedFilters.push(`Кол-во пересадок: ${connectionsFilter.join(', ')}`);
            } else {
                state.displayedFilters.push("любое кол-во пересадок");
            }

            // Add company filter info or default if empty
            if (companyFilter.length !== 0) {
                state.displayedFilters.push(`Авиакомпания: ${companyFilter.join(', ')}`);
            } else {
                state.displayedFilters.push("любая авиакомпания");
            }
        },
        // sortByPrice(state) {
        //     const sortedByPrice = state.filteredTickets.sort((a, b) => a.price - b.price);
        //     state.filteredTickets = sortedByPrice;
        // },
        // sortTicketByDuration(state) {
        //     const sortedByDuration = sortByDuration(state.filteredTickets);
        //     state.filteredTickets = sortedByDuration;
        // },
        filterTickets(state, action) {
            const { connectionsFilter, companyFilter } = action.payload;
            if (connectionsFilter.length === 0 && companyFilter.length === 0) {
                state.filteredTickets = state.tickets;
                return;
            }
            const filteredTickets = state.tickets.filter(function (ticket) {
                if (connectionsFilter.length !== 0) {
                    if (!connectionsFilter.includes(ticket.connectionAmount))
                        return false;
                }
                if (companyFilter.length !== 0) {
                    if (!companyFilter.includes(ticket.company))
                        return false;
                }
                return true;
            }
            );
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
            state.filteredTickets = action.payload;
        });
    }
});


export const { filterTickets, sortTickets, setSortingType, setDisplayedFilters } = ticketsSlice.actions;
// export const {sortTicketsByDuration, sortByConnections} = ticketsSlice.actions;

export default ticketsSlice.reducer;