<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SpecialtyAdd"
      size="xl"
      :headerText="$t('Specialties.add')"
      :headerIcon="specialty.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="specialty.setInitialValue()"
    >
      <SpecialtyForm
        v-if="!isLoading"
        id="add"
        :specialty="specialty"
        v-on:submitForm="addSpecialty()"
        bottomSheetName="SpecialtyAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="SpecialtyAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import SpecialtyForm from "./SpecialtyForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiSpecialty from "./../../../../../api/settings/settingsOthers/specialties";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    SpecialtyForm,
  },
  props: ["specialty"],
  methods: {
    async addSpecialty() {
      this.isLoading = true;
      let formData = objectToFormData(this.specialty);
      try {
        const response = await apiSpecialty.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-SpecialtyAdd");
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
          this.specialty.setInitialValue();
          break;
        case "leave":
          this.specialty.setInitialValue();
          this.closeBottomSheet("SpecialtyAdd");
          break;
      }
    },
  },
};
</script>
