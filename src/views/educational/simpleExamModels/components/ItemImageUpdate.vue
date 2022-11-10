<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="ItemImageUpdate"
      size="xl"
      :headerText="$t('SimpleExamModels.editImage')"
      :headerIcon="icon"
    >
      <div class="">
        <form autocomplete="off" @submit.prevent="updateItemImage()">
          <div class="row">
            <CustomFileInput
              :className="'col-12'"
              @changeValue="mediaFile = $event.file"
              :deleteFileStatus="canDeleteFile"
              v-on:deleteFile="deleteFile()"
            />
          </div>

          <div class="form-actions">
            <div class="icon-submit" @click.prevent="updateItemImage()">
              <img src="@/assets/images/check-icon.svg" :title="$t('edit')" />
            </div>
            <div
              class="icon-cancel"
              @click.prevent="closeBottomSheet(`ItemImageUpdate`)"
            >
              <img
                src="@/assets/images/cancel-icon.svg"
                :title="$t('cancel')"
              />
            </div>
          </div>
        </form>
      </div>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";

import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";

import apiSimpleExamModel from "./../../../../api/educational/simpleExamModels";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/SimpleExamModels.svg";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    CustomFileInput,
  },
  props: ["itemToken", "itemType", "canDeleteFile"],
  data() {
    return {
      icon,
      mediaFile: "",
    };
  },
  methods: {
    //#region update
    async updateItemImage() {
      if (!this.mediaFile) {
        this.showMsg(this.$t("general.pleseSelectFile"));
      } else {
        switch (this.itemType) {
          case "Paragraph":
            this.updateParagraphImage();
            break;
          case "TrueFalseQuestion":
            this.updateTrueFalseQuestionImage();
            break;
          case "McqQuestion":
            this.updateMcqQuestionImage();
            break;

          default:
            break;
        }
      }
    },
    async updateParagraphImage() {
      this.isLoading = true;
      let params = {
        simpleExamParagraphToken: this.itemToken,
        mediaFile: this.mediaFile,
      };
      let formData = objectToFormData(params);
      try {
        const response = await apiSimpleExamModel.updateParagraphImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ItemImageUpdate");
          this.$emit("getDetails", this.itemToken);
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
    async updateTrueFalseQuestionImage() {
      this.isLoading = true;
      let params = {
        trueFalseQuestionToken: this.itemToken,
        mediaFile: this.mediaFile,
      };
      let formData = objectToFormData(params);
      try {
        const response = await apiSimpleExamModel.updateTrueFalseQuestionImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ItemImageUpdate");
          this.$emit("getDetails", this.itemToken);
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
    async updateMcqQuestionImage() {
      this.isLoading = true;
      let params = {
        mcqQuestionToken: this.itemToken,
        mediaFile: this.mediaFile,
      };
      let formData = objectToFormData(params);
      try {
        const response = await apiSimpleExamModel.updateMcqQuestionImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ItemImageUpdate");
          this.$emit("getDetails", this.itemToken);
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
    //#endregion update

    //#region delete
    async deleteFile() {
      switch (this.itemType) {
        case "Paragraph":
          this.deleteParagraphImage();
          break;
        case "TrueFalseQuestion":
          this.deleteTrueFalseQuestionImage();
          break;
        case "McqQuestion":
          this.deleteMcqQuestionImage();
          break;

        default:
          break;
      }
    },
    async deleteParagraphImage() {
      this.isLoading = true;
      let params = {
        token: this.itemToken,
      };
      let formData = objectToFormData(params);
      try {
        const response = await apiSimpleExamModel.deleteParagraphImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ItemImageUpdate");
          this.$emit("getDetails", this.itemToken);
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
    async deleteTrueFalseQuestionImage() {
      this.isLoading = true;
      let params = {
        token: this.itemToken,
      };
      let formData = objectToFormData(params);
      try {
        const response = await apiSimpleExamModel.deleteTrueFalseQuestionImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ItemImageUpdate");
          this.$emit("getDetails", this.itemToken);
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
    async deleteMcqQuestionImage() {
      this.isLoading = true;
      let params = {
        token: this.itemToken,
      };
      let formData = objectToFormData(params);
      try {
        const response = await apiSimpleExamModel.deleteMcqQuestionImage(
          formData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ItemImageUpdate");
          this.$emit("getDetails", this.itemToken);
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
    //#endregion delete
  },
};
</script>
