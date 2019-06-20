import { Toast } from "buefy/dist/components/toast";
import { Snackbar } from "buefy/dist/components/snackbar";

export const namespaced = true;

export const state = {};

export const mutations = {};

export const actions = {
  // eslint-disable-next-line no-unused-vars
  toastSuccess({ dispatch }, { duration, message }) {
    dispatch("customToast", {
      duration: duration ? duration : 3000,
      message: message ? message : "Oops something went wrong...",
      type: "is-success"
    });
  },
  // eslint-disable-next-line no-unused-vars
  customToast({ commit }, { message, type, duration }) {
    Toast.open({
      message: message ? message : "Oops something went wrong...",
      type: type ? type : "is-info"
    });
  },
  snackBarError({ dispatch }, message) {
    if (!(location.hostname === "localhost")) {
      message = "Oops, something went wrong ! 😧";
    }

    dispatch("customSnackBar", {
      duration: 3000,
      message: message,
      type: "is-danger"
    });
  },
  customSnackBar(
    // eslint-disable-next-line no-unused-vars
    { commit },
    // eslint-disable-next-line no-unused-vars
    { message, type, position, duration, actionText, indefinite, onAction }
  ) {
    let params = {};
    params["indefinite"] = indefinite ? indefinite : false;
    params["duration"] = duration ? duration : 3000;
    params["type"] = type ? type : "is-info";
    params["message"] = message ? message : "Oops something went wrong...";
    params["position"] = position ? position : "is-bottom-right";
    if (actionText && onAction) {
      params["onAction"] = onAction ? onAction : null;
      params["actionText"] = actionText ? actionText : null;
    }
    Snackbar.open(params);
  }
};

export const getters = {};
