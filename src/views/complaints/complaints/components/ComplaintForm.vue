<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="
            complaint.mediaFile = $event.file;
            complaint.complaintMediaTypeToken = $event.mediaTypeToken;
          "
          :defaultImg="
            fullPathFileFromServer(
              complaint.complaintMediaPath,
              complaint.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !complaint.complaintMediaIsDefault &&
            checkPrivilege(hasComplaintDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="complaint.fullCode"
            v-on:changeValue="complaint.fullCode = $event"
            :title="$t('Complaints.code')"
            :imgName="'code.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintTitleAr`"
            :errors="errors_complaintTitleAr"
            :value="complaint.complaintTitleAr"
            v-on:changeValue="
              complaint.complaintTitleAr = $event;
              $v.complaint.complaintTitleAr.$touch();
            "
            :title="$t('Complaints.titleAr')"
            :imgName="'complaints.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintTitleEn`"
            :errors="errors_complaintTitleEn"
            :value="complaint.complaintTitleEn"
            v-on:changeValue="
              complaint.complaintTitleEn = $event;
              $v.complaint.complaintTitleEn.$touch();
            "
            :title="$t('Complaints.titleEn')"
            :imgName="'complaints.svg'"
          />
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-complaintTitleUnd`"
            :value="complaint.complaintTitleUnd"
            v-on:changeValue="complaint.complaintTitleUnd = $event"
            :title="$t('Complaints.titleUnd')"
            :imgName="'complaints.svg'"
          />

          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintDescriptionAr`"
            :errors="errors_complaintDescriptionAr"
            :value="complaint.complaintDescriptionAr"
            v-on:changeValue="
              complaint.complaintDescriptionAr = $event;
              $v.complaint.complaintDescriptionAr.$touch();
            "
            :title="$t('Complaints.descriptionAr')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintDescriptionEn`"
            :errors="errors_complaintDescriptionEn"
            :value="complaint.complaintDescriptionEn"
            v-on:changeValue="
              complaint.complaintDescriptionEn = $event;
              $v.complaint.complaintDescriptionEn.$touch();
            "
            :title="$t('Complaints.descriptionEn')"
            :imgName="'description.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-complaintDescriptionUnd`"
            :value="complaint.complaintDescriptionUnd"
            v-on:changeValue="complaint.complaintDescriptionUnd = $event"
            :title="$t('Complaints.descriptionUnd')"
            :imgName="'description.svg'"
          />
          <template v-if="submitName != $t('edit')">
            <CustomSelectBox
              :className="'col-md-6'"
              :id="'userTypeToken'"
              :value="complaint.userTypeToken"
              :options="userTypeTokenOptions"
              v-on:changeValue="
                complaint.userTypeToken = $event;
                getUsersDialog();
              "
              :title="$t('Users.selectType')"
              :imgName="'type.svg'"
            />
            <CustomSelectBox
              :className="'col-md-6'"
              :id="`${id}-complainingPersonUserToken`"
              :value="complaint.complainingPersonUserToken"
              :options="userTokenOptions"
              v-on:changeValue="complaint.complainingPersonUserToken = $event"
              :title="$t('Complaints.complainingPersonUser')"
              :imgName="'user.svg'"
            />
          </template>
          <DataLabelGroup
            v-else
            :className="'col-md-6'"
            :value="complaint.complainingPersonUserInfoData.userNameCurrent"
            :title="$t('Complaints.complainingPersonUser')"
            :imgName="'user.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-priorityTypeToken`"
            :value="complaint.priorityTypeToken"
            :options="priorityTypeTokenOptions"
            v-on:changeValue="complaint.priorityTypeToken = $event"
            :title="$t('PriorityTypes.select')"
            :imgName="'priorityTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-complaintTypeToken`"
            :value="complaint.complaintTypeToken"
            :options="complaintTypeTokenOptions"
            v-on:changeValue="complaint.complaintTypeToken = $event"
            :title="$t('ComplaintTypes.select')"
            :imgName="'complaintTypes.svg'"
          />
          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-complaintSectorToken`"
            :value="complaint.complaintSectorToken"
            :options="complaintSectorTokenOptions"
            v-on:changeValue="complaint.complaintSectorToken = $event"
            :title="$t('ComplaintSectors.select')"
            :imgName="'complaintSectors.svg'"
          />
          <TextArea
            :className="submitName != $t('edit') ? 'col-md-12' : 'col-md-6'"
            :id="`${id}-complaintNotes`"
            :value="complaint.complaintNotes"
            v-on:changeValue="complaint.complaintNotes = $event"
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
} from "./../../../../utils/functions";
import {
  isValidNameAr,
  isValidNameEn,
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { hasComplaintDeleteImage } from "./../../../../utils/privilegeHelper";
import { checkPrivilege } from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import {
  USER_TYPE,
  PRIORITY_SCOPE_TYPE_TOKENS,
} from "./../../../../utils/constantLists";
import {
  getUsersDialog,
  getPriorityTypesDialog,
  getComplaintTypesDialog,
  getComplaintSectorsDialog,
} from "./../../../../utils/dialogsOfApi";
import { getDialogOfUserTypes } from "./../../../../utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomSelectBox,
    CustomInput,
    TextArea,
    DataLabelGroup,
  },
  data() {
    return {
      userTypeTokenOptions: getDialogOfUserTypes(),
      userTokenOptions: [],
      priorityTypeTokenOptions: [],
      complaintTypeTokenOptions: [],
      complaintSectorTokenOptions: [],
    };
  },
  props: {
    complaint: {
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
    complaint: {
      complaintTitleAr: { required, isValidNameAr },
      complaintTitleEn: { required, isValidNameEn },
      complaintDescriptionAr: { isValidTextAr },
      complaintDescriptionEn: { isValidTextEn },
    },
  },
  computed: {
    errors_complaintTitleAr() {
      let errors = [];
      if (this.$v.complaint.complaintTitleAr.$error) {
        if (
          !this.$v.complaint.complaintTitleAr.required &&
          !this.$v.complaint.complaintTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.complaint.complaintTitleAr.required &&
          !this.$v.complaint.complaintTitleAr.isValidNameAr
        )
          errors.push(this.$t("validation.nameIsRequiredInAr"));
      }
      return errors;
    },
    errors_complaintTitleEn() {
      let errors = [];
      if (this.$v.complaint.complaintTitleEn.$error) {
        if (
          !this.$v.complaint.complaintTitleAr.required &&
          !this.$v.complaint.complaintTitleEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.complaint.complaintTitleEn.required &&
          !this.$v.complaint.complaintTitleEn.isValidNameEn
        )
          errors.push(this.$t("validation.nameIsRequiredInEn"));
      }
      return errors;
    },
    errors_complaintDescriptionAr() {
      let errors = [];
      if (this.$v.complaint.complaintDescriptionAr.$error) {
        if (!this.$v.complaint.complaintDescriptionAr.isValidTextAr)
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_complaintDescriptionEn() {
      let errors = [];
      if (this.$v.complaint.complaintDescriptionEn.$error) {
        if (!this.$v.complaint.complaintDescriptionEn.isValidTextEn)
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async getUsersDialog() {
      this.isLoading = true;
      let params = {};
      switch (this.complaint.userTypeToken) {
        case USER_TYPE.AdminsEgypt:
          params = {
            modelName: "adminsEgypt",
            userTypeToken: USER_TYPE.AdminsEgypt,
          };
          break;
        case USER_TYPE.MasterAdmin:
          params = {
            modelName: "masterAdmins",
            userTypeToken: USER_TYPE.MasterAdmin,
          };
          break;
        case USER_TYPE.Employee:
          params = {
            modelName: "employees",
            userTypeToken: USER_TYPE.Employee,
          };
          break;
        case USER_TYPE.Student:
          params = {
            modelName: "students",
            userTypeToken: USER_TYPE.Student,
          };
          break;
        case USER_TYPE.Supplier:
          params = {
            modelName: "suppliers",
            userTypeToken: USER_TYPE.Supplier,
          };
          break;
        case USER_TYPE.Parent:
          params = {
            modelName: "parents",
            userTypeToken: USER_TYPE.Parent,
          };
          break;
        case USER_TYPE.Client:
          params = {
            modelName: "clients",
            userTypeToken: USER_TYPE.Client,
          };
          break;
      }
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async getPriorityTypesDialog() {
      this.isLoading = true;
      let params = {
        priorityScopeTypeToken: PRIORITY_SCOPE_TYPE_TOKENS.Complaints,
      };
      this.priorityTypeTokenOptions = await getPriorityTypesDialog(params);
      this.isLoading = false;
    },
    async getComplaintTypesDialog() {
      this.isLoading = true;

      this.complaintTypeTokenOptions = await getComplaintTypesDialog();
      this.isLoading = false;
    },
    async getComplaintSectorsDialog() {
      this.isLoading = true;

      this.complaintSectorTokenOptions = await getComplaintSectorsDialog();
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      this.$v.$touch();
      if (
        ((this.$v.complaint.complaintTitleAr.required &&
          this.$v.complaint.complaintTitleAr.isValidNameAr) ||
          (this.$v.complaint.complaintTitleEn.required &&
            this.$v.complaint.complaintTitleEn.isValidNameEn)) &&
        this.$v.complaint.complaintDescriptionAr.isValidTextAr &&
        this.$v.complaint.complaintDescriptionEn.isValidTextEn
      ) {
        this.$emit("submitForm");
      }
    },
    checkPrivilege,
    hasComplaintDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getUsersDialog();
    this.getPriorityTypesDialog();
    this.getComplaintTypesDialog();
    this.getComplaintSectorsDialog();
  },
};
</script>
