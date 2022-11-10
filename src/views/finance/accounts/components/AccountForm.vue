<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="account.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(account.accountImagePath, account.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !account.accountImageIsDefault &&
            checkPrivilege(hasAccountDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="account.fullCode"
            v-on:changeValue="account.fullCode = $event"
            :title="$t('Accounts.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-accountNameAr`"
            :errors="errors_accountNameAr"
            :value="account.accountNameAr"
            v-on:changeValue="
              account.accountNameAr = $event;
              $v.account.accountNameAr.$touch();
            "
            :title="$t('Accounts.nameAr')"
            :imgName="'accounts.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-accountNameEn`"
            :errors="errors_accountNameEn"
            :value="account.accountNameEn"
            v-on:changeValue="
              account.accountNameEn = $event;
              $v.account.accountNameEn.$touch();
            "
            :title="$t('Accounts.nameEn')"
            :imgName="'accounts.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-accountNameUnd`"
            :value="account.accountNameUnd"
            v-on:changeValue="account.accountNameUnd = $event"
            :title="$t('Accounts.nameUnd')"
            :imgName="'accounts.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-accountDescriptionAr`"
            :errors="errors_accountDescriptionAr"
            :value="account.accountDescriptionAr"
            v-on:changeValue="
              account.accountDescriptionAr = $event;
              $v.account.accountDescriptionAr.$touch();
            "
            :title="$t('Accounts.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-accountDescriptionEn`"
            :errors="errors_accountDescriptionEn"
            :value="account.accountDescriptionEn"
            v-on:changeValue="
              account.accountDescriptionEn = $event;
              $v.account.accountDescriptionEn.$touch();
            "
            :title="$t('Accounts.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-accountDescriptionUnd`"
            :value="account.accountDescriptionUnd"
            v-on:changeValue="account.accountDescriptionUnd = $event"
            :title="$t('Accounts.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-accountNotes`"
            :value="account.accountNotes"
            v-on:changeValue="account.accountNotes = $event"
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
import { hasAccountDeleteImage } from "./../../../../utils/privilegeHelper";
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
    account: {
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
    account: {
      accountNameAr: { required, isValidNameAr },
      accountNameEn: { required, isValidNameEn },
      accountDescriptionAr: { isValidTextAr },
      accountDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_accountNameAr() {
      let errors = [];
      if (this.$v.account.accountNameAr.$error) {
        if (
          !this.$v.account.accountNameAr.required &&
          !this.$v.account.accountNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.account.accountNameAr.required &&
          !this.$v.account.accountNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_accountNameEn() {
      let errors = [];
      if (this.$v.account.accountNameEn.$error) {
        if (
          !this.$v.account.accountNameAr.required &&
          !this.$v.account.accountNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.account.accountNameEn.required &&
          !this.$v.account.accountNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_accountDescriptionAr() {
      let errors = [];
      if (this.$v.account.accountDescriptionAr.$error) {
        if (!this.$v.account.accountDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_accountDescriptionEn() {
      let errors = [];
      if (this.$v.account.accountDescriptionEn.$error) {
        if (!this.$v.account.accountDescriptionEn.isValidTextEn)
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
        ((this.$v.account.accountNameAr.required &&
          this.$v.account.accountNameAr.isValidNameAr) ||
          (this.$v.account.accountNameEn.required &&
            this.$v.account.accountNameEn.isValidNameEn)) &&
        this.$v.account.accountDescriptionAr.isValidTextAr &&
        this.$v.account.accountDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasAccountDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
