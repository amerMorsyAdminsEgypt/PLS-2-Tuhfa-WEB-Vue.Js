<template>
  <div v-if="educationalGroupAttendancesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Users.data") }}</th>
          <th colspan="5">{{ $t("EducationalGroupAttendances.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("EducationalGroupAttendances.status") }}</th>
          <th class="cell-sm">{{ $t("from") }}</th>
          <th class="cell-sm">{{ $t("to") }}</th>
          <th>{{ $t("general.duration") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            educationalGroupAttendance, index
          ) in educationalGroupAttendancesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalGroupAttendance.userInfoData.userImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>
            {{ isDataExist(educationalGroupAttendance.userInfoData.fullCode) }}
          </td>
          <td>
            {{
              isDataExist(
                educationalGroupAttendance.userInfoData.userNameCurrent
              )
            }}
          </td>
          <td>{{ isDataExist(educationalGroupAttendance.fullCode) }}</td>
          <td>
            {{
              isDataExist(educationalGroupAttendance.attendanceTypeNameCurrent)
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                educationalGroupAttendance.attendFromDate,
                educationalGroupAttendance.attendFromTime
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                educationalGroupAttendance.attendToDate,
                educationalGroupAttendance.attendToTime
              )
            }}
          </td>
          <td>{{ isDataExist(educationalGroupAttendance.durationCurrent) }}</td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEducationalGroupAttendanceData(
                      educationalGroupAttendance
                    );
                    openBottomSheet('EducationalGroupAttendanceInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalGroupAttendanceData(
                      educationalGroupAttendance
                    );
                    openBottomSheet('EducationalGroupAttendanceQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalGroupAttendanceEdit())">
                <button
                  @click="
                    setEducationalGroupAttendanceData(
                      educationalGroupAttendance
                    );
                    openBottomSheet('EducationalGroupAttendanceUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasEducationalGroupAttendanceFinaleDelete())
                "
              >
                <button
                  v-b-modal.EducationalGroupAttendanceDelete
                  :title="$t('delete')"
                  @click="
                    setEducationalGroupAttendanceData(
                      educationalGroupAttendance
                    )
                  "
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalGroupAttendanceData(
                      educationalGroupAttendance
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
import {
  hasEducationalGroupAttendanceEdit,
  hasEducationalGroupAttendanceFinaleDelete,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalGroupAttendancesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["educationalGroupAttendancesData", "filterData", "defaultImg"],

  data() {
    return {};
  },
  methods: {
    setEducationalGroupAttendanceData(educationalGroupAttendance) {
      this.$emit(
        "setEducationalGroupAttendanceData",
        educationalGroupAttendance
      );
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,
    hasEducationalGroupAttendanceEdit,
    hasEducationalGroupAttendanceFinaleDelete,
  },
};
</script>
