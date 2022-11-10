<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="JoiningApplicationSubscriptionAdd"
      size="xl"
      :headerText="$t('JoiningApplicationSubscriptions.add')"
      :headerIcon="joiningApplicationSubscription.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        joiningApplicationSubscription.setInitialValue(
          joiningApplicationSubscription.educationalJoiningApplicationToken
        )
      "
    >
      <JoiningApplicationSubscriptionForm
        v-if="!isLoading"
        id="add"
        :joiningApplicationSubscription="joiningApplicationSubscription"
        v-on:submitForm="addJoiningApplicationSubscription()"
        bottomSheetName="JoiningApplicationSubscriptionAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="JoiningApplicationSubscriptionAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import JoiningApplicationSubscriptionForm from "./JoiningApplicationSubscriptionForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiJoiningApplicationSubscription from "./../../../../api/educational/joiningApplicationSubscriptions";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    JoiningApplicationSubscriptionForm,
  },
  props: ["joiningApplicationSubscription"],
  methods: {
    async addJoiningApplicationSubscription() {
      this.isLoading = true;
      let formData = objectToFormData(this.joiningApplicationSubscription);
      try {
        const response = await apiJoiningApplicationSubscription.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show(
            "ConfirmClearData-JoiningApplicationSubscriptionAdd"
          );
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.joiningApplicationSubscription.setInitialValue();
          break;
        case "leave":
          this.joiningApplicationSubscription.setInitialValue();
          this.closeBottomSheet("JoiningApplicationSubscriptionAdd");
          break;
      }
    },
  },
};
</script>
