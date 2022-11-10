<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="InterestFollowUpUpdate"
      size="xl"
      :headerText="$t('InterestFollowUps.edit')"
      :headerIcon="interestFollowUp.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <InterestFollowUpForm
        v-if="!isLoading"
        id="update"
        :interestFollowUp="interestFollowUp"
        v-on:submitForm="updateInterestFollowUp()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="InterestFollowUpUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import InterestFollowUpForm from "./InterestFollowUpForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiInterestFollowUp from "./../../../../api/followUps/interestFollowUps";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    InterestFollowUpForm,
  },
  props: ["interestFollowUp"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateInterestFollowUp() {
      this.isLoading = true;
      let formData = objectToFormData(this.interestFollowUp);
      try {
        const response = await apiInterestFollowUp.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("InterestFollowUpUpdate");
          this.$emit("refresh");
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
    async deleteFile() {
      this.isLoading = true;
      try {
        this.model.fillData({
          token: this.interestFollowUp.interestFollowUpToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiInterestFollowUp.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.interestFollowUp.interestFollowUpImagePath = "";
          this.interestFollowUp.interestFollowUpImageIsDefault = true;
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.showMsg(response.data.msg);
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
  },
};
</script>
