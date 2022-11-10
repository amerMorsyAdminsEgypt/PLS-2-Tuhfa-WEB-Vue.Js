<template>
  <div
    v-if="userOtherInterestsData"
    :class="tableContainer ? 'table-container' : ''"
  >
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("UserOtherInterests.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("ConstantsListSelect.InterestTypesName") }}</th>
          <th>{{ $t("UserSysteamInterests.Status") }}</th>
          <th>{{ $t("description") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(userOtherInterest, index) in userOtherInterestsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>{{ isDataExist(userOtherInterest.fullCode) }}</td>
          <td>{{ isDataExist(userOtherInterest.otherInterestNameCurrent) }}</td>
          <td>{{ isDataExist(userOtherInterest.interestTypeNameCurrent) }}</td>
          <td>
            {{ isDataExist(userOtherInterest.interestStatusNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(userOtherInterest.otherInterestDescriptionCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="hasFollowInterest">
                <router-link
                  :to="{
                    name: 'FollowInterests',
                    params: {
                      userToken: userOtherInterest.userToken,
                      userSysteamInterestToken: ' ',
                      userOtherInterestToken:
                        userOtherInterest.userOtherInterestToken,
                    },
                  }"
                  :title="$t('FollowInterests.modelName')"
                >
                  <img src="@/assets/images/followInterests.svg" />
                </router-link>
              </li>
              <li>
                <button
                  @click="
                    setUserOtherInterestData(userOtherInterest);
                    openBottomSheet('UserOtherInterestInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserOtherInterestData(userOtherInterest);
                    openBottomSheet('UserOtherInterestQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <!-- <li v-if="checkPrivilege(hasUserOtherInterestEdit())">
                <button
                  @click="
                    setUserOtherInterestData(userOtherInterest);
                    openBottomSheet('UserOtherInterestUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li> -->
              <li v-if="checkPrivilege(hasUserOtherInterestFinaleDelete())">
                <button
                  v-b-modal.UserOtherInterestDelete
                  :title="$t('delete')"
                  @click="setUserOtherInterestData(userOtherInterest)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasUserOtherInterestChangeActivationType())
                "
              >
                <button
                  v-b-modal.UserOtherInterestChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setUserOtherInterestData(userOtherInterest)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserOtherInterestData(userOtherInterest);
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
import { checkPrivilege, isDataExist } from "./../../../../utils/functions";
import {
  hasFollowInterest,
  hasUserOtherInterestEdit,
  hasUserOtherInterestFinaleDelete,
  hasUserOtherInterestChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserOtherInterestsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: {
    userOtherInterestsData: { type: Array },
    filterData: { type: Object },
    defaultImg: { type: String },
    tableContainer: { type: Boolean, default: true },
  },
  methods: {
    setUserOtherInterestData(userOtherInterest) {
      this.$emit("setUserOtherInterestData", userOtherInterest);
    },
    checkPrivilege,
    isDataExist,
    hasFollowInterest,
    hasUserOtherInterestEdit,
    hasUserOtherInterestFinaleDelete,
    hasUserOtherInterestChangeActivationType,
  },
};
</script>
