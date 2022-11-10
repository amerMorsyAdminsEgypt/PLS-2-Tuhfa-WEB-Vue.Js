<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EstablishmentRoleUpdate"
      size="xl"
      :headerText="$t('EstablishmentRoles.edit')"
      :headerIcon="establishmentRole.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <EstablishmentRoleForm
        v-if="!isLoading"
        id="update"
        :establishmentRole="establishmentRole"
        v-on:submitForm="updateEstablishmentRole()"
        :deleteFileStatus="true"
        v-on:deleteFile="deleteFile()"
        bottomSheetName="EstablishmentRoleUpdate"
        :submitName="$t('edit')"
        :modelName="modelName"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import EstablishmentRoleForm from "./EstablishmentRoleForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiEstablishmentRole from "./../../../../api/settings/establishmentRole";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    EstablishmentRoleForm,
  },
  props: ["establishmentRole", "modelName"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateEstablishmentRole() {
      this.isLoading = true;
      let formData = objectToFormData(this.establishmentRole);
      try {
        const response = await apiEstablishmentRole.update(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EstablishmentRoleUpdate");
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
          token: this.establishmentRole.establishmentRoleToken,
        });
        let formData = objectToFormData(this.model);
        const response = await apiEstablishmentRole.deleteImage(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.establishmentRole.establishmentRoleImagePath = "";
          this.establishmentRole.establishmentRoleImageIsDefault = true;
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
