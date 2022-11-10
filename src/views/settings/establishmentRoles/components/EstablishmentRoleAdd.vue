<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EstablishmentRoleAdd"
      size="xl"
      :headerText="$t('EstablishmentRoles.add')"
      :headerIcon="establishmentRole.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="
        establishmentRole.setInitialValue(establishmentRole.userTypeToken)
      "
    >
      <EstablishmentRoleForm
        v-if="!isLoading"
        id="add"
        :establishmentRole="establishmentRole"
        v-on:submitForm="addEstablishmentRole()"
        bottomSheetName="EstablishmentRoleAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="EstablishmentRoleAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import EstablishmentRoleForm from "./EstablishmentRoleForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiEstablishmentRole from "./../../../../api/settings/establishmentRole";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    EstablishmentRoleForm,
  },
  props: ["establishmentRole"],
  methods: {
    async addEstablishmentRole() {
      this.isLoading = true;
      // this.establishmentRole.userTypeToken =
      let formData = objectToFormData(this.establishmentRole);
      try {
        const response = await apiEstablishmentRole.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-EstablishmentRoleAdd");
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
          this.establishmentRole.setInitialValue();
          break;
        case "leave":
          this.establishmentRole.setInitialValue();
          this.closeBottomSheet("EstablishmentRoleAdd");
          break;
      }
    },
  },
};
</script>
