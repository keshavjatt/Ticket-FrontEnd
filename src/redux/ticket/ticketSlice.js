import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ticketService } from "./ticketService";

// Create a ticket
export const createTicket = createAsyncThunk(
  "ticket/create-ticket",
  async (ticketData, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      // Call the service with the user token and ticket data
      return await ticketService.createTicket(ticketData, userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);  // Return error message if the API fails
    }
  }
);

// View all tickets
export const viewTickets = createAsyncThunk(
  "ticket/view-tickets",
  async (data, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      // Call the service with the user token
      return await ticketService.viewTickets(userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);  // Return error message if the API fails
    }
  }
);

// Get a specific ticket by ID
export const getTicket = createAsyncThunk(
  "ticket/ticketID",
  async (ticketId, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      // Call the service with the ticket ID and user token
      return await ticketService.getTicket(ticketId, userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);  // Return error message if the API fails
    }
  }
);

// Close a specific ticket by ID
export const closeTicket = createAsyncThunk(
  "ticket/closeticketID",
  async (ticketId, thunkAPI) => {
    const userToken = thunkAPI.getState().auth.user.token;
    try {
      // Call the service with the ticket ID and user token
      return await ticketService.closeTicket(ticketId, userToken);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);  // Return error message if the API fails
    }
  }
);

const initialState = {
  tickets: [],
  ticket: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState: initialState,
  reducers: {
    // Reset all state to initial state
    reset(state) {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending, rejected, and fulfilled states for each thunk action
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
        state.isSuccess = true;
      })

      .addCase(viewTickets.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(viewTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(viewTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets = action.payload;
        state.isSuccess = true;
      })

      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
        state.isSuccess = true;
      })

      .addCase(closeTicket.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(closeTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
        state.isSuccess = true;
      });
  },
});

export const ticketActions = ticketSlice.actions;
export const ticketReducers = ticketSlice.reducer;