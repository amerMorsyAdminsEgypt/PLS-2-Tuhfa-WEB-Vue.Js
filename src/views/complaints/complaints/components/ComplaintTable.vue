<template>
  <div v-if="complaintsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="6">{{ $t("Complaints.data") }}</th>
          <th colspan="4">{{ $t("Complaints.complainingPersonUser") }}</th>
          <th colspan="3">
            {{ $t("ComplaintFollowUps.lastComplaintFollowUpData") }}
          </th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("title") }}</th>
          <th>{{ $t("general.state") }}</th>
          <th>{{ $t("ComplaintTypes.name") }}</th>
          <th>{{ $t("ComplaintSectors.name") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
          <th>{{ $t("phoneNumber") }}</th>
          <th>{{ $t("general.type") }}</th>
          <th>{{ $t("ComplaintFollowUps.followUpBy") }}</th>
          <th>{{ $t("ComplaintFollowUps.followUpSideType") }}</th>
          <th>{{ $t("actionsData.dateTime") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(complaint, index) in complaintsData" :key="index">
          <td
            class="cell-color"
            :style="{
              backgroundColor: getColor(complaint.priorityTypeInfoData),
            }"
          >
            <span>{{ ++index + filterData.currentIndex }}</span>
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(complaint.complaintMediaPath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(complaint.fullCode) }}</td>
          <td>
            {{ isDataExist(complaint.complaintTitleCurrent) }}
          </td>
          <td
            v-if="
              complaint.complaintStatusTypeToken == COMPLAINT_STATUS_TYPE.Closed
            "
          >
            <img
              class="item-img-icon"
              :title="complaint.complaintStatusTypeNameCurrent"
              src="@/assets/images/closeGroup.svg"
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td v-else>
            <img
              class="item-img-icon"
              :title="complaint.complaintStatusTypeNameCurrent"
              src="@/assets/images/openGroup.svg"
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>

          <td>
            {{
              isDataExist(
                complaint.complaintTypeInfoData
                  ? complaint.complaintTypeInfoData.complaintTypeNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                complaint.complaintSectorInfoData
                  ? complaint.complaintSectorInfoData.complaintSectorNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{ isDataExist(complaint.complainingPersonUserInfoData.fullCode) }}
          </td>
          <td>
            {{
              isDataExist(
                complaint.complainingPersonUserInfoData.userNameCurrent
              )
            }}
          </td>
          <td class="table-phone-number">
            {{
              isDataExist(
                complaint.complainingPersonUserInfoData.userPhoneWithCC
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                complaint.complainingPersonUserInfoData.userTypeNameCurrent
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                complaint.lastComplaintFollowUpInfoData
                  ? complaint.lastComplaintFollowUpInfoData.userFollowUpData
                      .userNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              isDataExist(
                complaint.lastComplaintFollowUpInfoData
                  ? complaint.lastComplaintFollowUpInfoData
                      .complaintFollowUpSideTypeNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                complaint.lastComplaintFollowUpInfoData
                  ? complaint.lastComplaintFollowUpInfoData
                      .complaintFollowUpDate
                  : "",
                complaint.lastComplaintFollowUpInfoData
                  ? complaint.lastComplaintFollowUpInfoData
                      .complaintFollowUpTime
                  : ""
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasComplaintReport())">
                <button
                  @click="
                    setComplaintData(complaint);
                    openBottomSheet('ComplaintReportFilter');
                  "
                  :title="$t('Reports.complaints')"
                >
                  <img src="@/assets/images/reports.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintData(complaint);
                    openBottomSheet('ComplaintInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintData(complaint);
                    openBottomSheet('ComplaintQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintEdit())">
                <button
                  @click="
                    setComplaintData(complaint);
                    openBottomSheet('ComplaintUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>

              <li v-if="checkPrivilege(hasComplaintFinaleDelete())">
                <button
                  v-b-modal.ComplaintDelete
                  :title="$t('delete')"
                  @click="setComplaintData(complaint)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintChangeActivationType())">
                <button
                  v-b-modal.ComplaintChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setComplaintData(complaint)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintData(complaint);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasCloseComplaint()) &&
                  complaint.complaintStatusTypeToken !=
                    COMPLAINT_STATUS_TYPE.Closed
                "
              >
                <button
                  v-b-modal.ComplaintClose
                  :title="$t('Complaints.close')"
                  @click="setComplaintData(complaint)"
                >
                  <img src="@/assets/images/close.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintFollowUp())">
                <router-link
                  :to="{
                    name: 'ComplaintFollowUps',
                    params: {
                      complaintToken: complaint.complaintToken,
                    },
                  }"
                  :title="$t('ComplaintFollowUps.modelName')"
                >
                  <img src="@/assets/images/complaintFollowUps.svg" />
                </router-link>
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
} from "./../../../../utils/functions";
import {
  hasComplaintEdit,
  hasComplaintReport,
  hasComplaintFollowUp,
  hasCloseComplaint,
  hasComplaintFinaleDelete,
  hasComplaintChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { COMPLAINT_STATUS_TYPE } from "./../../../../utils/constantLists";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  name: "ComplaintsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["complaintsData", "filterData", "defaultImg"],
  data() {
    return {
      COMPLAINT_STATUS_TYPE: COMPLAINT_STATUS_TYPE,
    };
  },
  methods: {
    getColor(priorityTypeInfoData) {
      let color = "";
      if (priorityTypeInfoData) {
        color = priorityTypeInfoData.colorHexFromat;
      }
      return color;
    },
    formateDateTimeLang,
    setComplaintData(complaint) {
      this.$emit("setComplaintData", complaint);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasComplaintEdit,
    hasComplaintReport,
    hasComplaintFollowUp,
    hasCloseComplaint,
    hasComplaintFinaleDelete,
    hasComplaintChangeActivationType,
  },
  created() {},
};
</script>
