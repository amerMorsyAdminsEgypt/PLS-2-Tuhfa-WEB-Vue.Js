<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PersonalCardTypeUpdate"
      size="xl"
      :headerText="$t('PersonalCardTypes.edit')"
      :headerIcon="personalCardType.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <PersonalCardTypeForm
        v-if="!isLoading"
        id="update"
        :personalCardType="personalCardType"
        v-on:submitForm="updatePersonalCardType()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="PersonalCardTypeUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import PersonalCardTypeForm from "./PersonalCardTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import GeneralDelete from "./../../../../../models/general/GeneralDelete";
import apiPersonalCardType from "./../../../../../api/settings/settingsOthers/personalCardTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    PersonalCardTypeForm,
  },
  props: ["personalCardType"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updatePersonalCardType() {
      this.isLoading = true;
      let formData = objectToFormData(this.personalCardType);
      try {
        const response = await apiPersonalCardType.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("PersonalCardTypeUpdate");
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
          token: this.personalCardType.personalCardTypeToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiPersonalCardType.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.personalCardType.personalCardTypeImagePath = "";
          this.personalCardType.personalCardTypeImageIsDefault = true;
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
