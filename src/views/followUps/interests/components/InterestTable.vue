<template>
  <div v-if="interestsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th rowspan="2">{{ $t("students.name") }}</th>
          <th colspan="3">{{ $t("Interests.data") }}</th>
          <th v-if="showActions" rowspan="2">
            <i class="fas fa-sliders-h"></i>
          </th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.title") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(interest, index) in interestsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            {{
              interest.studentUserInfoData
                ? interest.studentUserInfoData.userNameCurrent
                : ""
            }}
          </td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(interest.interestImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(interest.fullCode) }}</td>
          <td>
            {{ isDataExist(interest.interestTitleCurrent) }}
          </td>

          <td v-if="showActions" class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setInterestData(interest);
                    openBottomSheet('InterestInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInterestData(interest);
                    openBottomSheet('InterestQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInterestEdit())">
                <button
                  @click="
                    setInterestData(interest);
                    openBottomSheet('InterestUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInterestFinaleDelete())">
                <button
                  v-b-modal.InterestDelete
                  :title="$t('delete')"
                  @click="setInterestData(interest)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasInterestChangeActivationType())">
                <button
                  v-b-modal.InterestChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setInterestData(interest)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setInterestData(interest);
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
  hasInterestEdit,
  hasInterestFinaleDelete,
  hasInterestChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "InterestsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: {
    interestsData: {
      type: Array,
    },
    filterData: {
      type: Object,
    },
    defaultImg: {
      type: String,
      default: "",
    },
    showActions: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    setInterestData(interest) {
      this.$emit("setInterestData", interest);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInterestEdit,
    hasInterestFinaleDelete,
    hasInterestChangeActivationType,
  },
};
</script>
