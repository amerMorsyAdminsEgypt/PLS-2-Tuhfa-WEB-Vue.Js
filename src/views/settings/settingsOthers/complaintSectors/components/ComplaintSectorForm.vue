<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="complaintSector.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              complaintSector.complaintSectorImagePath,
              complaintSector.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !complaintSector.complaintSectorImageIsDefault &&
            checkPrivilege(hasComplaintSectorDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBoxMultiple
            :className="'col-md-6'"
            :id="`${id}-complaintScopeTypeTokens`"
            :errors="errors_complaintScopeTypeTokens"
            :value="complaintSector.complaintScopeTypeTokens"
            :options="complaintScopeTypeTokensOptions"
            v-on:changeValue="
              complaintSector.complaintScopeTypeTokens = $event;
              $v.complaintSector.complaintScopeTypeTokens.$touch();
            "
            :title="$t('ComplaintTypes.complaintScopeType')"
            :imgName="'complaintTypes.svg'"
            :returnArrayOfObjects="false"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="complaintSector.fullCode"
            v-on:changeValue="complaintSector.fullCode = $event"
            :title="$t('ComplaintSectors.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintSectorNameAr`"
            :errors="errors_complaintSectorNameAr"
            :value="complaintSector.complaintSectorNameAr"
            v-on:changeValue="
              complaintSector.complaintSectorNameAr = $event;
              $v.complaintSector.complaintSectorNameAr.$touch();
            "
            :title="$t('ComplaintSectors.nameAr')"
            :imgName="'complaintSectors.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintSectorNameEn`"
            :errors="errors_complaintSectorNameEn"
            :value="complaintSector.complaintSectorNameEn"
            v-on:changeValue="
              complaintSector.complaintSectorNameEn = $event;
              $v.complaintSector.complaintSectorNameEn.$touch();
            "
            :title="$t('ComplaintSectors.nameEn')"
            :imgName="'complaintSectors.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintSectorNameUnd`"
            :value="complaintSector.complaintSectorNameUnd"
            v-on:changeValue="complaintSector.complaintSectorNameUnd = $event"
            :title="$t('ComplaintSectors.nameUnd')"
            :imgName="'complaintSectors.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintSectorDescriptionAr`"
            :errors="errors_complaintSectorDescriptionAr"
            :value="complaintSector.complaintSectorDescriptionAr"
            v-on:changeValue="
              complaintSector.complaintSectorDescriptionAr = $event;
              $v.complaintSector.complaintSectorDescriptionAr.$touch();
            "
            :title="$t('ComplaintSectors.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintSectorDescriptionEn`"
            :errors="errors_complaintSectorDescriptionEn"
            :value="complaintSector.complaintSectorDescriptionEn"
            v-on:changeValue="
              complaintSector.complaintSectorDescriptionEn = $event;
              $v.complaintSector.complaintSectorDescriptionEn.$touch();
            "
            :title="$t('ComplaintSectors.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintSectorDescriptionUnd`"
            :value="complaintSector.complaintSectorDescriptionUnd"
            v-on:changeValue="
              complaintSector.complaintSectorDescriptionUnd = $event
            "
            :title="$t('ComplaintSectors.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-complaintSectorNotes`"
            :value="complaintSector.complaintSectorNotes"
            v-on:changeValue="complaintSector.complaintSectorNotes = $event"
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
} from "./../../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../../utils/validationHelper";
import CustomFileInput from "./../../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import CustomSelectBoxMultiple from "./../../../../../components/general/CustomSelectBoxMultiple.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasComplaintSectorDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getDialogOfComplaintScopeType } from "./../../../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomSelectBoxMultiple,
    TextArea,
  },
  data() {
    return {
      complaintScopeTypeTokensOptions: getDialogOfComplaintScopeType(),
    };
  },
  props: {
    complaintSector: {
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
    complaintSector: {
      complaintScopeTypeTokens: { required },
      complaintSectorNameAr: { required, isValidNameAr },
      complaintSectorNameEn: { required, isValidNameEn },
      complaintSectorDescriptionAr: { isValidTextAr },
      complaintSectorDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_complaintScopeTypeTokens() {
      let errors = [];
      if (this.$v.complaintSector.complaintScopeTypeTokens.$error) {
        if (!this.$v.complaintSector.complaintScopeTypeTokens.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_complaintSectorNameAr() {
      let errors = [];
      if (this.$v.complaintSector.complaintSectorNameAr.$error) {
        if (
          !this.$v.complaintSector.complaintSectorNameAr.required &&
          !this.$v.complaintSector.complaintSectorNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.complaintSector.complaintSectorNameAr.required &&
          !this.$v.complaintSector.complaintSectorNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_complaintSectorNameEn() {
      let errors = [];
      if (this.$v.complaintSector.complaintSectorNameEn.$error) {
        if (
          !this.$v.complaintSector.complaintSectorNameAr.required &&
          !this.$v.complaintSector.complaintSectorNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.complaintSector.complaintSectorNameEn.required &&
          !this.$v.complaintSector.complaintSectorNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_complaintSectorDescriptionAr() {
      let errors = [];
      if (this.$v.complaintSector.complaintSectorDescriptionAr.$error) {
        if (!this.$v.complaintSector.complaintSectorDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_complaintSectorDescriptionEn() {
      let errors = [];
      if (this.$v.complaintSector.complaintSectorDescriptionEn.$error) {
        if (!this.$v.complaintSector.complaintSectorDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.complaintSector.complaintScopeTypeTokens.required &&
        ((this.$v.complaintSector.complaintSectorNameAr.required &&
          this.$v.complaintSector.complaintSectorNameAr.isValidNameAr) ||
          (this.$v.complaintSector.complaintSectorNameEn.required &&
            this.$v.complaintSector.complaintSectorNameEn.isValidNameEn)) &&
        this.$v.complaintSector.complaintSectorDescriptionAr.isValidTextAr &&
        this.$v.complaintSector.complaintSectorDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasComplaintSectorDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
