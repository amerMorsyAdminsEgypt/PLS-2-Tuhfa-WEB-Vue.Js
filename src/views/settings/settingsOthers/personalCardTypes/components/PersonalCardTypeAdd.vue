<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PersonalCardTypeAdd"
      size="xl"
      :headerText="$t('PersonalCardTypes.add')"
      :headerIcon="personalCardType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="personalCardType.setInitialValue()"
    >
      <PersonalCardTypeForm
        v-if="!isLoading"
        id="add"
        :personalCardType="personalCardType"
        v-on:submitForm="addPersonalCardType()"
        bottomSheetName="PersonalCardTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PersonalCardTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import PersonalCardTypeForm from "./PersonalCardTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiPersonalCardType from "./../../../../../api/settings/settingsOthers/personalCardTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PersonalCardTypeForm,
  },
  props: ["personalCardType"],
  methods: {
    async addPersonalCardType() {
      this.isLoading = true;
      let formData = objectToFormData(this.personalCardType);
      try {
        const response = await apiPersonalCardType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PersonalCardTypeAdd");
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
          this.personalCardType.setInitialValue();
          break;
        case "leave":
          this.personalCardType.setInitialValue();
          this.closeBottomSheet("PersonalCardTypeAdd");
          break;
      }
    },
  },
};
</script>
