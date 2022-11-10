<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="certificate.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              certificate.certificateImagePath,
              certificate.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !certificate.certificateImageIsDefault &&
            checkPrivilege(hasCertificateDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="certificate.fullCode"
            v-on:changeValue="certificate.fullCode = $event"
            :title="$t('Certificates.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-certificateNameAr`"
            :errors="errors_certificateNameAr"
            :value="certificate.certificateNameAr"
            v-on:changeValue="
              certificate.certificateNameAr = $event;
              $v.certificate.certificateNameAr.$touch();
            "
            :title="$t('Certificates.nameAr')"
            :imgName="'certificates.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-certificateNameEn`"
            :errors="errors_certificateNameEn"
            :value="certificate.certificateNameEn"
            v-on:changeValue="
              certificate.certificateNameEn = $event;
              $v.certificate.certificateNameEn.$touch();
            "
            :title="$t('Certificates.nameEn')"
            :imgName="'certificates.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-certificateNameUnd`"
            :value="certificate.certificateNameUnd"
            v-on:changeValue="certificate.certificateNameUnd = $event"
            :title="$t('Certificates.nameUnd')"
            :imgName="'certificates.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-certificateDescriptionAr`"
            :errors="errors_certificateDescriptionAr"
            :value="certificate.certificateDescriptionAr"
            v-on:changeValue="
              certificate.certificateDescriptionAr = $event;
              $v.certificate.certificateDescriptionAr.$touch();
            "
            :title="$t('Certificates.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-certificateDescriptionEn`"
            :errors="errors_certificateDescriptionEn"
            :value="certificate.certificateDescriptionEn"
            v-on:changeValue="
              certificate.certificateDescriptionEn = $event;
              $v.certificate.certificateDescriptionEn.$touch();
            "
            :title="$t('Certificates.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-certificateDescriptionUnd`"
            :value="certificate.certificateDescriptionUnd"
            v-on:changeValue="certificate.certificateDescriptionUnd = $event"
            :title="$t('Certificates.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-certificateNotes`"
            :value="certificate.certificateNotes"
            v-on:changeValue="certificate.certificateNotes = $event"
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
import { hasCertificateDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    certificate: {
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
    certificate: {
      certificateNameAr: { required, isValidNameAr },
      certificateNameEn: { required, isValidNameEn },
      certificateDescriptionAr: { isValidTextAr },
      certificateDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_certificateNameAr() {
      let errors = [];
      if (this.$v.certificate.certificateNameAr.$error) {
        if (
          !this.$v.certificate.certificateNameAr.required &&
          !this.$v.certificate.certificateNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.certificate.certificateNameAr.required &&
          !this.$v.certificate.certificateNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_certificateNameEn() {
      let errors = [];
      if (this.$v.certificate.certificateNameEn.$error) {
        if (
          !this.$v.certificate.certificateNameAr.required &&
          !this.$v.certificate.certificateNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.certificate.certificateNameEn.required &&
          !this.$v.certificate.certificateNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_certificateDescriptionAr() {
      let errors = [];
      if (this.$v.certificate.certificateDescriptionAr.$error) {
        if (!this.$v.certificate.certificateDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_certificateDescriptionEn() {
      let errors = [];
      if (this.$v.certificate.certificateDescriptionEn.$error) {
        if (!this.$v.certificate.certificateDescriptionEn.isValidTextEn)
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
        ((this.$v.certificate.certificateNameAr.required &&
          this.$v.certificate.certificateNameAr.isValidNameAr) ||
          (this.$v.certificate.certificateNameEn.required &&
            this.$v.certificate.certificateNameEn.isValidNameEn)) &&
        this.$v.certificate.certificateDescriptionAr.isValidTextAr &&
        this.$v.certificate.certificateDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasCertificateDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
