<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="MediaPackageAdd"
      size="xl"
      :headerText="$t('MediaPackages.add')"
      :headerIcon="mediaPackage.icon"
      :clickToClose="false"
      :swipeAble="false"
      @opened="mediaPackage.setInitialValue()"
    >
      <MediaPackageForm
        v-if="!isLoading"
        id="add"
        :mediaPackage="mediaPackage"
        v-on:submitForm="addMediaPackage()"
        bottomSheetName="MediaPackageAdd"
        :submitName="$t('add')"
      />
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="MediaPackageAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import MediaPackageForm from "./MediaPackageForm.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiMediaPackage from "./../../../api/mediaPackage";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    ConfirmClearData,
    MediaPackageForm,
  },
  props: ["mediaPackage"],
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
  },
  methods: {
    async addMediaPackage() {
      this.isLoading = true;
      let mediaPackageMediaData = this.mediaPackage.mediaPackageMediaData.map(
        function (i) {
          return {
            sharedMediaToken: i.sharedMediaToken,
            sharedMediaIsFreeStatus: i.sharedMediaIsFreeStatus,
          };
        }
      );
      let formObject = {
        userAuthorizeToken: this.userAuthorizeToken,
        fullCode: this.mediaPackage.fullCode,
        mediaPackageNameEn: this.mediaPackage.mediaPackageNameEn,
        mediaPackageNameAr: this.mediaPackage.mediaPackageNameAr,
        mediaPackageNameUnd: this.mediaPackage.mediaPackageNameUnd,
        mediaPackageDescriptionAr: this.mediaPackage.mediaPackageDescriptionAr,
        mediaPackageDescriptionEn: this.mediaPackage.mediaPackageDescriptionEn,
        mediaPackageDescriptionUnd:
          this.mediaPackage.mediaPackageDescriptionUnd,
        mediaPackageNotes: this.mediaPackage.mediaPackageNotes,
        educationalCategoryToken: this.mediaPackage.educationalCategoryToken,
        accountToken: this.mediaPackage.accountToken,
        mediaPackageShowStatusTypeToken:
          this.mediaPackage.mediaPackageShowStatusTypeToken,
        mediaPackageFinance: this.mediaPackage.mediaPackageFinance,
        mediaPackageLicenceData: this.mediaPackage.mediaPackageLicenceData,
        mediaPackageMediaData: mediaPackageMediaData,
      };
      let formData = objectToFormData(formObject);
      try {
        const response = await apiMediaPackage.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-MediaPackageAdd");
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
          this.mediaPackage.setInitialValue();
          break;
        case "leave":
          this.mediaPackage.setInitialValue();
          this.closeBottomSheet("MediaPackageAdd");
          break;
      }
    },
  },
};
</script>
