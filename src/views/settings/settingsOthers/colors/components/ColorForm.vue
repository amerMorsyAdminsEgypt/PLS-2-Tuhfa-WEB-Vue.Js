<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="color.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(color.colorImagePath, color.defaultImg)
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !color.colorImageIsDefault &&
            checkPrivilege(hasColorDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="color.fullCode"
            v-on:changeValue="color.fullCode = $event"
            :title="$t('Colors.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-colorNameAr`"
            :errors="errors_colorNameAr"
            :value="color.colorNameAr"
            v-on:changeValue="
              color.colorNameAr = $event;
              $v.color.colorNameAr.$touch();
            "
            :title="$t('Colors.nameAr')"
            :imgName="'colors.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-colorNameEn`"
            :errors="errors_colorNameEn"
            :value="color.colorNameEn"
            v-on:changeValue="
              color.colorNameEn = $event;
              $v.color.colorNameEn.$touch();
            "
            :title="$t('Colors.nameEn')"
            :imgName="'colors.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-colorNameUnd`"
            :value="color.colorNameUnd"
            v-on:changeValue="color.colorNameUnd = $event"
            :title="$t('Colors.nameUnd')"
            :imgName="'colors.svg'"
          />
          <CustomInputColor
            :className="'col-md-6'"
            :id="`${id}-colorHexFromat`"
            :value="color.colorHexFromat"
            v-on:changeValue="color.colorHexFromat = $event"
            :title="$t('Colors.select')"
            :imgName="'colors.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-colorDescriptionAr`"
            :errors="errors_colorDescriptionAr"
            :value="color.colorDescriptionAr"
            v-on:changeValue="
              color.colorDescriptionAr = $event;
              $v.color.colorDescriptionAr.$touch();
            "
            :title="$t('Colors.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-colorDescriptionEn`"
            :errors="errors_colorDescriptionEn"
            :value="color.colorDescriptionEn"
            v-on:changeValue="
              color.colorDescriptionEn = $event;
              $v.color.colorDescriptionEn.$touch();
            "
            :title="$t('Colors.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-colorDescriptionUnd`"
            :value="color.colorDescriptionUnd"
            v-on:changeValue="color.colorDescriptionUnd = $event"
            :title="$t('Colors.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-colorNotes`"
            :value="color.colorNotes"
            v-on:changeValue="color.colorNotes = $event"
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
import CustomInputColor from "./../../../../../components/general/CustomInputColor.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasColorDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomInputColor,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    color: {
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
    color: {
      colorNameAr: { required, isValidNameAr },
      colorNameEn: { required, isValidNameEn },
      colorDescriptionAr: { isValidTextAr },
      colorDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_colorNameAr() {
      let errors = [];
      if (this.$v.color.colorNameAr.$error) {
        if (
          !this.$v.color.colorNameAr.required &&
          !this.$v.color.colorNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.color.colorNameAr.required &&
          !this.$v.color.colorNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_colorNameEn() {
      let errors = [];
      if (this.$v.color.colorNameEn.$error) {
        if (
          !this.$v.color.colorNameAr.required &&
          !this.$v.color.colorNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.color.colorNameEn.required &&
          !this.$v.color.colorNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_colorDescriptionAr() {
      let errors = [];
      if (this.$v.color.colorDescriptionAr.$error) {
        if (!this.$v.color.colorDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_colorDescriptionEn() {
      let errors = [];
      if (this.$v.color.colorDescriptionEn.$error) {
        if (!this.$v.color.colorDescriptionEn.isValidTextEn)
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
        ((this.$v.color.colorNameAr.required &&
          this.$v.color.colorNameAr.isValidNameAr) ||
          (this.$v.color.colorNameEn.required &&
            this.$v.color.colorNameEn.isValidNameEn)) &&
        this.$v.color.colorDescriptionAr.isValidTextAr &&
        this.$v.color.colorDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasColorDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
