<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="bloodType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              bloodType.bloodTypeImagePath,
              bloodType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !bloodType.bloodTypeImageIsDefault &&
            checkPrivilege(hasBloodTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="bloodType.fullCode"
            v-on:changeValue="bloodType.fullCode = $event"
            :title="$t('BloodTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bloodTypeNameAr`"
            :errors="errors_bloodTypeNameAr"
            :value="bloodType.bloodTypeNameAr"
            v-on:changeValue="
              bloodType.bloodTypeNameAr = $event;
              $v.bloodType.bloodTypeNameAr.$touch();
            "
            :title="$t('BloodTypes.nameAr')"
            :imgName="'BloodTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bloodTypeNameEn`"
            :errors="errors_bloodTypeNameEn"
            :value="bloodType.bloodTypeNameEn"
            v-on:changeValue="
              bloodType.bloodTypeNameEn = $event;
              $v.bloodType.bloodTypeNameEn.$touch();
            "
            :title="$t('BloodTypes.nameEn')"
            :imgName="'BloodTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bloodTypeNameUnd`"
            :value="bloodType.bloodTypeNameUnd"
            v-on:changeValue="bloodType.bloodTypeNameUnd = $event"
            :title="$t('BloodTypes.nameUnd')"
            :imgName="'BloodTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bloodTypeDescriptionAr`"
            :errors="errors_bloodTypeDescriptionAr"
            :value="bloodType.bloodTypeDescriptionAr"
            v-on:changeValue="
              bloodType.bloodTypeDescriptionAr = $event;
              $v.bloodType.bloodTypeDescriptionAr.$touch();
            "
            :title="$t('BloodTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bloodTypeDescriptionEn`"
            :errors="errors_bloodTypeDescriptionEn"
            :value="bloodType.bloodTypeDescriptionEn"
            v-on:changeValue="
              bloodType.bloodTypeDescriptionEn = $event;
              $v.bloodType.bloodTypeDescriptionEn.$touch();
            "
            :title="$t('BloodTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bloodTypeDescriptionUnd`"
            :value="bloodType.bloodTypeDescriptionUnd"
            v-on:changeValue="bloodType.bloodTypeDescriptionUnd = $event"
            :title="$t('BloodTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bloodTypeNotes`"
            :value="bloodType.bloodTypeNotes"
            v-on:changeValue="bloodType.bloodTypeNotes = $event"
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
  isValidTextAr,
  isValidTextEn,
} from "./../../../../../utils/validationHelper";
import CustomFileInput from "./../../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasBloodTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    bloodType: {
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
    bloodType: {
      bloodTypeNameAr: { required },
      bloodTypeNameEn: { required },
      bloodTypeDescriptionAr: { isValidTextAr },
      bloodTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_bloodTypeNameAr() {
      let errors = [];
      if (this.$v.bloodType.bloodTypeNameAr.$error) {
        if (
          !this.$v.bloodType.bloodTypeNameAr.required &&
          !this.$v.bloodType.bloodTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_bloodTypeNameEn() {
      let errors = [];
      if (this.$v.bloodType.bloodTypeNameEn.$error) {
        if (
          !this.$v.bloodType.bloodTypeNameAr.required &&
          !this.$v.bloodType.bloodTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_bloodTypeDescriptionAr() {
      let errors = [];
      if (this.$v.bloodType.bloodTypeDescriptionAr.$error) {
        if (!this.$v.bloodType.bloodTypeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_bloodTypeDescriptionEn() {
      let errors = [];
      if (this.$v.bloodType.bloodTypeDescriptionEn.$error) {
        if (!this.$v.bloodType.bloodTypeDescriptionEn.isValidTextEn)
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
        (this.$v.bloodType.bloodTypeNameAr.required ||
          this.$v.bloodType.bloodTypeNameEn.required) &&
        this.$v.bloodType.bloodTypeDescriptionAr.isValidTextAr &&
        this.$v.bloodType.bloodTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasBloodTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
