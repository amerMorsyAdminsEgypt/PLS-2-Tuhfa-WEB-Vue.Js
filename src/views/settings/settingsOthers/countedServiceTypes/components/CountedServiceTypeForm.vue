<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="countedServiceType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              countedServiceType.countedServiceTypeImagePath,
              countedServiceType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !countedServiceType.countedServiceTypeImageIsDefault &&
            checkPrivilege(hasCountedServiceTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="countedServiceType.fullCode"
            v-on:changeValue="countedServiceType.fullCode = $event"
            :title="$t('CountedServiceTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-countedServiceTypeNameAr`"
            :errors="errors_countedServiceTypeNameAr"
            :value="countedServiceType.countedServiceTypeNameAr"
            v-on:changeValue="
              countedServiceType.countedServiceTypeNameAr = $event;
              $v.countedServiceType.countedServiceTypeNameAr.$touch();
            "
            :title="$t('CountedServiceTypes.nameAr')"
            :imgName="'countedServiceTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-countedServiceTypeNameEn`"
            :errors="errors_countedServiceTypeNameEn"
            :value="countedServiceType.countedServiceTypeNameEn"
            v-on:changeValue="
              countedServiceType.countedServiceTypeNameEn = $event;
              $v.countedServiceType.countedServiceTypeNameEn.$touch();
            "
            :title="$t('CountedServiceTypes.nameEn')"
            :imgName="'countedServiceTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-countedServiceTypeNameUnd`"
            :value="countedServiceType.countedServiceTypeNameUnd"
            v-on:changeValue="
              countedServiceType.countedServiceTypeNameUnd = $event
            "
            :title="$t('CountedServiceTypes.nameUnd')"
            :imgName="'countedServiceTypes.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceTypeDescriptionAr`"
            :errors="errors_countedServiceTypeDescriptionAr"
            :value="countedServiceType.countedServiceTypeDescriptionAr"
            v-on:changeValue="
              countedServiceType.countedServiceTypeDescriptionAr = $event;
              $v.countedServiceType.countedServiceTypeDescriptionAr.$touch();
            "
            :title="$t('CountedServiceTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceTypeDescriptionEn`"
            :errors="errors_countedServiceTypeDescriptionEn"
            :value="countedServiceType.countedServiceTypeDescriptionEn"
            v-on:changeValue="
              countedServiceType.countedServiceTypeDescriptionEn = $event;
              $v.countedServiceType.countedServiceTypeDescriptionEn.$touch();
            "
            :title="$t('CountedServiceTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceTypeDescriptionUnd`"
            :value="countedServiceType.countedServiceTypeDescriptionUnd"
            v-on:changeValue="
              countedServiceType.countedServiceTypeDescriptionUnd = $event
            "
            :title="$t('CountedServiceTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-countedServiceTypeNotes`"
            :value="countedServiceType.countedServiceTypeNotes"
            v-on:changeValue="
              countedServiceType.countedServiceTypeNotes = $event
            "
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
import { hasCountedServiceTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    countedServiceType: {
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
    countedServiceType: {
      countedServiceTypeNameAr: { required, isValidNameAr },
      countedServiceTypeNameEn: { required, isValidNameEn },
      countedServiceTypeDescriptionAr: { isValidTextAr },
      countedServiceTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_countedServiceTypeNameAr() {
      let errors = [];
      if (this.$v.countedServiceType.countedServiceTypeNameAr.$error) {
        if (
          !this.$v.countedServiceType.countedServiceTypeNameAr.required &&
          !this.$v.countedServiceType.countedServiceTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.countedServiceType.countedServiceTypeNameAr.required &&
          !this.$v.countedServiceType.countedServiceTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_countedServiceTypeNameEn() {
      let errors = [];
      if (this.$v.countedServiceType.countedServiceTypeNameEn.$error) {
        if (
          !this.$v.countedServiceType.countedServiceTypeNameAr.required &&
          !this.$v.countedServiceType.countedServiceTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.countedServiceType.countedServiceTypeNameEn.required &&
          !this.$v.countedServiceType.countedServiceTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_countedServiceTypeDescriptionAr() {
      let errors = [];
      if (this.$v.countedServiceType.countedServiceTypeDescriptionAr.$error) {
        if (
          !this.$v.countedServiceType.countedServiceTypeDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_countedServiceTypeDescriptionEn() {
      let errors = [];
      if (this.$v.countedServiceType.countedServiceTypeDescriptionEn.$error) {
        if (
          !this.$v.countedServiceType.countedServiceTypeDescriptionEn
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
        ((this.$v.countedServiceType.countedServiceTypeNameAr.required &&
          this.$v.countedServiceType.countedServiceTypeNameAr.isValidNameAr) ||
          (this.$v.countedServiceType.countedServiceTypeNameEn.required &&
            this.$v.countedServiceType.countedServiceTypeNameEn
              .isValidNameEn)) &&
        this.$v.countedServiceType.countedServiceTypeDescriptionAr
          .isValidTextAr &&
        this.$v.countedServiceType.countedServiceTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasCountedServiceTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
