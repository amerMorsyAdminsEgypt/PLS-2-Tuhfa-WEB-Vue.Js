<template>
  <CustomBottomSheet
    :refName="'InstallmentDelete'"
    size="lg"
    :headerText="$t('cancel')"
    :headerIcon="alertIcon"
  >
    <PreLoader v-if="isLoading" />
    <div class="row">
      <h4 class="text-center col-12 mb-3">
        {{ $t("areYouSureToCancelStart") }}
        <span class="co-red">{{ installment.installmentNameCurrent }}</span>
        {{ $t("areYouSureToCancelEnd") }}
      </h4>

      <TextArea
        :className="'col-md-6'"
        :id="`cancelReasonAr`"
        :errors="errors_cancelReasonAr"
        :value="installment.cancelReasonAr"
        v-on:changeValue="
          installment.cancelReasonAr = $event;
          $v.installment.cancelReasonAr.$touch();
        "
        :title="$t('Installments.cancelReasonAr')"
        :imgName="'reason.svg'"
      />
      <TextArea
        :className="'col-md-6'"
        :id="`cancelReasonEn`"
        :errors="errors_cancelReasonEn"
        :value="installment.cancelReasonEn"
        v-on:changeValue="
          installment.cancelReasonEn = $event;
          $v.installment.cancelReasonEn.$touch();
        "
        :title="$t('Installments.cancelReasonEn')"
        :imgName="'reason.svg'"
      />
      <TextArea
        :className="'col-md-6'"
        :id="`cancelReasonUnd`"
        :value="installment.cancelReasonUnd"
        v-on:changeValue="installment.cancelReasonUnd = $event"
        :title="$t('Installments.cancelReasonUnd')"
        :imgName="'reason.svg'"
      />
      <TextArea
        :className="'col-md-6'"
        :id="`cancelNotes`"
        :value="installment.cancelNotes"
        v-on:changeValue="installment.cancelNotes = $event"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>

    <div class="form-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="deleteInstallment"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="closeBottomSheet('InstallmentDelete')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </CustomBottomSheet>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { STATUS } from "./../../../../utils/constants";
import { objectToFormData } from "./../../../../utils/functions";
import GeneralDelete from "./../../../../models/general/GeneralDelete";
import apiInstallment from "./../../../../api/joiningApplications/installments";
import generalMixin from "./../../../../utils/generalMixin";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import alertIcon from "@/assets/images/alert.svg";
import {
  isValidTextAr,
  isValidTextEn,
} from "./../../../../utils/validationHelper";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    TextArea,
  },
  data() {
    return {
      model: new GeneralDelete(),
      alertIcon,
    };
  },
  props: ["installment"],
  validations: {
    installment: {
      cancelReasonAr: { required, isValidTextAr },
      cancelReasonEn: { required, isValidTextEn },
    },
  },
  computed: {
    errors_cancelReasonAr() {
      let errors = [];
      if (this.$v.installment.cancelReasonAr.$error) {
        if (
          !this.$v.installment.cancelReasonAr.required &&
          !this.$v.installment.cancelReasonEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.installment.cancelReasonAr.required &&
          !this.$v.installment.cancelReasonAr.isValidTextAr
        )
          errors.push(this.$t("validation.fieldIsRequiredInAr"));
      }
      return errors;
    },
    errors_cancelReasonEn() {
      let errors = [];
      if (this.$v.installment.cancelReasonEn.$error) {
        if (
          !this.$v.installment.cancelReasonAr.required &&
          !this.$v.installment.cancelReasonEn.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
        else if (
          this.$v.installment.cancelReasonEn.required &&
          !this.$v.installment.cancelReasonEn.isValidTextEn
        )
          errors.push(this.$t("validation.fieldIsRequiredInEn"));
      }
      return errors;
    },
  },
  methods: {
    async deleteInstallment() {
      this.$v.$touch();
      if (
        (this.$v.installment.cancelReasonAr.required &&
          this.$v.installment.cancelReasonAr.isValidTextAr) ||
        (this.$v.installment.cancelReasonEn.required &&
          this.$v.installment.cancelReasonEn.isValidTextEn)
      ) {
        this.isLoading = true;
        try {
          // this.model.fillData({
          //   installmentToken: this.installment.installmentToken,
          // });
          let formData = objectToFormData(this.installment);
          const response = await apiInstallment.cancel(formData);
          if (response.data.status == STATUS.SUCCESS) {
            this.showMsg(response.data.msg, true);
            this.closeBottomSheet("InstallmentDelete");
            this.$emit("refresh");
          } else if (response.data.status == STATUS.INVALID_TOKEN) {
            this.showMsg(response.data.msg);
            this.$store.dispatch("logoutUser", response.data.msg);
          } else {
            this.showMsg(response.data.msg);
          }
        } catch (e) {
          this.showMsg(this.$t("errorCatch"));
        }
        this.isLoading = false;
      }
    },
  },
};
</script>
