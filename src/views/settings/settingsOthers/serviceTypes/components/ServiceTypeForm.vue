<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="serviceType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              serviceType.serviceTypeImagePath,
              serviceType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !serviceType.serviceTypeImageIsDefault &&
            checkPrivilege(hasServiceTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="serviceType.fullCode"
            v-on:changeValue="serviceType.fullCode = $event"
            :title="$t('ServiceTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-serviceTypeNameAr`"
            :errors="errors_serviceTypeNameAr"
            :value="serviceType.serviceTypeNameAr"
            v-on:changeValue="
              serviceType.serviceTypeNameAr = $event;
              $v.serviceType.serviceTypeNameAr.$touch();
            "
            :title="$t('ServiceTypes.nameAr')"
            :imgName="'serviceTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-serviceTypeNameEn`"
            :errors="errors_serviceTypeNameEn"
            :value="serviceType.serviceTypeNameEn"
            v-on:changeValue="
              serviceType.serviceTypeNameEn = $event;
              $v.serviceType.serviceTypeNameEn.$touch();
            "
            :title="$t('ServiceTypes.nameEn')"
            :imgName="'serviceTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-serviceTypeNameUnd`"
            :value="serviceType.serviceTypeNameUnd"
            v-on:changeValue="serviceType.serviceTypeNameUnd = $event"
            :title="$t('ServiceTypes.nameUnd')"
            :imgName="'serviceTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-serviceTypeDescriptionAr`"
            :errors="errors_serviceTypeDescriptionAr"
            :value="serviceType.serviceTypeDescriptionAr"
            v-on:changeValue="
              serviceType.serviceTypeDescriptionAr = $event;
              $v.serviceType.serviceTypeDescriptionAr.$touch();
            "
            :title="$t('ServiceTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-serviceTypeDescriptionEn`"
            :errors="errors_serviceTypeDescriptionEn"
            :value="serviceType.serviceTypeDescriptionEn"
            v-on:changeValue="
              serviceType.serviceTypeDescriptionEn = $event;
              $v.serviceType.serviceTypeDescriptionEn.$touch();
            "
            :title="$t('ServiceTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-serviceTypeDescriptionUnd`"
            :value="serviceType.serviceTypeDescriptionUnd"
            v-on:changeValue="serviceType.serviceTypeDescriptionUnd = $event"
            :title="$t('ServiceTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-serviceTypeNotes`"
            :value="serviceType.serviceTypeNotes"
            v-on:changeValue="serviceType.serviceTypeNotes = $event"
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
import { hasServiceTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    serviceType: {
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
    serviceType: {
      serviceTypeNameAr: { required, isValidNameAr },
      serviceTypeNameEn: { required, isValidNameEn },
      serviceTypeDescriptionAr: { isValidTextAr },
      serviceTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_serviceTypeNameAr() {
      let errors = [];
      if (this.$v.serviceType.serviceTypeNameAr.$error) {
        if (
          !this.$v.serviceType.serviceTypeNameAr.required &&
          !this.$v.serviceType.serviceTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.serviceType.serviceTypeNameAr.required &&
          !this.$v.serviceType.serviceTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_serviceTypeNameEn() {
      let errors = [];
      if (this.$v.serviceType.serviceTypeNameEn.$error) {
        if (
          !this.$v.serviceType.serviceTypeNameAr.required &&
          !this.$v.serviceType.serviceTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.serviceType.serviceTypeNameEn.required &&
          !this.$v.serviceType.serviceTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_serviceTypeDescriptionAr() {
      let errors = [];
      if (this.$v.serviceType.serviceTypeDescriptionAr.$error) {
        if (!this.$v.serviceType.serviceTypeDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_serviceTypeDescriptionEn() {
      let errors = [];
      if (this.$v.serviceType.serviceTypeDescriptionEn.$error) {
        if (!this.$v.serviceType.serviceTypeDescriptionEn.isValidTextEn)
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
        ((this.$v.serviceType.serviceTypeNameAr.required &&
          this.$v.serviceType.serviceTypeNameAr.isValidNameAr) ||
          (this.$v.serviceType.serviceTypeNameEn.required &&
            this.$v.serviceType.serviceTypeNameEn.isValidNameEn)) &&
        this.$v.serviceType.serviceTypeDescriptionAr.isValidTextAr &&
        this.$v.serviceType.serviceTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasServiceTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
