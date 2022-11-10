<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="gradingPlan.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              gradingPlan.gradingPlanImagePath,
              gradingPlan.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !gradingPlan.gradingPlanImageIsDefault &&
            checkPrivilege(hasGradingPlanDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="gradingPlan.fullCode"
            v-on:changeValue="gradingPlan.fullCode = $event"
            :title="$t('GradingPlans.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-gradingPlanNameAr`"
            :errors="errors_gradingPlanNameAr"
            :value="gradingPlan.gradingPlanNameAr"
            v-on:changeValue="
              gradingPlan.gradingPlanNameAr = $event;
              $v.gradingPlan.gradingPlanNameAr.$touch();
            "
            :title="$t('GradingPlans.nameAr')"
            :imgName="'GradingPlans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-gradingPlanNameEn`"
            :errors="errors_gradingPlanNameEn"
            :value="gradingPlan.gradingPlanNameEn"
            v-on:changeValue="
              gradingPlan.gradingPlanNameEn = $event;
              $v.gradingPlan.gradingPlanNameEn.$touch();
            "
            :title="$t('GradingPlans.nameEn')"
            :imgName="'GradingPlans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-gradingPlanNameUnd`"
            :value="gradingPlan.gradingPlanNameUnd"
            v-on:changeValue="gradingPlan.gradingPlanNameUnd = $event"
            :title="$t('GradingPlans.nameUnd')"
            :imgName="'GradingPlans.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-gradingPlanDescriptionAr`"
            :errors="errors_gradingPlanDescriptionAr"
            :value="gradingPlan.gradingPlanDescriptionAr"
            v-on:changeValue="
              gradingPlan.gradingPlanDescriptionAr = $event;
              $v.gradingPlan.gradingPlanDescriptionAr.$touch();
            "
            :title="$t('GradingPlans.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-gradingPlanDescriptionEn`"
            :errors="errors_gradingPlanDescriptionEn"
            :value="gradingPlan.gradingPlanDescriptionEn"
            v-on:changeValue="
              gradingPlan.gradingPlanDescriptionEn = $event;
              $v.gradingPlan.gradingPlanDescriptionEn.$touch();
            "
            :title="$t('GradingPlans.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-gradingPlanDescriptionUnd`"
            :value="gradingPlan.gradingPlanDescriptionUnd"
            v-on:changeValue="gradingPlan.gradingPlanDescriptionUnd = $event"
            :title="$t('GradingPlans.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-gradingPlanNotes`"
            :value="gradingPlan.gradingPlanNotes"
            v-on:changeValue="gradingPlan.gradingPlanNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`gradingPlanSlicesTypeToken`"
            :value="gradingPlan.gradingPlanSlicesTypeToken"
            :options="gradingPlanSlicesTypeTokenOptions"
            v-on:changeValue="gradingPlan.gradingPlanSlicesTypeToken = $event"
            :title="$t('general.gradingPlanType')"
            :imgName="'type.svg'"
          />
          <GradingPlanSlicesDataComponent
            :gradingPlanSlicesData="gradingPlan.gradingPlanSlicesData"
            :gradingPlanSlicesMsg="$t('GradingPlans.gradingPlanSlicesData')"
            :id="'gradingPlanSlicesData'"
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
import GradingPlanSlicesDataComponent from "./GradingPlanSlicesDataComponent.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import { hasGradingPlanDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getDialogOfGradingPlanSlicesType } from "./../../../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    GradingPlanSlicesDataComponent,
    CustomInput,
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      gradingPlanSlicesTypeTokenOptions: getDialogOfGradingPlanSlicesType(),
    };
  },
  props: {
    gradingPlan: {
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
    gradingPlan: {
      gradingPlanNameAr: { required, isValidNameAr },
      gradingPlanNameEn: { required, isValidNameEn },
      gradingPlanDescriptionAr: { isValidTextAr },
      gradingPlanDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_gradingPlanNameAr() {
      let errors = [];
      if (this.$v.gradingPlan.gradingPlanNameAr.$error) {
        if (
          !this.$v.gradingPlan.gradingPlanNameAr.required &&
          !this.$v.gradingPlan.gradingPlanNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.gradingPlan.gradingPlanNameAr.required &&
          !this.$v.gradingPlan.gradingPlanNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_gradingPlanNameEn() {
      let errors = [];
      if (this.$v.gradingPlan.gradingPlanNameEn.$error) {
        if (
          !this.$v.gradingPlan.gradingPlanNameAr.required &&
          !this.$v.gradingPlan.gradingPlanNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.gradingPlan.gradingPlanNameEn.required &&
          !this.$v.gradingPlan.gradingPlanNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_gradingPlanDescriptionAr() {
      let errors = [];
      if (this.$v.gradingPlan.gradingPlanDescriptionAr.$error) {
        if (!this.$v.gradingPlan.gradingPlanDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_gradingPlanDescriptionEn() {
      let errors = [];
      if (this.$v.gradingPlan.gradingPlanDescriptionEn.$error) {
        if (!this.$v.gradingPlan.gradingPlanDescriptionEn.isValidTextEn)
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
        ((this.$v.gradingPlan.gradingPlanNameAr.required &&
          this.$v.gradingPlan.gradingPlanNameAr.isValidNameAr) ||
          (this.$v.gradingPlan.gradingPlanNameEn.required &&
            this.$v.gradingPlan.gradingPlanNameEn.isValidNameEn)) &&
        this.$v.gradingPlan.gradingPlanDescriptionAr.isValidTextAr &&
        this.$v.gradingPlan.gradingPlanDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasGradingPlanDeleteImage,
    fullPathFileFromServer,
  },
};
</script>
