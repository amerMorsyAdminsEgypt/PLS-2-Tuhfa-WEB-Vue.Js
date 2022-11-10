<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ColorAdd"
      size="xl"
      :headerText="$t('Colors.add')"
      :headerIcon="color.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="color.setInitialValue()"
    >
      <ColorForm
        v-if="!isLoading"
        id="add"
        :color="color"
        v-on:submitForm="addColor()"
        bottomSheetName="ColorAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData dialogName="ColorAdd" v-on:response="response($event)" />
  </div>
</template>

<script>
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../../components/general/ConfirmClearData.vue";
import ColorForm from "./ColorForm.vue";
import { STATUS } from "./../../../../../utils/constants";
import { objectToFormData } from "./../../../../../utils/functions";
import apiColor from "./../../../../../api/settings/settingsOthers/colors";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    ColorForm,
  },
  props: ["color"],
  methods: {
    async addColor() {
      this.isLoading = true;
      let formData = objectToFormData(this.color);
      try {
        const response = await apiColor.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-ColorAdd");
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
          this.color.setInitialValue();
          break;
        case "leave":
          this.color.setInitialValue();
          this.closeBottomSheet("ColorAdd");
          break;
      }
    },
  },
};
</script>
