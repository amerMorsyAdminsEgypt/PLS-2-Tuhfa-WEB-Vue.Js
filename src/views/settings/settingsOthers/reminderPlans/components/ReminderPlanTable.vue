<template>
  <div v-if="reminderPlansData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("ReminderPlans.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("general.activationType") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reminderPlan, index) in reminderPlansData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  reminderPlan.reminderPlanImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(reminderPlan.fullCode) }}</td>
          <td>
            {{ isDataExist(reminderPlan.reminderPlanNameCurrent) }}
          </td>
          <td>
            {{
              reminderPlan.reminderPlanActivationStatus
                ? $t("activeStatus")
                : $t("disActiveStatus")
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setReminderPlanData(reminderPlan);
                    openBottomSheet('ReminderPlanInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setReminderPlanData(reminderPlan);
                    openBottomSheet('ReminderPlanQRCode');
                  "
                  :title="$t('ReminderPlans.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReminderPlanEdit())">
                <button
                  @click="
                    setReminderPlanData(reminderPlan);
                    openBottomSheet('ReminderPlanUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReminderPlanFinaleDelete())">
                <button
                  v-b-modal.ReminderPlanDelete
                  :title="$t('delete')"
                  @click="setReminderPlanData(reminderPlan)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReminderPlanChangeActivationType())">
                <button
                  v-b-modal.ReminderPlanChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setReminderPlanData(reminderPlan)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setReminderPlanData(reminderPlan);
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
  hasReminderPlanEdit,
  hasReminderPlanFinaleDelete,
  hasReminderPlanChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ReminderPlansTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["reminderPlansData", "filterData", "defaultImg"],
  methods: {
    setReminderPlanData(reminderPlan) {
      this.$emit("setReminderPlanData", reminderPlan);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasReminderPlanEdit,
    hasReminderPlanFinaleDelete,
    hasReminderPlanChangeActivationType,
  },
};
</script>
