<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="militaryStatusType.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              militaryStatusType.militaryStatusTypeImagePath,
              militaryStatusType.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !militaryStatusType.militaryStatusTypeImageIsDefault &&
            checkPrivilege(hasMilitaryStatusTypeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="militaryStatusType.fullCode"
            v-on:changeValue="militaryStatusType.fullCode = $event"
            :title="$t('MilitaryStatusTypes.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-militaryStatusTypeNameAr`"
            :errors="errors_militaryStatusTypeNameAr"
            :value="militaryStatusType.militaryStatusTypeNameAr"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeNameAr = $event;
              $v.militaryStatusType.militaryStatusTypeNameAr.$touch();
            "
            :title="$t('MilitaryStatusTypes.nameAr')"
            :imgName="'militaryStatus.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-militaryStatusTypeNameEn`"
            :errors="errors_militaryStatusTypeNameEn"
            :value="militaryStatusType.militaryStatusTypeNameEn"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeNameEn = $event;
              $v.militaryStatusType.militaryStatusTypeNameEn.$touch();
            "
            :title="$t('MilitaryStatusTypes.nameEn')"
            :imgName="'militaryStatus.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-militaryStatusTypeNameUnd`"
            :value="militaryStatusType.militaryStatusTypeNameUnd"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeNameUnd = $event
            "
            :title="$t('MilitaryStatusTypes.nameUnd')"
            :imgName="'militaryStatus.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-militaryStatusTypeDescriptionAr`"
            :errors="errors_militaryStatusTypeDescriptionAr"
            :value="militaryStatusType.militaryStatusTypeDescriptionAr"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeDescriptionAr = $event;
              $v.militaryStatusType.militaryStatusTypeDescriptionAr.$touch();
            "
            :title="$t('MilitaryStatusTypes.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-militaryStatusTypeDescriptionEn`"
            :errors="errors_militaryStatusTypeDescriptionEn"
            :value="militaryStatusType.militaryStatusTypeDescriptionEn"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeDescriptionEn = $event;
              $v.militaryStatusType.militaryStatusTypeDescriptionEn.$touch();
            "
            :title="$t('MilitaryStatusTypes.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-militaryStatusTypeDescriptionUnd`"
            :value="militaryStatusType.militaryStatusTypeDescriptionUnd"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeDescriptionUnd = $event
            "
            :title="$t('MilitaryStatusTypes.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-militaryStatusTypeNotes`"
            :value="militaryStatusType.militaryStatusTypeNotes"
            v-on:changeValue="
              militaryStatusType.militaryStatusTypeNotes = $event
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
import { hasMilitaryStatusTypeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    militaryStatusType: {
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
    militaryStatusType: {
      militaryStatusTypeNameAr: { required, isValidNameAr },
      militaryStatusTypeNameEn: { required, isValidNameEn },
      militaryStatusTypeDescriptionAr: { isValidTextAr },
      militaryStatusTypeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_militaryStatusTypeNameAr() {
      let errors = [];
      if (this.$v.militaryStatusType.militaryStatusTypeNameAr.$error) {
        if (
          !this.$v.militaryStatusType.militaryStatusTypeNameAr.required &&
          !this.$v.militaryStatusType.militaryStatusTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.militaryStatusType.militaryStatusTypeNameAr.required &&
          !this.$v.militaryStatusType.militaryStatusTypeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_militaryStatusTypeNameEn() {
      let errors = [];
      if (this.$v.militaryStatusType.militaryStatusTypeNameEn.$error) {
        if (
          !this.$v.militaryStatusType.militaryStatusTypeNameAr.required &&
          !this.$v.militaryStatusType.militaryStatusTypeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.militaryStatusType.militaryStatusTypeNameEn.required &&
          !this.$v.militaryStatusType.militaryStatusTypeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_militaryStatusTypeDescriptionAr() {
      let errors = [];
      if (this.$v.militaryStatusType.militaryStatusTypeDescriptionAr.$error) {
        if (
          !this.$v.militaryStatusType.militaryStatusTypeDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_militaryStatusTypeDescriptionEn() {
      let errors = [];
      if (this.$v.militaryStatusType.militaryStatusTypeDescriptionEn.$error) {
        if (
          !this.$v.militaryStatusType.militaryStatusTypeDescriptionEn
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
        ((this.$v.militaryStatusType.militaryStatusTypeNameAr.required &&
          this.$v.militaryStatusType.militaryStatusTypeNameAr.isValidNameAr) ||
          (this.$v.militaryStatusType.militaryStatusTypeNameEn.required &&
            this.$v.militaryStatusType.militaryStatusTypeNameEn
              .isValidNameEn)) &&
        this.$v.militaryStatusType.militaryStatusTypeDescriptionAr
          .isValidTextAr &&
        this.$v.militaryStatusType.militaryStatusTypeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasMilitaryStatusTypeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
