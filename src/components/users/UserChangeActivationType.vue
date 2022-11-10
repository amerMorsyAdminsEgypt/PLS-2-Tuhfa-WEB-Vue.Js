<template>
  <b-modal id="UserChangeActivationType" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/changeActivationType.svg" class="icon-lg" />
        {{ $t("changeActivationType") }}
      </h3>
    </template>

    <h4 class="text-center">
      (
      <span class="co-red">
        {{ user.userNameCurrent }}
      </span>
      )
    </h4>

    <div class="row">
      <CustomSelectBox
        :className="'col-12'"
        :id="'activationTypeToken'"
        :value="user.activationTypeToken"
        :options="activationTypesTokenOptions"
        v-on:changeValue="user.activationTypeToken = $event"
        :title="$t('general.selectActivationType')"
        :imgName="'changeActivationType.svg'"
      />
    </div>

    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="changeActivationType"
      >
        {{ $t("ok") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('UserChangeActivationType')"
      >
        {{ $t("cancel") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../general/PreLoader.vue";
import CustomSelectBox from "./../general/CustomSelectBox.vue";
import { STATUS } from "./../../utils/constants";
import { objectToFormData } from "./../../utils/functions";
import { getDialogOfActivationTypes } from "./../../utils/dialogsOfConstantsLists";
import UserDelete from "./../../models/users/UserDelete";
import apiUser from "./../../api/user";
import generalMixin from "./../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomSelectBox,
  },
  data() {
    return {
      model: new UserDelete(),
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  props: ["user"],
  computed: {
    ...mapGetters(["constantsListsData"]),
  },
  methods: {
    async changeActivationType() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.user.userToken,
          activationTypeToken: this.user.activationTypeToken,
          userTypeToken: this.user.userTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiUser.changeActivationType(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.hide("UserChangeActivationType");
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
  async created() {},
};
</script>
