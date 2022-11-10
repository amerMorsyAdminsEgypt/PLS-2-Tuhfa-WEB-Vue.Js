<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalRatingUpdate"
      size="xl"
      :headerText="$t('EducationalRatings.edit')"
      :headerIcon="educationalRating.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <EducationalRatingForm
        v-if="!isLoading"
        id="update"
        :educationalRating="educationalRating"
        v-on:submitForm="updateEducationalRating()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="EducationalRatingUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import EducationalRatingForm from "./EducationalRatingForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiEducationalRating from "./../../../../api/educational/educationalRatings";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    EducationalRatingForm,
  },
  props: ["educationalRating"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateEducationalRating() {
      this.isLoading = true;
      let formData = objectToFormData(this.educationalRating);
      try {
        const response = await apiEducationalRating.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalRatingUpdate");
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
          token: this.educationalRating.educationalRatingToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiEducationalRating.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.educationalRating.educationalRatingImagePath = "";
          this.educationalRating.educationalRatingImageIsDefault = true;
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
