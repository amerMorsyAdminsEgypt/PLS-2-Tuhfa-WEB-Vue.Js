<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="interest.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              interest.interestImagePath,
              interest.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !interest.interestImageIsDefault &&
            checkPrivilege(hasInterestDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-studentUserToken`"
            :value="interest.studentUserToken"
            :options="userTokenOptions"
            v-on:changeValue="interest.studentUserToken = $event"
            :title="$t('students.select')"
            :imgName="'students.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="interest.fullCode"
            v-on:changeValue="interest.fullCode = $event"
            :title="$t('Interests.code')"
            :imgName="'code.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-interestDescriptionAr`"
            :errors="errors_interestDescriptionAr"
            :value="interest.interestDescriptionAr"
            v-on:changeValue="
              interest.interestDescriptionAr = $event;
              $v.interest.interestDescriptionAr.$touch();
            "
            :title="$t('Interests.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-interestDescriptionEn`"
            :errors="errors_interestDescriptionEn"
            :value="interest.interestDescriptionEn"
            v-on:changeValue="
              interest.interestDescriptionEn = $event;
              $v.interest.interestDescriptionEn.$touch();
            "
            :title="$t('Interests.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-interestDescriptionUnd`"
            :value="interest.interestDescriptionUnd"
            v-on:changeValue="interest.interestDescriptionUnd = $event"
            :title="$t('Interests.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-interestNotes`"
            :value="interest.interestNotes"
            v-on:changeValue="interest.interestNotes = $event"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
        <EducationalCategoryInterestData
          :listData="interest.educationalCategoryInterestData"
          :msg="$t('Interests.dataDetails')"
          :id="'Interest'"
        />
        <EducationalCategoryInterestData
          :listData="interest.educationalCategoryOtherInterestData"
          :msg="$t('Interests.dataOther')"
          :id="'InterestOther'"
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
  fullPathFileFromServer,
  bottomSheetScrollToTop,
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { hasInterestDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { getUsersDialog } from "./../../../../utils/dialogsOfApi";
import { USER_TYPE } from "./../../../../utils/constantLists";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import EducationalCategoryInterestData from "./EducationalCategoryInterestData";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomSelectBox,
    TextArea,
    EducationalCategoryInterestData,
  },
  data() {
    return {
      userTokenOptions: [],
    };
  },
  props: {
    interest: {
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
    interest: {
      interestNameAr: { required, isValidNameAr },
      interestNameEn: { required, isValidNameEn },
      interestDescriptionAr: { isValidTextAr },
      interestDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_interestNameAr() {
      let errors = [];
      if (this.$v.interest.interestNameAr.$error) {
        if (
          !this.$v.interest.interestNameAr.required &&
          !this.$v.interest.interestNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.interest.interestNameAr.required &&
          !this.$v.interest.interestNameAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_interestNameEn() {
      let errors = [];
      if (this.$v.interest.interestNameEn.$error) {
        if (
          !this.$v.interest.interestNameAr.required &&
          !this.$v.interest.interestNameEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.interest.interestNameEn.required &&
          !this.$v.interest.interestNameEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_interestDescriptionAr() {
      let errors = [];
      if (this.$v.interest.interestDescriptionAr.$error) {
        if (!this.$v.interest.interestDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_interestDescriptionEn() {
      let errors = [];
      if (this.$v.interest.interestDescriptionEn.$error) {
        if (!this.$v.interest.interestDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        this.$v.interest.interestDescriptionAr.isValidTextAr &&
        this.$v.interest.interestDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasInterestDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getStudentsDialog();
  },
};
</script>
