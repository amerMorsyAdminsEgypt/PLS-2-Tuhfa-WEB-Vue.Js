<template>
  <div v-if="educationalGroupStudentsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t("students.name") }}</th>
          <th>{{ $t("EducationalGroups.name") }}</th>
          <th>{{ $t("EducationalJoiningApplications.name") }}</th>
          <th>{{ $t("actionsData.dateTime") }}</th>
          <th>{{ $t("general.certificateStatus") }}</th>
          <th><i class="fas fa-sliders-h"></i></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            educationalGroupStudent, index
          ) in educationalGroupStudentsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            {{
              isDataExist(
                educationalGroupStudent.studentUserInfoDate
                  ? educationalGroupStudent.studentUserInfoDate.userNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalGroupStudent.educationalGroupInfoData
                  ? educationalGroupStudent.educationalGroupInfoData
                      .educationalGroupNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalGroupStudent.educationalJoiningApplicationInfoDate
                  ? educationalGroupStudent
                      .educationalJoiningApplicationInfoDate
                      .educationalJoiningApplicationNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                educationalGroupStudent.creationDate,
                educationalGroupStudent.creationTime
              )
            }}
          </td>
          <td>
            {{ educationalGroupStudent.certificateStatusNameCurrent }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
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
                  @click="
                    setEducationalGroupStudentData(educationalGroupStudent);
                    openBottomSheet('EducationalGroupStudentInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasMediaPackageCodeSubscribe())">
                <button
                  @click="
                    fillDataToSubscribeInMediaPackage({
                      userToken:
                        educationalGroupStudent.studentUserInfoDate.userToken,
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
  formateDateTimeLang,
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
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import subscribeInMediaPackageMixin from "./../../../../utils/subscribeInMediaPackageMixin";

export default {
  name: "EducationalGroupStudentsTable",
  mixins: [generalMixin, subscribeInMediaPackageMixin],
  components: {
    FloatingMenu,
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
    certificateExport(educationalGroupStudent) {
      this.$emit("certificateExport", educationalGroupStudent);
    },
    certificateDeliver(educationalGroupStudent) {
      this.$emit("certificateDeliver", educationalGroupStudent);
    },
    checkPrivilege,
    isDataExist,
    hasStudent,
    hasChangeStudentCertificateStatus,
    hasDebt,
    hasMediaPackageCodeSubscribe,
    hasMediaPackageCodeReport,
    hasInstallment,
    hasInstallmentPayment,
    hasStudentScheduleExamTime,
    fullPathFileFromServer,
    formateDateTimeLang,
  },
};
</script>
