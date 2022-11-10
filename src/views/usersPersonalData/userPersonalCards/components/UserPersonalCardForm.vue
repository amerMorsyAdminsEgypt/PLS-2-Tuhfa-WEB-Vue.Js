<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userPersonalCard.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userPersonalCard.userPersonalCardImagePath,
              userPersonalCard.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !userPersonalCard.userPersonalCardImageIsDefault &&
            hasPrivilegeDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userPersonalCard.fullCode"
            v-on:changeValue="userPersonalCard.fullCode = $event"
            :title="$t('UserPersonalCards.code')"
            :imgName="'code.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-personalCardTypeToken`"
            :errors="errors_personalCardTypeToken"
            :value="userPersonalCard.personalCardTypeToken"
            :options="personalCardTypeTokenOptions"
            v-on:changeValue="
              userPersonalCard.personalCardTypeToken = $event;
              $v.userPersonalCard.personalCardTypeToken.$touch();
            "
            :title="$t('PersonalCardTypes.select')"
            :imgName="'personalCardTypes.svg'"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-userPersonalCardCreationDateTime`"
            type="dateTime"
            :value="userPersonalCard.userPersonalCardCreationDateTime"
            :title="$t('UserPersonalCards.creationDateTime')"
            v-on:changeValue="
              userPersonalCard.userPersonalCardCreationDateTime =
                $event.dateTime
            "
            :language="language"
          />
          <DateTimePicker
            class="col-md-6"
            :id="`${id}-userPersonalCardExpirationDateTime`"
            type="dateTime"
            :value="userPersonalCard.userPersonalCardExpirationDateTime"
            :title="$t('UserPersonalCards.expirationDateTime')"
            v-on:changeValue="
              userPersonalCard.userPersonalCardExpirationDateTime =
                $event.dateTime
            "
            :language="language"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-userPersonalCardNumber`"
            :errors="errors_userPersonalCardNumber"
            :value="userPersonalCard.userPersonalCardNumber"
            v-on:changeValue="
              userPersonalCard.userPersonalCardNumber = $event;
              $v.userPersonalCard.userPersonalCardNumber.$touch();
            "
            :title="$t('UserPersonalCards.cardNumber')"
            :imgName="'number.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userPersonalCardCreationPlaceNameAr`"
            :value="userPersonalCard.userPersonalCardCreationPlaceNameAr"
            v-on:changeValue="
              userPersonalCard.userPersonalCardCreationPlaceNameAr = $event
            "
            :title="$t('UserPersonalCards.creationPlaceNameAr')"
            :imgName="'address.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userPersonalCardCreationPlaceNameEn`"
            :value="userPersonalCard.userPersonalCardCreationPlaceNameEn"
            v-on:changeValue="
              userPersonalCard.userPersonalCardCreationPlaceNameEn = $event
            "
            :title="$t('UserPersonalCards.creationPlaceNameEn')"
            :imgName="'address.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userPersonalCardCreationPlaceNameUnd`"
            :value="userPersonalCard.userPersonalCardCreationPlaceNameUnd"
            v-on:changeValue="
              userPersonalCard.userPersonalCardCreationPlaceNameUnd = $event
            "
            :title="$t('UserPersonalCards.creationPlaceNameUnd')"
            :imgName="'address.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userPersonalCardDescriptionAr`"
            :errors="errors_userPersonalCardDescriptionAr"
            :value="userPersonalCard.userPersonalCardDescriptionAr"
            v-on:changeValue="
              userPersonalCard.userPersonalCardDescriptionAr = $event;
              $v.userPersonalCard.userPersonalCardDescriptionAr.$touch();
            "
            :title="$t('UserPersonalCards.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userPersonalCardDescriptionEn`"
            :errors="errors_userPersonalCardDescriptionEn"
            :value="userPersonalCard.userPersonalCardDescriptionEn"
            v-on:changeValue="
              userPersonalCard.userPersonalCardDescriptionEn = $event;
              $v.userPersonalCard.userPersonalCardDescriptionEn.$touch();
            "
            :title="$t('UserPersonalCards.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userPersonalCardDescriptionUnd`"
            :value="userPersonalCard.userPersonalCardDescriptionUnd"
            v-on:changeValue="
              userPersonalCard.userPersonalCardDescriptionUnd = $event
            "
            :title="$t('UserPersonalCards.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userPersonalCardNotes`"
            :value="userPersonalCard.userPersonalCardNotes"
            v-on:changeValue="userPersonalCard.userPersonalCardNotes = $event"
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
import { USER_TYPE } from "./../../../../utils/constantLists";
import {
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import {
  hasAdminsEgyptPersonalCardDeleteImage,
  hasMasterAdminPersonalCardDeleteImage,
  hasEmployeePersonalCardDeleteImage,
  hasStudentPersonalCardDeleteImage,
  hasSupplierPersonalCardDeleteImage,
  hasParentPersonalCardDeleteImage,
  hasClientPersonalCardDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege, getLanguage } from "./../../../../utils/functions";
import { getPersonalCardTypesDialog } from "./../../../../utils/dialogsOfApi";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    PreLoader,
    CustomSelectBox,
    CustomInput,
    DateTimePicker,
    TextArea,
  },
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      personalCardTypeTokenOptions: [],
    };
  },
  props: {
    userPersonalCard: {
      type: Object,
    },
    userTypeToken: {
      type: String,
      default: "",
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
    userPersonalCard: {
      personalCardTypeToken: { required },
      userPersonalCardNumber: { required },
      userPersonalCardDescriptionAr: { isValidTextAr },
      userPersonalCardDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_personalCardTypeToken() {
      let errors = [];
      if (this.$v.userPersonalCard.personalCardTypeToken.$error) {
        if (!this.$v.userPersonalCard.personalCardTypeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userPersonalCardNumber() {
      let errors = [];
      if (this.$v.userPersonalCard.userPersonalCardNumber.$error) {
        if (!this.$v.userPersonalCard.userPersonalCardNumber.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userPersonalCardDescriptionAr() {
      let errors = [];
      if (this.$v.userPersonalCard.userPersonalCardDescriptionAr.$error) {
        if (
          !this.$v.userPersonalCard.userPersonalCardDescriptionAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userPersonalCardDescriptionEn() {
      let errors = [];
      if (this.$v.userPersonalCard.userPersonalCardDescriptionEn.$error) {
        if (
          !this.$v.userPersonalCard.userPersonalCardDescriptionEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasPrivilegeDeleteImage() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptPersonalCardDeleteImage());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminPersonalCardDeleteImage());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeePersonalCardDeleteImage());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentPersonalCardDeleteImage());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierPersonalCardDeleteImage());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentPersonalCardDeleteImage());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientPersonalCardDeleteImage());
          break;
      }
      return status;
    },
  },
  methods: {
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();

      if (
        this.$v.userPersonalCard.personalCardTypeToken.required &&
        this.$v.userPersonalCard.userPersonalCardNumber.required &&
        this.$v.userPersonalCard.userPersonalCardDescriptionAr.isValidTextAr &&
        this.$v.userPersonalCard.userPersonalCardDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    async getPersonalCardTypesDialog() {
      this.isLoading = true;
      this.personalCardTypeTokenOptions = await getPersonalCardTypesDialog();
      this.isLoading = false;
    },

    fullPathFileFromServer,
  },
  created() {
    this.getPersonalCardTypesDialog();
  },
};
</script>
