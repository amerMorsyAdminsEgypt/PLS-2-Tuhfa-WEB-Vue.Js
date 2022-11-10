<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="DropDownListAdd"
      size="xl"
      :headerText="$t('DropDownLists.add')"
      :headerIcon="dropDownList.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="dropDownList.setInitialValue()"
    >
      <DropDownListForm
        v-if="!isLoading"
        id="add"
        :dropDownList="dropDownList"
        v-on:submitForm="addDropDownList()"
        bottomSheetName="DropDownListAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="DropDownListAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import DropDownListForm from "./DropDownListForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiDropDownList from "./../../../../api/products/dropDownLists";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    DropDownListForm,
  },
  props: ["dropDownList"],
  methods: {
    async addDropDownList() {
      this.isLoading = true;
      let formData = objectToFormData(this.dropDownList);
      try {
        const response = await apiDropDownList.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-DropDownListAdd");
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
          this.dropDownList.setInitialValue();
          break;
        case "leave":
          this.dropDownList.setInitialValue();
          this.closeBottomSheet("DropDownListAdd");
          break;
      }
    },
  },
};
</script>
