<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="bank.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(bank.bankImagePath, bank.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !bank.bankImageIsDefault &&
            checkPrivilege(hasBankDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="bank.fullCode"
            v-on:changeValue="bank.fullCode = $event"
            :title="$t('Banks.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bankNameAr`"
            :errors="errors_bankNameAr"
            :value="bank.bankNameAr"
            v-on:changeValue="
              bank.bankNameAr = $event;
              $v.bank.bankNameAr.$touch();
            "
            :title="$t('Banks.nameAr')"
            :imgName="'banks.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bankNameEn`"
            :errors="errors_bankNameEn"
            :value="bank.bankNameEn"
            v-on:changeValue="
              bank.bankNameEn = $event;
              $v.bank.bankNameEn.$touch();
            "
            :title="$t('Banks.nameEn')"
            :imgName="'banks.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-bankNameUnd`"
            :value="bank.bankNameUnd"
            v-on:changeValue="bank.bankNameUnd = $event"
            :title="$t('Banks.nameUnd')"
            :imgName="'banks.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bankDescriptionAr`"
            :errors="errors_bankDescriptionAr"
            :value="bank.bankDescriptionAr"
            v-on:changeValue="
              bank.bankDescriptionAr = $event;
              $v.bank.bankDescriptionAr.$touch();
            "
            :title="$t('Banks.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bankDescriptionEn`"
            :errors="errors_bankDescriptionEn"
            :value="bank.bankDescriptionEn"
            v-on:changeValue="
              bank.bankDescriptionEn = $event;
              $v.bank.bankDescriptionEn.$touch();
            "
            :title="$t('Banks.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bankDescriptionUnd`"
            :value="bank.bankDescriptionUnd"
            v-on:changeValue="bank.bankDescriptionUnd = $event"
            :title="$t('Banks.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-bankNotes`"
            :value="bank.bankNotes"
            v-on:changeValue="bank.bankNotes = $event"
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
import { hasBankDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    bank: {
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
    bank: {
      bankNameAr: { required, isValidNameAr },
      bankNameEn: { required, isValidNameEn },
      bankDescriptionAr: { isValidTextAr },
      bankDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_bankNameAr() {
      let errors = [];
      if (this.$v.bank.bankNameAr.$error) {
        if (
          !this.$v.bank.bankNameAr.required &&
          !this.$v.bank.bankNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.bank.bankNameAr.required &&
          !this.$v.bank.bankNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_bankNameEn() {
      let errors = [];
      if (this.$v.bank.bankNameEn.$error) {
        if (
          !this.$v.bank.bankNameAr.required &&
          !this.$v.bank.bankNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.bank.bankNameEn.required &&
          !this.$v.bank.bankNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_bankDescriptionAr() {
      let errors = [];
      if (this.$v.bank.bankDescriptionAr.$error) {
        if (!this.$v.bank.bankDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_bankDescriptionEn() {
      let errors = [];
      if (this.$v.bank.bankDescriptionEn.$error) {
        if (!this.$v.bank.bankDescriptionEn.isValidTextEn)
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
        ((this.$v.bank.bankNameAr.required &&
          this.$v.bank.bankNameAr.isValidNameAr) ||
          (this.$v.bank.bankNameEn.required &&
            this.$v.bank.bankNameEn.isValidNameEn)) &&
        this.$v.bank.bankDescriptionAr.isValidTextAr &&
        this.$v.bank.bankDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasBankDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
