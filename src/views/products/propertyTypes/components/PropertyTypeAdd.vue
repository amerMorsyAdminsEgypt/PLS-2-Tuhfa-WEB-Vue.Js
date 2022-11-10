<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="PropertyTypeAdd"
      size="xl"
      :headerText="$t('PropertyTypes.add')"
      :headerIcon="propertyType.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="propertyType.setInitialValue()"
    >
      <PropertyTypeForm
        v-if="!isLoading"
        id="add"
        :propertyType="propertyType"
        v-on:submitForm="addPropertyType()"
        bottomSheetName="PropertyTypeAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="PropertyTypeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import PropertyTypeForm from "./PropertyTypeForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiPropertyType from "./../../../../api/products/propertyTypes";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    PropertyTypeForm,
  },
  props: ["propertyType"],
  methods: {
    async addPropertyType() {
      this.isLoading = true;
      let formData = objectToFormData(this.propertyType);
      try {
        const response = await apiPropertyType.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-PropertyTypeAdd");
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
          this.propertyType.setInitialValue();
          break;
        case "leave":
          this.propertyType.setInitialValue();
          this.closeBottomSheet("PropertyTypeAdd");
          break;
      }
    },
  },
};
</script>
