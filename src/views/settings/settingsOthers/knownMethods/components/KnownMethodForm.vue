<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="knownMethod.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              knownMethod.knownMethodImagePath,
              knownMethod.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !knownMethod.knownMethodImageIsDefault &&
            checkPrivilege(hasKnownMethodDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="knownMethod.fullCode"
            v-on:changeValue="knownMethod.fullCode = $event"
            :title="$t('KnownMethods.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-knownMethodNameAr`"
            :errors="errors_knownMethodNameAr"
            :value="knownMethod.knownMethodNameAr"
            v-on:changeValue="
              knownMethod.knownMethodNameAr = $event;
              $v.knownMethod.knownMethodNameAr.$touch();
            "
            :title="$t('KnownMethods.nameAr')"
            :imgName="'knownMethods.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-knownMethodNameEn`"
            :errors="errors_knownMethodNameEn"
            :value="knownMethod.knownMethodNameEn"
            v-on:changeValue="
              knownMethod.knownMethodNameEn = $event;
              $v.knownMethod.knownMethodNameEn.$touch();
            "
            :title="$t('KnownMethods.nameEn')"
            :imgName="'knownMethods.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-knownMethodNameUnd`"
            :value="knownMethod.knownMethodNameUnd"
            v-on:changeValue="knownMethod.knownMethodNameUnd = $event"
            :title="$t('KnownMethods.nameUnd')"
            :imgName="'knownMethods.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-knownMethodDescriptionAr`"
            :errors="errors_knownMethodDescriptionAr"
            :value="knownMethod.knownMethodDescriptionAr"
            v-on:changeValue="
              knownMethod.knownMethodDescriptionAr = $event;
              $v.knownMethod.knownMethodDescriptionAr.$touch();
            "
            :title="$t('KnownMethods.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-knownMethodDescriptionEn`"
            :errors="errors_knownMethodDescriptionEn"
            :value="knownMethod.knownMethodDescriptionEn"
            v-on:changeValue="
              knownMethod.knownMethodDescriptionEn = $event;
              $v.knownMethod.knownMethodDescriptionEn.$touch();
            "
            :title="$t('KnownMethods.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-knownMethodDescriptionUnd`"
            :value="knownMethod.knownMethodDescriptionUnd"
            v-on:changeValue="knownMethod.knownMethodDescriptionUnd = $event"
            :title="$t('KnownMethods.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-knownMethodNotes`"
            :value="knownMethod.knownMethodNotes"
            v-on:changeValue="knownMethod.knownMethodNotes = $event"
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
import { hasKnownMethodDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    knownMethod: {
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
    knownMethod: {
      knownMethodNameAr: { required, isValidNameAr },
      knownMethodNameEn: { required, isValidNameEn },
      knownMethodDescriptionAr: { isValidTextAr },
      knownMethodDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_knownMethodNameAr() {
      let errors = [];
      if (this.$v.knownMethod.knownMethodNameAr.$error) {
        if (
          !this.$v.knownMethod.knownMethodNameAr.required &&
          !this.$v.knownMethod.knownMethodNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.knownMethod.knownMethodNameAr.required &&
          !this.$v.knownMethod.knownMethodNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_knownMethodNameEn() {
      let errors = [];
      if (this.$v.knownMethod.knownMethodNameEn.$error) {
        if (
          !this.$v.knownMethod.knownMethodNameAr.required &&
          !this.$v.knownMethod.knownMethodNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.knownMethod.knownMethodNameEn.required &&
          !this.$v.knownMethod.knownMethodNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_knownMethodDescriptionAr() {
      let errors = [];
      if (this.$v.knownMethod.knownMethodDescriptionAr.$error) {
        if (!this.$v.knownMethod.knownMethodDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_knownMethodDescriptionEn() {
      let errors = [];
      if (this.$v.knownMethod.knownMethodDescriptionEn.$error) {
        if (!this.$v.knownMethod.knownMethodDescriptionEn.isValidTextEn)
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
        ((this.$v.knownMethod.knownMethodNameAr.required &&
          this.$v.knownMethod.knownMethodNameAr.isValidNameAr) ||
          (this.$v.knownMethod.knownMethodNameEn.required &&
            this.$v.knownMethod.knownMethodNameEn.isValidNameEn)) &&
        this.$v.knownMethod.knownMethodDescriptionAr.isValidTextAr &&
        this.$v.knownMethod.knownMethodDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasKnownMethodDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
