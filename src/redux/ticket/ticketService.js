import axios from "axios";

// Get the base URL from the environment variable
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create a ticket
const createTicket = async (ticketData, userToken) => {
  const URL = `${BASE_URL}/api/tickets/create-ticket`;
  try {
    const res = await axios.post(URL, ticketData, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};

// View all tickets
const viewTickets = async (userToken) => {
  const URL = `${BASE_URL}/api/tickets/view-tickets`;
  try {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};

// Get a specific ticket by ID
const getTicket = async (ticketId, userToken) => {
  const URL = `${BASE_URL}/api/tickets/view-tickets/${ticketId}`;
  try {
    const res = await axios.get(URL, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};

// Close a specific ticket
const closeTicket = async (ticketId, userToken) => {
  const URL = `${BASE_URL}/api/tickets/view-tickets/${ticketId}`;
  try {
    const res = await axios.put(
      URL,
      { status: "closed" },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    return res.data;
  } catch (error) {
    throw { message: error?.response?.data?.message };
  }
};

export const ticketService = {
  createTicket,
  viewTickets,
  getTicket,
  closeTicket,
};