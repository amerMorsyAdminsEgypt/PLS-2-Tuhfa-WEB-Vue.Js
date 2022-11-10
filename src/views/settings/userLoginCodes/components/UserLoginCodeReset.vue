<template>
  <b-modal id="UserLoginCodeReset" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3 v-if="isResetTypeLoginCode">
        <img src="@/assets/images/UserLoginCodes.svg" class="icon-lg" />
        {{ $t("UserLoginCodes.resetCode") }}
      </h3>
      <h3 v-else>
        <img src="@/assets/images/pc.svg" class="icon-lg" />
        {{ $t("UserLoginCodes.resetDevice") }}
      </h3>
    </template>

    <div class="row">
      <CustomCheckbox
        :className="'col-md-12'"
        :value="userLoginCode.resetForAllPlatFrom"
        v-on:changeValue="userLoginCode.resetForAllPlatFrom = $event"
        :title="$t('UserLoginCodes.resetForAllPlatFrom')"
      />
      <!-- :errors="errors_userLoginCodePlatFromToken" -->
      <CustomSelectBox
        v-if="!userLoginCode.resetForAllPlatFrom"
        :className="'col-12'"
        :id="'userLoginCodePlatFromToken'"
        :value="userLoginCode.userLoginCodePlatFromToken"
        :options="userLoginCodePlatFromTokenOptions"
        v-on:changeValue="userLoginCode.userLoginCodePlatFromToken = $event"
        :title="$t('PlatFroms.select')"
        :imgName="'type.svg'"
      />
      <!-- $v.userLoginCode.userLoginCodePlatFromToken.$touch(); -->
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="reset"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('UserLoginCodeReset')"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import { getDialogOfPlatFormType } from "./../../../../utils/dialogsOfConstantsLists";
import UserLoginCodeDelete from "./../../../../models/settings/userLoginCodes/UserLoginCodeDelete";
import UserLoginCodes from "./../../../../models/settings/userLoginCodes/UserLoginCodes";
import apiUserLoginCode from "./../../../../api/settings/userLoginCode";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
    CustomCheckbox,
  },
  data() {
    return {
      model: new UserLoginCodeDelete(),
      userLoginCodePlatFromTokenOptions: getDialogOfPlatFormType() || [],
      userLoginCode: {},
    };
  },
  props: {
    userTypeToken: {
      type: String,
      default: "",
    },
    modelName: {
      type: String,
      default: "",
    },
    userToken: {
      type: String,
      default: "",
    },
    isResetTypeLoginCode: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  methods: {
    async reset() {
      let model = {
        userToken: this.userToken,
        userTypeToken: this.userTypeToken,
        resetForAllPlatFrom: this.userLoginCode.resetForAllPlatFrom,
        userLoginCodePlatFromToken:
          this.userLoginCode.userLoginCodePlatFromToken,
      };
      let formData = objectToFormData(model);
      if (this.isResetTypeLoginCode) {
        this.ResetUserLoginCode(formData);
      } else {
        this.ResetUserDeviceCode(formData);
      }
    },
    async ResetUserLoginCode(formData) {
      this.isLoading = true;
      try {
        const response = await apiUserLoginCode.ResetUserLoginCode(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(true, response.data.msg, true);
          this.$bvModal.hide("UserLoginCodeReset");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async ResetUserDeviceCode(formData) {
      this.isLoading = true;
      try {
        const response = await apiUserLoginCode.ResetUserDeviceCode(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(true, response.data.msg, true);
          this.$bvModal.hide("UserLoginCodeReset");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (e) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
  async created() {
    this.userLoginCode = new UserLoginCodes(this.modelName).userLoginCode;
  },
};
</script>
