<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InterestAdd"
      size="xl"
      :headerText="$t('Interests.add')"
      :headerIcon="interest.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="interest.setInitialValue()"
    >
      <InterestForm
        v-if="!isLoading"
        id="add"
        :interest="interest"
        v-on:submitForm="addInterest()"
        bottomSheetName="InterestAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="InterestAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import InterestForm from "./InterestForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiInterest from "./../../../../api/followUps/interests";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    InterestForm,
  },
  props: ["interest"],
  methods: {
    async addInterest() {
      this.isLoading = true;
      let formData = objectToFormData(this.interest);
      try {
        const response = await apiInterest.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-InterestAdd");
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
          this.interest.setInitialValue();
          break;
        case "leave":
          this.interest.setInitialValue();
          this.closeBottomSheet("InterestAdd");
          break;
      }
    },
  },
};
</script>
