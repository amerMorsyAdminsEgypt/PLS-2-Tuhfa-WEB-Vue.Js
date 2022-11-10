<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(reminder, index) in remindersData"
      :key="index"
      :className="'col-sm-12 col-md-6 col-lg-4'"
      :title="reminder.reminderTitleCurrent"
      :description="reminder.fullCode"
      :imagePath="getMediaSrc(reminder)"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setReminderData(reminder);
            openBottomSheet('ReminderInfo');
          "
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
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";
import {
  hasReminderEdit,
  hasReminderFinaleDelete,
  hasReminderChangeActivationType,
} from "./../../../utils/privilegeHelper";
import CustomCard from "./../../../components/general/CustomCard.vue";
import generalMixin from "./../../../utils/generalMixin";
import { NEWS_MEDIA_TYPES } from "./../../../utils/constants";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["remindersData", "filterData", "defaultImg"],
  methods: {
    getMediaSrc(reminder) {
      let mediaSrc = "";
      if (reminder.reminderMediaTypeToken == NEWS_MEDIA_TYPES.image) {
        mediaSrc = reminder.reminderMediaPath;
      } else if (reminder.reminderMediaTypeToken == NEWS_MEDIA_TYPES.video) {
        mediaSrc = this.defaultImg;
      }
      return mediaSrc;
    },
    setReminderData(reminder) {
      this.$emit("setReminderData", reminder);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasReminderEdit,
    hasReminderFinaleDelete,
    hasReminderChangeActivationType,
  },
};
</script>
