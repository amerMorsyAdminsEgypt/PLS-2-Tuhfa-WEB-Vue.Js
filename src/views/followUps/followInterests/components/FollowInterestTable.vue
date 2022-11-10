<template>
  <div v-if="followInterestsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("FollowInterests.data") }}</th>
          <th rowspan="2">{{ $t("CommunicationTypes.name") }}</th>
          <th rowspan="2">
            {{ $t("ConstantsListSelect.ReplyStatusTypesName") }}
          </th>
          <th rowspan="2">{{ $t("employees.name") }}</th>
          <th rowspan="2">{{ $t("dateTime") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("FollowInterests.number") }}</th>
          <th>{{ $t("description") }}</th>
          <th>{{ $t("notes") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(followInterest, index) in followInterestsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>{{ isDataExist(followInterest.followInterestNumber) }}</td>
          <td>
            {{ isDataExist(followInterest.followInterestDescriptionCurrent) }}
          </td>
          <td>{{ isDataExist(followInterest.followInterestNotes) }}</td>
          <td>
            {{
              isDataExist(
                followInterest.communicationTypeInfoData
                  ? followInterest.communicationTypeInfoData
                      .communicationTypeNameCurrent
                  : ""
              )
            }}
          </td>
          <td>{{ isDataExist(followInterest.replyStatusTypeNameCurrent) }}</td>
          <td>
            {{
              isDataExist(
                followInterest.userCreatedData
                  ? followInterest.userCreatedData.userNameCurrent
                  : ""
              )
            }}
          </td>
          <td>
            {{
              formateDateTimeLang(
                followInterest.creationDate,
                followInterest.creationTime
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setFollowInterestData(followInterest);
                    openBottomSheet('FollowInterestInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setFollowInterestData(followInterest);
                    openBottomSheet('FollowInterestQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <!-- <li v-if="checkPrivilege(hasFollowInterestEdit())">
                <button
                  @click="
                    setFollowInterestData(followInterest);
                    openBottomSheet('FollowInterestUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li> -->
              <li v-if="checkPrivilege(hasFollowInterestFinaleDelete())">
                <button
                  v-b-modal.FollowInterestDelete
                  :title="$t('delete')"
                  @click="setFollowInterestData(followInterest)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasFollowInterestChangeActivationType())"
              >
                <button
                  v-b-modal.FollowInterestChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setFollowInterestData(followInterest)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setFollowInterestData(followInterest);
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
  formateDateTimeLang,
} from "./../../../../utils/functions";
import {
  hasFollowInterestEdit,
  hasFollowInterestFinaleDelete,
  hasFollowInterestChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "FollowInterestsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["followInterestsData", "filterData", "defaultImg"],
  methods: {
    setFollowInterestData(followInterest) {
      this.$emit("setFollowInterestData", followInterest);
    },
    checkPrivilege,
    isDataExist,
    formateDateTimeLang,
    hasFollowInterestEdit,
    hasFollowInterestFinaleDelete,
    hasFollowInterestChangeActivationType,
  },
};
</script>
