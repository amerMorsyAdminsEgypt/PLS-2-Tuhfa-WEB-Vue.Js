<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="insuranceCompany.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              insuranceCompany.insuranceCompanyImagePath,
              insuranceCompany.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !insuranceCompany.insuranceCompanyImageIsDefault &&
            checkPrivilege(hasInsuranceCompanyDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="insuranceCompany.fullCode"
            v-on:changeValue="insuranceCompany.fullCode = $event"
            :title="$t('InsuranceCompanies.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-insuranceCompanyNameAr`"
            :errors="errors_insuranceCompanyNameAr"
            :value="insuranceCompany.insuranceCompanyNameAr"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyNameAr = $event;
              $v.insuranceCompany.insuranceCompanyNameAr.$touch();
            "
            :title="$t('InsuranceCompanies.nameAr')"
            :imgName="'insuranceCompanies.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-insuranceCompanyNameEn`"
            :errors="errors_insuranceCompanyNameEn"
            :value="insuranceCompany.insuranceCompanyNameEn"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyNameEn = $event;
              $v.insuranceCompany.insuranceCompanyNameEn.$touch();
            "
            :title="$t('InsuranceCompanies.nameEn')"
            :imgName="'insuranceCompanies.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-insuranceCompanyNameUnd`"
            :value="insuranceCompany.insuranceCompanyNameUnd"
            v-on:changeValue="insuranceCompany.insuranceCompanyNameUnd = $event"
            :title="$t('InsuranceCompanies.nameUnd')"
            :imgName="'insuranceCompanies.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-insuranceCompanyDescriptionAr`"
            :errors="errors_insuranceCompanyDescriptionAr"
            :value="insuranceCompany.insuranceCompanyDescriptionAr"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyDescriptionAr = $event;
              $v.insuranceCompany.insuranceCompanyDescriptionAr.$touch();
            "
            :title="$t('InsuranceCompanies.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-insuranceCompanyDescriptionEn`"
            :errors="errors_insuranceCompanyDescriptionEn"
            :value="insuranceCompany.insuranceCompanyDescriptionEn"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyDescriptionEn = $event;
              $v.insuranceCompany.insuranceCompanyDescriptionEn.$touch();
            "
            :title="$t('InsuranceCompanies.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-insuranceCompanyDescriptionUnd`"
            :value="insuranceCompany.insuranceCompanyDescriptionUnd"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyDescriptionUnd = $event
            "
            :title="$t('InsuranceCompanies.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyAddressAr'"
            :value="insuranceCompany.insuranceCompanyAddressAr"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyAddressAr = $event
            "
            :title="$t('InsuranceCompanies.addressAr')"
            :imgName="'address.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyAddressEn'"
            :value="insuranceCompany.insuranceCompanyAddressEn"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyAddressEn = $event
            "
            :title="$t('InsuranceCompanies.addressEn')"
            :imgName="'address.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="'insuranceCompanyAddressUnd'"
            :value="insuranceCompany.insuranceCompanyAddressUnd"
            v-on:changeValue="
              insuranceCompany.insuranceCompanyAddressUnd = $event
            "
            :title="$t('InsuranceCompanies.addressUnd')"
            :imgName="'address.svg'"
          />
          <CustomPhonePicker
            :className="'col-md-6'"
            :id="'phone'"
            :countryCodeName="insuranceCompany.insuranceCompanyCountryCodeName"
            :countryCode="insuranceCompany.insuranceCompanyCountryCode"
            :phoneNumber="insuranceCompany.insuranceCompanyPhone"
            :title="$t('InsuranceCompanies.phone')"
            :imgName="'phone.svg'"
            v-on:changeValue="setPhone($event)"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-insuranceCompanyNotes`"
            :value="insuranceCompany.insuranceCompanyNotes"
            v-on:changeValue="insuranceCompany.insuranceCompanyNotes = $event"
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
import CustomPhonePicker from "./../../../../../components/general/CustomPhonePicker.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasInsuranceCompanyDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomPhonePicker,
    CustomInput,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    insuranceCompany: {
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
    insuranceCompany: {
      insuranceCompanyNameAr: { required, isValidNameAr },
      insuranceCompanyNameEn: { required, isValidNameEn },
      insuranceCompanyDescriptionAr: { isValidTextAr },
      insuranceCompanyDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_insuranceCompanyNameAr() {
      let errors = [];
      if (this.$v.insuranceCompany.insuranceCompanyNameAr.$error) {
        if (
          !this.$v.insuranceCompany.insuranceCompanyNameAr.required &&
          !this.$v.insuranceCompany.insuranceCompanyNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.insuranceCompany.insuranceCompanyNameAr.required &&
          !this.$v.insuranceCompany.insuranceCompanyNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_insuranceCompanyNameEn() {
      let errors = [];
      if (this.$v.insuranceCompany.insuranceCompanyNameEn.$error) {
        if (
          !this.$v.insuranceCompany.insuranceCompanyNameAr.required &&
          !this.$v.insuranceCompany.insuranceCompanyNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.insuranceCompany.insuranceCompanyNameEn.required &&
          !this.$v.insuranceCompany.insuranceCompanyNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_insuranceCompanyDescriptionAr() {
      let errors = [];
      if (this.$v.insuranceCompany.insuranceCompanyDescriptionAr.$error) {
        if (
          !this.$v.insuranceCompany.insuranceCompanyDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_insuranceCompanyDescriptionEn() {
      let errors = [];
      if (this.$v.insuranceCompany.insuranceCompanyDescriptionEn.$error) {
        if (
          !this.$v.insuranceCompany.insuranceCompanyDescriptionEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    setPhone(data) {
      this.insuranceCompany.insuranceCompanyCountryCodeName =
        data.countryCodeName;
      this.insuranceCompany.insuranceCompanyCountryCode = data.countryCode;
      this.insuranceCompany.insuranceCompanyPhone = data.phoneNumber;
      this.insuranceCompany.insuranceCompanyPhoneWithCC = data.CCWithCCName;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.insuranceCompany.insuranceCompanyNameAr.required &&
          this.$v.insuranceCompany.insuranceCompanyNameAr.isValidNameAr) ||
          (this.$v.insuranceCompany.insuranceCompanyNameEn.required &&
            this.$v.insuranceCompany.insuranceCompanyNameEn.isValidNameEn)) &&
        this.$v.insuranceCompany.insuranceCompanyDescriptionAr.isValidTextAr &&
        this.$v.insuranceCompany.insuranceCompanyDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasInsuranceCompanyDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
