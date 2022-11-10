<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userValidSetting.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userValidSetting.userValidSettingImagePath,
              userValidSetting.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus && !userValidSetting.userValidSettingImageIsDefault
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userValidSetting.fullCode"
            v-on:changeValue="userValidSetting.fullCode = $event"
            :title="$t('UserValidSettings.code')"
            :imgName="'code.svg'"
          />
          <!-- <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-userTypeToken`"
            :errors="errors_userTypeToken"
            :value="userValidSetting.userTypeToken"
            :options="userTypeTokenOptions"
            v-on:changeValue="
              userValidSetting.userTypeToken = $event;
              $v.userValidSetting.userTypeToken.$touch();
            "
            :title="$t('Users.selectType')"
            :imgName="'type.svg'"
          /> -->

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userValidSettingNameAr`"
            :errors="errors_userValidSettingNameAr"
            :value="userValidSetting.userValidSettingNameAr"
            v-on:changeValue="
              userValidSetting.userValidSettingNameAr = $event;
              $v.userValidSetting.userValidSettingNameAr.$touch();
            "
            :title="$t('UserValidSettings.nameAr')"
            :imgName="'UserValidSettings.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userValidSettingNameEn`"
            :errors="errors_userValidSettingNameEn"
            :value="userValidSetting.userValidSettingNameEn"
            v-on:changeValue="
              userValidSetting.userValidSettingNameEn = $event;
              $v.userValidSetting.userValidSettingNameEn.$touch();
            "
            :title="$t('UserValidSettings.nameEn')"
            :imgName="'UserValidSettings.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userValidSettingNameUnd`"
            :value="userValidSetting.userValidSettingNameUnd"
            v-on:changeValue="userValidSetting.userValidSettingNameUnd = $event"
            :title="$t('UserValidSettings.nameUnd')"
            :imgName="'UserValidSettings.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userValidSettingDescriptionAr`"
            :errors="errors_userValidSettingDescriptionAr"
            :value="userValidSetting.userValidSettingDescriptionAr"
            v-on:changeValue="
              userValidSetting.userValidSettingDescriptionAr = $event;
              $v.userValidSetting.userValidSettingDescriptionAr.$touch();
            "
            :title="$t('UserValidSettings.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userValidSettingDescriptionEn`"
            :errors="errors_userValidSettingDescriptionEn"
            :value="userValidSetting.userValidSettingDescriptionEn"
            v-on:changeValue="
              userValidSetting.userValidSettingDescriptionEn = $event;
              $v.userValidSetting.userValidSettingDescriptionEn.$touch();
            "
            :title="$t('UserValidSettings.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userValidSettingDescriptionUnd`"
            :value="userValidSetting.userValidSettingDescriptionUnd"
            v-on:changeValue="
              userValidSetting.userValidSettingDescriptionUnd = $event
            "
            :title="$t('UserValidSettings.descriptionUnd')"
            :imgName="'description.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userValidSettingNotes`"
            :value="userValidSetting.userValidSettingNotes"
            v-on:changeValue="userValidSetting.userValidSettingNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
          <CustomCheckbox
            :className="'col-md-6'"
            :value="userValidSetting.userValidSettingActiveStatus"
            v-on:changeValue="
              userValidSetting.userValidSettingActiveStatus = $event
            "
            :title="$t('UserValidSettings.activeStatus')"
          />
        </div>
      </div>

      <div class="my-card">
        <span class="my-card-title">{{
          $t("UserValidSettings.requiredFields")
        }}</span>

        <div class="row">
          <CustomCheckbox
            :className="'col-md-6 col-lg-4'"
            :value="userValidSetting.requiredUserImageStatus"
            v-on:changeValue="userValidSetting.requiredUserImageStatus = $event"
            :title="$t('UserValidSettings.UserImage')"
          />
          <CustomCheckbox
            :className="'col-md-6 col-lg-4'"
            :value="userValidSetting.requiredUserFullCodeStatus"
            v-on:changeValue="
              userValidSetting.requiredUserFullCodeStatus = $event
            "
            :title="$t('UserValidSettings.UserFullCode')"
          />
          <CustomCheckbox
            :className="'col-md-6 col-lg-4'"
            :value="userValidSetting.requiredUserEmailStatus"
            v-on:changeValue="userValidSetting.requiredUserEmailStatus = $event"
            :title="$t('UserValidSettings.UserEmail')"
          />

          <CustomCheckbox
            :className="'col-md-6 col-lg-4'"
            :value="userValidSetting.requiredUserPhoneStatus"
            v-on:changeValue="userValidSetting.requiredUserPhoneStatus = $event"
            :title="$t('UserValidSettings.UserPhone')"
          />
          <CustomCheckbox
            :className="'col-md-6 col-lg-4'"
            :value="userValidSetting.requiredUserNationalIDStatus"
            v-on:changeValue="
              userValidSetting.requiredUserNationalIDStatus = $event
            "
            :title="$t('UserValidSettings.UserNationalID')"
          />
          <CustomCheckbox
            :className="'col-md-6 col-lg-4'"
            :value="userValidSetting.requiredUserExpiryDateNationalIDStatus"
            v-on:changeValue="
              userValidSetting.requiredUserExpiryDateNationalIDStatus = $event
            "
            :title="$t('UserValidSettings.UserExpiryDateNationalID')"
          />

          <CustomCheckbox
            :className="'col-md-6 col-lg-4'"
            :value="userValidSetting.requiredUserNotesStatus"
            v-on:changeValue="userValidSetting.requiredUserNotesStatus = $event"
            :title="$t('UserValidSettings.UserNotes')"
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
} from "./../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../utils/validationHelper";
import CustomFileInput from "./../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../components/general/CustomInput.vue";
import CustomCheckbox from "./../../../components/general/CustomCheckbox.vue";
import TextArea from "./../../../components/general/TextArea.vue";
import generalMixin from "./../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomCheckbox,
    TextArea,
  },
  data() {
    return {};
  },
  props: {
    userValidSetting: {
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
    userValidSetting: {
      userTypeToken: { required },
      userValidSettingNameAr: { required, isValidNameAr },
      userValidSettingNameEn: { required, isValidNameEn },
      userValidSettingDescriptionAr: { isValidTextAr },
      userValidSettingDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_userTypeToken() {
      let errors = [];
      if (this.$v.userValidSetting.userTypeToken.$error) {
        if (!this.$v.userValidSetting.userTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userValidSettingNameAr() {
      let errors = [];
      if (this.$v.userValidSetting.userValidSettingNameAr.$error) {
        if (
          !this.$v.userValidSetting.userValidSettingNameAr.required &&
          !this.$v.userValidSetting.userValidSettingNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.userValidSetting.userValidSettingNameAr.required &&
          !this.$v.userValidSetting.userValidSettingNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_userValidSettingNameEn() {
      let errors = [];
      if (this.$v.userValidSetting.userValidSettingNameEn.$error) {
        if (
          !this.$v.userValidSetting.userValidSettingNameAr.required &&
          !this.$v.userValidSetting.userValidSettingNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.userValidSetting.userValidSettingNameEn.required &&
          !this.$v.userValidSetting.userValidSettingNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_userValidSettingDescriptionAr() {
      let errors = [];
      if (this.$v.userValidSetting.userValidSettingDescriptionAr.$error) {
        if (
          !this.$v.userValidSetting.userValidSettingDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userValidSettingDescriptionEn() {
      let errors = [];
      if (this.$v.userValidSetting.userValidSettingDescriptionEn.$error) {
        if (
          !this.$v.userValidSetting.userValidSettingDescriptionEn.isValidTextEn
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
        this.$v.userValidSetting.userTypeToken.required &&
        ((this.$v.userValidSetting.userValidSettingNameAr.required &&
          this.$v.userValidSetting.userValidSettingNameAr.isValidNameAr) ||
          (this.$v.userValidSetting.userValidSettingNameEn.required &&
            this.$v.userValidSetting.userValidSettingNameEn.isValidNameEn)) &&
        this.$v.userValidSetting.userValidSettingDescriptionAr.isValidTextAr &&
        this.$v.userValidSetting.userValidSettingDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    fullPathFileFromServer,
  },
  // async created() {},
};
</script>
