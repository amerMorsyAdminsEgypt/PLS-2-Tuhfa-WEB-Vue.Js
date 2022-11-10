<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="reminder.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              reminder.reminderImagePath,
              reminder.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !reminder.reminderImageIsDefault &&
            checkPrivilege(hasReminderDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            :id="`${id}-placeTypeToken`"
            :value="reminder.placeTypeToken"
            :options="placeTypeTokenOptions"
            v-on:changeValue="
              reminder.placeTypeToken = $event;
              getPlacesDialog();
            "
            :title="$t('Places.type')"
            :imgName="'type.svg'"
          />
          <CustomSelectBoxMultiple
            :className="'col-md-12'"
            :id="`${id}-placesTokensList`"
            :value="reminder.placesTokensList"
            :options="placesTokensListOptions"
            v-on:changeValue="reminder.placesTokensList = $event"
            :title="$t('Places.select')"
            :imgName="'places.svg'"
            :returnArrayOfObjects="false"
          />
          <CustomSelectBoxMultiple
            :className="'col-md-12'"
            :id="`${id}-usersTokensList`"
            :value="reminder.usersTokensList"
            :options="usersTokensListOptions"
            v-on:changeValue="reminder.usersTokensList = $event"
            :title="$t('students.select')"
            :imgName="'user.svg'"
            :returnArrayOfObjects="false"
          />
          <CustomSelectBoxMultiple
            :className="'col-md-12'"
            :id="`${id}-educationalCategoriesTokensList`"
            :value="reminder.educationalCategoriesTokensList"
            :options="educationalCategoriesTokensListOptions"
            v-on:changeValue="reminder.educationalCategoriesTokensList = $event"
            :title="$t('EducationalCategories.select')"
            :imgName="'EducationalCategories.svg'"
            :returnArrayOfObjects="false"
          />
          <CustomSelectBoxMultiple
            :className="'col-md-12'"
            :id="`${id}-educationalGroupsTokensList`"
            :value="reminder.educationalGroupsTokensList"
            :options="educationalGroupsTokensListOptions"
            v-on:changeValue="reminder.educationalGroupsTokensList = $event"
            :title="$t('EducationalGroups.select')"
            :imgName="'EducationalGroups.svg'"
            :returnArrayOfObjects="false"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="reminder.fullCode"
            v-on:changeValue="reminder.fullCode = $event"
            :title="$t('Reminders.code')"
            :imgName="'code.svg'"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-reminderDateTime`"
            :errors="errors_reminderDateTime"
            type="dateTime"
            :value="reminder.reminderDateTime"
            :title="$t('actionsData.dateTime')"
            v-on:changeValue="
              reminder.reminderDateTime = $event.dateTime;
              $v.reminder.reminderDateTime.$touch();
            "
            :language="language"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-reminderTitleAr`"
            :errors="errors_reminderTitleAr"
            :value="reminder.reminderTitleAr"
            v-on:changeValue="
              reminder.reminderTitleAr = $event;
              $v.reminder.reminderTitleAr.$touch();
            "
            :title="$t('Reminders.titleAr')"
            :imgName="'reminders.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-reminderTitleEn`"
            :errors="errors_reminderTitleEn"
            :value="reminder.reminderTitleEn"
            v-on:changeValue="
              reminder.reminderTitleEn = $event;
              $v.reminder.reminderTitleEn.$touch();
            "
            :title="$t('Reminders.titleEn')"
            :imgName="'reminders.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-reminderTitleUnd`"
            :value="reminder.reminderTitleUnd"
            v-on:changeValue="reminder.reminderTitleUnd = $event"
            :title="$t('Reminders.titleUnd')"
            :imgName="'reminders.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-reminderDescriptionAr`"
            :errors="errors_reminderDescriptionAr"
            :value="reminder.reminderDescriptionAr"
            v-on:changeValue="
              reminder.reminderDescriptionAr = $event;
              $v.reminder.reminderDescriptionAr.$touch();
            "
            :title="$t('Reminders.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-reminderDescriptionEn`"
            :errors="errors_reminderDescriptionEn"
            :value="reminder.reminderDescriptionEn"
            v-on:changeValue="
              reminder.reminderDescriptionEn = $event;
              $v.reminder.reminderDescriptionEn.$touch();
            "
            :title="$t('Reminders.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-reminderDescriptionUnd`"
            :value="reminder.reminderDescriptionUnd"
            v-on:changeValue="reminder.reminderDescriptionUnd = $event"
            :title="$t('Reminders.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-reminderNotes`"
            :value="reminder.reminderNotes"
            v-on:changeValue="reminder.reminderNotes = $event"
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
  getLanguage,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../utils/functions";

import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../utils/validationHelper";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import DateTimePicker from "./../../../components/general/DateTimePicker.vue";
import CustomSelectBoxMultiple from "./../../../components/general/CustomSelectBoxMultiple.vue";
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import { hasReminderDeleteImage } from "./../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../utils/functions";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  getPlacesDialog,
  getUsersDialog,
  getEducationalCategoriesDialog,
  getEducationalGroupsDialog,
} from "./../../../utils/dialogsOfApi";
import PreLoader from "@/components/general/PreLoader.vue";
import { USER_TYPE } from "./../../../utils/constantLists";
// import { USER_TYPE, PLACE_TYPE_TOKENS } from "./../../../utils/constantLists";
import { getDialogOfPlaceType } from "./../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomFileInput,
    CustomInput,
    DateTimePicker,
    CustomSelectBoxMultiple,
    CustomSelectBox,
    TextArea,
  },
  data() {
    return {
      language: getLanguage(),
      isLoading: false,
      placesTokensListOptions: [],
      usersTokensListOptions: [],
      educationalCategoriesTokensListOptions: [],
      educationalGroupsTokensListOptions: [],
      // placeTypeToken: PLACE_TYPE_TOKENS.Student,
      placeTypeTokenOptions: getDialogOfPlaceType() || [],
    };
  },
  props: {
    reminder: {
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
    reminder: {
      reminderDateTime: { required },
      reminderTitleAr: { required, isValidNameAr },
      reminderTitleEn: { required, isValidNameEn },
      reminderDescriptionAr: { isValidTextAr },
      reminderDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_placesTokensList() {
      let errors = [];
      if (this.$v.reminder.placesTokensList.$error) {
        if (!this.$v.reminder.placesTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_usersTokensList() {
      let errors = [];
      if (this.$v.reminder.usersTokensList.$error) {
        if (!this.$v.reminder.usersTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalCategoriesTokensList() {
      let errors = [];
      if (this.$v.reminder.educationalCategoriesTokensList.$error) {
        if (!this.$v.reminder.educationalCategoriesTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_educationalGroupsTokensList() {
      let errors = [];
      if (this.$v.reminder.educationalGroupsTokensList.$error) {
        if (!this.$v.reminder.educationalGroupsTokensList.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_reminderDateTime() {
      let errors = [];
      if (this.$v.reminder.reminderDateTime.$error) {
        if (!this.$v.reminder.reminderDateTime.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_reminderTitleAr() {
      let errors = [];
      if (this.$v.reminder.reminderTitleAr.$error) {
        if (
          !this.$v.reminder.reminderTitleAr.required &&
          !this.$v.reminder.reminderTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.reminder.reminderTitleAr.required &&
          !this.$v.reminder.reminderTitleAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_reminderTitleEn() {
      let errors = [];
      if (this.$v.reminder.reminderTitleEn.$error) {
        if (
          !this.$v.reminder.reminderTitleAr.required &&
          !this.$v.reminder.reminderTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.reminder.reminderTitleEn.required &&
          !this.$v.reminder.reminderTitleEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_reminderDescriptionAr() {
      let errors = [];
      if (this.$v.reminder.reminderDescriptionAr.$error) {
        if (!this.$v.reminder.reminderDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_reminderDescriptionEn() {
      let errors = [];
      if (this.$v.reminder.reminderDescriptionEn.$error) {
        if (!this.$v.reminder.reminderDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getPlacesDialog() {
      this.isLoading = true;
      let params = { placeTypeToken: this.reminder.placeTypeToken };
      this.placesTokensListOptions = await getPlacesDialog(params);
      this.isLoading = false;
    },
    async getUsersDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.usersTokensListOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getEducationalCategoriesDialog() {
      this.isLoading = true;
      this.educationalCategoriesTokensListOptions =
        await getEducationalCategoriesDialog();
      this.isLoading = false;
    },
    async getEducationalGroupsDialog() {
      this.isLoading = true;
      this.educationalGroupsTokensListOptions =
        await getEducationalGroupsDialog();
      this.isLoading = false;
    },

    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.reminder.reminderDateTime.required &&
        ((this.$v.reminder.reminderTitleAr.required &&
          this.$v.reminder.reminderTitleAr.isValidNameAr) ||
          (this.$v.reminder.reminderTitleEn.required &&
            this.$v.reminder.reminderTitleEn.isValidNameEn)) &&
        this.$v.reminder.reminderDescriptionAr.isValidTextAr &&
        this.$v.reminder.reminderDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasReminderDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getPlacesDialog();
    this.getUsersDialog();
    this.getEducationalCategoriesDialog();
    this.getEducationalGroupsDialog();
  },
};
</script>
