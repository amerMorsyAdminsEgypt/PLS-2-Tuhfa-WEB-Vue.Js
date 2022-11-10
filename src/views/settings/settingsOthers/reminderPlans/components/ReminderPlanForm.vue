<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="reminderPlan.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              reminderPlan.reminderPlanImagePath,
              reminderPlan.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !reminderPlan.reminderPlanImageIsDefault &&
            checkPrivilege(hasReminderPlanDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-priorityTypeBeforeTimeToken`"
            :errors="errors_priorityTypeBeforeTimeToken"
            :value="reminderPlan.priorityTypeBeforeTimeToken"
            :options="priorityTypeTokenOptions"
            v-on:changeValue="
              reminderPlan.priorityTypeBeforeTimeToken = $event;
              $v.reminderPlan.priorityTypeBeforeTimeToken.$touch();
            "
            :title="$t('ReminderPlans.priorityTypeBeforeTime')"
            :imgName="'priorityTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-priorityTypeOnTimeToken`"
            :errors="errors_priorityTypeOnTimeToken"
            :value="reminderPlan.priorityTypeOnTimeToken"
            :options="priorityTypeTokenOptions"
            v-on:changeValue="
              reminderPlan.priorityTypeOnTimeToken = $event;
              $v.reminderPlan.priorityTypeOnTimeToken.$touch();
            "
            :title="$t('ReminderPlans.priorityTypeOnTime')"
            :imgName="'priorityTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-priorityTypeAfterTimeToken`"
            :errors="errors_priorityTypeAfterTimeToken"
            :value="reminderPlan.priorityTypeAfterTimeToken"
            :options="priorityTypeTokenOptions"
            v-on:changeValue="
              reminderPlan.priorityTypeAfterTimeToken = $event;
              $v.reminderPlan.priorityTypeAfterTimeToken.$touch();
            "
            :title="$t('ReminderPlans.priorityTypeAfterTime')"
            :imgName="'priorityTypes.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="reminderPlan.fullCode"
            v-on:changeValue="reminderPlan.fullCode = $event"
            :title="$t('ReminderPlans.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-reminderPlanNameAr`"
            :errors="errors_reminderPlanNameAr"
            :value="reminderPlan.reminderPlanNameAr"
            v-on:changeValue="
              reminderPlan.reminderPlanNameAr = $event;
              $v.reminderPlan.reminderPlanNameAr.$touch();
            "
            :title="$t('ReminderPlans.nameAr')"
            :imgName="'reminderPlans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-reminderPlanNameEn`"
            :errors="errors_reminderPlanNameEn"
            :value="reminderPlan.reminderPlanNameEn"
            v-on:changeValue="
              reminderPlan.reminderPlanNameEn = $event;
              $v.reminderPlan.reminderPlanNameEn.$touch();
            "
            :title="$t('ReminderPlans.nameEn')"
            :imgName="'reminderPlans.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-reminderPlanNameUnd`"
            :value="reminderPlan.reminderPlanNameUnd"
            v-on:changeValue="reminderPlan.reminderPlanNameUnd = $event"
            :title="$t('ReminderPlans.nameUnd')"
            :imgName="'reminderPlans.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-reminderPlanDescriptionAr`"
            :errors="errors_reminderPlanDescriptionAr"
            :value="reminderPlan.reminderPlanDescriptionAr"
            v-on:changeValue="
              reminderPlan.reminderPlanDescriptionAr = $event;
              $v.reminderPlan.reminderPlanDescriptionAr.$touch();
            "
            :title="$t('ReminderPlans.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-reminderPlanDescriptionEn`"
            :errors="errors_reminderPlanDescriptionEn"
            :value="reminderPlan.reminderPlanDescriptionEn"
            v-on:changeValue="
              reminderPlan.reminderPlanDescriptionEn = $event;
              $v.reminderPlan.reminderPlanDescriptionEn.$touch();
            "
            :title="$t('ReminderPlans.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-reminderPlanDescriptionUnd`"
            :value="reminderPlan.reminderPlanDescriptionUnd"
            v-on:changeValue="reminderPlan.reminderPlanDescriptionUnd = $event"
            :title="$t('ReminderPlans.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-reminderPlanNotes`"
            :value="reminderPlan.reminderPlanNotes"
            v-on:changeValue="reminderPlan.reminderPlanNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
          <CustomCheckbox
            :className="'col-md-6'"
            :value="reminderPlan.reminderPlanActivationStatus"
            v-on:changeValue="
              reminderPlan.reminderPlanActivationStatus = $event
            "
            :title="$t('activationStatus')"
          />
        </div>
        <ReminderPlansDetailsDataComponet
          :reminderPlansDetailsData="
            reminderPlan.reminderPlansDetailsDataBeforeTime
          "
          :reminderPlansDetailsMsg="$t('ReminderPlans.detailsBeforeTime')"
          :id="'BeforeTime'"
          :durationTypeToken="DURATION_TYPE_TOKENS.BeforeTime"
        />
        <ReminderPlansDetailsDataComponet
          :reminderPlansDetailsData="
            reminderPlan.reminderPlansDetailsDataAfterTime
          "
          :reminderPlansDetailsMsg="$t('ReminderPlans.detailsAfterTime')"
          :id="'AfterTime'"
          :durationTypeToken="DURATION_TYPE_TOKENS.AfterTime"
        />
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
  getLanguage,
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
import PreLoader from "./../../../../../components/general/PreLoader.vue";
import ReminderPlansDetailsDataComponet from "./ReminderPlansDetailsDataComponet.vue";
import CustomInput from "./../../../../../components/general/CustomInput.vue";
import CustomCheckbox from "./../../../../../components/general/CustomCheckbox.vue";
import TextArea from "./../../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../../components/general/CustomSelectBox.vue";
import { hasReminderPlanDeleteImage } from "./../../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../../utils/functions";
import generalMixin from "./../../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { DURATION_TYPE_TOKENS } from "./../../../../../utils/constantLists";
import { getPriorityTypesDialog } from "./../../../../../utils/dialogsOfApi";
import { PRIORITY_SCOPE_TYPE_TOKENS } from "./../../../../../utils/constantLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    PreLoader,
    CustomInput,
    CustomCheckbox,
    ReminderPlansDetailsDataComponet,
    TextArea,
    CustomSelectBox,
  },
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      priorityTypeTokenOptions: [],
      DURATION_TYPE_TOKENS: DURATION_TYPE_TOKENS,
    };
  },
  props: {
    reminderPlan: {
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
    reminderPlan: {
      priorityTypeBeforeTimeToken: { required },
      priorityTypeOnTimeToken: { required },
      priorityTypeAfterTimeToken: { required },
      reminderPlanNameAr: { required, isValidNameAr },
      reminderPlanNameEn: { required, isValidNameEn },
      reminderPlanDescriptionAr: { isValidTextAr },
      reminderPlanDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_priorityTypeBeforeTimeToken() {
      let errors = [];
      if (this.$v.reminderPlan.priorityTypeBeforeTimeToken.$error) {
        if (!this.$v.reminderPlan.priorityTypeBeforeTimeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_priorityTypeOnTimeToken() {
      let errors = [];
      if (this.$v.reminderPlan.priorityTypeOnTimeToken.$error) {
        if (!this.$v.reminderPlan.priorityTypeOnTimeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_priorityTypeAfterTimeToken() {
      let errors = [];
      if (this.$v.reminderPlan.priorityTypeAfterTimeToken.$error) {
        if (!this.$v.reminderPlan.priorityTypeAfterTimeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_reminderPlanNameAr() {
      let errors = [];
      if (this.$v.reminderPlan.reminderPlanNameAr.$error) {
        if (
          !this.$v.reminderPlan.reminderPlanNameAr.required &&
          !this.$v.reminderPlan.reminderPlanNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.reminderPlan.reminderPlanNameAr.required &&
          !this.$v.reminderPlan.reminderPlanNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_reminderPlanNameEn() {
      let errors = [];
      if (this.$v.reminderPlan.reminderPlanNameEn.$error) {
        if (
          !this.$v.reminderPlan.reminderPlanNameAr.required &&
          !this.$v.reminderPlan.reminderPlanNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.reminderPlan.reminderPlanNameEn.required &&
          !this.$v.reminderPlan.reminderPlanNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_reminderPlanDescriptionAr() {
      let errors = [];
      if (this.$v.reminderPlan.reminderPlanDescriptionAr.$error) {
        if (!this.$v.reminderPlan.reminderPlanDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_reminderPlanDescriptionEn() {
      let errors = [];
      if (this.$v.reminderPlan.reminderPlanDescriptionEn.$error) {
        if (!this.$v.reminderPlan.reminderPlanDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getPriorityTypesDialog() {
      this.isLoading = true;
      let params = {
        priorityScopeTypeToken: PRIORITY_SCOPE_TYPE_TOKENS.Reminders,
      };
      this.priorityTypeTokenOptions = await getPriorityTypesDialog(params);
      this.isLoading = false;
    },
    reminderPlansDetailsDurationFromChanged(data, index) {
      this.reminderPlan.reminderPlansDetailsData[index].reminderDurationFrom =
        data;
    },
    reminderPlansDetailsDescriptionArChanged(data, index) {
      this.reminderPlan.reminderPlansDetailsData[index].reminderDescriptionAr =
        data;
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.reminderPlan.priorityTypeBeforeTimeToken.required &&
        this.$v.reminderPlan.priorityTypeOnTimeToken.required &&
        this.$v.reminderPlan.priorityTypeAfterTimeToken.required &&
        ((this.$v.reminderPlan.reminderPlanNameAr.required &&
          this.$v.reminderPlan.reminderPlanNameAr.isValidNameAr) ||
          (this.$v.reminderPlan.reminderPlanNameEn.required &&
            this.$v.reminderPlan.reminderPlanNameEn.isValidNameEn)) &&
        this.$v.reminderPlan.reminderPlanDescriptionAr.isValidTextAr &&
        this.$v.reminderPlan.reminderPlanDescriptionEn.isValidTextEn
      ) {
        let reminderPlansDetailsData = [
          ...this.reminderPlan.reminderPlansDetailsDataAfterTime,
          ...this.reminderPlan.reminderPlansDetailsDataBeforeTime,
        ];
        this.reminderPlan.reminderPlansDetailsData = reminderPlansDetailsData;
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasReminderPlanDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getPriorityTypesDialog();
  },
};
</script>
