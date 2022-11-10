<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="storageSpace.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              storageSpace.storageSpaceImagePath,
              storageSpace.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !storageSpace.storageSpaceImageIsDefault &&
            hasStorageDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            v-if="usersStatus"
            :className="'col-md-12'"
            :id="`${id}-userToken`"
            :errors="errors_mainToken"
            :value="storageSpace.mainToken"
            :options="userTokenOptions"
            v-on:changeValue="storageSpace.mainToken = $event"
            :title="$t('Users.select')"
            :imgName="'users.svg'"
          />

          <CustomSelectBox
            v-if="placesStatus"
            :className="'col-md-12'"
            :id="`${id}-placeToken`"
            :errors="errors_mainToken"
            :value="storageSpace.mainToken"
            :options="placeTokenOptions"
            v-on:changeValue="storageSpace.mainToken = $event"
            :title="$t('Places.select')"
            :imgName="'places.svg'"
          />
          <CustomSelectBox
            v-if="educationalGroupsStatus"
            :className="'col-md-12'"
            :id="`${id}-educationalGroupToken`"
            :errors="errors_mainToken"
            :value="storageSpace.mainToken"
            :options="educationalGroupTokenOptions"
            v-on:changeValue="storageSpace.mainToken = $event"
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
          />
          <!-- <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-storageSpaceParentToken`"
            :value="storageSpace.storageSpaceParentToken"
            :options="storageSpaceTokenOptions"
            v-on:changeValue="storageSpace.storageSpaceParentToken = $event"
            :title="$t('StorageSpaces.select')"
            :imgName="'StorageSpaces.svg'"
          /> -->

          <CustomSelectBox
            :className="'col-md-12'"
            :id="`storageSpaceShowStatusTypeToken`"
            :errors="errors_storageSpaceShowStatusTypeToken"
            :value="storageSpace.storageSpaceShowStatusTypeToken"
            :options="showStatusTokenOptions"
            v-on:changeValue="
              storageSpace.storageSpaceShowStatusTypeToken = $event;
              $v.storageSpace.storageSpaceShowStatusTypeToken.$touch();
            "
            :title="$t('general.showStatus')"
            :imgName="'type.svg'"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="storageSpace.fullCode"
            v-on:changeValue="storageSpace.fullCode = $event"
            :title="$t('StorageSpaces.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storageSpaceNameAr`"
            :errors="errors_storageSpaceNameAr"
            :value="storageSpace.storageSpaceNameAr"
            v-on:changeValue="
              storageSpace.storageSpaceNameAr = $event;
              $v.storageSpace.storageSpaceNameAr.$touch();
            "
            :title="$t('StorageSpaces.nameAr')"
            :imgName="'StorageSpaces.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storageSpaceNameEn`"
            :errors="errors_storageSpaceNameEn"
            :value="storageSpace.storageSpaceNameEn"
            v-on:changeValue="
              storageSpace.storageSpaceNameEn = $event;
              $v.storageSpace.storageSpaceNameEn.$touch();
            "
            :title="$t('StorageSpaces.nameEn')"
            :imgName="'StorageSpaces.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-storageSpaceNameUnd`"
            :value="storageSpace.storageSpaceNameUnd"
            v-on:changeValue="storageSpace.storageSpaceNameUnd = $event"
            :title="$t('StorageSpaces.nameUnd')"
            :imgName="'StorageSpaces.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storageSpaceDescriptionAr`"
            :errors="errors_storageSpaceDescriptionAr"
            :value="storageSpace.storageSpaceDescriptionAr"
            v-on:changeValue="
              storageSpace.storageSpaceDescriptionAr = $event;
              $v.storageSpace.storageSpaceDescriptionAr.$touch();
            "
            :title="$t('StorageSpaces.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storageSpaceDescriptionEn`"
            :errors="errors_storageSpaceDescriptionEn"
            :value="storageSpace.storageSpaceDescriptionEn"
            v-on:changeValue="
              storageSpace.storageSpaceDescriptionEn = $event;
              $v.storageSpace.storageSpaceDescriptionEn.$touch();
            "
            :title="$t('StorageSpaces.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storageSpaceDescriptionUnd`"
            :value="storageSpace.storageSpaceDescriptionUnd"
            v-on:changeValue="storageSpace.storageSpaceDescriptionUnd = $event"
            :title="$t('StorageSpaces.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-storageSpaceNotes`"
            :value="storageSpace.storageSpaceNotes"
            v-on:changeValue="storageSpace.storageSpaceNotes = $event"
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
import { STORAGE_SPACE_TYPE } from "./../../../utils/constantLists";
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
  getUsersDialog,
  getPlacesDialog,
  getEducationalGroupsDialog,
  getStorageSpacesDialog,
} from "./../../../utils/dialogsOfApi";
import { getDialogOfShowType } from "./../../../utils/dialogsOfConstantsLists";
import {
  hasStorageSpaceAdminsEgyptDeleteImage,
  hasStorageSpaceMasterAdminDeleteImage,
  hasStorageSpaceEmployeeDeleteImage,
  hasStorageSpaceStudentDeleteImage,
  hasStorageSpaceSupplierDeleteImage,
  hasStorageSpaceParentDeleteImage,
  hasStorageSpaceClientDeleteImage,
  hasStorageSpaceEducationalGroupDeleteImage,
  // ## place ##
  hasStorageSpacePlaceMasterAdminDeleteImage,
  hasStorageSpacePlaceEmployeeDeleteImage,
  hasStorageSpacePlaceStudentDeleteImage,
  hasStorageSpacePlaceSupplierDeleteImage,
  hasStorageSpacePlaceParentDeleteImage,
  hasStorageSpacePlaceClientDeleteImage,
  hasStorageSpacePlaceOtherDeleteImage,
} from "./../../../utils/privilegeHelper";
import { USER_TYPE, PLACE_TYPE_TOKENS } from "./../../../utils/constantLists";
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
      storageSpaceTypeToken: this.$route.meta.storageSpaceTypeToken,
      userTypeToken: this.$route.meta.userTypeToken,
      userTokenOptions: [],
      placeTokenOptions: [],
      educationalGroupTokenOptions: [],
      storageSpaceTokenOptions: [],
      usersStatus: false,
      placesStatus: false,
      educationalGroupsStatus: false,
      showStatusTokenOptions: getDialogOfShowType(),
    };
  },
  props: {
    storageSpace: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  validations: {
    storageSpace: {
      mainToken: { required },
      storageSpaceShowStatusTypeToken: { required },
      storageSpaceNameAr: { required, isValidNameAr },
      storageSpaceNameEn: { required, isValidNameEn },
      storageSpaceDescriptionAr: { isValidTextAr },
      storageSpaceDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    placeTypeToken() {
      let placeTypeToken = "";
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          placeTypeToken = PLACE_TYPE_TOKENS.AdminsEgypt;
          break;
        case USER_TYPE.MasterAdmin:
          placeTypeToken = PLACE_TYPE_TOKENS.MasterAdmin;
          break;
        case USER_TYPE.Employee:
          placeTypeToken = PLACE_TYPE_TOKENS.Employee;
          break;
        case USER_TYPE.Student:
          placeTypeToken = PLACE_TYPE_TOKENS.Student;
          break;
        case USER_TYPE.Supplier:
          placeTypeToken = PLACE_TYPE_TOKENS.Supplier;
          break;
        case USER_TYPE.Parent:
          placeTypeToken = PLACE_TYPE_TOKENS.Parent;
          break;
        case USER_TYPE.Client:
          placeTypeToken = PLACE_TYPE_TOKENS.Client;
          break;

        default:
          placeTypeToken = PLACE_TYPE_TOKENS.Other;
          break;
      }
      return placeTypeToken;
    },
    errors_mainToken() {
      let errors = [];
      if (this.$v.storageSpace.mainToken.$error) {
        if (!this.$v.storageSpace.mainToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_storageSpaceShowStatusTypeToken() {
      let errors = [];
      if (this.$v.storageSpace.storageSpaceShowStatusTypeToken.$error) {
        if (!this.$v.storageSpace.storageSpaceShowStatusTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_storageSpaceNameAr() {
      let errors = [];
      if (this.$v.storageSpace.storageSpaceNameAr.$error) {
        if (
          !this.$v.storageSpace.storageSpaceNameAr.required &&
          !this.$v.storageSpace.storageSpaceNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.storageSpace.storageSpaceNameAr.required &&
          !this.$v.storageSpace.storageSpaceNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_storageSpaceNameEn() {
      let errors = [];
      if (this.$v.storageSpace.storageSpaceNameEn.$error) {
        if (
          !this.$v.storageSpace.storageSpaceNameAr.required &&
          !this.$v.storageSpace.storageSpaceNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.storageSpace.storageSpaceNameEn.required &&
          !this.$v.storageSpace.storageSpaceNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_storageSpaceDescriptionAr() {
      let errors = [];
      if (this.$v.storageSpace.storageSpaceDescriptionAr.$error) {
        if (!this.$v.storageSpace.storageSpaceDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_storageSpaceDescriptionEn() {
      let errors = [];
      if (this.$v.storageSpace.storageSpaceDescriptionEn.$error) {
        if (!this.$v.storageSpace.storageSpaceDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },

    hasStorageDeleteImage() {
      let status = false;
      switch (this.modelName) {
        case "storageSpacesAdminsEgypt":
          status = checkPrivilege(hasStorageSpaceAdminsEgyptDeleteImage());
          break;
        case "storageSpacesMasterAdmin":
          status = checkPrivilege(hasStorageSpaceMasterAdminDeleteImage());
          break;
        case "storageSpacesEmployees":
          status = checkPrivilege(hasStorageSpaceEmployeeDeleteImage());
          break;
        case "storageSpacesStudents":
          status = checkPrivilege(hasStorageSpaceStudentDeleteImage());
          break;
        case "storageSpacesSuppliers":
          status = checkPrivilege(hasStorageSpaceSupplierDeleteImage());
          break;
        case "storageSpacesParents":
          status = checkPrivilege(hasStorageSpaceParentDeleteImage());
          break;
        case "storageSpacesClients":
          status = checkPrivilege(hasStorageSpaceClientDeleteImage());
          break;
        case "storageSpacesEducationalGroup":
          status = checkPrivilege(hasStorageSpaceEducationalGroupDeleteImage());
          break;

        // ## place ##
        case "storageSpacesPlaceMasterAdmin":
          status = checkPrivilege(hasStorageSpacePlaceMasterAdminDeleteImage());
          break;
        case "storageSpacesPlaceEmployees":
          status = checkPrivilege(hasStorageSpacePlaceEmployeeDeleteImage());
          break;
        case "storageSpacesPlaceStudents":
          status = checkPrivilege(hasStorageSpacePlaceStudentDeleteImage());
          break;
        case "storageSpacesPlaceSuppliers":
          status = checkPrivilege(hasStorageSpacePlaceSupplierDeleteImage());
          break;
        case "storageSpacesPlaceParents":
          status = checkPrivilege(hasStorageSpacePlaceParentDeleteImage());
          break;
        case "storageSpacesPlaceClients":
          status = checkPrivilege(hasStorageSpacePlaceClientDeleteImage());
          break;
        case "storageSpacesPlaceOthers":
          status = checkPrivilege(hasStorageSpacePlaceOtherDeleteImage());
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
        this.$v.storageSpace.storageSpaceShowStatusTypeToken.required &&
        ((this.$v.storageSpace.storageSpaceNameAr.required &&
          this.$v.storageSpace.storageSpaceNameAr.isValidNameAr) ||
          (this.$v.storageSpace.storageSpaceNameEn.required &&
            this.$v.storageSpace.storageSpaceNameEn.isValidNameEn)) &&
        this.$v.storageSpace.storageSpaceDescriptionAr.isValidTextAr &&
        this.$v.storageSpace.storageSpaceDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    async getPlacesDialog() {
      this.isLoading = true;
      this.placeTokenOptions = await getPlacesDialog();
      this.isLoading = false;
    },
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog();
      this.isLoading = false;
    },
    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: this.modelName,
        userTypeToken: this.userTypeToken,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getStorageSpacesDialog() {
      this.isLoading = true;
      let params = {
        modelName: this.modelName,
        storageSpaceTypeToken: this.storageSpaceTypeToken,
        mainToken: this.storageSpace.mainToken,
      };
      this.storageSpaceTokenOptions = await getStorageSpacesDialog(params);
      this.isLoading = false;
    },
    changeStatusToFalse() {
      this.usersStatus = false;
      this.placesStatus = false;
    },
    checkModelStatus() {
      this.changeStatusToFalse();
      let storageSpaceTypeToken = this.$route.meta.storageSpaceTypeToken;
      switch (storageSpaceTypeToken) {
        case STORAGE_SPACE_TYPE.AdminsEgypt:
        case STORAGE_SPACE_TYPE.MasterAdmin:
        case STORAGE_SPACE_TYPE.Employee:
        case STORAGE_SPACE_TYPE.Student:
        case STORAGE_SPACE_TYPE.Supplier:
        case STORAGE_SPACE_TYPE.Parent:
        case STORAGE_SPACE_TYPE.Client:
          this.usersStatus = true;
          this.getUsersDialog();
          break;
        case STORAGE_SPACE_TYPE.Place:
          this.placesStatus = true;
          this.getPlacesDialog();
          break;
        case STORAGE_SPACE_TYPE.EducationalGroup:
          this.educationalGroupsStatus = true;
          this.getEducationalGroupsDialog();
          break;
        default:
          break;
      }
    },

    fullPathFileFromServer,
  },
  watch: {
    // "storageSpace.mainToken": function () {
    //   this.getStorageSpacesDialog();
    // },
    $route() {
      this.checkModelStatus();
    },
  },
  async created() {
    this.checkModelStatus();
    await this.getStorageSpacesDialog();
  },
};
</script>
