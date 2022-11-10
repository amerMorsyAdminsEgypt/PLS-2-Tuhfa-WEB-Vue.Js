<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ColorUpdate"
      size="xl"
      :headerText="$t('Colors.edit')"
      :headerIcon="color.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <ColorForm
        v-if="!isLoading"
        id="update"
        :color="color"
        v-on:submitForm="updateColor()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="ColorUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ColorForm from "./ColorForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiColor from "./../../../../../api/settings/settingsOthers/colors";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ColorForm,
  },
  props: ["color"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateColor() {
      this.isLoading = true;
      let formData = objectToFormData(this.color);
      try {
        const response = await apiColor.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ColorUpdate");
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
          token: this.color.colorToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiColor.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.color.colorImagePath = "";
          this.color.colorImageIsDefault = true;
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
