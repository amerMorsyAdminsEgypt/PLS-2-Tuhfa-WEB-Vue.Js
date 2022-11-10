<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="CertificateAdd"
      size="xl"
      :headerText="$t('Certificates.add')"
      :headerIcon="certificate.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="certificate.setInitialValue()"
    >
      <CertificateForm
        v-if="!isLoading"
        id="add"
        :certificate="certificate"
        v-on:submitForm="addCertificate()"
        bottomSheetName="CertificateAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="CertificateAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import CertificateForm from "./CertificateForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiCertificate from "./../../../../../api/settings/settingsOthers/certificates";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    CertificateForm,
  },
  props: ["certificate"],
  methods: {
    async addCertificate() {
      this.isLoading = true;
      let formData = objectToFormData(this.certificate);
      try {
        const response = await apiCertificate.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-CertificateAdd");
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
          this.certificate.setInitialValue();
          break;
        case "leave":
          this.certificate.setInitialValue();
          this.closeBottomSheet("CertificateAdd");
          break;
      }
    },
  },
};
</script>
