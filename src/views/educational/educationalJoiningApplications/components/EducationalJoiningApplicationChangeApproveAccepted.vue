<template>
  <CustomBottomSheet
    :refName="'EducationalJoiningApplicationChangeApproveAccepted'"
    size="xl"
    @opened="
      getPriceListsDialog();
      educationalJoiningApplicationApprove.approvalTypeToken =
        APPROVAL_TYPE_TOKENS.Accepted;

      educationalJoiningApplicationApprove.priceListToken =
        educationalJoiningApplication.priceListToken;

      educationalJoiningApplicationApprove.subscriptionTypeToken =
        educationalJoiningApplication.subscriptionTypeToken;

      educationalJoiningApplicationApprove.subscriptionRequestSessionsNumber =
        educationalJoiningApplication.subscriptionRequestSessionsNumber;

      educationalJoiningApplicationApprove.subscriptionToDateTime =
        educationalJoiningApplication.subscriptionToDateTime;
    "
    :headerText="$t('EducationalJoiningApplications.approve')"
    :headerIcon="icon"
  >
    <div class="row">
      <CustomSelectBox
        :className="'col-md-6'"
        :id="`priceListToken`"
        :errors="errors_priceListToken"
        :value="educationalJoiningApplicationApprove.priceListToken"
        :options="priceListTokenOptions"
        v-on:changeValue="
          educationalJoiningApplicationApprove.priceListToken = $event;
          $v.educationalJoiningApplicationApprove.priceListToken.$touch();
        "
        :title="$t('PriceLists.select')"
        :imgName="'PriceLists.svg'"
      />

      <CustomSelectBox
        :className="'col-md-6'"
        :id="`subscriptionTypeToken`"
        :errors="errors_subscriptionTypeToken"
        :value="educationalJoiningApplicationApprove.subscriptionTypeToken"
        :options="subscriptionTypeTokenOptions"
        v-on:changeValue="
          educationalJoiningApplicationApprove.subscriptionTypeToken = $event;
          $v.educationalJoiningApplicationApprove.subscriptionTypeToken.$touch();
        "
        :title="$t('ConstantsListSelect.SubscriptionTypes')"
        :imgName="'SubscriptionTypes.svg'"
      />

      <template
        v-if="
          educationalJoiningApplicationApprove.subscriptionTypeToken ==
          SUBSCRIPTION_TYPE_TOKENS.Session
        "
      >
        <CustomInputInt
          :className="'col-md-6'"
          :id="`subscriptionRequestSessionsNumber`"
          :value="
            educationalJoiningApplicationApprove.subscriptionRequestSessionsNumber
          "
          v-on:changeValue="
            educationalJoiningApplicationApprove.subscriptionRequestSessionsNumber =
              $event
          "
          :title="
            $t(
              'EducationalJoiningApplications.subscriptionRequestSessionsNumber'
            )
          "
          :imgName="'number.svg'"
        />
        <DateTimePicker
          class="col-md-6"
          :id="`subscriptionToDateTime`"
          type="dateTime"
          :value="educationalJoiningApplicationApprove.subscriptionToDateTime"
          :title="$t('EducationalJoiningApplications.subscriptionToDateTime')"
          v-on:changeValue="
            educationalJoiningApplicationApprove.subscriptionToDateTime =
              $event.dateTime
          "
          :language="language"
        />
      </template>

      <template
        v-if="
          educationalJoiningApplicationApprove.subscriptionTypeToken ==
          SUBSCRIPTION_TYPE_TOKENS.Duration
        "
      >
        <DateTimePicker
          class="col-md-6"
          :id="`subscriptionToDateTime`"
          type="dateTime"
          :value="educationalJoiningApplicationApprove.subscriptionToDateTime"
          :title="$t('EducationalJoiningApplications.subscriptionToDateTime')"
          v-on:changeValue="
            educationalJoiningApplicationApprove.subscriptionToDateTime =
              $event.dateTime
          "
          :language="language"
        />
      </template>
    </div>

    <div class="form-actions">
      <div class="icon-submit" @click.prevent="changeApprove()">
        <img src="@/assets/images/check-icon.svg" :title="$t('yes')" />
      </div>
      <div
        @click.prevent="
          closeBottomSheet('EducationalJoiningApplicationChangeApproveAccepted')
        "
        class="icon-cancel"
      >
        <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import generalMixin from "./../../../../utils/generalMixin";
import icon from "@/assets/images/ApprovalTypes.svg";
import { STATUS } from "./../../../../utils/constants";
import { APPROVAL_TYPE_TOKENS } from "./../../../../utils/constantLists";
import { objectToFormData, getLanguage } from "./../../../../utils/functions";
import { getDialogOfSubscriptionTypes } from "./../../../../utils/dialogsOfConstantsLists";
import EducationalJoiningApplicationApprove from "./../../../../models/educational/educationalJoiningApplications/EducationalJoiningApplicationApprove";
import apiEducationalJoiningApplication from "./../../../../api/educational/educationalJoiningApplications";
import { SUBSCRIPTION_TYPE_TOKENS } from "./../../../../utils/constantLists";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { getPriceListsDialog } from "./../../../../utils/dialogsOfApi";

export default {
  mixins: [generalMixin, validationMixin],
  data() {
    return {
      language: getLanguage(),
      isLoading: false,
      // approvalTypeTokensOptions: getDialogOfApprovalTypes(),
      educationalJoiningApplicationApprove:
        new EducationalJoiningApplicationApprove(),
      icon,
      APPROVAL_TYPE_TOKENS,
      SUBSCRIPTION_TYPE_TOKENS,
      priceListTokenOptions: [],
      subscriptionTypeTokenOptions: getDialogOfSubscriptionTypes(),
    };
  },
  validations: {
    educationalJoiningApplicationApprove: {
      priceListToken: { required },
      subscriptionTypeToken: { required },
    },
  },
  computed: {
    errors_priceListToken() {
      let errors = [];
      if (this.$v.educationalJoiningApplicationApprove.priceListToken.$error) {
        if (
          !this.$v.educationalJoiningApplicationApprove.priceListToken.required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
    errors_subscriptionTypeToken() {
      let errors = [];
      if (
        this.$v.educationalJoiningApplicationApprove.subscriptionTypeToken
          .$error
      ) {
        if (
          !this.$v.educationalJoiningApplicationApprove.subscriptionTypeToken
            .required
        )
          errors.push(this.$t("validation.fieldIsRequired"));
      }
      return errors;
    },
  },
  components: {
    CustomBottomSheet,
    CustomSelectBox,
    CustomInputInt,
    DateTimePicker,
  },
  props: ["educationalJoiningApplication"],
  methods: {
    async getPriceListsDialog() {
      this.isLoading = true;
      this.priceListTokenOptions = await getPriceListsDialog();
      this.isLoading = false;
    },
    async changeApprove() {
      this.$emit("isLoading", true);
      this.$v.$touch();
      if (
        this.$v.educationalJoiningApplicationApprove.priceListToken.required &&
        this.$v.educationalJoiningApplicationApprove.subscriptionTypeToken
          .required
      ) {
        if (!this.educationalJoiningApplicationApprove.approvalTypeToken) {
          this.showMsg(
            this.$t("EducationalJoiningApplications.pleaseSelectAproveOrReject")
          );
        } else {
          // if (
          //   this.educationalJoiningApplicationApprove.subscriptionTypeToken ==
          //   SUBSCRIPTION_TYPE_TOKENS.Package
          // ) {
          //   this.educationalJoiningApplicationApprove.subscriptionToDateTime =
          //     "";
          //   this.educationalJoiningApplicationApprove.subscriptionRequestSessionsNumber =
          //     "";
          // } else if (
          //   this.educationalJoiningApplicationApprove.subscriptionTypeToken ==
          //   SUBSCRIPTION_TYPE_TOKENS.Duration
          // ) {
          //   this.educationalJoiningApplicationApprove.subscriptionRequestSessionsNumber =
          //     "";
          // }
          if (
            this.educationalJoiningApplicationApprove.subscriptionTypeToken !=
            (SUBSCRIPTION_TYPE_TOKENS.Session ||
              SUBSCRIPTION_TYPE_TOKENS.Duration)
          ) {
            this.educationalJoiningApplicationApprove.subscriptionRequestSessionsNumber =
              "";
            this.educationalJoiningApplicationApprove.subscriptionToDateTime =
              "";
          }
          try {
            this.educationalJoiningApplicationApprove.token =
              this.educationalJoiningApplication.educationalJoiningApplicationToken;
            let formData = objectToFormData(
              this.educationalJoiningApplicationApprove
            );

            const response =
              await apiEducationalJoiningApplication.changeApprove(formData);
            if (response.data.status == STATUS.SUCCESS) {
              this.showMsg(response.data.msg, true);
              this.closeBottomSheet(
                "EducationalJoiningApplicationChangeApproveAccepted"
              );
              this.$emit("refresh");
            } else if (response.data.status == STATUS.INVALID_TOKEN) {
              this.showMsg(response.data.msg);
              this.$store.dispatch("logoutUser", response.data.msg);
            } else {
              this.showMsg(response.data.msg);
            }
          } catch (error) {
            this.showMsg(this.$t("errorCatch"));
          }
        }
      }

      this.$emit("isLoading", false);
    },
  },
};
</script>
