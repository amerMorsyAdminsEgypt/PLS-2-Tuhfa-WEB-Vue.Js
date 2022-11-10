<template>
  <div v-if="mediaPackagesData" class="table-container">
    <PreLoader v-if="isLoading" />

    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">
            {{ $t("MediaPackages.data") }}
          </th>
          <th rowspan="2">
            {{ $t("price") }}
          </th>
          <th colspan="4">
            {{ $t("MediaPackages.coupons.data") }}
          </th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>

          <th>{{ $t("MediaPackages.coupons.total") }}</th>
          <th>{{ $t("MediaPackages.coupons.used") }}</th>
          <th>{{ $t("MediaPackages.coupons.notUsed") }}</th>
          <th>{{ $t("MediaPackages.coupons.subscribed") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(mediaPackage, index) in mediaPackagesData">
          <tr :key="index">
            <td :rowspan="rowSpanMoreInfo(index)">
              {{ ++index + filterData.currentIndex }}
            </td>
            <td>
              <img
                class="item-img-table"
                :src="
                  fullPathFileFromServer(
                    mediaPackage.mediaPackageImagePath,
                    defaultImg
                  )
                "
                :onerror="`this.src='${defaultImg}'`"
              />
            </td>
            <td>{{ isDataExist(mediaPackage.fullCode) }}</td>
            <td>{{ isDataExist(mediaPackage.mediaPackageNameCurrent) }}</td>

            <td>
              <template v-if="mediaPackage.mediaPackageFinance.offerStatus">
                <div class="line-through">
                  {{
                    isDataExist(
                      mediaPackage.mediaPackageFinance
                        .mediaPackagePriceWithCurrency
                    )
                  }}
                </div>
                <div>
                  {{
                    isDataExist(
                      mediaPackage.mediaPackageFinance
                        .mediaPackagePriceInOfferWithCurrency
                    )
                  }}
                </div>
              </template>
              <template v-else>
                {{
                  isDataExist(
                    mediaPackage.mediaPackageFinance
                      .mediaPackagePriceWithCurrency
                  )
                }}
              </template>
            </td>
            <td>
              {{
                isDataExist(
                  mediaPackage.mediaPackageStatisticsData.totalNumberOfCoupons
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  mediaPackage.mediaPackageStatisticsData
                    .totalNumberOfCouponsUsed
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  mediaPackage.mediaPackageStatisticsData
                    .totalNumberOfCouponsNotUsed
                )
              }}
            </td>
            <td>
              {{
                isDataExist(
                  mediaPackage.mediaPackageStatisticsData
                    .totalCountUsersSubscribed
                )
              }}
            </td>

            <td class="fmenu-item-container">
              <FloatingMenu>
                <li>
                  <button
                    @click="updateMoreInfoShowHide(index)"
                    :title="$t('info')"
                  >
                    <img src="@/assets/images/info.svg" />
                  </button>
                </li>
                <li v-if="checkPrivilege(hasMediaPackageCodeFinaleDelete())">
                  <button
                    v-b-modal.MediaPackageNotUsedCodesDelete
                    :title="
                      $t('areYouSureToDeleteMediaPackageNotUsedCodesStart')
                    "
                    @click="setMediaPackageData(mediaPackage)"
                  >
                    <img src="@/assets/images/delete-not-used-codes.svg" />
                  </button>
                </li>
                <li v-if="checkPrivilege(hasMediaPackageCodeSubscribe())">
                  <button
                    @click="
                      fillDataToSubscribeInMediaPackage({
                        mediaPackageToken: mediaPackage.mediaPackageToken,
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
                      setMediaPackageDataReport(mediaPackage);
                      openBottomSheet('MediaPackageCodesFilter');
                    "
                    :title="$t('Reports.mediaPackageCodes')"
                  >
                    <img src="@/assets/images/report.svg" />
                  </button>
                </li>
                <template v-if="showOtherActions">
                  <li>
                    <button
                      @click="
                        setMediaPackageData(mediaPackage);
                        openBottomSheet('MediaPackageMedia');
                      "
                      :title="$t('MediaPackages.media')"
                    >
                      <img src="@/assets/images/media.svg" />
                    </button>
                  </li>
                  <li>
                    <button
                      @click="
                        setMediaPackageData(mediaPackage);
                        openBottomSheet('MediaPackageQRCode');
                      "
                      :title="$t('general.qrCode')"
                    >
                      <img src="@/assets/images/qr-code.svg" />
                    </button>
                  </li>
                  <li
                    v-if="
                      checkPrivilege(hasMediaPackageEdit()) &&
                      mediaPackage.mediaPackageStatisticsData
                        .totalCountUsersSubscribed == 0
                    "
                  >
                    <button
                      @click="
                        setMediaPackageData(mediaPackage);
                        openBottomSheet('MediaPackageUpdate');
                      "
                      :title="$t('edit')"
                    >
                      <img src="@/assets/images/pencil.svg" />
                    </button>
                  </li>
                  <li
                    v-if="
                      checkPrivilege(hasMediaPackageFinaleDelete()) &&
                      mediaPackage.mediaPackageStatisticsData
                        .totalCountUsersSubscribed == 0
                    "
                  >
                    <button
                      v-b-modal.MediaPackageDelete
                      :title="$t('delete')"
                      @click="setMediaPackageData(mediaPackage)"
                    >
                      <img src="@/assets/images/trash.svg" />
                    </button>
                  </li>
                  <li
                    v-if="checkPrivilege(hasMediaPackageChangeActivationType())"
                  >
                    <button
                      v-b-modal.MediaPackageChangeActivationType
                      :title="$t('changeActivationType')"
                      @click="setMediaPackageData(mediaPackage)"
                    >
                      <img src="@/assets/images/changeActivationType.svg" />
                    </button>
                  </li>
                  <li v-if="checkPrivilege(hasMediaPackageCode())">
                    <router-link
                      :to="{
                        name: 'MediaPackageCodes',
                        params: {
                          mediaPackageToken: mediaPackage.mediaPackageToken,
                        },
                      }"
                      :title="$t('MediaPackageCodes.modelName')"
                    >
                      <img src="@/assets/images/mediaPackageCodes.svg" />
                    </router-link>
                  </li>
                  <li>
                    <button
                      @click="
                        setMediaPackageData(mediaPackage);
                        openBottomSheet('ActionsData');
                      "
                      :title="$t('actionsData.modelName')"
                    >
                      <img src="@/assets/images/actions-data.svg" />
                    </button>
                  </li>
                </template>
              </FloatingMenu>
            </td>
          </tr>
          <!-- more info -->
          <tr v-if="showMoreInfo(index)" :key="mediaPackage.mediaPackageToken">
            <td colspan="9">
              <table class="my-table">
                <thead>
                  <tr @click="updateMoreInfoShowHide(index)">
                    <th>{{ $t("general.offerActiveStatus") }}</th>
                    <th>{{ $t("Accounts.name") }}</th>
                    <th>{{ $t("EducationalCategories.name") }}</th>
                    <template
                      v-if="
                        mediaPackage.mediaPackageLicenceData
                          .durationFromActivationStatus
                      "
                    >
                      <th rowspan="2">{{ $t("MediaPackages.duration") }}</th>
                    </template>
                    <template v-else>
                      <th rowspan="2">
                        {{ $t("MediaPackages.durationFrom") }}
                      </th>
                      <th rowspan="2">{{ $t("MediaPackages.durationTo") }}</th>
                    </template>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {{
                        mediaPackage.mediaPackageFinance.offerStatus
                          ? $t("activeStatus")
                          : $t("disActiveStatus")
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          mediaPackage.accountInfoData.accountNameCurrent
                        )
                      }}
                    </td>
                    <td>
                      {{
                        isDataExist(
                          mediaPackage.educationalCategoryInfoData
                            ? mediaPackage.educationalCategoryInfoData
                                .educationalCategoryNameCurrent
                            : ""
                        )
                      }}
                    </td>
                    <template
                      v-if="
                        mediaPackage.mediaPackageLicenceData
                          .durationFromActivationStatus
                      "
                      class=""
                    >
                      <td>
                        {{
                          isDataExist(
                            mediaPackage.mediaPackageLicenceData
                              .durationFromActivationText
                          )
                        }}
                      </td>
                    </template>
                    <template v-else>
                      <td>
                        {{
                          formateDateTimeLang(
                            mediaPackage.mediaPackageLicenceData
                              .activationDateFrom,
                            mediaPackage.mediaPackageLicenceData
                              .activationTimeFrom
                          )
                        }}
                      </td>
                      <td>
                        {{
                          formateDateTimeLang(
                            mediaPackage.mediaPackageLicenceData
                              .activationDateTo,
                            mediaPackage.mediaPackageLicenceData
                              .activationTimeTo
                          )
                        }}
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <SubscribeInMediaPackage
      :subscribeInMediaPackage="subscribeInMediaPackageClass"
    />
    <MediaPackageCodesFilter
      v-on:isLoading="isLoading = $event"
      :mediaPackageToken="mediaPackageToken"
    />
  </div>
</template>

<script>
import {
  checkPrivilege,
  formateDateTimeLang,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";
import {
  hasMediaPackageEdit,
  hasSharedMedia,
  hasMediaPackageFinaleDelete,
  hasMediaPackageChangeActivationType,
  hasMediaPackageCode,
  hasMediaPackageCodeFinaleDelete,
  hasMediaPackageCodeSubscribe,
  hasMediaPackageCodeReport,
} from "./../../../utils/privilegeHelper";
import MediaPackageCodesFilter from "./../../reports/components/MediaPackageCodesFilter.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";
import subscribeInMediaPackageMixin from "./../../../utils/subscribeInMediaPackageMixin";

export default {
  name: "MediaPackagesTable",
  mixins: [generalMixin, subscribeInMediaPackageMixin],
  components: {
    PreLoader,
    FloatingMenu,
    MediaPackageCodesFilter,
  },

  props: {
    mediaPackagesData: {
      type: Array,
    },
    filterData: {
      type: Object,
    },
    defaultImg: {
      type: String,
    },
    showOtherActions: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      moreInfoShowHideList: [],
      mediaPackageToken: "",
    };
  },
  methods: {
    checkPrivilege,
    formateDateTimeLang,
    isDataExist,
    fullPathFileFromServer,
    hasMediaPackageEdit,
    hasSharedMedia,
    hasMediaPackageFinaleDelete,
    hasMediaPackageChangeActivationType,
    hasMediaPackageCode,
    hasMediaPackageCodeFinaleDelete,
    hasMediaPackageCodeSubscribe,
    hasMediaPackageCodeReport,

    setMediaPackageData(mediaPackage) {
      this.$emit("setMediaPackageData", mediaPackage);
    },

    setMediaPackageDataReport(mediaPackage) {
      this.mediaPackageToken = mediaPackage.mediaPackageToken;
    },

    rowSpanMoreInfo(index) {
      return this.moreInfoShowHideList[index]["rowSpanMoreInfo"];
    },
    showMoreInfo(i) {
      let index = i - 1;
      return this.moreInfoShowHideList[index]["showMoreInfo"];
    },
    updateMoreInfoShowHide(i) {
      let index = i - 1;
      this.moreInfoShowHideList[index]["showMoreInfo"] =
        !this.moreInfoShowHideList[index]["showMoreInfo"];

      if (this.moreInfoShowHideList[index]["rowSpanMoreInfo"] == 1) {
        this.moreInfoShowHideList[index]["rowSpanMoreInfo"] = 2;
      } else {
        this.moreInfoShowHideList[index]["rowSpanMoreInfo"] = 1;
      }
    },
    async setMoreInfoShowHideList() {
      this.moreInfoShowHideList = this.mediaPackagesData.map(() => {
        return {
          showMoreInfo: false,
          rowSpanMoreInfo: 1,
        };
      });
    },
  },
  async created() {
    await this.setMoreInfoShowHideList();
    if (!this.showOtherActions)
      this.moreInfoShowHideList.push({
        showMoreInfo: false,
        rowSpanMoreInfo: 1,
      });
  },
};
</script>
