<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="KnownMethodUpdate"
      size="xl"
      :headerText="$t('KnownMethods.edit')"
      :headerIcon="knownMethod.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <KnownMethodForm
        v-if="!isLoading"
        id="update"
        :knownMethod="knownMethod"
        v-on:submitForm="updateKnownMethod()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="KnownMethodUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import KnownMethodForm from "./KnownMethodForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiKnownMethod from "./../../../../../api/settings/settingsOthers/knownMethods";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    KnownMethodForm,
  },
  props: ["knownMethod"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateKnownMethod() {
      this.isLoading = true;
      let formData = objectToFormData(this.knownMethod);
      try {
        const response = await apiKnownMethod.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("KnownMethodUpdate");
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
          token: this.knownMethod.knownMethodToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiKnownMethod.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.knownMethod.knownMethodImagePath = "";
          this.knownMethod.knownMethodImageIsDefault = true;
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
