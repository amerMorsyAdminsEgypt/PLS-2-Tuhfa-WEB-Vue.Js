<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="FollowInterestUpdate"
      size="xl"
      :headerText="$t('FollowInterests.edit')"
      :headerIcon="followInterest.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <FollowInterestForm
        v-if="!isLoading"
        id="update"
        :followInterest="followInterest"
        v-on:submitForm="updateFollowInterest()"
        bottomSheetName="FollowInterestUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import FollowInterestForm from "./FollowInterestForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiFollowInterest from "./../../../../api/followUps/followInterests";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    FollowInterestForm,
  },
  props: ["followInterest"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateFollowInterest() {
      this.isLoading = true;
      let formData = objectToFormData(this.followInterest);
      try {
        const response = await apiFollowInterest.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("FollowInterestUpdate");
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
  },
};
</script>
