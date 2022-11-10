<template>
  <CustomBottomSheet
    :refName="'UserInfo'"
    size="xl"
    :headerText="$t('Users.data')"
    :headerIcon="user.icon"
    @opened="getUserDetails()"
  >
    <PreLoader v-if="isLoading" />

    <ExceptionWithImg
      v-if="exceptionMsg"
      :msg="exceptionMsg"
      :image="exceptionImg"
    />
    <div v-else class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="user.fullCode"
        :title="$t('Users.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="user.userTypeNameCurrent"
        :title="$t('Users.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        v-if="user.userTypeToken == USER_TYPE.Employee"
        :className="'col-md-6'"
        :value="user.userActivityTypeNameCurrent"
        :title="$t('Users.activityType')"
        :imgName="'activity-types.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="user.userNameAr"
        :title="$t('Users.nameAr')"
        :imgName="'users.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="user.userNameEn"
        :title="$t('Users.nameEn')"
        :imgName="'users.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="user.userNameUnd"
        :title="$t('Users.nameUnd')"
        :imgName="'users.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6 phone-number'"
        :value="user.userPhoneWithCC"
        :title="$t('Users.phone')"
        :imgName="'phone.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="user.userEmail"
        :title="$t('Users.email')"
        :imgName="'email.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="user.userName"
        :title="$t('Users.userName')"
        :imgName="'user.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          user.establishmentRoleData
            ? user.establishmentRoleData.establishmentRoleNameCurrent
            : ''
        "
        :title="$t('EstablishmentRoles.name')"
        :imgName="'type.svg'"
      />
      <!-- userProfileData -->
      <template v-if="user.userProfileData">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userGenderNameCurrent"
          :title="$t('Users.gender')"
          :imgName="'gender.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userBirthPlaceNameCurrent"
          :title="$t('Users.userBirthPlace')"
          :imgName="'address.svg'"
        />
        <template v-if="user.userTypeToken == USER_TYPE.Student">
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              user.userProfileData.educationalStageData
                .educationalStageNameCurrent
            "
            :title="$t('EducationalStages.name')"
            :imgName="'educationalStages.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="user.userProfileData.specialtieData.specialtieNameCurrent"
            :title="$t('Specialties.name')"
            :imgName="'specialties.svg'"
          />
        </template>

        <!-- baseTree -->
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.jobGradeData.systemComponentsHierarchyData
              .systemComponentHierarchyNameCurrent
          "
          :title="$t('SystemComponentsHierarchies.jobGrade')"
          :imgName="'systemComponentsHierarchies.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.jobGradeData.systemComponentData
              .systemComponentNameCurrent
          "
          :title="$t('SystemComponents.jobGrade')"
          :imgName="'systemComponents.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.jobGradeData.jobGradeNameCurrent"
          :title="$t('JobGrades.name')"
          :imgName="'jobGrade.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.geographicalDistributionData
              .systemComponentsHierarchyData.systemComponentHierarchyNameCurrent
          "
          :title="$t('SystemComponentsHierarchies.geographicalDistribution')"
          :imgName="'systemComponentsHierarchies.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.geographicalDistributionData
              .systemComponentData.systemComponentNameCurrent
          "
          :title="$t('SystemComponents.geographicalDistribution')"
          :imgName="'systemComponents.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.geographicalDistributionData
              .geographicalDistributionNameCurrent
          "
          :title="$t('GeographicalDistributions.name')"
          :imgName="'geographicalDistributions.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              user.userProfileData.userBirthDate,
              user.userProfileData.userBirthTime
            )
          "
          :title="$t('Users.userBirthDateTime')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.militaryStatusTypeData
              .militaryStatusTypeNameCurrent
          "
          :title="$t('MilitaryStatusTypes.name')"
          :imgName="'militaryStatus.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              user.userProfileData.militaryStatuseTypeStartDate,
              user.userProfileData.militaryStatuseTypeStartTime
            )
          "
          :title="$t('Users.militaryStatuseTypeStartDateTime')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              user.userProfileData.militaryStatuseTypeEndDate,
              user.userProfileData.militaryStatuseTypeEndTime
            )
          "
          :title="$t('Users.militaryStatuseTypeEndDateTime')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userAddressCurrent"
          :title="$t('Users.address')"
          :imgName="'address.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userGeneralNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6 phone-number'"
          :value="user.userProfileData.userPhone1WithCC"
          :title="$t('Users.userPhone1')"
          :imgName="'phone.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.userPhone1WhatsAppStatus
              ? $t('activeStatus')
              : $t('disActiveStatus')
          "
          :title="$t('Users.whatsAppStatus')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6 phone-number'"
          :value="user.userProfileData.userPhone2WithCC"
          :title="$t('Users.userPhone2')"
          :imgName="'phone.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.userPhone2WhatsAppStatus
              ? $t('activeStatus')
              : $t('disActiveStatus')
          "
          :title="$t('Users.whatsAppStatus')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6 phone-number'"
          :value="user.userProfileData.userPhone3WithCC"
          :title="$t('Users.userPhone3')"
          :imgName="'phone.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.userPhone3WhatsAppStatus
              ? $t('activeStatus')
              : $t('disActiveStatus')
          "
          :title="$t('Users.whatsAppStatus')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.nationalityCountryData
              .nationalityCountryNameCurrent
          "
          :title="$t('countries.nationality')"
          :imgName="'countries.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userEmail"
          :title="$t('Users.userEmail')"
          :imgName="'email.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.socialStatuseData.socialStatuseNameCurrent
          "
          :title="$t('SocialStatuses.name')"
          :imgName="'socialStatuses.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userSocialStatuseNotes"
          :title="$t('Users.userSocialStatuseNotes')"
          :imgName="'notes.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.insuranceCompanyData
              .insuranceCompanyNameCurrent
          "
          :title="$t('InsuranceCompanies.name')"
          :imgName="'insuranceCompanies.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userInsuranceNumber"
          :title="$t('Users.insuranceNumber')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.bankData.bankNameCurrent"
          :title="$t('Banks.name')"
          :imgName="'banks.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userBankAccountNumber"
          :title="$t('Users.bankAccountNumber')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userCitizenshipTypeNameCurrent"
          :title="$t('Users.citizenship')"
          :imgName="'citizenship.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            user.userProfileData.parentsSocialStatusData
              .socialStatuseNameCurrent
          "
          :title="$t('Users.parentsSocialStatus')"
          :imgName="'socialStatuses.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.fatherDeathTypeNameCurrent"
          :title="$t('Users.fatherDeathType')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.motherDeathTypeNameCurrent"
          :title="$t('Users.motherDeathType')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="user.userProfileData.userNationalNumber"
          :title="$t('Users.nationalID')"
          :imgName="'nationalNumber.svg'"
        />
        <DataLabelGroup
          :className="
            user.userTypeToken != USER_TYPE.Employee ? 'col-md-12' : 'col-md-6'
          "
          :value="user.userProfileData.religionNameCurrent"
          :title="$t('Religions.name')"
          :imgName="'religions.svg'"
        />
      </template>
    </div>
  </CustomBottomSheet>
</template>

<script>
import PreLoader from "./../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../components/general/ExceptionWithImg.vue";
import CustomBottomSheet from "./../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../utils/functions";
import userDetailsMixin from "./userDetailsMixin";
import { USER_TYPE } from "./../../utils/constantLists";

export default {
  mixins: [userDetailsMixin],
  components: {
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheet,
    DataLabelGroup,
  },
  // props: ["user"],
  // props: ["userToken"],
  methods: {
    formateDateTimeLang,
  },
  data() {
    return {
      USER_TYPE,
    };
  },
};
</script>
