<template>
  <CustomBottomSheet
    :refName="'EducationalJoiningApplicationInfo'"
    size="xl"
    :headerText="$t('EducationalJoiningApplications.data')"
    :headerIcon="educationalJoiningApplication.icon"
  >
    <div class="my-card">
      <span class="my-card-title">{{ $t("students.data") }}</span>
      <span class="my-card-title end">
        <router-link
          v-if="
            checkPrivilege(hasStudent()) &&
            educationalJoiningApplication.userStudentInfoData &&
            educationalJoiningApplication.userStudentInfoData.userToken
          "
          :to="{
            name: 'Students',
            params: {
              userToken:
                educationalJoiningApplication.userStudentInfoData.userToken,
            },
          }"
          :title="$t('students.data')"
        >
          <img src="@/assets/images/info.svg" />
        </router-link>
      </span>

      <div class="row" v-if="approvalTypeAccepted">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.userStudentInfoData.userNameCurrent
          "
          :title="$t('Users.nameAr')"
          :imgName="'students.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6 phone-number'"
          :value="
            educationalJoiningApplication.userStudentInfoData.userPhoneWithCC
          "
          :title="$t('Users.phone')"
          :imgName="'phone.svg'"
        />
      </div>
      <div class="row" v-else>
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalJoiningApplication.studentNameAr"
          :title="$t('Users.nameAr')"
          :imgName="'students.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalJoiningApplication.studentNameEn"
          :title="$t('Users.nameEn')"
          :imgName="'students.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalJoiningApplication.studentNameUnd"
          :title="$t('Users.nameUnd')"
          :imgName="'students.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalJoiningApplication.studentNationalNumber"
          :title="$t('Users.nationalID')"
          :imgName="'nationalNumber.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6 phone-number'"
          :value="educationalJoiningApplication.studentPhoneWithCC"
          :title="$t('Users.phone')"
          :imgName="'phone.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalJoiningApplication.studentEmail"
          :title="$t('Users.email')"
          :imgName="'email.svg'"
        />
      </div>
    </div>

    <div class="my-card">
      <span class="my-card-title">{{ $t("EducationalPeriods.data") }}</span>

      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalPeriodInfoData
              .educationalPeriodNameCurrent
          "
          :title="$t('general.name')"
          :imgName="'educationalPeriods.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalPeriodInfoData
              .educationalPeriodDurationCurrent
          "
          :title="$t('general.duration')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              educationalJoiningApplication.educationalPeriodInfoData
                .educationalPeriodStartDate,
              educationalJoiningApplication.educationalPeriodInfoData
                .educationalPeriodStartTime
            )
          "
          :title="$t('from')"
          :imgName="'dateAndTime.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              educationalJoiningApplication.educationalPeriodInfoData
                .educationalPeriodEndDate,
              educationalJoiningApplication.educationalPeriodInfoData
                .educationalPeriodEndTime
            )
          "
          :title="$t('to')"
          :imgName="'dateAndTime.svg'"
        />
      </div>
    </div>

    <div class="my-card">
      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalJoiningApplication.fullCode"
          :title="$t('EducationalJoiningApplications.code')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            formateDateTimeLang(
              educationalJoiningApplication.joiningData,
              educationalJoiningApplication.joiningTime
            )
          "
          :title="$t('EducationalJoiningApplications.joiningDateTime')"
          :imgName="'dateAndTime.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalCategoryData
              .systemComponentsHierarchyData
              .systemComponentsHierarchyNameCurrent
          "
          :title="$t('SystemComponentsHierarchies.educationalActivity')"
          :imgName="'systemComponentsHierarchies.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalCategoryData
              .systemComponentData.systemComponentNameCurrent
          "
          :title="$t('SystemComponents.educationalActivity')"
          :imgName="'systemComponents.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalCategoryData
              .educationalCategoryNameCurrent
          "
          :title="$t('EducationalCategories.parent')"
          :imgName="'EducationalCategories.svg'"
        />

        <!-- #region PriceLists -->
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.priceListInfoData.priceListNameCurrent
          "
          :title="$t('PriceLists.name')"
          :imgName="'PriceLists.svg'"
        />

        <template
          v-if="
            educationalJoiningApplication.subscriptionTypeToken ==
            SUBSCRIPTION_TYPE_TOKENS.Package
          "
        >
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalJoiningApplication.priceListInfoData
                .priceListPackagePriceForClient
            "
            :title="$t('PriceLists.packagePriceForClient')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalJoiningApplication.priceListInfoData
                .priceListPackagePriceInOfferForClient
            "
            :title="$t('PriceLists.packagePriceInOfferForClient')"
            :imgName="'money.svg'"
          />
        </template>

        <template
          v-if="
            educationalJoiningApplication.subscriptionTypeToken ==
            SUBSCRIPTION_TYPE_TOKENS.Session
          "
        >
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalJoiningApplication.priceListInfoData
                .priceListSessionPriceForClient
            "
            :title="$t('PriceLists.sessionPriceForClient')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalJoiningApplication.priceListInfoData
                .priceListSessionPriceInOfferForClient
            "
            :title="$t('PriceLists.sessionPriceInOfferForClient')"
            :imgName="'money.svg'"
          />

          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalJoiningApplication.subscriptionRequestSessionsNumber
            "
            :title="
              $t(
                'EducationalJoiningApplications.subscriptionRequestSessionsNumber'
              )
            "
            :imgName="'number.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(
                educationalJoiningApplication.subscriptionToDate,
                educationalJoiningApplication.subscriptionToTime
              )
            "
            :title="$t('EducationalJoiningApplications.subscriptionToDateTime')"
            :imgName="'dateAndTime.svg'"
          />
        </template>

        <template
          v-if="
            educationalJoiningApplication.subscriptionTypeToken ==
            SUBSCRIPTION_TYPE_TOKENS.Hour
          "
        >
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalJoiningApplication.priceListInfoData
                .priceListHourPriceForClient
            "
            :title="$t('PriceLists.hourPriceForClient')"
            :imgName="'money.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              educationalJoiningApplication.priceListInfoData
                .priceListHourPriceInOfferForClient
            "
            :title="$t('PriceLists.hourPriceInOfferForClient')"
            :imgName="'money.svg'"
          />
        </template>
        <!-- #endregion PriceLists -->

        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalJoiningApplication.subscriptionTypeNameCurrent"
          :title="$t('ConstantsListSelect.SubscriptionTypesName')"
          :imgName="'SubscriptionTypes.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="educationalJoiningApplication.enrollmentTypeNameCurrent"
          :title="$t('ConstantsListSelect.EnrollmentTypesName')"
          :imgName="'EnrollmentTypes.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalJoiningApplicationDescriptionAr
          "
          :title="$t('EducationalJoiningApplications.descriptionAr')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalJoiningApplicationDescriptionEn
          "
          :title="$t('EducationalJoiningApplications.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalJoiningApplicationDescriptionUnd
          "
          :title="$t('EducationalJoiningApplications.descriptionUnd')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            educationalJoiningApplication.educationalJoiningApplicationNotes
          "
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import {
  formateDateTimeLang,
  checkPrivilege,
} from "./../../../../utils/functions";
import {
  SUBSCRIPTION_TYPE_TOKENS,
  APPROVAL_TYPE_TOKENS,
} from "./../../../../utils/constantLists";
import { hasStudent } from "./../../../../utils/privilegeHelper";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["educationalJoiningApplication"],
  data() {
    return {
      SUBSCRIPTION_TYPE_TOKENS,
    };
  },
  computed: {
    approvalTypeAccepted: function () {
      return this.educationalJoiningApplication.approvalTypeToken ==
        APPROVAL_TYPE_TOKENS.Accepted &&
        this.educationalJoiningApplication.userStudentInfoData
        ? true
        : false;
    },
  },
  methods: {
    formateDateTimeLang,
    checkPrivilege,
    hasStudent,
  },
};
</script>
