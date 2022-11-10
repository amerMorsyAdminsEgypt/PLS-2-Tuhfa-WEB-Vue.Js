<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="SimpleExamModelUpdate"
      size="xl"
      :headerText="$t('SimpleExamModels.edit')"
      :headerIcon="simpleExamModel.icon"
      :clickToClose="false"
      :swipeAble="false"
    >
      <SimpleExamModelForm
        v-if="!isLoading"
        id="update"
        :simpleExamModel="simpleExamModel"
        v-on:submitForm="updateSimpleExamModel()"
        :deleteFileStatus="false"
        bottomSheetName="SimpleExamModelUpdate"
        :submitName="$t('edit')"
      />
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import SimpleExamModelForm from "./SimpleExamModelForm.vue";
import { STATUS } from "./../../../../utils/constants";
// import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiSimpleExamModel from "./../../../../api/educational/simpleExamModels";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    SimpleExamModelForm,
  },
  props: ["simpleExamModel"],
  data() {
    return {
      model: new GeneralDelete(),
    };
  },
  methods: {
    async updateSimpleExamModel() {
      this.isLoading = true;
      // let formData = objectToFormData(this.simpleExamModel);
      try {
        const response = await apiSimpleExamModel.update(this.simpleExamModel);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("SimpleExamModelUpdate");
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
    // async deleteFile() {
    //   this.isLoading = true;
    //   try {
    //     this.model.fillData({
    //       token: this.simpleExamModel.simpleExamModelToken,
    //     });
    //     let formData = objectToFormData(this.model);
    //     const response = await apiSimpleExamModel.deleteImage(formData);
    //     if (response.data.status == STATUS.SUCCESS) {
    //       this.showMsg(response.data.msg, true);
    //       this.simpleExamModel.simpleExamModelImagePath = "";
    //       this.simpleExamModel.simpleExamModelImageIsDefault = true;
    //       this.$emit("refresh");
    //     } else if (response.data.status == STATUS.INVALID_TOKEN) {
    //       this.showMsg(response.data.msg);
    //       this.$store.dispatch("logoutUser", response.data.msg);
    //     } else {
    //       this.showMsg(response.data.msg);
    //     }
    //   } catch (error) {
    //     this.showMsg(this.$t("errorCatch"));
    //   }
    //   this.isLoading = false;
    // },
  },
};
</script>
