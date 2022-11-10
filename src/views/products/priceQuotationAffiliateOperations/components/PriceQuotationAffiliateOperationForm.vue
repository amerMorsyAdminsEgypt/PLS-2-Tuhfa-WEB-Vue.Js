<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :title="$t('PriceQuotationAffiliateOperations.mediaFile')"
          :className="'col-6'"
          @changeValue="
            priceQuotationAffiliateOperation.mediaFile = $event.file
          "
          :defaultImg="
            fullPathFileFromServer(
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationImagePath,
              priceQuotationAffiliateOperation.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !priceQuotationAffiliateOperation.priceQuotationAffiliateOperationImageIsDefault &&
            checkPrivilege(hasPriceQuotationAffiliateOperationDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
        <CustomFileInput
          :title="$t('PriceQuotationAffiliateOperations.designFile')"
          :className="'col-6'"
          @changeValue="
            priceQuotationAffiliateOperation.designFile = $event.file
          "
          :defaultImg="
            fullPathFileFromServer(
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationFilePath,
              priceQuotationAffiliateOperation.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !priceQuotationAffiliateOperation.priceQuotationAffiliateOperationFileIsDefault &&
            checkPrivilege(hasPriceQuotationAffiliateOperationDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="priceQuotationAffiliateOperation.fullCode"
            v-on:changeValue="
              priceQuotationAffiliateOperation.fullCode = $event
            "
            :title="$t('PriceQuotationAffiliateOperations.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priceQuotationAffiliateOperationTitleAr`"
            :errors="errors_priceQuotationAffiliateOperationTitleAr"
            :value="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleAr
            "
            v-on:changeValue="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleAr =
                $event;
              $v.priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleAr.$touch();
            "
            :title="$t('PriceQuotationAffiliateOperations.titleAr')"
            :imgName="'PriceQuotationAffiliateOperations.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priceQuotationAffiliateOperationTitleEn`"
            :errors="errors_priceQuotationAffiliateOperationTitleEn"
            :value="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleEn
            "
            v-on:changeValue="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleEn =
                $event;
              $v.priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleEn.$touch();
            "
            :title="$t('PriceQuotationAffiliateOperations.titleEn')"
            :imgName="'PriceQuotationAffiliateOperations.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-priceQuotationAffiliateOperationTitleUnd`"
            :value="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleUnd
            "
            v-on:changeValue="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleUnd =
                $event
            "
            :title="$t('PriceQuotationAffiliateOperations.titleUnd')"
            :imgName="'PriceQuotationAffiliateOperations.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceQuotationAffiliateOperationDescriptionAr`"
            :errors="errors_priceQuotationAffiliateOperationDescriptionAr"
            :value="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionAr
            "
            v-on:changeValue="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionAr =
                $event;
              $v.priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionAr.$touch();
            "
            :title="$t('PriceQuotationAffiliateOperations.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceQuotationAffiliateOperationDescriptionEn`"
            :errors="errors_priceQuotationAffiliateOperationDescriptionEn"
            :value="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionEn
            "
            v-on:changeValue="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionEn =
                $event;
              $v.priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionEn.$touch();
            "
            :title="$t('PriceQuotationAffiliateOperations.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceQuotationAffiliateOperationDescriptionUnd`"
            :value="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionUnd
            "
            v-on:changeValue="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationDescriptionUnd =
                $event
            "
            :title="$t('PriceQuotationAffiliateOperations.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-priceQuotationAffiliateOperationNotes`"
            :value="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationNotes
            "
            v-on:changeValue="
              priceQuotationAffiliateOperation.priceQuotationAffiliateOperationNotes =
                $event
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
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasPriceQuotationAffiliateOperationDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
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
    priceQuotationAffiliateOperation: {
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
    priceQuotationAffiliateOperation: {
      priceQuotationAffiliateOperationTitleAr: { required, isValidNameAr },
      priceQuotationAffiliateOperationTitleEn: { required, isValidNameEn },
      priceQuotationAffiliateOperationDescriptionAr: { isValidTextAr },
      priceQuotationAffiliateOperationDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_priceQuotationAffiliateOperationTitleAr() {
      let errors = [];
      if (
        this.$v.priceQuotationAffiliateOperation
          .priceQuotationAffiliateOperationTitleAr.$error
      ) {
        if (
          !this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleAr.required &&
          !this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleAr.required &&
          !this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_priceQuotationAffiliateOperationTitleEn() {
      let errors = [];
      if (
        this.$v.priceQuotationAffiliateOperation
          .priceQuotationAffiliateOperationTitleEn.$error
      ) {
        if (
          !this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleAr.required &&
          !this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleEn.required &&
          !this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_priceQuotationAffiliateOperationDescriptionAr() {
      let errors = [];
      if (
        this.$v.priceQuotationAffiliateOperation
          .priceQuotationAffiliateOperationDescriptionAr.$error
      ) {
        if (
          !this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_priceQuotationAffiliateOperationDescriptionEn() {
      let errors = [];
      if (
        this.$v.priceQuotationAffiliateOperation
          .priceQuotationAffiliateOperationDescriptionEn.$error
      ) {
        if (
          !this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationDescriptionEn.isValidTextEn
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
        ((this.$v.priceQuotationAffiliateOperation
          .priceQuotationAffiliateOperationTitleAr.required &&
          this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleAr.isValidNameAr) ||
          (this.$v.priceQuotationAffiliateOperation
            .priceQuotationAffiliateOperationTitleEn.required &&
            this.$v.priceQuotationAffiliateOperation
              .priceQuotationAffiliateOperationTitleEn.isValidNameEn)) &&
        this.$v.priceQuotationAffiliateOperation
          .priceQuotationAffiliateOperationDescriptionAr.isValidTextAr &&
        this.$v.priceQuotationAffiliateOperation
          .priceQuotationAffiliateOperationDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasPriceQuotationAffiliateOperationDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
