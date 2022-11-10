<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="MediaPackageCodeAdd"
      :headerText="$t('MediaPackageCodes.add')"
      @opened="mediaPackageCode.setInitialValue()"
      :headerIcon="mediaPackageCode.icon"
      class="bottom-sheet-like-modal"
    >
      <div class="row">
        <CustomInputInt
          class="m-5"
          :maxlength="4"
          :maxValueStatus="true"
          :maxValue="1000"
          :className="'col-md-12'"
          :id="`countNeededCodes`"
          :value="mediaPackageCode.countNeededCodes"
          v-on:changeValue="mediaPackageCode.countNeededCodes = $event"
          :title="$t('MediaPackageCodes.number')"
          :imgName="'number.svg'"
        />
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="addMediaPackageCode()">
          <img src="@/assets/images/check-icon.svg" :title="$t('add')" />
        </div>
        <div
          @click.prevent="closeBottomSheet('MediaPackageCodeAdd')"
          class="icon-cancel"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </CustomBottomSheet>
    <ConfirmClearData
      dialogName="MediaPackageCodeAdd"
      v-on:response="response($event)"
    />
  </div>
</template>

<script>
import PreLoader from "./../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../components/general/CustomBottomSheet.vue";
import CustomInputInt from "./../../../components/general/CustomInputInt.vue";
import ConfirmClearData from "./../../../components/general/ConfirmClearData.vue";
import { STATUS } from "./../../../utils/constants";
import { objectToFormData } from "./../../../utils/functions";
import apiMediaPackageCode from "./../../../api/mediaPackageCode";
import generalMixin from "./../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    CustomInputInt,
    ConfirmClearData,
  },
  props: ["mediaPackageCode", "mediaPackageToken"],
  methods: {
    async addMediaPackageCode() {
      this.isLoading = true;
      let data = {
        mediaPackageToken: this.mediaPackageToken,
        countNeededCodes: this.mediaPackageCode.countNeededCodes,
      };
      let formData = objectToFormData(data);
      try {
        const response = await apiMediaPackageCode.add(formData);
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.$bvModal.show("ConfirmClearData-MediaPackageCodeAdd");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },

    response(data) {
      this.$emit("refresh");
      switch (data) {
        case "yes":
          this.mediaPackageCode.setInitialValue();
          break;
        case "leave":
          this.mediaPackageCode.setInitialValue();
          this.closeBottomSheet("MediaPackageCodeAdd");
          break;
      }
    },
  },
};
</script>
