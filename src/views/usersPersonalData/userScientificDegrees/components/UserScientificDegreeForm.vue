<template>
  <div class="">
    <PreLoader v-if="isLoading" />
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="userScientificDegree.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              userScientificDegree.userScientificDegreeImagePath,
              userScientificDegree.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !userScientificDegree.userScientificDegreeImageIsDefault &&
            hasPrivilegeDeleteImage
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-scientificDegreeToken`"
            :errors="errors_scientificDegreeToken"
            :value="userScientificDegree.scientificDegreeToken"
            :options="scientificDegreeTokenOptions"
            v-on:changeValue="
              userScientificDegree.scientificDegreeToken = $event;
              $v.userScientificDegree.scientificDegreeToken.$touch();
            "
            :title="$t('ScientificDegrees.select')"
            :imgName="'scientificDegrees.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-classificationDegreeToken`"
            :value="userScientificDegree.classificationDegreeToken"
            :options="classificationDegreeTokenOptions"
            v-on:changeValue="
              userScientificDegree.classificationDegreeToken = $event
            "
            :title="$t('ClassificationDegrees.select')"
            :imgName="'classificationDegrees.svg'"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-joiningDateTime`"
            type="dateTime"
            :value="userScientificDegree.joiningDateTime"
            :title="$t('UserScientificDegrees.joiningDateTime')"
            v-on:changeValue="
              userScientificDegree.joiningDateTime = $event.dateTime
            "
            :language="language"
          />

          <DateTimePicker
            class="col-md-6"
            :id="`${id}-obtainingDateTime`"
            type="dateTime"
            :value="userScientificDegree.obtainingDateTime"
            :title="$t('UserScientificDegrees.obtainingDateTime')"
            v-on:changeValue="
              userScientificDegree.obtainingDateTime = $event.dateTime
            "
            :language="language"
          />

          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="userScientificDegree.fullCode"
            v-on:changeValue="userScientificDegree.fullCode = $event"
            :title="$t('UserScientificDegrees.code')"
            :imgName="'code.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userScientificDegreeDescriptionAr`"
            :errors="errors_userScientificDegreeDescriptionAr"
            :value="userScientificDegree.userScientificDegreeDescriptionAr"
            v-on:changeValue="
              userScientificDegree.userScientificDegreeDescriptionAr = $event;
              $v.userScientificDegree.userScientificDegreeDescriptionAr.$touch();
            "
            :title="$t('UserScientificDegrees.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userScientificDegreeDescriptionEn`"
            :errors="errors_userScientificDegreeDescriptionEn"
            :value="userScientificDegree.userScientificDegreeDescriptionEn"
            v-on:changeValue="
              userScientificDegree.userScientificDegreeDescriptionEn = $event;
              $v.userScientificDegree.userScientificDegreeDescriptionEn.$touch();
            "
            :title="$t('UserScientificDegrees.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-userScientificDegreeDescriptionUnd`"
            :value="userScientificDegree.userScientificDegreeDescriptionUnd"
            v-on:changeValue="
              userScientificDegree.userScientificDegreeDescriptionUnd = $event
            "
            :title="$t('UserScientificDegrees.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-12'"
            :id="`${id}-userScientificDegreeNotes`"
            :value="userScientificDegree.userScientificDegreeNotes"
            v-on:changeValue="
              userScientificDegree.userScientificDegreeNotes = $event
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
  hasAdminsEgyptScientificDegreeDeleteImage,
  hasMasterAdminScientificDegreeDeleteImage,
  hasEmployeeScientificDegreeDeleteImage,
  hasStudentScientificDegreeDeleteImage,
  hasSupplierScientificDegreeDeleteImage,
  hasParentScientificDegreeDeleteImage,
  hasClientScientificDegreeDeleteImage,
} from "./../../../../utils/privilegeHelper";
import { checkPrivilege, getLanguage } from "./../../../../utils/functions";
import {
  getScientificDegreesDialog,
  getClassificationDegreesDialog,
} from "./../../../../utils/dialogsOfApi";
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
      scientificDegreeTokenOptions: [],
      classificationDegreeTokenOptions: [],
    };
  },
  props: {
    userScientificDegree: {
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
    userScientificDegree: {
      scientificDegreeToken: { required },
      userScientificDegreeDescriptionAr: { isValidTextAr },
      userScientificDegreeDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_scientificDegreeToken() {
      let errors = [];
      if (this.$v.userScientificDegree.scientificDegreeToken.$error) {
        if (!this.$v.userScientificDegree.scientificDegreeToken.required)
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_userScientificDegreeDescriptionAr() {
      let errors = [];
      if (
        this.$v.userScientificDegree.userScientificDegreeDescriptionAr.$error
      ) {
        if (
          !this.$v.userScientificDegree.userScientificDegreeDescriptionAr
            .isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_userScientificDegreeDescriptionEn() {
      let errors = [];
      if (
        this.$v.userScientificDegree.userScientificDegreeDescriptionEn.$error
      ) {
        if (
          !this.$v.userScientificDegree.userScientificDegreeDescriptionEn
            .isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
    hasPrivilegeDeleteImage() {
      let status = false;
      switch (this.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          status = checkPrivilege(hasAdminsEgyptScientificDegreeDeleteImage());
          break;
        case USER_TYPE.MasterAdmin:
          status = checkPrivilege(hasMasterAdminScientificDegreeDeleteImage());
          break;
        case USER_TYPE.Employee:
          status = checkPrivilege(hasEmployeeScientificDegreeDeleteImage());
          break;
        case USER_TYPE.Student:
          status = checkPrivilege(hasStudentScientificDegreeDeleteImage());
          break;
        case USER_TYPE.Supplier:
          status = checkPrivilege(hasSupplierScientificDegreeDeleteImage());
          break;
        case USER_TYPE.Parent:
          status = checkPrivilege(hasParentScientificDegreeDeleteImage());
          break;
        case USER_TYPE.Client:
          status = checkPrivilege(hasClientScientificDegreeDeleteImage());
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
        this.$v.userScientificDegree.scientificDegreeToken.required &&
        this.$v.userScientificDegree.userScientificDegreeDescriptionAr
          .isValidTextAr &&
        this.$v.userScientificDegree.userScientificDegreeDescriptionEn
          .isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    async getScientificDegreesDialog() {
      this.isLoading = true;
      this.scientificDegreeTokenOptions = await getScientificDegreesDialog();
      this.isLoading = false;
    },
    async getClassificationDegreesDialog() {
      this.isLoading = true;
      this.classificationDegreeTokenOptions =
        await getClassificationDegreesDialog();
      this.isLoading = false;
    },
    fullPathFileFromServer,
  },
  created() {
    this.getScientificDegreesDialog();
    this.getClassificationDegreesDialog();
  },
};
</script>
