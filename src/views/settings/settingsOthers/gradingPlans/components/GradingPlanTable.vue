<template>
  <div v-if="gradingPlansData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("GradingPlans.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gradingPlan, index) in gradingPlansData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  gradingPlan.gradingPlanImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(gradingPlan.fullCode) }}</td>
          <td>
            {{ isDataExist(gradingPlan.gradingPlanNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setGradingPlanData(gradingPlan);
                    openBottomSheet('GradingPlanInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setGradingPlanData(gradingPlan);
                    openBottomSheet('GradingPlanQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGradingPlanEdit())">
                <button
                  @click="
                    setGradingPlanData(gradingPlan);
                    openBottomSheet('GradingPlanUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGradingPlanFinaleDelete())">
                <button
                  v-b-modal.GradingPlanDelete
                  :title="$t('delete')"
                  @click="setGradingPlanData(gradingPlan)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasGradingPlanChangeActivationType())">
                <button
                  v-b-modal.GradingPlanChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setGradingPlanData(gradingPlan)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setGradingPlanData(gradingPlan);
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
} from "./../../../../../utils/functions";
import {
  hasGradingPlanEdit,
  hasGradingPlanFinaleDelete,
  hasGradingPlanChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "GradingPlansTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["gradingPlansData", "filterData", "defaultImg"],
  methods: {
    setGradingPlanData(gradingPlan) {
      this.$emit("setGradingPlanData", gradingPlan);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasGradingPlanEdit,
    hasGradingPlanFinaleDelete,
    hasGradingPlanChangeActivationType,
  },
};
</script>
