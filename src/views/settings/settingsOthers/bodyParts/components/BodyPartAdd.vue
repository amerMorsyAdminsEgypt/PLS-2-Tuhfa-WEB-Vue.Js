<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="BodyPartAdd"
      size="xl"
      :headerText="$t('BodyParts.add')"
      :headerIcon="bodyPart.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="bodyPart.setInitialValue()"
    >
      <BodyPartForm
        v-if="!isLoading"
        id="add"
        :bodyPart="bodyPart"
        v-on:submitForm="addBodyPart()"
        bottomSheetName="BodyPartAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="BodyPartAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import BodyPartForm from "./BodyPartForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiBodyPart from "./../../../../../api/settings/settingsOthers/bodyParts";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    BodyPartForm,
  },
  props: ["bodyPart"],
  methods: {
    async addBodyPart() {
      this.isLoading = true;
      let formData = objectToFormData(this.bodyPart);
      try {
        const response = await apiBodyPart.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-BodyPartAdd");
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
          this.bodyPart.setInitialValue();
          break;
        case "leave":
          this.bodyPart.setInitialValue();
          this.closeBottomSheet("BodyPartAdd");
          break;
      }
    },
  },
};
</script>
