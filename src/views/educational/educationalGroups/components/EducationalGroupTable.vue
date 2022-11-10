<template>
  <div v-if="educationalGroupsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("EducationalGroups.data") }}</th>
          <th rowspan="2">{{ $t("EducationalGroups.startDateTime") }}</th>
          <th rowspan="2">{{ $t("EducationalGroups.endDateTime") }}</th>
          <th rowspan="2">{{ $t("EducationalCategories.name") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("general.state") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalGroup, index) in educationalGroupsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalGroup.educationalGroupImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(educationalGroup.fullCode) }}</td>
          <td>
            {{ isDataExist(educationalGroup.educationalGroupNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(
                educationalGroup.educationalGroupClosedStateTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                educationalGroup.educationalGroupStartDate,
                educationalGroup.educationalGroupStartTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                educationalGroup.educationalGroupEndDate,
                educationalGroup.educationalGroupEndTime
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalGroup.educationalCategoryData
                  .educationalCategoryNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasEducationalScheduleTime())">
                <router-link
                  :to="{
                    name: 'EducationalScheduleTimes',
                    params: {
                      educationalGroupToken:
                        educationalGroup.educationalGroupToken,
                    },
                  }"
                  :title="$t('EducationalScheduleTimes.modelName')"
                >
                  <img src="@/assets/images/EducationalScheduleTimes.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasEducationalGroupStudent())">
                <router-link
                  :to="{
                    name: 'EducationalGroupStudents',
                    params: {
                      educationalGroupToken:
                        educationalGroup.educationalGroupToken,
                      educationalCategoryToken:
                        educationalGroup.educationalCategoryToken,
                    },
                  }"
                  :title="$t('EducationalGroupStudents.studentsData')"
                >
                  <img src="@/assets/images/students.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasStorageSpaceEducationalGroup())">
                <router-link
                  :to="{
                    name: 'StorageSpacesEducationalGroup',
                    params: {
                      mainToken: educationalGroup.educationalGroupToken,
                    },
                  }"
                  :title="$t('StorageSpaces.modelName')"
                >
                  <img src="@/assets/images/educationalGroupMedia.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasGroupScheduleExam())">
                <router-link
                  :to="{
                    name: 'GroupScheduleExams',
                    params: {
                      educationalGroupToken:
                        educationalGroup.educationalGroupToken,
                    },
                  }"
                  :title="$t('GroupScheduleExams.modelName')"
                >
                  <img src="@/assets/images/GroupScheduleExams.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasEducationalGroupTransferAdd())">
                <button
                  @click="
                    setEducationalGroupData(educationalGroup);
                    openBottomSheet('EducationalGroupTransferAdd');
                  "
                  :title="$t('EducationalGroupTransfers.add')"
                >
                  <img src="@/assets/images/EducationalGroupTransfers.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalGroupAttendance())">
                <router-link
                  :to="{
                    name: 'EducationalGroupAttendances',
                    params: {
                      educationalGroupToken:
                        educationalGroup.educationalGroupToken,
                    },
                  }"
                  :title="$t('EducationalGroupAttendances.modelName')"
                >
                  <img src="@/assets/images/EducationalGroupAttendances.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasDiscussion())">
                <router-link
                  :to="{
                    name: 'Discussions',
                    params: {
                      discussionTypeToken:
                        EDUCATIONAL_RATING_TYPE_TOKENS.EducationalGroup,
                      mainToken: educationalGroup.educationalGroupToken,
                      educationalGroupToken:
                        educationalGroup.educationalGroupToken,
                    },
                  }"
                  :title="$t('Discussions.modelName')"
                >
                  <img src="@/assets/images/discussions.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setEducationalGroupData(educationalGroup);
                    openBottomSheet('EducationalGroupInfo');
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
                      joinInEducationalGroupToken:
                        educationalGroup.educationalGroupToken,
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
                    setEducationalGroupData(educationalGroup);
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
                    setEducationalGroupData(educationalGroup);
                    openBottomSheet('EducationalGroupQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasEducationalGroupEdit()) &&
                  educationalGroup.educationalGroupTerminationTypeToken ==
                    TERMINATION_TYPES.NotFinished
                "
              >
                <button
                  @click="
                    setEducationalGroupData(educationalGroup);
                    openBottomSheet('EducationalGroupUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalGroupFinaleDelete())">
                <button
                  v-b-modal.EducationalGroupDelete
                  :title="$t('delete')"
                  @click="setEducationalGroupData(educationalGroup)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasEducationalGroupChangeActivationType())"
              >
                <button
                  v-b-modal.EducationalGroupChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setEducationalGroupData(educationalGroup)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasEducationalGroupChangeCloseType()) &&
                  educationalGroup.educationalGroupTerminationTypeToken ==
                    TERMINATION_TYPES.NotFinished
                "
              >
                <template
                  v-if="
                    educationalGroup.educationalGroupClosedStateTypeToken ==
                    CLOSED_STATE_TYPES.Closed
                  "
                >
                  <button
                    v-b-modal.EducationalGroupChangeCloseType
                    :title="$t('general.open')"
                    @click="setEducationalGroupData(educationalGroup)"
                  >
                    <img src="@/assets/images/openGroup.svg" />
                  </button>
                </template>
                <template
                  v-if="
                    educationalGroup.educationalGroupClosedStateTypeToken ==
                    CLOSED_STATE_TYPES.Open
                  "
                >
                  <button
                    v-b-modal.EducationalGroupChangeCloseType
                    :title="$t('general.close')"
                    @click="setEducationalGroupData(educationalGroup)"
                  >
                    <img src="@/assets/images/closeGroup.svg" />
                  </button>
                </template>
              </li>
              <li v-if="checkPrivilege(hasEducationalGroupChangeFinishType())">
                <button
                  v-if="
                    educationalGroup.educationalGroupTerminationTypeToken ==
                    TERMINATION_TYPES.NotFinished
                  "
                  v-b-modal.EducationalGroupChangeFinishType
                  :title="$t('general.finish')"
                  @click="setEducationalGroupData(educationalGroup)"
                >
                  <img src="@/assets/images/finish.svg" />
                </button>
                <button
                  v-if="
                    educationalGroup.educationalGroupTerminationTypeToken ==
                    TERMINATION_TYPES.Finished
                  "
                  v-b-modal.EducationalGroupChangeFinishType
                  :title="$t('general.unfinish')"
                  @click="setEducationalGroupData(educationalGroup)"
                >
                  <img src="@/assets/images/unfinish.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalGroupData(educationalGroup);
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
    <SubscribeInMediaPackage
      :subscribeInMediaPackage="subscribeInMediaPackageClass"
    />
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import {
  hasEducationalGroupEdit,
  hasEducationalGroupStudent,
  hasEducationalGroupFinaleDelete,
  hasEducationalGroupChangeActivationType,
  hasEducationalGroupChangeCloseType,
  hasEducationalGroupChangeFinishType,
  hasEducationalScheduleTime,
  hasGroupScheduleExam,
  hasStorageSpaceEducationalGroup,
  hasEducationalGroupAttendance,
  hasDiscussion,
  hasEducationalGroupTransferAdd,
  hasMediaPackageCodeSubscribe,
  hasMediaPackageCodeReport,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import subscribeInMediaPackageMixin from "./../../../../utils/subscribeInMediaPackageMixin";
import {
  TERMINATION_TYPES,
  CLOSED_STATE_TYPES,
  EDUCATIONAL_RATING_TYPE_TOKENS,
} from "./../../../../utils/constantLists";

export default {
  name: "EducationalGroupsTable",
  mixins: [generalMixin, subscribeInMediaPackageMixin],
  components: {
    FloatingMenu,
  },
  data() {
    return {
      TERMINATION_TYPES,
      CLOSED_STATE_TYPES,
      EDUCATIONAL_RATING_TYPE_TOKENS,
    };
  },
  props: ["educationalGroupsData", "filterData", "defaultImg", "currentTab"],
  methods: {
    setEducationalGroupData(educationalGroup) {
      this.$emit("setEducationalGroupData", educationalGroup);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,
    hasEducationalGroupEdit,
    hasEducationalGroupStudent,
    hasEducationalGroupFinaleDelete,
    hasEducationalGroupChangeActivationType,
    hasEducationalGroupChangeCloseType,
    hasEducationalGroupChangeFinishType,
    hasEducationalScheduleTime,
    hasGroupScheduleExam,
    hasStorageSpaceEducationalGroup,
    hasEducationalGroupAttendance,
    hasDiscussion,
    hasEducationalGroupTransferAdd,
    hasMediaPackageCodeSubscribe,
    hasMediaPackageCodeReport,
  },
};
</script>
