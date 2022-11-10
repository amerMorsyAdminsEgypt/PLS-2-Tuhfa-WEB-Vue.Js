<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="RelativeRelationTypeAdd"
      size="xl"
      :headerText="$t('RelativeRelationTypes.add')"
      :headerIcon="relativeRelationType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="relativeRelationType.setInitialValue()"
    >
      <RelativeRelationTypeForm
        v-if="!isLoading"
        id="add"
        :relativeRelationType="relativeRelationType"
        v-on:submitForm="addRelativeRelationType()"
        bottomSheetName="RelativeRelationTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="RelativeRelationTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import RelativeRelationTypeForm from "./RelativeRelationTypeForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiRelativeRelationType from "./../../../../../api/settings/settingsOthers/relativeRelationTypes";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    RelativeRelationTypeForm,
  },
  props: ["relativeRelationType"],
  methods: {
    async addRelativeRelationType() {
      this.isLoading = true;
      let formData = objectToFormData(this.relativeRelationType);
      try {
        const response = await apiRelativeRelationType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-RelativeRelationTypeAdd");
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
      if (data) this.relativeRelationType.setInitialValue();
    },
  },
};
</script>
