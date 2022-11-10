<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SocialStatuseAdd"
      size="xl"
      :headerText="$t('SocialStatuses.add')"
      :headerIcon="socialStatuse.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="socialStatuse.setInitialValue()"
    >
      <SocialStatuseForm
        v-if="!isLoading"
        id="add"
        :socialStatuse="socialStatuse"
        v-on:submitForm="addSocialStatuse()"
        bottomSheetName="SocialStatuseAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SocialStatuseAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import SocialStatuseForm from "./SocialStatuseForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiSocialStatuse from "./../../../../../api/settings/settingsOthers/socialStatuses";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    SocialStatuseForm,
  },
  props: ["socialStatuse"],
  methods: {
    async addSocialStatuse() {
      this.isLoading = true;
      let formData = objectToFormData(this.socialStatuse);
      try {
        const response = await apiSocialStatuse.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-SocialStatuseAdd");
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
          this.socialStatuse.setInitialValue();
          break;
        case "leave":
          this.socialStatuse.setInitialValue();
          this.closeBottomSheet("SocialStatuseAdd");
          break;
      }
    },
  },
};
</script>
