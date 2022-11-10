<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="educationalPeriod.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              educationalPeriod.educationalPeriodImagePath,
              educationalPeriod.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !educationalPeriod.educationalPeriodImageIsDefault &&
            checkPrivilege(hasEducationalPeriodDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="educationalPeriod.fullCode"
            v-on:changeValue="educationalPeriod.fullCode = $event"
            :title="$t('EducationalPeriods.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalPeriodNameAr`"
            :errors="errors_educationalPeriodNameAr"
            :value="educationalPeriod.educationalPeriodNameAr"
            v-on:changeValue="
              educationalPeriod.educationalPeriodNameAr = $event;
              $v.educationalPeriod.educationalPeriodNameAr.$touch();
            "
            :title="$t('EducationalPeriods.nameAr')"
            :imgName="'educationalPeriods.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalPeriodNameEn`"
            :errors="errors_educationalPeriodNameEn"
            :value="educationalPeriod.educationalPeriodNameEn"
            v-on:changeValue="
              educationalPeriod.educationalPeriodNameEn = $event;
              $v.educationalPeriod.educationalPeriodNameEn.$touch();
            "
            :title="$t('EducationalPeriods.nameEn')"
            :imgName="'educationalPeriods.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-educationalPeriodNameUnd`"
            :value="educationalPeriod.educationalPeriodNameUnd"
            v-on:changeValue="
              educationalPeriod.educationalPeriodNameUnd = $event
            "
            :title="$t('EducationalPeriods.nameUnd')"
            :imgName="'educationalPeriods.svg'"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-educationalPeriodStartDateTime`"
            type="dateTime"
            :value="educationalPeriod.educationalPeriodStartDateTime"
            :errors="errors_educationalPeriodStartDateTime"
            :title="$t('dateTimeStart')"
            v-on:changeValue="
              educationalPeriod.educationalPeriodStartDateTime =
                $event.dateTime;
              $v.educationalPeriod.educationalPeriodStartDateTime.$touch();
            "
            :language="language"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-educationalPeriodEndDateTime`"
            type="dateTime"
            :value="educationalPeriod.educationalPeriodEndDateTime"
            :errors="errors_educationalPeriodEndDateTime"
            :title="$t('dateTimeEnd')"
            v-on:changeValue="
              educationalPeriod.educationalPeriodEndDateTime = $event.dateTime;
              $v.educationalPeriod.educationalPeriodEndDateTime.$touch();
            "
            :language="language"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalPeriodDescriptionAr`"
            :errors="errors_educationalPeriodDescriptionAr"
            :value="educationalPeriod.educationalPeriodDescriptionAr"
            v-on:changeValue="
              educationalPeriod.educationalPeriodDescriptionAr = $event;
              $v.educationalPeriod.educationalPeriodDescriptionAr.$touch();
            "
            :title="$t('EducationalPeriods.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalPeriodDescriptionEn`"
            :errors="errors_educationalPeriodDescriptionEn"
            :value="educationalPeriod.educationalPeriodDescriptionEn"
            v-on:changeValue="
              educationalPeriod.educationalPeriodDescriptionEn = $event;
              $v.educationalPeriod.educationalPeriodDescriptionEn.$touch();
            "
            :title="$t('EducationalPeriods.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalPeriodDescriptionUnd`"
            :value="educationalPeriod.educationalPeriodDescriptionUnd"
            v-on:changeValue="
              educationalPeriod.educationalPeriodDescriptionUnd = $event
            "
            :title="$t('EducationalPeriods.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-educationalPeriodNotes`"
            :value="educationalPeriod.educationalPeriodNotes"
            v-on:changeValue="educationalPeriod.educationalPeriodNotes = $event"
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
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasEducationalPeriodDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    DateTimePicker,
    CustomInput,
    TextArea,
  },
  data() {
    return {
      language: getLanguage(),
    };
  },
  props: {
    educationalPeriod: {
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
    educationalPeriod: {
      educationalPeriodNameAr: { required, isValidNameAr },
      educationalPeriodNameEn: { required, isValidNameEn },
      educationalPeriodStartDateTime: { required },
      educationalPeriodEndDateTime: { required },
      educationalPeriodDescriptionAr: { isValidTextAr },
      educationalPeriodDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_educationalPeriodNameAr() {
      let errors = [];
      if (this.$v.educationalPeriod.educationalPeriodNameAr.$error) {
        if (
          !this.$v.educationalPeriod.educationalPeriodNameAr.required &&
          !this.$v.educationalPeriod.educationalPeriodNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalPeriod.educationalPeriodNameAr.required &&
          !this.$v.educationalPeriod.educationalPeriodNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalPeriodNameEn() {
      let errors = [];
      if (this.$v.educationalPeriod.educationalPeriodNameEn.$error) {
        if (
          !this.$v.educationalPeriod.educationalPeriodNameAr.required &&
          !this.$v.educationalPeriod.educationalPeriodNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.educationalPeriod.educationalPeriodNameEn.required &&
          !this.$v.educationalPeriod.educationalPeriodNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_educationalPeriodStartDateTime() {
      let errors = [];
      if (this.$v.educationalPeriod.educationalPeriodStartDateTime.$error) {
        if (!this.$v.educationalPeriod.educationalPeriodStartDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalPeriodEndDateTime() {
      let errors = [];
      if (this.$v.educationalPeriod.educationalPeriodEndDateTime.$error) {
        if (!this.$v.educationalPeriod.educationalPeriodEndDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalPeriodDescriptionAr() {
      let errors = [];
      if (this.$v.educationalPeriod.educationalPeriodDescriptionAr.$error) {
        if (
          !this.$v.educationalPeriod.educationalPeriodDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_educationalPeriodDescriptionEn() {
      let errors = [];
      if (this.$v.educationalPeriod.educationalPeriodDescriptionEn.$error) {
        if (
          !this.$v.educationalPeriod.educationalPeriodDescriptionEn
            .isValidTextEn
        )
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
        ((this.$v.educationalPeriod.educationalPeriodNameAr.required &&
          this.$v.educationalPeriod.educationalPeriodNameAr.isValidNameAr) ||
          (this.$v.educationalPeriod.educationalPeriodNameEn.required &&
            this.$v.educationalPeriod.educationalPeriodNameEn.isValidNameEn)) &&
        this.$v.educationalPeriod.educationalPeriodDescriptionAr
          .isValidTextAr &&
        this.$v.educationalPeriod.educationalPeriodStartDateTime.required &&
        this.$v.educationalPeriod.educationalPeriodEndDateTime.required &&
        this.$v.educationalPeriod.educationalPeriodDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasEducationalPeriodDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
