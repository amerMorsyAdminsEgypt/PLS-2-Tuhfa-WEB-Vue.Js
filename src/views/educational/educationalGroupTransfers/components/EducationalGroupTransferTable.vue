<template>
  <div v-if="educationalGroupTransfersData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">
            {{ $t("students.data") }}
          </th>
          <th colspan="2">
            {{ $t("EducationalGroupTransfers.oldGroup.data") }}
          </th>
          <th colspan="2">
            {{ $t("EducationalGroupTransfers.newGroup.data") }}
          </th>
          <th rowspan="2" class="cell-md">
            {{ $t("EducationalGroupTransfers.dateTime") }}
          </th>
          <th rowspan="2">{{ $t("EducationalCategories.name") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-md">{{ $t("general.name") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-md">{{ $t("general.name") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-md">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            educationalGroupTransfer, index
          ) in educationalGroupTransfersData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>

          <!-- #region StudentsData -->
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalGroupTransfer.userStudentInfoData
                    ? educationalGroupTransfer.userStudentInfoData.userImagePath
                    : '',
                  userImg
                )
              "
              :onerror="`this.src='${userImg}'`"
            />
          </td>
          <td>
            {{
              isDataExist(
                educationalGroupTransfer.userStudentInfoData
                  ? educationalGroupTransfer.userStudentInfoData.fullCode
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalGroupTransfer.userStudentInfoData
                  ? educationalGroupTransfer.userStudentInfoData.userNameCurrent
                  : ""
              )
            }}
          </td>
          <!-- #endregion StudentsData -->

          <!-- #region OldGroupDataData -->
          <td>
            {{
              isDataExist(
                educationalGroupTransfer.oldEducationalGroupInfoData
                  ? educationalGroupTransfer.oldEducationalGroupInfoData
                      .fullCode
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalGroupTransfer.oldEducationalGroupInfoData
                  ? educationalGroupTransfer.oldEducationalGroupInfoData
                      .educationalGroupNameCurrent
                  : ""
              )
            }}
          </td>
          <!-- #endregion OldGroupDataData -->

          <!-- #region NewGroupDataData -->
          <td>
            {{
              isDataExist(
                educationalGroupTransfer.newEducationalGroupInfoData
                  ? educationalGroupTransfer.newEducationalGroupInfoData
                      .fullCode
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                educationalGroupTransfer.newEducationalGroupInfoData
                  ? educationalGroupTransfer.newEducationalGroupInfoData
                      .educationalGroupNameCurrent
                  : ""
              )
            }}
          </td>
          <!-- #endregion NewGroupDataData -->

          <td>
            {{
              formateDateTimeLang(
                educationalGroupTransfer.educationalGroupTransferringDate,
                educationalGroupTransfer.educationalGroupTransferringTime
              )
            }}
          </td>

          <td>
            {{
              isDataExist(
                educationalGroupTransfer.educationalCategoryInfoData
                  ? educationalGroupTransfer.educationalCategoryInfoData
                      .educationalCategoryNameCurrent
                  : ""
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEducationalGroupTransferData(educationalGroupTransfer);
                    openBottomSheet('EducationalGroupTransferInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalGroupTransferData(educationalGroupTransfer);
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
  isDataExist,
  fullPathFileFromServer,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import groupImg from "@/assets/images/EducationalGroups.svg";
import userImg from "@/assets/images/users.svg";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalGroupTransfersTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["educationalGroupTransfersData", "filterData"],
  data() {
    return {
      groupImg,
      userImg,
    };
  },
  methods: {
    setEducationalGroupTransferData(educationalGroupTransfer) {
      this.$emit("setEducationalGroupTransferData", educationalGroupTransfer);
    },
    isDataExist,
    fullPathFileFromServer,
    formateDateTimeLang,
  },
};
</script>
