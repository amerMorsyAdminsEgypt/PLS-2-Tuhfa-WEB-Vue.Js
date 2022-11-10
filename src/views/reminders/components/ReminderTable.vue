<template>
  <div v-if="remindersData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("Reminders.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("Reminders.title") }}</th>
          <th>{{ $t("actionsData.dateTime") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reminder, index) in remindersData" :key="index">
          <td
            class="cell-color"
            :style="{
              backgroundColor: getColor(reminder.priorityTypeInfoDataCurrent),
            }"
          >
            <span>{{ ++index + filterData.currentIndex }}</span>
          </td>
          <td>
            <img
              class="item-img-table"
              :src="getMediaSrc(reminder)"
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(reminder.fullCode) }}</td>
          <td>
            {{ isDataExist(reminder.reminderTitleCurrent) }}
          </td>
          <td>
            {{
              isDataExist(
                formateDateTimeLang(
                  reminder.reminderDate,
                  reminder.reminderTime
                )
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setReminderData(reminder);
                    openBottomSheet('ReminderInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setReminderData(reminder);
                    openBottomSheet('ReminderQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReminderEdit())">
                <button
                  @click="
                    setReminderData(reminder);
                    openBottomSheet('ReminderUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReminderFinaleDelete())">
                <button
                  v-b-modal.ReminderDelete
                  :title="$t('delete')"
                  @click="setReminderData(reminder)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReminderChangeActivationType())">
                <button
                  v-b-modal.ReminderChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setReminderData(reminder)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setReminderData(reminder);
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
  formateDateTimeLang,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";
import {
  hasReminderEdit,
  hasReminderFinaleDelete,
  hasReminderChangeActivationType,
} from "./../../../utils/privilegeHelper";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../utils/generalMixin";
import { NEWS_MEDIA_TYPES } from "./../../../utils/constants";

export default {
  name: "RemindersTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["remindersData", "filterData", "defaultImg"],
  methods: {
    getColor(priorityTypeInfoData) {
      let color = "";
      if (priorityTypeInfoData) {
        color = priorityTypeInfoData.colorHexFromat;
      }
      return color;
    },
    getMediaSrc(reminder) {
      let mediaSrc = "";
      if (reminder.reminderMediaTypeToken == NEWS_MEDIA_TYPES.image) {
        mediaSrc = this.fullPathFileFromServer(
          reminder.reminderMediaPath,
          reminder.defaultImg
        );
      } else if (reminder.reminderMediaTypeToken == NEWS_MEDIA_TYPES.video) {
        mediaSrc = this.defaultImg;
      }
      return mediaSrc;
    },
    setReminderData(reminder) {
      this.$emit("setReminderData", reminder);
    },
    checkPrivilege,
    formateDateTimeLang,
    isDataExist,
    fullPathFileFromServer,
    hasReminderEdit,
    hasReminderFinaleDelete,
    hasReminderChangeActivationType,
  },
};
</script>
