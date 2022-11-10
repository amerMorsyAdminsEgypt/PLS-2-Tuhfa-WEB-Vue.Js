<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="StoreItemAdd"
      size="xl"
      :headerText="$t('StoreItems.add')"
      :headerIcon="storeItem.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="storeItem.setInitialValue()"
    >
      <StoreItemForm
        v-if="!isLoading"
        id="add"
        :storeItem="storeItem"
        v-on:submitForm="addStoreItem()"
        bottomSheetName="StoreItemAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="StoreItemAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../../components/general/ConfirmClearData.vue";
import StoreItemForm from "./StoreItemForm.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import apiStoreItem from "./../../../../api/products/storeItems";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    StoreItemForm,
  },
  props: ["storeItem"],
  methods: {
    async addStoreItem() {
      this.isLoading = true;
      let formData = objectToFormData(this.storeItem);
      try {
        const response = await apiStoreItem.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-StoreItemAdd");
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
          this.storeItem.setInitialValue();
          break;
        case "leave":
          this.storeItem.setInitialValue();
          this.closeBottomSheet("StoreItemAdd");
          break;
      }
    },
  },
};
</script>
