<template>
  <CustomBottomSheet
    :refName="'ReligionsFilter'"
    size="xl"
    :headerText="$t('Reports.religions')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomInput
        :className="'col-md-12'"
        :id="`sendTo`"
        :value="religions.filterData.sendTo"
        v-on:changeValue="religions.filterData.sendTo = $event"
        :title="$t('Reports.sendTo')"
        :imgName="'email.svg'"
      />
      <CustomSelectBox
        :className="'col-md-12'"
        :id="'userTypeToken'"
        :value="religions.filterData.userTypeToken"
        :options="userTypeTokenOptions"
        v-on:changeValue="religions.filterData.userTypeToken = $event"
        :title="$t('Users.selectType')"
        :imgName="'type.svg'"
      />
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="getReport">
        <img
          src="@/assets/images/check-icon.svg"
          :title="$t('Reports.print')"
        />
      </div>
      <div
        @click.prevent="closeBottomSheet('ReligionsFilter')"
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "@/components/general/CustomBottomSheet.vue";
import CustomInput from "@/components/general/CustomInput.vue";
import CustomSelectBox from "@/components/general/CustomSelectBox.vue";
import generalMixin from "@/utils/generalMixin";
import icon from "@/assets/images/religions.svg";
import { STATUS } from "@/utils/constants";
import Religions from "@/models/settings/settingsOthers/religions/Religions";
import apiReligion from "@/api/settings/settingsOthers/religions";
import { getLanguage, viewFileFromServer } from "@/utils/functions";
import { getDialogOfUserTypes } from "@/utils/dialogsOfConstantsLists";

export default {
  mixins: [generalMixin],
  data() {
    return {
      isLoading: false,
      language: getLanguage(),
      religions: new Religions(),
      icon,
      userTypeTokenOptions: getDialogOfUserTypes(),
    };
  },
  components: {
    CustomBottomSheet,
    CustomInput,
    CustomSelectBox,
  },
  methods: {
    async getReport() {
      this.isLoading = true;
      this.$emit("isLoading", true);
      try {
        const response = await apiReligion.getReport(this.religions.filterData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("ReligionsFilter");
          viewFileFromServer(response.data.reportPath);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.$emit("isLoading", false);
    },
    async created() {},
  },
};
</script>
