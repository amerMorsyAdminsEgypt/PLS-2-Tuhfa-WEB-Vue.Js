<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :defaultImg="
            fullPathFileFromServer(
              storageSpaceMedia.storageSpaceMediaFilePath,
              storageSpaceMedia.defaultImg
            )
          "
          @changeValue="storageSpaceMedia.mediaFile = $event.file"
          :className="'col-12'"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`storageSpaceMediaFileShowStatusTypeToken`"
            :errors="errors_storageSpaceMediaFileShowStatusTypeToken"
            :value="storageSpaceMedia.storageSpaceMediaFileShowStatusTypeToken"
            :options="showStatusTokenOptions"
            v-on:changeValue="
              storageSpaceMedia.storageSpaceMediaFileShowStatusTypeToken =
                $event;
              $v.storageSpaceMedia.storageSpaceMediaFileShowStatusTypeToken.$touch();
            "
            :title="$t('general.showStatus')"
            :imgName="'type.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="storageSpaceMedia.fullCode"
            v-on:changeValue="storageSpaceMedia.fullCode = $event"
            :title="$t('StorageSpaces.media.code')"
            :imgName="'code.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storageSpaceMediaNameAr`"
            :errors="errors_storageSpaceMediaNameAr"
            :value="storageSpaceMedia.storageSpaceMediaNameAr"
            v-on:changeValue="
              storageSpaceMedia.storageSpaceMediaNameAr = $event;
              $v.storageSpaceMedia.storageSpaceMediaNameAr.$touch();
            "
            :title="$t('StorageSpaces.media.nameAr')"
            :imgName="'media.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storageSpaceMediaNameEn`"
            :errors="errors_storageSpaceMediaNameEn"
            :value="storageSpaceMedia.storageSpaceMediaNameEn"
            v-on:changeValue="
              storageSpaceMedia.storageSpaceMediaNameEn = $event;
              $v.storageSpaceMedia.storageSpaceMediaNameEn.$touch();
            "
            :title="$t('StorageSpaces.media.nameEn')"
            :imgName="'media.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storageSpaceMediaNameUnd`"
            :value="storageSpaceMedia.storageSpaceMediaNameUnd"
            v-on:changeValue="
              storageSpaceMedia.storageSpaceMediaNameUnd = $event
            "
            :title="$t('StorageSpaces.media.nameUnd')"
            :imgName="'media.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storageSpaceMediaDescriptionAr`"
            :errors="errors_storageSpaceMediaDescriptionAr"
            :value="storageSpaceMedia.storageSpaceMediaDescriptionAr"
            v-on:changeValue="
              storageSpaceMedia.storageSpaceMediaDescriptionAr = $event;
              $v.storageSpaceMedia.storageSpaceMediaDescriptionAr.$touch();
            "
            :title="$t('StorageSpaces.media.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storageSpaceMediaDescriptionEn`"
            :errors="errors_storageSpaceMediaDescriptionEn"
            :value="storageSpaceMedia.storageSpaceMediaDescriptionEn"
            v-on:changeValue="
              storageSpaceMedia.storageSpaceMediaDescriptionEn = $event;
              $v.storageSpaceMedia.storageSpaceMediaDescriptionEn.$touch();
            "
            :title="$t('StorageSpaces.media.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storageSpaceMediaDescriptionUnd`"
            :value="storageSpaceMedia.storageSpaceMediaDescriptionUnd"
            v-on:changeValue="
              storageSpaceMedia.storageSpaceMediaDescriptionUnd = $event
            "
            :title="$t('StorageSpaces.media.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storageSpaceMediaNotes`"
            :value="storageSpaceMedia.storageSpaceMediaNotes"
            v-on:changeValue="storageSpaceMedia.storageSpaceMediaNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
  checkPrivilege,
} from "./../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../utils/validationHelper";
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import {
  hasStorageSpaceMediaAdminsEgyptDeleteImage,
  hasStorageSpaceMediaMasterAdminDeleteImage,
  hasStorageSpaceMediaEmployeeDeleteImage,
  hasStorageSpaceMediaStudentDeleteImage,
  hasStorageSpaceMediaSupplierDeleteImage,
  hasStorageSpaceMediaParentDeleteImage,
  hasStorageSpaceMediaClientDeleteImage,
  hasStorageSpaceMediaEducationalGroupDeleteImage,
  // ## place ##
  hasStorageSpaceMediaPlaceMasterAdminDeleteImage,
  hasStorageSpaceMediaPlaceEmployeeDeleteImage,
  hasStorageSpaceMediaPlaceStudentDeleteImage,
  hasStorageSpaceMediaPlaceSupplierDeleteImage,
  hasStorageSpaceMediaPlaceParentDeleteImage,
  hasStorageSpaceMediaPlaceClientDeleteImage,
  hasStorageSpaceMediaPlaceOtherDeleteImage,
} from "./../../../utils/privilegeHelper";
import { getDialogOfShowType } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomFileInput,
    CustomInput,
    TextArea,
    CustomSelectBox,
  },
  data() {
    return {
      modelName: this.$route.meta.modelName,
      storageSpaceMediaTypeToken: this.$route.meta.storageSpaceMediaTypeToken,
      userTypeToken: this.$route.meta.userTypeToken,
      userTokenOptions: [],
      placeTokenOptions: [],
      storageSpaceMediaTokenOptions: [],
      showStatusTokenOptions: getDialogOfShowType(),
    };
  },
  props: {
    storageSpaceMedia: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  validations: {
    storageSpaceMedia: {
      mainToken: { required },
      storageSpaceMediaFileShowStatusTypeToken: { required },
      storageSpaceMediaNameAr: { required, isValidNameAr },
      storageSpaceMediaNameEn: { required, isValidNameEn },
      storageSpaceMediaDescriptionAr: { isValidTextAr },
      storageSpaceMediaDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_mainToken() {
      let errors = [];
      if (this.$v.storageSpaceMedia.mainToken.$error) {
        if (!this.$v.storageSpaceMedia.mainToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_storageSpaceMediaFileShowStatusTypeToken() {
      let errors = [];
      if (
        this.$v.storageSpaceMedia.storageSpaceMediaFileShowStatusTypeToken
          .$error
      ) {
        if (
          !this.$v.storageSpaceMedia.storageSpaceMediaFileShowStatusTypeToken
            .required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_storageSpaceMediaNameAr() {
      let errors = [];
      if (this.$v.storageSpaceMedia.storageSpaceMediaNameAr.$error) {
        if (
          !this.$v.storageSpaceMedia.storageSpaceMediaNameAr.required &&
          !this.$v.storageSpaceMedia.storageSpaceMediaNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.storageSpaceMedia.storageSpaceMediaNameAr.required &&
          !this.$v.storageSpaceMedia.storageSpaceMediaNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_storageSpaceMediaNameEn() {
      let errors = [];
      if (this.$v.storageSpaceMedia.storageSpaceMediaNameEn.$error) {
        if (
          !this.$v.storageSpaceMedia.storageSpaceMediaNameAr.required &&
          !this.$v.storageSpaceMedia.storageSpaceMediaNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.storageSpaceMedia.storageSpaceMediaNameEn.required &&
          !this.$v.storageSpaceMedia.storageSpaceMediaNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_storageSpaceMediaDescriptionAr() {
      let errors = [];
      if (this.$v.storageSpaceMedia.storageSpaceMediaDescriptionAr.$error) {
        if (
          !this.$v.storageSpaceMedia.storageSpaceMediaDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_storageSpaceMediaDescriptionEn() {
      let errors = [];
      if (this.$v.storageSpaceMedia.storageSpaceMediaDescriptionEn.$error) {
        if (
          !this.$v.storageSpaceMedia.storageSpaceMediaDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },

    hasStorageDeleteImage() {
      let status = false;
      switch (this.modelName) {
        case "storageSpaceMediasAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceMediaAdminsEgyptDeleteImage());
          break;
        case "storageSpaceMediasMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMediaMasterAdminDeleteImage());
          break;
        case "storageSpaceMediasEmployees":
          status = checkPrivilege(hasStorageSpaceMediaEmployeeDeleteImage());
          break;
        case "storageSpaceMediasStudents":
          status = checkPrivilege(hasStorageSpaceMediaStudentDeleteImage());
          break;
        case "storageSpaceMediasSuppliers":
          status = checkPrivilege(hasStorageSpaceMediaSupplierDeleteImage());
          break;
        case "storageSpaceMediasParents":
          status = checkPrivilege(hasStorageSpaceMediaParentDeleteImage());
          break;
        case "storageSpaceMediasClients":
          status = checkPrivilege(hasStorageSpaceMediaClientDeleteImage());
          break;
        case "storageSpaceMediasEducationalGroup":
          status = checkPrivilege(
            hasStorageSpaceMediaEducationalGroupDeleteImage()
          );
          break;
        // ## place ##
        case "storageSpaceMediasPlaceMasterAdmin":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceMasterAdminDeleteImage()
          );
          break;
        case "storageSpaceMediasPlaceEmployees":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceEmployeeDeleteImage()
          );
          break;
        case "storageSpaceMediasPlaceStudents":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceStudentDeleteImage()
          );
          break;
        case "storageSpaceMediasPlaceSuppliers":
          status = checkPrivilege(
            hasStorageSpaceMediaPlaceSupplierDeleteImage()
          );
          break;
        case "storageSpaceMediasPlaceParents":
          status = checkPrivilege(hasStorageSpaceMediaPlaceParentDeleteImage());
          break;
        case "storageSpaceMediasPlaceClients":
          status = checkPrivilege(hasStorageSpaceMediaPlaceClientDeleteImage());
          break;
        case "storageSpaceMediasPlaceOthers":
          status = checkPrivilege(hasStorageSpaceMediaPlaceOtherDeleteImage());
          break;
        default:
          break;
      }
      return status;
    },
  },
  methods: {
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.storageSpaceMedia.storageSpaceMediaFileShowStatusTypeToken
          .required &&
        ((this.$v.storageSpaceMedia.storageSpaceMediaNameAr.required &&
          this.$v.storageSpaceMedia.storageSpaceMediaNameAr.isValidNameAr) ||
          (this.$v.storageSpaceMedia.storageSpaceMediaNameEn.required &&
            this.$v.storageSpaceMedia.storageSpaceMediaNameEn.isValidNameEn)) &&
        this.$v.storageSpaceMedia.storageSpaceMediaDescriptionAr
          .isValidTextAr &&
        this.$v.storageSpaceMedia.storageSpaceMediaDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    fullPathFileFromServer,
  },
};
</script>
