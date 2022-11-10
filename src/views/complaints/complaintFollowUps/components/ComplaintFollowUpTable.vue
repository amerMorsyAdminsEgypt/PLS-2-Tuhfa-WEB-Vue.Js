<template>
  <div v-if="complaintFollowUpsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("ComplaintFollowUps.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("ComplaintFollowUps.followUpBy") }}</th>
          <th class="cell-lg">{{ $t("ComplaintFollowUps.text") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(complaintFollowUp, index) in complaintFollowUpsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  complaintFollowUp.complaintFollowUpMediaPath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(complaintFollowUp.fullCode) }}</td>
          <td>
            {{
              isDataExist(complaintFollowUp.userFollowUpData.userNameCurrent)
            }}
          </td>
          <td>
            {{ isDataExist(complaintFollowUp.complaintFollowUpTextCurrent) }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setComplaintFollowUpData(complaintFollowUp);
                    openBottomSheet('ComplaintFollowUpInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintFollowUpData(complaintFollowUp);
                    openBottomSheet('ComplaintFollowUpQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasComplaintFollowUpEdit())">
                <button
                  @click="
                    setComplaintFollowUpData(complaintFollowUp);
                    openBottomSheet('ComplaintFollowUpUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>

              <li v-if="checkPrivilege(hasComplaintFollowUpFinaleDelete())">
                <button
                  v-b-modal.ComplaintFollowUpDelete
                  :title="$t('delete')"
                  @click="setComplaintFollowUpData(complaintFollowUp)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasComplaintFollowUpChangeActivationType())
                "
              >
                <button
                  v-b-modal.ComplaintFollowUpChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setComplaintFollowUpData(complaintFollowUp)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setComplaintFollowUpData(complaintFollowUp);
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
} from "./../../../../utils/functions";
import {
  hasComplaintFollowUpEdit,
  hasComplaintFollowUpFinaleDelete,
  hasComplaintFollowUpChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { COMPLAINT_STATUS_TYPE } from "./../../../../utils/constantLists";

export default {
  name: "ComplaintFollowUpsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["complaintFollowUpsData", "filterData", "defaultImg"],
  data() {
    return {
      COMPLAINT_STATUS_TYPE: COMPLAINT_STATUS_TYPE,
    };
  },
  methods: {
    setComplaintFollowUpData(complaintFollowUp) {
      this.$emit("setComplaintFollowUpData", complaintFollowUp);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasComplaintFollowUpEdit,
    hasComplaintFollowUpFinaleDelete,
    hasComplaintFollowUpChangeActivationType,
  },
};
</script>
