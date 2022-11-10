<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="sharedMediaFolder.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              sharedMediaFolder.sharedMediaFolderImagePath,
              sharedMediaFolder.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !sharedMediaFolder.sharedMediaFolderImageIsDefault &&
            checkPrivilege(hasSharedMediaFolderDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-sharedMediaFolderTypeToken`"
            :value="sharedMediaFolder.sharedMediaFolderTypeToken"
            :options="sharedMediaFolderTypeTokenOptions"
            v-on:changeValue="
              sharedMediaFolder.sharedMediaFolderTypeToken = $event;
              sharedMediaFolder.mainModuleToken = '';
            "
            :title="$t('general.type')"
            :imgName="'type.svg'"
          />
          <CustomSelectBox
            v-if="
              sharedMediaFolder.sharedMediaFolderTypeToken ==
              SHARED_MEDIA_TYPE.EducationalCategory
            "
            :className="'col-md-12'"
            :id="`${id}-educationalCategoryToken`"
            :value="sharedMediaFolder.mainModuleToken"
            :options="educationalCategoryTokenOptions"
            v-on:changeValue="sharedMediaFolder.mainModuleToken = $event"
            :title="$t('EducationalCategories.select')"
            :imgName="'EducationalCategories.svg'"
          />
          <CustomSelectBox
            v-if="
              sharedMediaFolder.sharedMediaFolderTypeToken ==
              SHARED_MEDIA_TYPE.EducationalGroup
            "
            :className="'col-md-12'"
            :id="`${id}-educationalGroupToken`"
            :value="sharedMediaFolder.mainModuleToken"
            :options="educationalGroupTokenOptions"
            v-on:changeValue="sharedMediaFolder.mainModuleToken = $event"
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="sharedMediaFolder.fullCode"
            v-on:changeValue="sharedMediaFolder.fullCode = $event"
            :title="$t('SharedMediaFolders.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-sharedMediaFolderNameAr`"
            :errors="errors_sharedMediaFolderNameAr"
            :value="sharedMediaFolder.sharedMediaFolderNameAr"
            v-on:changeValue="
              sharedMediaFolder.sharedMediaFolderNameAr = $event;
              $v.sharedMediaFolder.sharedMediaFolderNameAr.$touch();
            "
            :title="$t('SharedMediaFolders.titleAr')"
            :imgName="'sharedMediaFolders.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-sharedMediaFolderNameEn`"
            :errors="errors_sharedMediaFolderNameEn"
            :value="sharedMediaFolder.sharedMediaFolderNameEn"
            v-on:changeValue="
              sharedMediaFolder.sharedMediaFolderNameEn = $event;
              $v.sharedMediaFolder.sharedMediaFolderNameEn.$touch();
            "
            :title="$t('SharedMediaFolders.titleEn')"
            :imgName="'sharedMediaFolders.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-sharedMediaFolderNameUnd`"
            :value="sharedMediaFolder.sharedMediaFolderNameUnd"
            v-on:changeValue="
              sharedMediaFolder.sharedMediaFolderNameUnd = $event
            "
            :title="$t('SharedMediaFolders.titleUnd')"
            :imgName="'sharedMediaFolders.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-sharedMediaFolderDescriptionAr`"
            :errors="errors_sharedMediaFolderDescriptionAr"
            :value="sharedMediaFolder.sharedMediaFolderDescriptionAr"
            v-on:changeValue="
              sharedMediaFolder.sharedMediaFolderDescriptionAr = $event;
              $v.sharedMediaFolder.sharedMediaFolderDescriptionAr.$touch();
            "
            :title="$t('SharedMediaFolders.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-sharedMediaFolderDescriptionEn`"
            :errors="errors_sharedMediaFolderDescriptionEn"
            :value="sharedMediaFolder.sharedMediaFolderDescriptionEn"
            v-on:changeValue="
              sharedMediaFolder.sharedMediaFolderDescriptionEn = $event;
              $v.sharedMediaFolder.sharedMediaFolderDescriptionEn.$touch();
            "
            :title="$t('SharedMediaFolders.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-sharedMediaFolderDescriptionUnd`"
            :value="sharedMediaFolder.sharedMediaFolderDescriptionUnd"
            v-on:changeValue="
              sharedMediaFolder.sharedMediaFolderDescriptionUnd = $event
            "
            :title="$t('SharedMediaFolders.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-sharedMediaFolderNotes`"
            :value="sharedMediaFolder.sharedMediaFolderNotes"
            v-on:changeValue="sharedMediaFolder.sharedMediaFolderNotes = $event"
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
  getLanguage,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../utils/functions";

import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../utils/validationHelper";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import { hasSharedMediaFolderDeleteImage } from "./../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../utils/functions";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  getEducationalCategoriesDialog,
  getEducationalGroupsDialog,
} from "./../../../utils/dialogsOfApi";
import PreLoader from "@/components/general/PreLoader.vue";
import {
  SHARED_MEDIA_TYPE,
  TERMINATION_TYPES,
} from "./../../../utils/constantLists";
import { getDialogOfSharedMediaType } from "./../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomFileInput,
    CustomInput,
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      language: getLanguage(),
      isLoading: false,
      SHARED_MEDIA_TYPE,
      sharedMediaFolderTypeTokenOptions: getDialogOfSharedMediaType(),
      educationalCategoryTokenOptions: [],
      educationalGroupTokenOptions: [],
    };
  },
  props: {
    sharedMediaFolder: {
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
    sharedMediaFolder: {
      sharedMediaFolderNameAr: { required, isValidNameAr },
      sharedMediaFolderNameEn: { required, isValidNameEn },
      sharedMediaFolderDescriptionAr: { isValidTextAr },
      sharedMediaFolderDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_placesTokensList() {
      let errors = [];
      if (this.$v.sharedMediaFolder.placesTokensList.$error) {
        if (!this.$v.sharedMediaFolder.placesTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_usersTokensList() {
      let errors = [];
      if (this.$v.sharedMediaFolder.usersTokensList.$error) {
        if (!this.$v.sharedMediaFolder.usersTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalCategoriesTokensList() {
      let errors = [];
      if (this.$v.sharedMediaFolder.educationalCategoriesTokensList.$error) {
        if (!this.$v.sharedMediaFolder.educationalCategoriesTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalGroupsTokensList() {
      let errors = [];
      if (this.$v.sharedMediaFolder.educationalGroupsTokensList.$error) {
        if (!this.$v.sharedMediaFolder.educationalGroupsTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_sharedMediaFolderDateTime() {
      let errors = [];
      if (this.$v.sharedMediaFolder.sharedMediaFolderDateTime.$error) {
        if (!this.$v.sharedMediaFolder.sharedMediaFolderDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_sharedMediaFolderNameAr() {
      let errors = [];
      if (this.$v.sharedMediaFolder.sharedMediaFolderNameAr.$error) {
        if (
          !this.$v.sharedMediaFolder.sharedMediaFolderNameAr.required &&
          !this.$v.sharedMediaFolder.sharedMediaFolderNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.sharedMediaFolder.sharedMediaFolderNameAr.required &&
          !this.$v.sharedMediaFolder.sharedMediaFolderNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_sharedMediaFolderNameEn() {
      let errors = [];
      if (this.$v.sharedMediaFolder.sharedMediaFolderNameEn.$error) {
        if (
          !this.$v.sharedMediaFolder.sharedMediaFolderNameAr.required &&
          !this.$v.sharedMediaFolder.sharedMediaFolderNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.sharedMediaFolder.sharedMediaFolderNameEn.required &&
          !this.$v.sharedMediaFolder.sharedMediaFolderNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_sharedMediaFolderDescriptionAr() {
      let errors = [];
      if (this.$v.sharedMediaFolder.sharedMediaFolderDescriptionAr.$error) {
        if (
          !this.$v.sharedMediaFolder.sharedMediaFolderDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_sharedMediaFolderDescriptionEn() {
      let errors = [];
      if (this.$v.sharedMediaFolder.sharedMediaFolderDescriptionEn.$error) {
        if (
          !this.$v.sharedMediaFolder.sharedMediaFolderDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getEducationalCategoriesDialog() {
      this.isLoading = true;
      this.educationalCategoryTokenOptions =
        await getEducationalCategoriesDialog();
      this.isLoading = false;
    },
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      let params = {
        educationalGroupTerminationTypeToken: TERMINATION_TYPES.NotFinished,
      };
      this.educationalGroupTokenOptions = await getEducationalGroupsDialog(
        params
      );
      this.isLoading = false;
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.sharedMediaFolder.sharedMediaFolderNameAr.required &&
          this.$v.sharedMediaFolder.sharedMediaFolderNameAr.isValidNameAr) ||
          (this.$v.sharedMediaFolder.sharedMediaFolderNameEn.required &&
            this.$v.sharedMediaFolder.sharedMediaFolderNameEn.isValidNameEn)) &&
        this.$v.sharedMediaFolder.sharedMediaFolderDescriptionAr
          .isValidTextAr &&
        this.$v.sharedMediaFolder.sharedMediaFolderDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasSharedMediaFolderDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getEducationalCategoriesDialog();
    this.getEducationalGroupsDialog();
  },
};
</script>
