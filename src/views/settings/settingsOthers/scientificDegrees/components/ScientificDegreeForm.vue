<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="scientificDegree.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              scientificDegree.scientificDegreeImagePath,
              scientificDegree.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !scientificDegree.scientificDegreeImageIsDefault &&
            checkPrivilege(hasScientificDegreeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="scientificDegree.fullCode"
            v-on:changeValue="scientificDegree.fullCode = $event"
            :title="$t('ScientificDegrees.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-scientificDegreeNameAr`"
            :errors="errors_scientificDegreeNameAr"
            :value="scientificDegree.scientificDegreeNameAr"
            v-on:changeValue="
              scientificDegree.scientificDegreeNameAr = $event;
              $v.scientificDegree.scientificDegreeNameAr.$touch();
            "
            :title="$t('ScientificDegrees.nameAr')"
            :imgName="'scientificDegrees.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-scientificDegreeNameEn`"
            :errors="errors_scientificDegreeNameEn"
            :value="scientificDegree.scientificDegreeNameEn"
            v-on:changeValue="
              scientificDegree.scientificDegreeNameEn = $event;
              $v.scientificDegree.scientificDegreeNameEn.$touch();
            "
            :title="$t('ScientificDegrees.nameEn')"
            :imgName="'scientificDegrees.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-scientificDegreeNameUnd`"
            :value="scientificDegree.scientificDegreeNameUnd"
            v-on:changeValue="scientificDegree.scientificDegreeNameUnd = $event"
            :title="$t('ScientificDegrees.nameUnd')"
            :imgName="'scientificDegrees.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-scientificDegreeDescriptionAr`"
            :errors="errors_scientificDegreeDescriptionAr"
            :value="scientificDegree.scientificDegreeDescriptionAr"
            v-on:changeValue="
              scientificDegree.scientificDegreeDescriptionAr = $event;
              $v.scientificDegree.scientificDegreeDescriptionAr.$touch();
            "
            :title="$t('ScientificDegrees.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-scientificDegreeDescriptionEn`"
            :errors="errors_scientificDegreeDescriptionEn"
            :value="scientificDegree.scientificDegreeDescriptionEn"
            v-on:changeValue="
              scientificDegree.scientificDegreeDescriptionEn = $event;
              $v.scientificDegree.scientificDegreeDescriptionEn.$touch();
            "
            :title="$t('ScientificDegrees.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-scientificDegreeDescriptionUnd`"
            :value="scientificDegree.scientificDegreeDescriptionUnd"
            v-on:changeValue="
              scientificDegree.scientificDegreeDescriptionUnd = $event
            "
            :title="$t('ScientificDegrees.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-scientificDegreeNotes`"
            :value="scientificDegree.scientificDegreeNotes"
            v-on:changeValue="scientificDegree.scientificDegreeNotes = $event"
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
import { hasScientificDegreeDeleteImage } from "./../../../../../utils/privilegeHelper";
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
    scientificDegree: {
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
    scientificDegree: {
      scientificDegreeNameAr: { required, isValidNameAr },
      scientificDegreeNameEn: { required, isValidNameEn },
      scientificDegreeDescriptionAr: { isValidTextAr },
      scientificDegreeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_scientificDegreeNameAr() {
      let errors = [];
      if (this.$v.scientificDegree.scientificDegreeNameAr.$error) {
        if (
          !this.$v.scientificDegree.scientificDegreeNameAr.required &&
          !this.$v.scientificDegree.scientificDegreeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.scientificDegree.scientificDegreeNameAr.required &&
          !this.$v.scientificDegree.scientificDegreeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_scientificDegreeNameEn() {
      let errors = [];
      if (this.$v.scientificDegree.scientificDegreeNameEn.$error) {
        if (
          !this.$v.scientificDegree.scientificDegreeNameAr.required &&
          !this.$v.scientificDegree.scientificDegreeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.scientificDegree.scientificDegreeNameEn.required &&
          !this.$v.scientificDegree.scientificDegreeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_scientificDegreeDescriptionAr() {
      let errors = [];
      if (this.$v.scientificDegree.scientificDegreeDescriptionAr.$error) {
        if (
          !this.$v.scientificDegree.scientificDegreeDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_scientificDegreeDescriptionEn() {
      let errors = [];
      if (this.$v.scientificDegree.scientificDegreeDescriptionEn.$error) {
        if (
          !this.$v.scientificDegree.scientificDegreeDescriptionEn.isValidTextEn
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
        ((this.$v.scientificDegree.scientificDegreeNameAr.required &&
          this.$v.scientificDegree.scientificDegreeNameAr.isValidNameAr) ||
          (this.$v.scientificDegree.scientificDegreeNameEn.required &&
            this.$v.scientificDegree.scientificDegreeNameEn.isValidNameEn)) &&
        this.$v.scientificDegree.scientificDegreeDescriptionAr.isValidTextAr &&
        this.$v.scientificDegree.scientificDegreeDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasScientificDegreeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
