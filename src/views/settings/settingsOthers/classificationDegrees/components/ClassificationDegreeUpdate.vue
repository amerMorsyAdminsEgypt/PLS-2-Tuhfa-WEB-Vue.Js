<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ClassificationDegreeUpdate"
      size="xl"
      :headerText="$t('ClassificationDegrees.edit')"
      :headerIcon="classificationDegree.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ClassificationDegreeForm
        v-if="!isLoading"
        id="update"
        :classificationDegree="classificationDegree"
        v-on:submitForm="updateClassificationDegree()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ClassificationDegreeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ClassificationDegreeForm from "./ClassificationDegreeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiClassificationDegree from "./../../../../../api/settings/settingsOthers/classificationDegrees";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ClassificationDegreeForm,
  },
  props: ["classificationDegree"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateClassificationDegree() {
      this.isLoading = true;
      let formData = objectToFormData(this.classificationDegree);
      try {
        const response = await apiClassificationDegree.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ClassificationDegreeUpdate");
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
          token: this.classificationDegree.classificationDegreeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiClassificationDegree.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.classificationDegree.classificationDegreeImagePath = "";
          this.classificationDegree.classificationDegreeImageIsDefault = true;
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
