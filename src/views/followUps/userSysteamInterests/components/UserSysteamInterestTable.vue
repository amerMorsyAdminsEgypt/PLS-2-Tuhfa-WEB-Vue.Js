<template>
  <div
    v-if="userSysteamInterestsData"
    :class="tableContainer ? 'table-container' : ''"
  >
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("UserSysteamInterests.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
          <th>{{ $t("ConstantsListSelect.InterestTypesName") }}</th>
          <th>{{ $t("UserSysteamInterests.Status") }}</th>
          <th>{{ $t("description") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(userSysteamInterest, index) in userSysteamInterestsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>{{ isDataExist(userSysteamInterest.fullCode) }}</td>
          <td>
            <template
              v-if="
                userSysteamInterest.interestTypeToken == INTEREST_TYPES.Place
              "
            >
              {{
                isDataExist(
                  userSysteamInterest.placeInfoData
                    ? userSysteamInterest.placeInfoData.placeNameCurrent
                    : ""
                )
              }}
            </template>
            <template
              v-else-if="
                userSysteamInterest.interestTypeToken ==
                INTEREST_TYPES.EducationalCategory
              "
            >
              {{
                isDataExist(
                  userSysteamInterest.educationalCategoryInfoData
                    ? userSysteamInterest.educationalCategoryInfoData
                        .educationalCategoryNameCurrent
                    : ""
                )
              }}
            </template>
            <template
              v-else-if="
                userSysteamInterest.interestTypeToken ==
                INTEREST_TYPES.EducationalGroup
              "
            >
              {{
                isDataExist(
                  userSysteamInterest.educationalGroupInfoData
                    ? userSysteamInterest.educationalGroupInfoData
                        .educationalGroupNameCurrent
                    : ""
                )
              }}
            </template>
            <template
              v-else-if="
                userSysteamInterest.interestTypeToken == INTEREST_TYPES.Service
              "
            >
              {{
                isDataExist(
                  userSysteamInterest.serviceInfoData
                    ? userSysteamInterest.serviceInfoData.serviceNameCurrent
                    : ""
                )
              }}
            </template>
            <template v-else>-</template>
          </td>
          <td>
            {{ isDataExist(userSysteamInterest.interestTypeNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(userSysteamInterest.interestStatusNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(userSysteamInterest.systeamInterestDescriptionCurrent)
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="hasFollowInterest">
                <router-link
                  :to="{
                    name: 'FollowInterests',
                    params: {
                      userToken: userSysteamInterest.userToken,
                      userSysteamInterestToken:
                        userSysteamInterest.userSysteamInterestToken,
                      userOtherInterestToken: ' ',
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
                    setUserSysteamInterestData(userSysteamInterest);
                    openBottomSheet('UserSysteamInterestInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserSysteamInterestData(userSysteamInterest);
                    openBottomSheet('UserSysteamInterestQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <!-- <li v-if="checkPrivilege(hasUserSysteamInterestEdit())">
                <button
                  @click="
                    setUserSysteamInterestData(userSysteamInterest);
                    openBottomSheet('UserSysteamInterestUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li> -->
              <li v-if="checkPrivilege(hasUserSysteamInterestFinaleDelete())">
                <button
                  v-b-modal.UserSysteamInterestDelete
                  :title="$t('delete')"
                  @click="setUserSysteamInterestData(userSysteamInterest)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasUserSysteamInterestChangeActivationType())
                "
              >
                <button
                  v-b-modal.UserSysteamInterestChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setUserSysteamInterestData(userSysteamInterest)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setUserSysteamInterestData(userSysteamInterest);
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
import { INTEREST_TYPES } from "./../../../../utils/constantLists";
import { checkPrivilege, isDataExist } from "./../../../../utils/functions";
import {
  hasFollowInterest,
  hasUserSysteamInterestEdit,
  hasUserSysteamInterestFinaleDelete,
  hasUserSysteamInterestChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "UserSysteamInterestsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: {
    userSysteamInterestsData: { type: Array },
    filterData: { type: Object },
    defaultImg: { type: String },
    tableContainer: { type: Boolean, default: true },
  },
  data() {
    return { INTEREST_TYPES };
  },
  methods: {
    setUserSysteamInterestData(userSysteamInterest) {
      this.$emit("setUserSysteamInterestData", userSysteamInterest);
    },
    checkPrivilege,
    isDataExist,
    hasFollowInterest,
    hasUserSysteamInterestEdit,
    hasUserSysteamInterestFinaleDelete,
    hasUserSysteamInterestChangeActivationType,
  },
};
</script>
