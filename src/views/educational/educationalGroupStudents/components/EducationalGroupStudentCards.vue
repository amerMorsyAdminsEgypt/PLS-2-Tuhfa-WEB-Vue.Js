<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(educationalGroupStudent, index) in educationalGroupStudentsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="
        educationalGroupStudent.studentUserInfoDate
          ? educationalGroupStudent.studentUserInfoDate.userNameCurrent
          : ''
      "
      :description="
        educationalGroupStudent.studentUserInfoDate
          ? educationalGroupStudent.studentUserInfoDate.fullCode
          : ''
      "
      :imagePath="educationalGroupStudent.defaultImg"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li
        v-if="
          checkPrivilege(hasChangeStudentCertificateStatus()) &&
          educationalGroupStudent.certificateStatusToken ==
            CERTIFICATE_STATUS_TYPE.Ready
        "
      >
        <button
          @click="certificateExport(educationalGroupStudent)"
          :title="$t('general.certificateExport')"
        >
          <img src="@/assets/images/certificateExport.svg" />
        </button>
      </li>
      <li
        v-if="
          checkPrivilege(hasChangeStudentCertificateStatus()) &&
          educationalGroupStudent.certificateStatusToken ==
            CERTIFICATE_STATUS_TYPE.Export
        "
      >
        <button
          @click="certificateDeliver(educationalGroupStudent)"
          :title="$t('general.certificateDeliver')"
        >
          <img src="@/assets/images/certificateDeliver.svg" />
        </button>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setEducationalGroupStudentData(educationalGroupStudent);
            openBottomSheet('EducationalGroupStudentInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasMediaPackageCodeSubscribe())">
        <button
          @click="
            fillDataToSubscribeInMediaPackage({
              userToken: educationalGroupStudent.studentUserInfoDate.userToken,
              joinInEducationalGroupToken:
                educationalGroupStudent.educationalGroupInfoData
                  .educationalGroupToken,
            });
            openBottomSheet('SubscribeInMediaPackage');
          "
          :title="$t('MediaPackageCodes.subscribe')"
        >
          <img src="@/assets/images/subscribeInPakage.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasMediaPackageCodeReport())">
        <button
          @click="
            setEducationalGroupStudentData(educationalGroupStudent);
            openBottomSheet('MediaPackageCodesFilter');
          "
          :title="$t('Reports.mediaPackageCodes')"
        >
          <img src="@/assets/images/report.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setEducationalGroupStudentData(educationalGroupStudent);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasStudent())">
        <router-link
          :to="{
            name: 'Students',
            params: {
              userToken: educationalGroupStudent.studentUserToken,
            },
          }"
          :title="$t('students.data')"
        >
          <img src="@/assets/images/students.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasDebt())">
        <router-link
          :to="{
            name: 'Debts',
            params: {
              userToken: educationalGroupStudent.studentUserToken,
            },
          }"
          :title="$t('Debts.data')"
        >
          <img src="@/assets/images/debts.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasInstallment())">
        <router-link
          :to="{
            name: 'Installments',
            params: {
              userToken: educationalGroupStudent.studentUserToken,
            },
          }"
          :title="$t('Installments.data')"
        >
          <img src="@/assets/images/installments.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasInstallmentPayment())">
        <router-link
          :to="{
            name: 'InstallmentPayments',
            params: {
              userToken: educationalGroupStudent.studentUserToken,
            },
          }"
          :title="$t('InstallmentPayments.data')"
        >
          <img src="@/assets/images/installmentPayments.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasStudentScheduleExamTime())">
        <router-link
          :to="{
            name: 'StudentScheduleExamTimes',
            params: {
              userToken: educationalGroupStudent.studentUserToken,
              educationalGroupToken:
                educationalGroupStudent.educationalGroupToken,
            },
          }"
          :title="$t('StudentScheduleExamTimes.data')"
        >
          <img src="@/assets/images/StudentScheduleExamTimes.svg" />
        </router-link>
      </li>
    </CustomCard>
    <SubscribeInMediaPackage
      :subscribeInMediaPackage="subscribeInMediaPackageClass"
    />
  </div>
</template>

<script>
import { CERTIFICATE_STATUS_TYPE } from "./../../../../utils/constantLists";
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasStudent,
  hasChangeStudentCertificateStatus,
  hasDebt,
  hasMediaPackageCodeSubscribe,
  hasMediaPackageCodeReport,
  hasInstallment,
  hasInstallmentPayment,
  hasStudentScheduleExamTime,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import subscribeInMediaPackageMixin from "./../../../../utils/subscribeInMediaPackageMixin";

export default {
  mixins: [generalMixin, subscribeInMediaPackageMixin],
  components: {
    CustomCard,
  },
  props: ["educationalGroupStudentsData", "filterData", "defaultImg"],
  data() {
    return {
      CERTIFICATE_STATUS_TYPE,
    };
  },
  methods: {
    setEducationalGroupStudentData(educationalGroupStudent) {
      this.$emit("setEducationalGroupStudentData", educationalGroupStudent);
    },
    checkPrivilege,
    hasStudent,
    hasChangeStudentCertificateStatus,
    hasDebt,
    hasMediaPackageCodeSubscribe,
    hasMediaPackageCodeReport,
    hasInstallment,
    hasInstallmentPayment,
    hasStudentScheduleExamTime,
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
