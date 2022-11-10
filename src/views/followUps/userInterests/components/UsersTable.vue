<template>
  <div v-if="usersData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("Users.data") }}</th>
          <th colspan="2">{{ $t("UserInterests.data") }}</th>
          <th colspan="4">{{ $t("UserInterests.followUp.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("Users.phone") }}</th>
          <th>{{ $t("UserInterests.interests") }}</th>
          <th>{{ $t("UserInterests.others") }}</th>
          <th>{{ $t("UserInterests.followUp.total") }}</th>
          <th>{{ $t("UserInterests.followUp.totalFollowUped") }}</th>
          <th>{{ $t("UserInterests.followUp.totalReplyed") }}</th>
          <th>{{ $t("UserInterests.others") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(user, index) in usersData">
          <tr :key="user.userToken">
            <td :rowspan="rowSpanLastFollow(index)">
              {{ ++index + filterData.currentIndex }}
            </td>
            <td>
              <img
                class="item-img-table"
                :src="fullPathFileFromServer(user.userImagePath, defaultImg)"
                :onerror="`this.src='${defaultImg}'`"
              />
            </td>
            <td>{{ isDataExist(user.fullCode) }}</td>
            <td>
              {{ isDataExist(user.userNameCurrent) }}
            </td>
            <td class="table-phone-number">
              {{ isDataExist(user.userPhoneWithCC) }}
            </td>
            <!-- UserInterests.data -->
            <td>
              {{
                isDataExist(
                  user.userInterestStatisticData.totalCountSysteamInterests
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  user.userInterestStatisticData.totalCountOthersInterests
                )
              }}
            </td>
            <!-- UserInterests.followUp.data -->
            <td>
              {{
                isDataExist(
                  user.userInterestStatisticData.totalCountFollowInterests
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  user.userInterestStatisticData.totalCountFollowUpEmployees
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  user.userInterestStatisticData
                    .totalCountFollowInterestsIsReply
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  user.userInterestStatisticData
                    .totalCountFollowInterestsNotReply +
                    user.userInterestStatisticData
                      .totalCountFollowInterestsPhoneIsClose
                )
              }}
            </td>
            <td class="fmenu-item-container">
              <FloatingMenu>
                <li>
                  <button
                    @click="updateLastFollowShowHide(index)"
                    :title="$t('UserInterests.lastFollowUp.data')"
                  >
                    <img src="@/assets/images/home-phone.svg" />
                  </button>
                </li>
                <li v-if="hasFollowInterest">
                  <router-link
                    :to="{
                      name: 'FollowInterests',
                      params: { userToken: user.userToken },
                    }"
                    :title="$t('FollowInterests.modelName')"
                  >
                    <img src="@/assets/images/followInterests.svg" />
                  </router-link>
                </li>
                <li v-if="UserInterestRoute">
                  <router-link
                    :to="{
                      name: UserInterestRoute,
                      params: { userToken: user.userToken },
                    }"
                    :title="$t('UserSysteamOtherInterests.modelName')"
                  >
                    <img src="@/assets/images/UserSysteamOtherInterests.svg" />
                  </router-link>
                </li>
              </FloatingMenu>
            </td>
          </tr>
          <!-- last follow up -->
          <tr v-if="showLastFollow(index)" :key="index">
            <td colspan="11">
              <table class="my-table">
                <thead>
                  <tr @click="updateLastFollowShowHide(index)">
                    <th colspan="5">
                      {{ $t("UserInterests.lastFollowUp.data") }}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      {{
                        $t("UserInterests.lastFollowUp.followInterestNumber")
                      }}
                    </th>
                    <th>
                      {{ $t("UserInterests.lastFollowUp.replyStatusType") }}
                    </th>
                    <th>
                      {{ $t("UserInterests.lastFollowUp.communicationType") }}
                    </th>
                    <th>
                      {{ $t("UserInterests.lastFollowUp.followBy") }}
                    </th>
                    <th>
                      {{ $t("UserInterests.lastFollowUp.dateAndTime") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {{
                        isDataExist(
                          user.userInterestStatisticData
                            .lastFollowInterestInfoData.followInterestNumber
                        )
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          user.userInterestStatisticData
                            .lastFollowInterestInfoData
                            .replyStatusTypeNameCurrent
                        )
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          user.userInterestStatisticData
                            .lastFollowInterestInfoData
                            .communicationTypeInfoData
                            .communicationTypeNameCurrent
                        )
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          user.userInterestStatisticData
                            .lastFollowInterestInfoData.userCreatedData
                            .userNameCurrent
                        )
                      }}
                    </td>
                    <td>
                      {{
                        formateDateTimeLang(
                          user.userInterestStatisticData
                            .lastFollowInterestInfoData.creationDate,
                          user.userInterestStatisticData
                            .lastFollowInterestInfoData.creationTime
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  formateDateTimeLang,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasFollowInterest,
  hasUserSysteamInterest,
  hasUserOtherInterest,
} from "./../../../../utils/privilegeHelper";
import generalMixin from "./../../../../utils/generalMixin";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";

export default {
  name: "UsersTable",
  mixins: [generalMixin],
  components: { FloatingMenu },
  props: ["usersData", "filterData", "defaultImg"],
  data() {
    return {
      lastFollowShowHideList: [],
    };
  },
  computed: {
    UserInterestRoute() {
      if (hasUserSysteamInterest()) return "UserSysteamInterests";
      else if (hasUserOtherInterest()) return "UserOtherInterests";
      else return "";
    },
  },
  methods: {
    formateDateTimeLang,
    isDataExist,
    fullPathFileFromServer,
    hasFollowInterest,

    rowSpanLastFollow(index) {
      return this.lastFollowShowHideList[index]["rowSpanLastFollow"];
    },
    showLastFollow(i) {
      let index = i - 1;
      return this.lastFollowShowHideList[index]["showLastFollow"];
    },
    updateLastFollowShowHide(i) {
      let index = i - 1;
      this.lastFollowShowHideList[index]["showLastFollow"] =
        !this.lastFollowShowHideList[index]["showLastFollow"];

      if (this.lastFollowShowHideList[index]["rowSpanLastFollow"] == 1) {
        this.lastFollowShowHideList[index]["rowSpanLastFollow"] = 2;
      } else {
        this.lastFollowShowHideList[index]["rowSpanLastFollow"] = 1;
      }
    },
    setLastFollowShowHideList() {
      this.lastFollowShowHideList = this.usersData.map(() => {
        return {
          showLastFollow: false,
          rowSpanLastFollow: 1,
        };
      });
    },
  },
  async created() {
    await this.setLastFollowShowHideList();
  },
};
</script>
