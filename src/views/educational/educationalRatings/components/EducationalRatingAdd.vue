<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalRatingAdd"
      size="xl"
      :headerText="$t('EducationalRatings.add')"
      :headerIcon="educationalRating.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="handelOpen()"
    >
      <EducationalRatingForm
        v-if="!isLoading"
        id="add"
        :educationalRating="educationalRating"
        v-on:submitForm="addEducationalRating()"
        bottomSheetName="EducationalRatingAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EducationalRatingAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import EducationalRatingForm from "./EducationalRatingForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiEducationalRating from "./../../../../api/educational/educationalRatings";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EducationalRatingForm,
  },
  props: ["educationalRating", "filterData"],
  methods: {
    async handelOpen() {
      this.educationalRating.setInitialValue();
      await this.setEducationalRatingData();
    },
    async setEducationalRatingData() {
      this.educationalRating.educationalRatingTypeToken =
        this.filterData.educationalRatingTypeToken;

      this.educationalRating.educationalCategoryToken =
        this.filterData.educationalCategoryToken;
      this.educationalRating.educationalGroupToken =
        this.filterData.educationalGroupToken;
      this.educationalRating.educationalScheduleTimeToken =
        this.filterData.educationalScheduleTimeToken;
    },
    async addEducationalRating() {
      this.isLoading = true;
      // console.log(this.educationalRating);
      let formData = objectToFormData(this.educationalRating);
      try {
        const response = await apiEducationalRating.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EducationalRatingAdd");
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
          this.educationalRating.setInitialValue();
          break;
        case "leave":
          this.educationalRating.setInitialValue();
          this.closeBottomSheet("EducationalRatingAdd");
          break;
      }
    },
  },
};
</script>
