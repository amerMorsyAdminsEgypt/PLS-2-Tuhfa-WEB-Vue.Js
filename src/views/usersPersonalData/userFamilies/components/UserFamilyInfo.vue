<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      :refName="'UserFamilyInfo'"
      size="xl"
      :headerText="$t('UserFamilies.data')"
      :headerIcon="userFamily.icon"
      @opened="getDetails()"
    >
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />

      <template v-else>
        <div class="my-card">
          <div class="row">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="
                userFamily.relativeRelationTypeData
                  .relativeRelationTypeNameCurrent
              "
              :title="$t('RelativeRelationTypes.name')"
              :imgName="'RelativeRelationTypes.svg'"
            />
            <CustomCheckbox
              :className="'col-md-6'"
              :value="userFamily.emergencyContactStatus"
              :title="$t('general.emergencyContact')"
              :imgName="'type.svg'"
              :showAsInfo="true"
            />
          </div>
        </div>

        <div class="my-card">
          <span class="my-card-title">{{ $t("parents.data") }}</span>

          <div class="row">
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.fullCode"
              :title="$t('UserFamilies.code')"
              :imgName="'code.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyNameAr"
              :title="$t('UserFamilies.nameAr')"
              :imgName="'UserFamilies.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyNameEn"
              :title="$t('UserFamilies.nameEn')"
              :imgName="'UserFamilies.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyNameUnd"
              :title="$t('UserFamilies.nameUnd')"
              :imgName="'UserFamilies.svg'"
            />

            <DataLabelGroup
              :className="'col-md-6 phone-number'"
              :value="userFamily.userFamilyMainPhoneWithCC"
              :title="$t('Users.phone')"
              :imgName="'phone.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyEmail"
              :title="$t('Users.email')"
              :imgName="'email.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyUserName"
              :title="$t('Users.userName')"
              :imgName="'users.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyNationalNumber"
              :title="$t('Users.nationalID')"
              :imgName="'nationalNumber.svg'"
            />

            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.nationalityCountryData.nationalityNameCurrent"
              :title="$t('Countries.name')"
              :imgName="'countries.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.jobGradeData.jobGradeNameCurrent"
              :title="$t('JobGrades.name')"
              :imgName="'jobGrade.svg'"
            />

            <DataLabelGroup
              :className="'col-md-6 phone-number'"
              :value="userFamily.userFamilyPhone1WithCC"
              :title="$t('Users.userPhone1')"
              :imgName="'phone.svg'"
            />
            <CustomCheckbox
              :className="'col-md-6'"
              :value="userFamily.userFamilyPhone1WhatsAppStatus"
              :title="$t('Users.whatsAppStatus')"
              :imgName="'type.svg'"
              :showAsInfo="true"
            />
            <DataLabelGroup
              :className="'col-md-6 phone-number'"
              :value="userFamily.userFamilyPhone2WithCC"
              :title="$t('Users.userPhone2')"
              :imgName="'phone.svg'"
            />
            <CustomCheckbox
              :className="'col-md-6'"
              :value="userFamily.userFamilyPhone2WhatsAppStatus"
              :title="$t('Users.whatsAppStatus')"
              :imgName="'type.svg'"
              :showAsInfo="true"
            />
            <DataLabelGroup
              :className="'col-md-6 phone-number'"
              :value="userFamily.userFamilyPhone3WithCC"
              :title="$t('Users.userPhone3')"
              :imgName="'phone.svg'"
            />
            <CustomCheckbox
              :className="'col-md-6'"
              :value="userFamily.userFamilyPhone3WhatsAppStatus"
              :title="$t('Users.whatsAppStatus')"
              :imgName="'type.svg'"
              :showAsInfo="true"
            />

            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyAddressAr"
              :title="$t('UserFamilies.addressAr')"
              :imgName="'address.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyAddressEn"
              :title="$t('UserFamilies.addressEn')"
              :imgName="'address.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyAddressUnd"
              :title="$t('UserFamilies.addressUnd')"
              :imgName="'address.svg'"
            />
            <DataLabelGroup
              :className="'col-md-6'"
              :value="userFamily.userFamilyNotes"
              :title="$t('notes')"
              :imgName="'notes.svg'"
            />
          </div>
        </div>
      </template>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import { STATUS } from "./../../../../utils/constants";
import UserFamily from "./../../../../models/usersPersonalData/userFamilies/UserFamily";
import apiUserFamily from "./../../../../api/usersPersonalData/userFamilies";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
    CustomCheckbox,
  },
  props: ["token"],
  data() {
    return {
      userFamily: new UserFamily(),
    };
  },
  methods: {
    async getDetails() {
      this.isLoading = true;
      try {
        let filter = { token: this.token };
        this.userFamily.setInitialValue();
        const response = await apiUserFamily.getDetails(filter);
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.userFamily.fillData(response.data.userFamily);
      } catch (e) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
};
</script>
