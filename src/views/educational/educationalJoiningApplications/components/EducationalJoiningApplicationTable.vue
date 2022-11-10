<template>
  <div v-if="educationalJoiningApplicationsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th :colspan="colspanCurrentTab">
            {{ $t("EducationalJoiningApplications.data") }}
          </th>
          <th rowspan="2">{{ $t("students.name") }}</th>
          <th rowspan="2">{{ $t("EducationalCategories.name") }}</th>
          <th colspan="3">
            {{ $t("EducationalJoiningApplications.sessions.sessions") }}
          </th>
          <th colspan="2">
            {{ $t("EducationalJoiningApplications.subscription.validFrom") }}
          </th>
          <th colspan="2">
            {{ $t("EducationalJoiningApplications.subscription.validTo") }}
          </th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th v-if="showStaus">{{ $t("status") }}</th>

          <th>{{ $t("EducationalJoiningApplications.sessions.type") }}</th>
          <th>{{ $t("EducationalJoiningApplications.sessions.all") }}</th>
          <th>{{ $t("EducationalJoiningApplications.sessions.remaning") }}</th>

          <th>{{ $t("date") }}</th>
          <th>{{ $t("time") }}</th>

          <th>{{ $t("date") }}</th>
          <th>{{ $t("time") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            educationalJoiningApplication, index
          ) in educationalJoiningApplicationsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalJoiningApplication.educationalJoiningApplicationImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(educationalJoiningApplication.fullCode) }}</td>
          <td v-if="showStaus">
            {{
              isDataExist(educationalJoiningApplication.approvalTypeNameCurrent)
            }}
          </td>
          <td>
            {{
              educationalJoiningApplication.approvalTypeToken ==
                APPROVAL_TYPE_TOKENS.Accepted &&
              educationalJoiningApplication.userStudentInfoData
                ? isDataExist(
                    educationalJoiningApplication.userStudentInfoData
                      .userNameCurrent
                  )
                : isDataExist(educationalJoiningApplication.studentNameCurrent)
            }}
          </td>
          <!-- <td>
            {{ isDataExist(educationalJoiningApplication.studentNameCurrent) }}
          </td> -->
          <td>
            {{
              isDataExist(
                educationalJoiningApplication.educationalCategoryData
                  .educationalCategoryNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalJoiningApplication.activeSubscriptionData
                  .subscriptionTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalJoiningApplication.activeSubscriptionData
                  .subscriptionRequestSessionsNumber > 0
                  ? educationalJoiningApplication.activeSubscriptionData
                      .subscriptionRequestSessionsNumber
                  : "-"
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalJoiningApplication.activeSubscriptionData
                  .subscriptionRemaningSessionsNumberCount > 0
                  ? educationalJoiningApplication.activeSubscriptionData
                      .subscriptionRemaningSessionsNumberCount
                  : "-"
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalJoiningApplication.activeSubscriptionData
                  .subscriptionFromDate
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalJoiningApplication.activeSubscriptionData
                  .subscriptionFromTime
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalJoiningApplication.activeSubscriptionData
                  .subscriptionToDate
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalJoiningApplication.activeSubscriptionData
                  .subscriptionToTime
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="hasJoiningApplicationSubscription">
                <router-link
                  :to="{
                    name: 'JoiningApplicationSubscriptions',
                    params: {
                      userStudentToken: ' ',
                      educationalJoiningApplicationToken:
                        educationalJoiningApplication.educationalJoiningApplicationToken,
                    },
                  }"
                  :title="$t('JoiningApplicationSubscriptions.modelName')"
                  :target="linkTarget"
                >
                  <img
                    src="@/assets/images/JoiningApplicationSubscriptions.svg"
                  />
                </router-link>
              </li>
              <li
                v-if="checkPrivilege(hasEducationalJoiningApplicationReport())"
              >
                <button
                  @click="
                    $emit('statementStatus', true);
                    setEducationalJoiningApplicationData(
                      educationalJoiningApplication
                    );
                    openBottomSheet(
                      'EducationalJoiningApplicationReportFilter'
                    );
                  "
                  :title="$t('EducationalCategories.getStatement')"
                >
                  <img src="@/assets/images/statement.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasEducationalJoiningApplicationReport())"
              >
                <button
                  @click="
                    $emit('statementStatus', false);
                    setEducationalJoiningApplicationData(
                      educationalJoiningApplication
                    );
                    openBottomSheet(
                      'EducationalJoiningApplicationReportFilter'
                    );
                  "
                  :title="$t('Reports.EducationalJoiningApplications')"
                >
                  <img src="@/assets/images/reports.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalJoiningApplicationData(
                      educationalJoiningApplication
                    );
                    openBottomSheet('EducationalJoiningApplicationInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalJoiningApplicationData(
                      educationalJoiningApplication
                    );
                    openBottomSheet('EducationalJoiningApplicationQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(
                    hasEducationalJoiningApplicationChangeApprove()
                  ) &&
                  educationalJoiningApplication.approvalTypeToken ==
                    APPROVAL_TYPE_TOKENS.UnderReview
                "
              >
                <button
                  @click="
                    setEducationalJoiningApplicationData(
                      educationalJoiningApplication
                    );
                    openBottomSheet(
                      'EducationalJoiningApplicationChangeApproveAccepted'
                    );
                  "
                  :title="$t('EducationalJoiningApplications.approve')"
                >
                  <img src="@/assets/images/ApprovalTypes.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(
                    hasEducationalJoiningApplicationChangeApprove()
                  ) &&
                  educationalJoiningApplication.approvalTypeToken ==
                    APPROVAL_TYPE_TOKENS.UnderReview
                "
              >
                <button
                  @click="
                    setEducationalJoiningApplicationData(
                      educationalJoiningApplication
                    );
                    openBottomSheet(
                      'EducationalJoiningApplicationChangeApproveRejected'
                    );
                  "
                  :title="$t('EducationalJoiningApplications.reject')"
                >
                  <img src="@/assets/images/cancel.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasEducationalJoiningApplicationEdit()) &&
                  educationalJoiningApplication.approvalTypeToken ==
                    APPROVAL_TYPE_TOKENS.UnderReview
                "
              >
                <button
                  @click="
                    setEducationalJoiningApplicationData(
                      educationalJoiningApplication
                    );
                    openBottomSheet('EducationalJoiningApplicationUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalJoiningApplicationData(
                      educationalJoiningApplication
                    );
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import { APPROVAL_TYPE_TOKENS } from "./../../../../utils/constantLists";
import {
  hasEducationalJoiningApplicationChangeApprove,
  hasEducationalJoiningApplicationEdit,
  hasJoiningApplicationSubscription,
  hasEducationalJoiningApplicationReport,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalJoiningApplicationsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: [
    "educationalJoiningApplicationsData",
    "filterData",
    "defaultImg",
    "currentTab",
  ],
  computed: {
    colspanCurrentTab() {
      if (this.currentTab != "all") {
        return 2;
      } else {
        return 3;
      }
    },
    showStaus() {
      if (this.currentTab != "all") {
        return false;
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      APPROVAL_TYPE_TOKENS,
    };
  },
  methods: {
    formateDateTimeLang,
    setEducationalJoiningApplicationData(educationalJoiningApplication) {
      this.$emit(
        "setEducationalJoiningApplicationData",
        educationalJoiningApplication
      );
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalJoiningApplicationChangeApprove,
    hasEducationalJoiningApplicationEdit,
    hasJoiningApplicationSubscription,
    hasEducationalJoiningApplicationReport,
  },
};
</script>
