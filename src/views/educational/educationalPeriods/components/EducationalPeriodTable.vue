<template>
  <div v-if="educationalPeriodsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="6">{{ $t("EducationalPeriods.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("general.start") }}</th>
          <th>{{ $t("general.end") }}</th>
          <th>{{ $t("general.state") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(educationalPeriod, index) in educationalPeriodsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  educationalPeriod.educationalPeriodImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(educationalPeriod.fullCode) }}</td>
          <td>
            {{ isDataExist(educationalPeriod.educationalPeriodNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(educationalPeriod.educationalPeriodStartDate) }}
          </td>
          <td>
            {{ isDataExist(educationalPeriod.educationalPeriodEndDate) }}
          </td>
          <td>
            {{ isDataExist(educationalPeriod.closedStateTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setEducationalPeriodData(educationalPeriod);
                    openBottomSheet('EducationalPeriodInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalPeriodData(educationalPeriod);
                    openBottomSheet('EducationalPeriodQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalPeriodEdit())">
                <button
                  @click="
                    setEducationalPeriodData(educationalPeriod);
                    openBottomSheet('EducationalPeriodUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasEducationalPeriodFinaleDelete())">
                <button
                  v-b-modal.EducationalPeriodDelete
                  :title="$t('delete')"
                  @click="setEducationalPeriodData(educationalPeriod)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasEducationalPeriodChangeActivationType())
                "
              >
                <button
                  v-b-modal.EducationalPeriodChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setEducationalPeriodData(educationalPeriod)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setEducationalPeriodData(educationalPeriod);
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
  hasEducationalPeriodEdit,
  hasEducationalPeriodFinaleDelete,
  hasEducationalPeriodChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "EducationalPeriodsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["educationalPeriodsData", "filterData", "defaultImg"],
  methods: {
    setEducationalPeriodData(educationalPeriod) {
      this.$emit("setEducationalPeriodData", educationalPeriod);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasEducationalPeriodEdit,
    hasEducationalPeriodFinaleDelete,
    hasEducationalPeriodChangeActivationType,
  },
};
</script>
