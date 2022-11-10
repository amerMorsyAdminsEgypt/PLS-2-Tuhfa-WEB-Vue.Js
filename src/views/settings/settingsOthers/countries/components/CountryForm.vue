<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="country.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(country.countryImagePath, country.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !country.countryImageIsDefault &&
            checkPrivilege(hasCountryDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="country.fullCode"
            v-on:changeValue="country.fullCode = $event"
            :title="$t('Countries.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-nationalityNameAr`"
            :errors="errors_nationalityNameAr"
            :value="country.nationalityNameAr"
            v-on:changeValue="
              country.nationalityNameAr = $event;
              $v.country.nationalityNameAr.$touch();
            "
            :title="$t('Countries.nameAr')"
            :imgName="'countries.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-nationalityNameEn`"
            :errors="errors_nationalityNameEn"
            :value="country.nationalityNameEn"
            v-on:changeValue="
              country.nationalityNameEn = $event;
              $v.country.nationalityNameEn.$touch();
            "
            :title="$t('Countries.nameEn')"
            :imgName="'countries.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-nationalityNameUnd`"
            :value="country.nationalityNameUnd"
            v-on:changeValue="country.nationalityNameUnd = $event"
            :title="$t('Countries.nameUnd')"
            :imgName="'countries.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countryDescriptionAr`"
            :errors="errors_countryDescriptionAr"
            :value="country.countryDescriptionAr"
            v-on:changeValue="
              country.countryDescriptionAr = $event;
              $v.country.countryDescriptionAr.$touch();
            "
            :title="$t('Countries.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countryDescriptionEn`"
            :errors="errors_countryDescriptionEn"
            :value="country.countryDescriptionEn"
            v-on:changeValue="
              country.countryDescriptionEn = $event;
              $v.country.countryDescriptionEn.$touch();
            "
            :title="$t('Countries.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countryDescriptionUnd`"
            :value="country.countryDescriptionUnd"
            v-on:changeValue="country.countryDescriptionUnd = $event"
            :title="$t('Countries.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countryNotes`"
            :value="country.countryNotes"
            v-on:changeValue="country.countryNotes = $event"
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
import { hasCountryDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    country: {
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
    country: {
      nationalityNameAr: { required, isValidNameAr },
      nationalityNameEn: { required, isValidNameEn },
      countryDescriptionAr: { isValidTextAr },
      countryDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_nationalityNameAr() {
      let errors = [];
      if (this.$v.country.nationalityNameAr.$error) {
        if (
          !this.$v.country.nationalityNameAr.required &&
          !this.$v.country.nationalityNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.country.nationalityNameAr.required &&
          !this.$v.country.nationalityNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_nationalityNameEn() {
      let errors = [];
      if (this.$v.country.nationalityNameEn.$error) {
        if (
          !this.$v.country.nationalityNameAr.required &&
          !this.$v.country.nationalityNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.country.nationalityNameEn.required &&
          !this.$v.country.nationalityNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_countryDescriptionAr() {
      let errors = [];
      if (this.$v.country.countryDescriptionAr.$error) {
        if (!this.$v.country.countryDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_countryDescriptionEn() {
      let errors = [];
      if (this.$v.country.countryDescriptionEn.$error) {
        if (!this.$v.country.countryDescriptionEn.isValidTextEn)
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
        ((this.$v.country.nationalityNameAr.required &&
          this.$v.country.nationalityNameAr.isValidNameAr) ||
          (this.$v.country.nationalityNameEn.required &&
            this.$v.country.nationalityNameEn.isValidNameEn)) &&
        this.$v.country.countryDescriptionAr.isValidTextAr &&
        this.$v.country.countryDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasCountryDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
