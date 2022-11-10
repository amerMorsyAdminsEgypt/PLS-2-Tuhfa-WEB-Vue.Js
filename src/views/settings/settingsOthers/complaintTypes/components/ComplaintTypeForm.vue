<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="complaintType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              complaintType.complaintTypeImagePath,
              complaintType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !complaintType.complaintTypeImageIsDefault &&
            checkPrivilege(hasComplaintTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="complaintType.fullCode"
            v-on:changeValue="complaintType.fullCode = $event"
            :title="$t('ComplaintTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintTypeNameAr`"
            :errors="errors_complaintTypeNameAr"
            :value="complaintType.complaintTypeNameAr"
            v-on:changeValue="
              complaintType.complaintTypeNameAr = $event;
              $v.complaintType.complaintTypeNameAr.$touch();
            "
            :title="$t('ComplaintTypes.nameAr')"
            :imgName="'complaintTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintTypeNameEn`"
            :errors="errors_complaintTypeNameEn"
            :value="complaintType.complaintTypeNameEn"
            v-on:changeValue="
              complaintType.complaintTypeNameEn = $event;
              $v.complaintType.complaintTypeNameEn.$touch();
            "
            :title="$t('ComplaintTypes.nameEn')"
            :imgName="'complaintTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintTypeNameUnd`"
            :value="complaintType.complaintTypeNameUnd"
            v-on:changeValue="complaintType.complaintTypeNameUnd = $event"
            :title="$t('ComplaintTypes.nameUnd')"
            :imgName="'complaintTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintTypeDescriptionAr`"
            :errors="errors_complaintTypeDescriptionAr"
            :value="complaintType.complaintTypeDescriptionAr"
            v-on:changeValue="
              complaintType.complaintTypeDescriptionAr = $event;
              $v.complaintType.complaintTypeDescriptionAr.$touch();
            "
            :title="$t('ComplaintTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintTypeDescriptionEn`"
            :errors="errors_complaintTypeDescriptionEn"
            :value="complaintType.complaintTypeDescriptionEn"
            v-on:changeValue="
              complaintType.complaintTypeDescriptionEn = $event;
              $v.complaintType.complaintTypeDescriptionEn.$touch();
            "
            :title="$t('ComplaintTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintTypeDescriptionUnd`"
            :value="complaintType.complaintTypeDescriptionUnd"
            v-on:changeValue="
              complaintType.complaintTypeDescriptionUnd = $event
            "
            :title="$t('ComplaintTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintTypeNotes`"
            :value="complaintType.complaintTypeNotes"
            v-on:changeValue="complaintType.complaintTypeNotes = $event"
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
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasComplaintTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    complaintType: {
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
    complaintType: {
      complaintTypeNameAr: { required, isValidNameAr },
      complaintTypeNameEn: { required, isValidNameEn },
      complaintTypeDescriptionAr: { isValidTextAr },
      complaintTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_complaintTypeNameAr() {
      let errors = [];
      if (this.$v.complaintType.complaintTypeNameAr.$error) {
        if (
          !this.$v.complaintType.complaintTypeNameAr.required &&
          !this.$v.complaintType.complaintTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.complaintType.complaintTypeNameAr.required &&
          !this.$v.complaintType.complaintTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_complaintTypeNameEn() {
      let errors = [];
      if (this.$v.complaintType.complaintTypeNameEn.$error) {
        if (
          !this.$v.complaintType.complaintTypeNameAr.required &&
          !this.$v.complaintType.complaintTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.complaintType.complaintTypeNameEn.required &&
          !this.$v.complaintType.complaintTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_complaintTypeDescriptionAr() {
      let errors = [];
      if (this.$v.complaintType.complaintTypeDescriptionAr.$error) {
        if (!this.$v.complaintType.complaintTypeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_complaintTypeDescriptionEn() {
      let errors = [];
      if (this.$v.complaintType.complaintTypeDescriptionEn.$error) {
        if (!this.$v.complaintType.complaintTypeDescriptionEn.isValidTextEn)
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
        ((this.$v.complaintType.complaintTypeNameAr.required &&
          this.$v.complaintType.complaintTypeNameAr.isValidNameAr) ||
          (this.$v.complaintType.complaintTypeNameEn.required &&
            this.$v.complaintType.complaintTypeNameEn.isValidNameEn)) &&
        this.$v.complaintType.complaintTypeDescriptionAr.isValidTextAr &&
        this.$v.complaintType.complaintTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasComplaintTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
