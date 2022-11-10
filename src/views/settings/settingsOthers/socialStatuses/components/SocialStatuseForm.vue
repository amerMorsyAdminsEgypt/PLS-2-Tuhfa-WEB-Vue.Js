<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="socialStatuse.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              socialStatuse.socialStatuseImagePath,
              socialStatuse.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !socialStatuse.socialStatuseImageIsDefault &&
            checkPrivilege(hasSocialStatuseDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="socialStatuse.fullCode"
            v-on:changeValue="socialStatuse.fullCode = $event"
            :title="$t('SocialStatuses.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-socialStatuseNameAr`"
            :errors="errors_socialStatuseNameAr"
            :value="socialStatuse.socialStatuseNameAr"
            v-on:changeValue="
              socialStatuse.socialStatuseNameAr = $event;
              $v.socialStatuse.socialStatuseNameAr.$touch();
            "
            :title="$t('SocialStatuses.nameAr')"
            :imgName="'socialStatuses.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-socialStatuseNameEn`"
            :errors="errors_socialStatuseNameEn"
            :value="socialStatuse.socialStatuseNameEn"
            v-on:changeValue="
              socialStatuse.socialStatuseNameEn = $event;
              $v.socialStatuse.socialStatuseNameEn.$touch();
            "
            :title="$t('SocialStatuses.nameEn')"
            :imgName="'socialStatuses.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-socialStatuseNameUnd`"
            :value="socialStatuse.socialStatuseNameUnd"
            v-on:changeValue="socialStatuse.socialStatuseNameUnd = $event"
            :title="$t('SocialStatuses.nameUnd')"
            :imgName="'socialStatuses.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-socialStatuseDescriptionAr`"
            :errors="errors_socialStatuseDescriptionAr"
            :value="socialStatuse.socialStatuseDescriptionAr"
            v-on:changeValue="
              socialStatuse.socialStatuseDescriptionAr = $event;
              $v.socialStatuse.socialStatuseDescriptionAr.$touch();
            "
            :title="$t('SocialStatuses.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-socialStatuseDescriptionEn`"
            :errors="errors_socialStatuseDescriptionEn"
            :value="socialStatuse.socialStatuseDescriptionEn"
            v-on:changeValue="
              socialStatuse.socialStatuseDescriptionEn = $event;
              $v.socialStatuse.socialStatuseDescriptionEn.$touch();
            "
            :title="$t('SocialStatuses.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-socialStatuseDescriptionUnd`"
            :value="socialStatuse.socialStatuseDescriptionUnd"
            v-on:changeValue="
              socialStatuse.socialStatuseDescriptionUnd = $event
            "
            :title="$t('SocialStatuses.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-socialStatuseNotes`"
            :value="socialStatuse.socialStatuseNotes"
            v-on:changeValue="socialStatuse.socialStatuseNotes = $event"
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
import { hasSocialStatuseDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    socialStatuse: {
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
    socialStatuse: {
      socialStatuseNameAr: { required, isValidNameAr },
      socialStatuseNameEn: { required, isValidNameEn },
      socialStatuseDescriptionAr: { isValidTextAr },
      socialStatuseDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_socialStatuseNameAr() {
      let errors = [];
      if (this.$v.socialStatuse.socialStatuseNameAr.$error) {
        if (
          !this.$v.socialStatuse.socialStatuseNameAr.required &&
          !this.$v.socialStatuse.socialStatuseNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.socialStatuse.socialStatuseNameAr.required &&
          !this.$v.socialStatuse.socialStatuseNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_socialStatuseNameEn() {
      let errors = [];
      if (this.$v.socialStatuse.socialStatuseNameEn.$error) {
        if (
          !this.$v.socialStatuse.socialStatuseNameAr.required &&
          !this.$v.socialStatuse.socialStatuseNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.socialStatuse.socialStatuseNameEn.required &&
          !this.$v.socialStatuse.socialStatuseNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_socialStatuseDescriptionAr() {
      let errors = [];
      if (this.$v.socialStatuse.socialStatuseDescriptionAr.$error) {
        if (!this.$v.socialStatuse.socialStatuseDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_socialStatuseDescriptionEn() {
      let errors = [];
      if (this.$v.socialStatuse.socialStatuseDescriptionEn.$error) {
        if (!this.$v.socialStatuse.socialStatuseDescriptionEn.isValidTextEn)
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
        ((this.$v.socialStatuse.socialStatuseNameAr.required &&
          this.$v.socialStatuse.socialStatuseNameAr.isValidNameAr) ||
          (this.$v.socialStatuse.socialStatuseNameEn.required &&
            this.$v.socialStatuse.socialStatuseNameEn.isValidNameEn)) &&
        this.$v.socialStatuse.socialStatuseDescriptionAr.isValidTextAr &&
        this.$v.socialStatuse.socialStatuseDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasSocialStatuseDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
