<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ScientificDegreeUpdate"
      size="xl"
      :headerText="$t('ScientificDegrees.edit')"
      :headerIcon="scientificDegree.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ScientificDegreeForm
        v-if="!isLoading"
        id="update"
        :scientificDegree="scientificDegree"
        v-on:submitForm="updateScientificDegree()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ScientificDegreeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ScientificDegreeForm from "./ScientificDegreeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiScientificDegree from "./../../../../../api/settings/settingsOthers/scientificDegrees";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ScientificDegreeForm,
  },
  props: ["scientificDegree"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateScientificDegree() {
      this.isLoading = true;
      let formData = objectToFormData(this.scientificDegree);
      try {
        const response = await apiScientificDegree.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ScientificDegreeUpdate");
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
          token: this.scientificDegree.scientificDegreeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiScientificDegree.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.scientificDegree.scientificDegreeImagePath = "";
          this.scientificDegree.scientificDegreeImageIsDefault = true;
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
