<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="qualification.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              qualification.qualificationImagePath,
              qualification.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !qualification.qualificationImageIsDefault &&
            checkPrivilege(hasQualificationDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="qualification.fullCode"
            v-on:changeValue="qualification.fullCode = $event"
            :title="$t('Qualifications.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-qualificationNameAr`"
            :errors="errors_qualificationNameAr"
            :value="qualification.qualificationNameAr"
            v-on:changeValue="
              qualification.qualificationNameAr = $event;
              $v.qualification.qualificationNameAr.$touch();
            "
            :title="$t('Qualifications.nameAr')"
            :imgName="'qualifications.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-qualificationNameEn`"
            :errors="errors_qualificationNameEn"
            :value="qualification.qualificationNameEn"
            v-on:changeValue="
              qualification.qualificationNameEn = $event;
              $v.qualification.qualificationNameEn.$touch();
            "
            :title="$t('Qualifications.nameEn')"
            :imgName="'qualifications.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-qualificationNameUnd`"
            :value="qualification.qualificationNameUnd"
            v-on:changeValue="qualification.qualificationNameUnd = $event"
            :title="$t('Qualifications.nameUnd')"
            :imgName="'qualifications.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-qualificationDescriptionAr`"
            :errors="errors_qualificationDescriptionAr"
            :value="qualification.qualificationDescriptionAr"
            v-on:changeValue="
              qualification.qualificationDescriptionAr = $event;
              $v.qualification.qualificationDescriptionAr.$touch();
            "
            :title="$t('Qualifications.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-qualificationDescriptionEn`"
            :errors="errors_qualificationDescriptionEn"
            :value="qualification.qualificationDescriptionEn"
            v-on:changeValue="
              qualification.qualificationDescriptionEn = $event;
              $v.qualification.qualificationDescriptionEn.$touch();
            "
            :title="$t('Qualifications.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-qualificationDescriptionUnd`"
            :value="qualification.qualificationDescriptionUnd"
            v-on:changeValue="
              qualification.qualificationDescriptionUnd = $event
            "
            :title="$t('Qualifications.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-qualificationNotes`"
            :value="qualification.qualificationNotes"
            v-on:changeValue="qualification.qualificationNotes = $event"
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
import { hasQualificationDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    qualification: {
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
    qualification: {
      qualificationNameAr: { required, isValidNameAr },
      qualificationNameEn: { required, isValidNameEn },
      qualificationDescriptionAr: { isValidTextAr },
      qualificationDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_qualificationNameAr() {
      let errors = [];
      if (this.$v.qualification.qualificationNameAr.$error) {
        if (
          !this.$v.qualification.qualificationNameAr.required &&
          !this.$v.qualification.qualificationNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.qualification.qualificationNameAr.required &&
          !this.$v.qualification.qualificationNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_qualificationNameEn() {
      let errors = [];
      if (this.$v.qualification.qualificationNameEn.$error) {
        if (
          !this.$v.qualification.qualificationNameAr.required &&
          !this.$v.qualification.qualificationNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.qualification.qualificationNameEn.required &&
          !this.$v.qualification.qualificationNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_qualificationDescriptionAr() {
      let errors = [];
      if (this.$v.qualification.qualificationDescriptionAr.$error) {
        if (!this.$v.qualification.qualificationDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_qualificationDescriptionEn() {
      let errors = [];
      if (this.$v.qualification.qualificationDescriptionEn.$error) {
        if (!this.$v.qualification.qualificationDescriptionEn.isValidTextEn)
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
        ((this.$v.qualification.qualificationNameAr.required &&
          this.$v.qualification.qualificationNameAr.isValidNameAr) ||
          (this.$v.qualification.qualificationNameEn.required &&
            this.$v.qualification.qualificationNameEn.isValidNameEn)) &&
        this.$v.qualification.qualificationDescriptionAr.isValidTextAr &&
        this.$v.qualification.qualificationDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasQualificationDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
