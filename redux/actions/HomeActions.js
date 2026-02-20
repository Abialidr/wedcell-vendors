import axios from "axios";
import { PROXY } from "../../config";

export const GetMehndis = (popular, city) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/vendoruser/getAll`, {
      category: "Mehndi",
      popular: popular,
      city: city === "All Location" ? "" : city,
    });

    dispatch({
      type: "FETCH_MEHNDI",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "MEHNDI_REJECTED",
      payload: error.message,
    });
  }
};
export const GetHotels = (popular, city) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/venueuser/getAll`, {
      category: "Hotel",
      popular: popular,
      city: city === "All Location" ? "" : city,
    });

    dispatch({
      type: "FETCH_HOTEL",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "HOTEL_REJECTED",
      payload: error.response,
    });
  }
};
export const GetBridals = (popular, city) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/item/getAll`, {
      category: "Bridal Wear",
      popular: popular,
      city: city === "All Location" ? "" : city,
    });

    dispatch({
      type: "FETCH_BRIDAL",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "BRIDAL_REJECTED",
      payload: error.response,
    });
  }
};
export const GetGrooms = (popular, city) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/item/getAll`, {
      category: "Groom Wear",
      popular: popular,
      city: city === "All Location" ? "" : city,
    });

    dispatch({
      type: "FETCH_GROOM",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "GROOM_REJECTED",
      payload: error.response,
    });
  }
};
export const GetMakeups = (popular, city) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/item/getAll`, {
      category: "Makeup",
      popular: popular,
      city: city === "All Location" ? "" : city,
    });

    dispatch({
      type: "FETCH_MAKEUP",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "MAKEUP_REJECTED",
      payload: error.response,
    });
  }
};
export const GetPhotographers = (popular, city) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/item/getAll`, {
      category: "Photographers",
      popular: popular,
      city: city === "All Location" ? "" : city,
    });

    dispatch({
      type: "FETCH_PHOTOGRAPHER",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "PHOTOGRAPHER_REJECTED",
      payload: error.response,
    });
  }
};
export const GetDecors = (popular, city) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/item/getAll`, {
      category: "Planning & Decor",
      popular: popular,
      city: city === "All Location" ? "" : city,
    });

    dispatch({
      type: "FETCH_DECOR",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "DECOR_REJECTED",
      payload: error.response,
    });
  }
};
export const GetVendors = (id) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/item/getAll`, {
      type: "Vendor",
      _id: id,
    });

    dispatch({
      type: "FETCH_VENDOR",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "VENDOR_REJECTED",
      payload: error.response,
    });
  }
};
export const GetReadWedding = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${PROXY}/admin/alladminUpload/${id}`, {});

    dispatch({
      type: "FETCH_REAL_WEDDING",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "REAL_WEDDING_REJECTED",
      payload: error.response,
    });
  }
};
export const GetVenues = (id) => async (dispatch) => {
  try {
    const response = await axios.post(`${PROXY}/item/getAll`, {
      type: "Venue",
      _id: id,
    });

    dispatch({
      type: "FETCH_VENUE",
      payload: response.data,
    });
  } catch (error) {
    console.error("hotereserr:", error.message);
    dispatch({
      type: "VENUE_REJECTED",
      payload: error.response,
    });
  }
};
