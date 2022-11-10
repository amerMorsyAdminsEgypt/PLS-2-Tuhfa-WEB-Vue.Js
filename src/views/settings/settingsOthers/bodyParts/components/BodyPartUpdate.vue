<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="BodyPartUpdate"
      size="xl"
      :headerText="$t('BodyParts.edit')"
      :headerIcon="bodyPart.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <BodyPartForm
        v-if="!isLoading"
        id="update"
        :bodyPart="bodyPart"
        v-on:submitForm="updateBodyPart()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="BodyPartUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import BodyPartForm from "./BodyPartForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiBodyPart from "./../../../../../api/settings/settingsOthers/bodyParts";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    BodyPartForm,
  },
  props: ["bodyPart"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateBodyPart() {
      this.isLoading = true;
      let formData = objectToFormData(this.bodyPart);
      try {
        const response = await apiBodyPart.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("BodyPartUpdate");
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
          token: this.bodyPart.bodyPartToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiBodyPart.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.bodyPart.bodyPartImagePath = "";
          this.bodyPart.bodyPartImageIsDefault = true;
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
