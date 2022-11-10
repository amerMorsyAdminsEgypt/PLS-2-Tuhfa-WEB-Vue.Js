<template>
  <div class="p-3">
    <form autocomplete="off">
      <div class="my-card">
        <div class="row">
          <CustomSelectBox
            :className="'col-md-12'"
            id="timeZoneToken"
            :value="userAppSetting.timeZoneToken"
            :options="timeZoneTokenOptions"
            v-on:changeValue="userAppSetting.timeZoneToken = $event"
            :title="$t('ConstantsListSelect.TimeZones')"
            :imgName="'TimeZones.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            id="dateFormatToken"
            :value="userAppSetting.dateFormatToken"
            :options="dateFormatTokenOptions"
            v-on:changeValue="userAppSetting.dateFormatToken = $event"
            :title="$t('UserAppSettings.dateFormate')"
            :imgName="'date.svg'"
          />
          <CustomSelectBox
            :className="'col-md-12'"
            id="timeFormatToken"
            :value="userAppSetting.timeFormatToken"
            :options="timeFormatTokenOptions"
            v-on:changeValue="userAppSetting.timeFormatToken = $event"
            :title="$t('UserAppSettings.timeFormate')"
            :imgName="'time.svg'"
          />

          <CustomCheckbox
            :className="'col-12'"
            :value="userAppSetting.receiveNotificationStatus"
            v-on:changeValue="userAppSetting.receiveNotificationStatus = $event"
            :title="$t('UserAppSettings.receiveNotification')"
          />
        </div>
      </div>

      <div class="form-footer">
        <button
          name="submit"
          type="submit"
          class="btn btn-submit"
          @click.prevent="$emit('submitForm')"
        >
          {{ submitName }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import CustomSelectBox from "./../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../components/general/CustomCheckbox.vue";
import {
  getDialogOfTimeZones,
  getDialogOfDateFormatTypes,
  getDialogOfTimeFormatTypes,
} from "./../../../utils/dialogsOfConstantsLists";

export default {
  components: {
    CustomSelectBox,
    CustomCheckbox,
  },
  data() {
    return {
      timeZoneTokenOptions: getDialogOfTimeZones(),
      dateFormatTokenOptions: getDialogOfDateFormatTypes(),
      timeFormatTokenOptions: getDialogOfTimeFormatTypes(),
    };
  },
  props: {
    userAppSetting: {
      type: Object,
    },
    submitName: {
      type: String,
    },
  },
  methods: {},
  created() {},
};
</script>
