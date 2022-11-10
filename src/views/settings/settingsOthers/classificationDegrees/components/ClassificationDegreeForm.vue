<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="classificationDegree.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              classificationDegree.classificationDegreeImagePath,
              classificationDegree.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !classificationDegree.classificationDegreeImageIsDefault &&
            checkPrivilege(hasClassificationDegreeDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="classificationDegree.fullCode"
            v-on:changeValue="classificationDegree.fullCode = $event"
            :title="$t('ClassificationDegrees.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeNameAr`"
            :errors="errors_classificationDegreeNameAr"
            :value="classificationDegree.classificationDegreeNameAr"
            v-on:changeValue="
              classificationDegree.classificationDegreeNameAr = $event;
              $v.classificationDegree.classificationDegreeNameAr.$touch();
            "
            :title="$t('ClassificationDegrees.nameAr')"
            :imgName="'classificationDegrees.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeNameEn`"
            :errors="errors_classificationDegreeNameEn"
            :value="classificationDegree.classificationDegreeNameEn"
            v-on:changeValue="
              classificationDegree.classificationDegreeNameEn = $event;
              $v.classificationDegree.classificationDegreeNameEn.$touch();
            "
            :title="$t('ClassificationDegrees.nameEn')"
            :imgName="'classificationDegrees.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeNameUnd`"
            :value="classificationDegree.classificationDegreeNameUnd"
            v-on:changeValue="
              classificationDegree.classificationDegreeNameUnd = $event
            "
            :title="$t('ClassificationDegrees.nameUnd')"
            :imgName="'classificationDegrees.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeGradeFrom`"
            :value="classificationDegree.classificationDegreeGradeFrom"
            v-on:changeValue="
              classificationDegree.classificationDegreeGradeFrom = $event
            "
            :title="$t('general.degreeFrom')"
            :imgName="'number.svg'"
          />
          <CustomInputFloat
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeGradeTo`"
            :value="classificationDegree.classificationDegreeGradeTo"
            v-on:changeValue="
              classificationDegree.classificationDegreeGradeTo = $event
            "
            :title="$t('general.degreeTo')"
            :imgName="'number.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeDescriptionAr`"
            :errors="errors_classificationDegreeDescriptionAr"
            :value="classificationDegree.classificationDegreeDescriptionAr"
            v-on:changeValue="
              classificationDegree.classificationDegreeDescriptionAr = $event;
              $v.classificationDegree.classificationDegreeDescriptionAr.$touch();
            "
            :title="$t('ClassificationDegrees.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeDescriptionEn`"
            :errors="errors_classificationDegreeDescriptionEn"
            :value="classificationDegree.classificationDegreeDescriptionEn"
            v-on:changeValue="
              classificationDegree.classificationDegreeDescriptionEn = $event;
              $v.classificationDegree.classificationDegreeDescriptionEn.$touch();
            "
            :title="$t('ClassificationDegrees.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeDescriptionUnd`"
            :value="classificationDegree.classificationDegreeDescriptionUnd"
            v-on:changeValue="
              classificationDegree.classificationDegreeDescriptionUnd = $event
            "
            :title="$t('ClassificationDegrees.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeNotes`"
            :value="classificationDegree.classificationDegreeNotes"
            v-on:changeValue="
              classificationDegree.classificationDegreeNotes = $event
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
import CustomInputFloat from "./../../../../../components/general/CustomInputFloat.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasClassificationDegreeDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomInputFloat,
    TextArea,
  },
  // data() {
  //   return {};
  // },
  props: {
    classificationDegree: {
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
    classificationDegree: {
      classificationDegreeNameAr: { required, isValidNameAr },
      classificationDegreeNameEn: { required, isValidNameEn },
      classificationDegreeDescriptionAr: { isValidTextAr },
      classificationDegreeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_classificationDegreeNameAr() {
      let errors = [];
      if (this.$v.classificationDegree.classificationDegreeNameAr.$error) {
        if (
          !this.$v.classificationDegree.classificationDegreeNameAr.required &&
          !this.$v.classificationDegree.classificationDegreeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.classificationDegree.classificationDegreeNameAr.required &&
          !this.$v.classificationDegree.classificationDegreeNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_classificationDegreeNameEn() {
      let errors = [];
      if (this.$v.classificationDegree.classificationDegreeNameEn.$error) {
        if (
          !this.$v.classificationDegree.classificationDegreeNameAr.required &&
          !this.$v.classificationDegree.classificationDegreeNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.classificationDegree.classificationDegreeNameEn.required &&
          !this.$v.classificationDegree.classificationDegreeNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_classificationDegreeDescriptionAr() {
      let errors = [];
      if (
        this.$v.classificationDegree.classificationDegreeDescriptionAr.$error
      ) {
        if (
          !this.$v.classificationDegree.classificationDegreeDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_classificationDegreeDescriptionEn() {
      let errors = [];
      if (
        this.$v.classificationDegree.classificationDegreeDescriptionEn.$error
      ) {
        if (
          !this.$v.classificationDegree.classificationDegreeDescriptionEn
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
        ((this.$v.classificationDegree.classificationDegreeNameAr.required &&
          this.$v.classificationDegree.classificationDegreeNameAr
            .isValidNameAr) ||
          (this.$v.classificationDegree.classificationDegreeNameEn.required &&
            this.$v.classificationDegree.classificationDegreeNameEn
              .isValidNameEn)) &&
        this.$v.classificationDegree.classificationDegreeDescriptionAr
          .isValidTextAr &&
        this.$v.classificationDegree.classificationDegreeDescriptionEn
          .isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasClassificationDegreeDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
