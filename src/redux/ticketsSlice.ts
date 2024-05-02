import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { sortByDuration } from "../../utils/supportFunctions.js";
import { Ticket } from "../../utils/interfaces.ts";
// import { createEntityAdapter } from "@reduxjs/toolkit";

// export const ticketsAdapter = createEntityAdapter({
//     selectId: (ticket) => ticket.id,
//     sortComparer: (a, b) => a.price - b.price,
// });

interface TicketsState {
    tickets: Ticket[];
    filteredTickets: Ticket[];
    currentSorting: "price" | "duration" | "optimal";
    displayedFilters: string[];
}

export const fetchTickets = createAsyncThunk<
    Ticket[],
    undefined,
    {
        rejectValue: { message: string; status: string | undefined };
    }
>("tickets/fetchTickets", async (_, { rejectWithValue }) => {
    try {
        const response = await fetch("http://localhost:3000/tickets");
        if (!response.ok) {
            throw new Error(
                `Server error: ${response.status} (${response.statusText})`
            );
        }
        const data: Ticket[] = await response.json();
        return data;
    } catch (error: any) {
        return rejectWithValue({
            message: error.message,
            status: error.status || "Network error",
        });
    }
});

const initialState: TicketsState = {
    tickets: [],
    filteredTickets: [],
    currentSorting: "price",
    displayedFilters: [],
};

const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        setSortingType(
            state,
            action: PayloadAction<"price" | "duration" | "optimal">
        ) {
            state.currentSorting = action.payload;
        },
        sortTickets(state) {
            if (state.currentSorting === "price") {
                state.filteredTickets.sort((a, b) => a.price - b.price);
            } else if (state.currentSorting === "duration") {
                state.filteredTickets = sortByDuration(state.filteredTickets);
            } else if (state.currentSorting === "optimal") {
                state.filteredTickets.sort((a, b) => {
                    if (a.connectionAmount !== b.connectionAmount)
                        return a.connectionAmount - b.connectionAmount;
                    return a.price - b.price;
                });
            }
        },
        setDisplayedFilters(
            state,
            action: PayloadAction<{
                connectionsFilter: number[];
                companyFilter: string[];
            }>
        ) {
            const { connectionsFilter, companyFilter } = action.payload;
            state.displayedFilters = [];
            if (connectionsFilter.length !== 0) {
                state.displayedFilters.push(
                    `Кол-во пересадок: ${connectionsFilter.join(", ")}`
                );
            } else {
                state.displayedFilters.push("любое кол-во пересадок");
            }
            if (companyFilter.length !== 0) {
                state.displayedFilters.push(
                    `Авиакомпания: ${companyFilter.join(", ")}`
                );
            } else {
                state.displayedFilters.push("любая авиакомпания");
            }
        },
        filterTickets(
            state,
            action: PayloadAction<{
                connectionsFilter: number[];
                companyFilter: string[];
            }>
        ) {
            const { connectionsFilter, companyFilter } = action.payload;
            state.filteredTickets = state.tickets.filter(
                (ticket) =>
                    (!connectionsFilter.length ||
                        connectionsFilter.includes(ticket.connectionAmount)) &&
                    (!companyFilter.length || companyFilter.includes(ticket.company))
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchTickets.fulfilled,
            (state, action: PayloadAction<Ticket[]>) => {
                state.tickets = action.payload;
                state.filteredTickets = action.payload;
            }
        );
    },
});

export const {
    filterTickets,
    sortTickets,
    setSortingType,
    setDisplayedFilters,
} = ticketsSlice.actions;
export default ticketsSlice.reducer;
