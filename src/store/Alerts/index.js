export default {
  state: {
    alerts: [],
  },
  getters: {
    alerts: (state) => state.alerts,
  },
  mutations: {
    ADD_ALERT: (state, alert) => {
      if (
        alert.message &&
        state.alerts.findIndex((el) => el.message == alert.message) == -1
      ) {
        state.alerts.push({
          ...alert,
          id: (Math.random().toString(36) + Date.now().toString(36)).substring(
            2
          ),
        });
      }
    },
    REMOVE_ALERT: (state, alertToRemove) => {
      state.alerts = state.alerts.filter((alert) => {
        return alert.id != alertToRemove.id;
      });
    },
  },
  actions: {
    addAlert(context, alert) {
      context.commit("ADD_ALERT", alert);
    },
    removeAlert(context, alert) {
      context.commit("REMOVE_ALERT", alert);
    },
  },
};
