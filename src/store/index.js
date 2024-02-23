import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    isShow: false,
    isErrorShow: false,
    isSuccessShow: false,
    isSelectCity: "Москва",
    request: "",
    error: "",
    isOrderRequestLoading: false,
  },

  actions: {
    toggleModal(context) {
      context.commit("TOGGLE_MODAL");
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
        commit("SET_LODING", true);
        const response = await axios.post(
          "http://hh.autodrive-agency.ru/test-tasks/front/task-7/",
          orderData
        );
        commit("SEND_ORDER_REQUEST", response.data);
        commit("TOGGLE_SUCCESS_MODAL");
      } catch (e) {
        const error = e?.response?.data ? e?.response?.data : e.message;
        commit("REQUEST_ERROR", error);
        commit("TOGGLE_ERROR_MODAL");
      } finally {
        commit("SET_LODING", false);
        commit("TOGGLE_MODAL");
      }
    },
  },

  mutations: {
    TOGGLE_MODAL(state) {
      state.isShow = !state.isShow;
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
      state.request = request;
    },

    REQUEST_ERROR(state, error) {
      state.error = error;
    },

    SET_LODING(state, bool) {
      state.isOrderRequestLoading = bool;
    },
  },

  getters: {
    getSelectCity(state) {
      return state.isSelectCity;
    },

    getShow(state) {
      return state.isShow;
    },

    getErrorShow(state) {
      return state.isErrorShow;
    },

    getSuccessShow(state) {
      return state.isSuccessShow;
    },

    getRequest(state) {
      return state.request;
    },

    getError(state) {
      return state.error;
    },

    getloadingStatus(state) {
      return state.isOrderRequestLoading;
    },
  },
});
