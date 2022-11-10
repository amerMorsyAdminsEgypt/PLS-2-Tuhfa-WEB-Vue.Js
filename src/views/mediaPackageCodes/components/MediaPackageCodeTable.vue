<template>
  <div v-if="mediaPackageCodesData" class="table-container">
    <PreLoader v-if="isLoading" />

    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("MediaPackageCodes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.key") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("MediaPackageCodes.codeUseStatus") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(mediaPackageCode, index) in mediaPackageCodesData"
          :key="index"
        >
          <td>
            {{ ++index + filterData.currentIndex }}
          </td>

          <td>{{ isDataExist(mediaPackageCode.mediaPackageKey) }}</td>
          <td>
            {{ isDataExist(mediaPackageCode.mediaPackageCode) }}
          </td>
          <td>
            {{
              isDataExist(mediaPackageCode.mediaPackageCodeUsedTypeNameCurrent)
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setMediaPackageCodeData(mediaPackageCode);
                    openBottomSheet('MediaPackageCodeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasMediaPackageCodeReport())">
                <button
                  @click="
                    setMediaPackageCodeDataReport(mediaPackageCode);
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
                    setMediaPackageCodeData(mediaPackageCode);
                    openBottomSheet('MediaPackageCodeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>

              <li
                v-if="
                  checkPrivilege(hasMediaPackageCodeFinaleDelete()) &&
                  mediaPackageCode.mediaPackageCodeUsedTypeToken ==
                    CODE_UDE_TYPE.NotUsed
                "
              >
                <button
                  v-b-modal.MediaPackageCodeDelete
                  :title="$t('delete')"
                  @click="setMediaPackageCodeData(mediaPackageCode)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>

              <li>
                <button
                  @click="
                    setMediaPackageCodeData(mediaPackageCode);
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
    <MediaPackageCodesFilter
      v-on:isLoading="isLoading = $event"
      :mediaPackageCodeToken="mediaPackageCodeToken"
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
  hasSharedMedia,
  hasMediaPackageCodeFinaleDelete,
  hasMediaPackageCodeReport,
} from "./../../../utils/privilegeHelper";
import PreLoader from "./../../../components/general/PreLoader.vue";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import MediaPackageCodesFilter from "./../../reports/components/MediaPackageCodesFilter.vue";
import generalMixin from "./../../../utils/generalMixin";
import { CODE_UDE_TYPE } from "./../../../utils/constantLists";

export default {
  name: "MediaPackageCodesTable",
  mixins: [generalMixin],
  components: {
    PreLoader,
    FloatingMenu,
    MediaPackageCodesFilter,
  },
  props: ["mediaPackageCodesData", "filterData", "defaultImg"],
  data() {
    return {
      CODE_UDE_TYPE,
      mediaPackageCodeToken: "",
    };
  },
  methods: {
    setMediaPackageCodeData(mediaPackageCode) {
      this.$emit("setMediaPackageCodeData", mediaPackageCode);
    },
    setMediaPackageCodeDataReport(mediaPackageCode) {
      this.mediaPackageCodeToken = mediaPackageCode.mediaPackageCodeToken;
    },

    checkPrivilege,
    formateDateTimeLang,
    isDataExist,
    fullPathFileFromServer,
    hasSharedMedia,
    hasMediaPackageCodeFinaleDelete,
    hasMediaPackageCodeReport,
  },
};
</script>
