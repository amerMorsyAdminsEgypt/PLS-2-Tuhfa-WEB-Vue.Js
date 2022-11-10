import { checkViewType } from "./functions";
import { mapGetters, mapActions } from "vuex";
import GeneralSetting from "./../models/general/generalSettings/GeneralSetting";
import GeneralSettingModel from "./../models/general/generalSettings/GeneralSettingModel";

export default {
  computed: {
    ...mapGetters(["generalSetting"]),
  },
  data() {
    return {
      GeneralSetting: new GeneralSetting(),
      generalSettingModel: new GeneralSettingModel(),
    };
  },
  methods: {
    ...mapActions(["setGeneralSetting"]),
    updateGeneralSetting(modelName, closeLoading = false) {
      this.GeneralSetting.fillData(this.generalSetting);
      this.GeneralSetting[modelName].fillData(this.generalSettingModel);

      setTimeout(() => {
        this.setGeneralSetting(this.GeneralSetting);
        if (!closeLoading) this.isLoading = false;
      }, 0);
    },
    updateViewType(modelName, viewType) {
      this.isLoading = true;
      let valueOfViewType = checkViewType(viewType);

      this.generalSettingModel.fillData(this.generalSetting[modelName]);
      this.generalSettingModel.viewType = valueOfViewType;

      this.updateGeneralSetting(modelName);
    },
    async updateActivationTypeTokens(modelName, activationTypeTokens) {
      this.generalSettingModel.fillData(this.generalSetting[modelName]);
      this.generalSettingModel.activationTypeTokens = activationTypeTokens;

      this.updateGeneralSetting(modelName, true);
    },
  },
};
