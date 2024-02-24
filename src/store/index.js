import { createStore } from "vuex";
import axios from "axios";
import { API_BASE } from "../helpers/constants";

export default createStore({
  state: {
    isFormShow: false,
    isErrorShow: false,
    isSuccessShow: false,
    isSelectCity: "",
    isRequest: "",
    isError: "",
  },

  actions: {
    toggleFormModal(context) {
      context.commit("TOGGLE_FORM_MODAL");
    },

    toggleErrorModal(context) {
      context.commit("TOGGLE_ERROR_MODAL");
    },

    toggleSuccessModal(context) {
      context.commit("TOGGLE_SUCCESS_MODAL");
    },

    selectCity(context, city) {
      context.commit("SELECT_CITY", city);
    },

    async sendOrderRequest({ state, commit }, orderData) {
      try {
        const response = await axios.post(API_BASE, orderData);
        commit("SEND_ORDER_REQUEST", response.data);
        commit("TOGGLE_SUCCESS_MODAL");
      } catch (e) {
        const error = e?.response?.data ? e.response.data : e.message;
        commit("REQUEST_ERROR", error);
        commit("TOGGLE_ERROR_MODAL");
      } finally {
        commit("TOGGLE_FORM_MODAL");
      }
    },
  },

  mutations: {
    TOGGLE_FORM_MODAL(state) {
      state.isFormShow = !state.isFormShow;
    },

    TOGGLE_ERROR_MODAL(state) {
      state.isErrorShow = !state.isErrorShow;
    },

    TOGGLE_SUCCESS_MODAL(state) {
      state.isSuccessShow = !state.isSuccessShow;
    },

    SELECT_CITY(state, selectedCity) {
      state.isSelectCity = selectedCity;
    },

    SEND_ORDER_REQUEST(state, request) {
      state.isRequest = request;
    },

    REQUEST_ERROR(state, error) {
      state.isError = error;
    },
  },

  getters: {
    getSelectCity(state) {
      return state.isSelectCity;
    },

    getFormShow(state) {
      return state.isFormShow;
    },

    getErrorShow(state) {
      return state.isErrorShow;
    },

    getSuccessShow(state) {
      return state.isSuccessShow;
    },

    getRequest(state) {
      return state.isRequest;
    },

    getError(state) {
      return state.isError;
    },
  },
});
