<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalPeriodAdd"
      size="xl"
      :headerText="$t('EducationalPeriods.add')"
      :headerIcon="educationalPeriod.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="educationalPeriod.setInitialValue()"
    >
      <EducationalPeriodForm
        v-if="!isLoading"
        id="add"
        :educationalPeriod="educationalPeriod"
        v-on:submitForm="addEducationalPeriod()"
        bottomSheetName="EducationalPeriodAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalPeriodAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import EducationalPeriodForm from "./EducationalPeriodForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalPeriod from "./../../../../api/educational/educationalPeriods";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EducationalPeriodForm,
  },
  props: ["educationalPeriod"],
  methods: {
    async addEducationalPeriod() {
      this.isLoading = true;
      // console.log(this.educationalPeriod);
      let formData = objectToFormData(this.educationalPeriod);
      try {
        const response = await apiEducationalPeriod.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EducationalPeriodAdd");
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
          this.educationalPeriod.setInitialValue();
          break;
        case "leave":
          this.educationalPeriod.setInitialValue();
          this.closeBottomSheet("EducationalPeriodAdd");
          break;
      }
    },
  },
};
</script>
