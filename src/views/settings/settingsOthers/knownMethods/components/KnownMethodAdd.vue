<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="KnownMethodAdd"
      size="xl"
      :headerText="$t('KnownMethods.add')"
      :headerIcon="knownMethod.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="knownMethod.setInitialValue()"
    >
      <KnownMethodForm
        v-if="!isLoading"
        id="add"
        :knownMethod="knownMethod"
        v-on:submitForm="addKnownMethod()"
        bottomSheetName="KnownMethodAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="KnownMethodAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import KnownMethodForm from "./KnownMethodForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiKnownMethod from "./../../../../../api/settings/settingsOthers/knownMethods";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    KnownMethodForm,
  },
  props: ["knownMethod"],
  methods: {
    async addKnownMethod() {
      this.isLoading = true;
      let formData = objectToFormData(this.knownMethod);
      try {
        const response = await apiKnownMethod.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-KnownMethodAdd");
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
          this.knownMethod.setInitialValue();
          break;
        case "leave":
          this.knownMethod.setInitialValue();
          this.closeBottomSheet("KnownMethodAdd");
          break;
      }
    },
  },
};
</script>
