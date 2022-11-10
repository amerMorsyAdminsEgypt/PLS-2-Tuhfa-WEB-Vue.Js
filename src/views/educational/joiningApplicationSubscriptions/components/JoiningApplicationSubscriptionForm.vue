<template>
  <div class="">
    <form autocomplete="off">
      <div class="row">
        <CustomFileInput
          :className="'col-12'"
          @changeValue="joiningApplicationSubscription.mediaFile = $event.file"
          :defaultImg="
            fullPathFileFromServer(
              joiningApplicationSubscription.joiningApplicationSubscriptionImagePath,
              joiningApplicationSubscription.defaultImg
            )
          "
          :deleteFileStatus="
            deleteFileStatus &&
            !joiningApplicationSubscription.joiningApplicationSubscriptionImageIsDefault &&
            checkPrivilege(hasJoiningApplicationSubscriptionDeleteImage())
          "
          v-on:deleteFile="$emit('deleteFile')"
        />
      </div>

      <div class="my-card">
        <div class="row">
          <!-- form add fields -->
          <CustomInput
            :className="'col-md-6'"
            :id="`${id}-fullCode`"
            :value="joiningApplicationSubscription.fullCode"
            v-on:changeValue="joiningApplicationSubscription.fullCode = $event"
            :title="$t('JoiningApplicationSubscriptions.code')"
            :imgName="'code.svg'"
          />

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-subscriptionTypeToken`"
            :value="joiningApplicationSubscription.subscriptionTypeToken"
            :options="subscriptionTypeTokenOptions"
            v-on:changeValue="
              joiningApplicationSubscription.subscriptionTypeToken = $event
            "
            :title="$t('ConstantsListSelect.SubscriptionTypes')"
            :imgName="'SubscriptionTypes.svg'"
          />
          <template
            v-if="
              joiningApplicationSubscription.subscriptionTypeToken ==
              SUBSCRIPTION_TYPE_TOKENS.Session
            "
          >
            <DateTimePicker
              class="col-md-6"
              :id="`${id}-subscriptionToDateTime`"
              type="dateTime"
              :value="joiningApplicationSubscription.subscriptionToDateTime"
              :title="
                $t('JoiningApplicationSubscriptions.subscriptionToDateTime')
              "
              v-on:changeValue="
                joiningApplicationSubscription.subscriptionToDateTime =
                  $event.dateTime
              "
              :language="language"
            />
            <CustomInputInt
              :className="'col-md-6'"
              :id="`${id}-subscriptionRequestSessionsNumber`"
              :value="
                joiningApplicationSubscription.subscriptionRequestSessionsNumber
              "
              v-on:changeValue="
                joiningApplicationSubscription.subscriptionRequestSessionsNumber =
                  $event
              "
              :title="
                $t(
                  'JoiningApplicationSubscriptions.subscriptionRequestSessionsNumber'
                )
              "
              :imgName="'number.svg'"
            />
          </template>
          <template
            v-if="
              joiningApplicationSubscription.subscriptionTypeToken ==
              SUBSCRIPTION_TYPE_TOKENS.Duration
            "
          >
            <DateTimePicker
              class="col-md-12"
              :id="`${id}-subscriptionToDateTime`"
              type="dateTime"
              :value="joiningApplicationSubscription.subscriptionToDateTime"
              :title="
                $t('JoiningApplicationSubscriptions.subscriptionToDateTime')
              "
              v-on:changeValue="
                joiningApplicationSubscription.subscriptionToDateTime =
                  $event.dateTime
              "
              :language="language"
            />
          </template>

          <CustomSelectBox
            :className="'col-md-6'"
            :id="`${id}-priceListToken`"
            :value="joiningApplicationSubscription.priceListToken"
            :options="priceListTokenOptions"
            v-on:changeValue="
              joiningApplicationSubscription.priceListToken = $event
            "
            :title="$t('PriceLists.select')"
            :imgName="'PriceLists.svg'"
          />
          <TextArea
            :className="'col-md-6'"
            :id="`${id}-joiningApplicationSubscriptionNotes`"
            :value="
              joiningApplicationSubscription.joiningApplicationSubscriptionNotes
            "
            v-on:changeValue="
              joiningApplicationSubscription.joiningApplicationSubscriptionNotes =
                $event
            "
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </div>
      </div>

      <div class="form-actions">
        <div class="icon-submit" @click.prevent="submitForm">
          <img src="@/assets/images/check-icon.svg" :title="submitName" />
        </div>
        <div
          @click.prevent
          class="icon-cancel"
          v-b-modal="`ConfirmCloseSheet-${bottomSheetName}`"
        >
          <img src="@/assets/images/cancel-icon.svg" :title="$t('cancel')" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  getLanguage,
  fullPathFileFromServer,
  bottomSheetScrollToTop,
  checkPrivilege,
} from "./../../../../utils/functions";

import CustomFileInput from "./../../../../components/general/CustomFileInput.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import {
  getPriceListsDialog,
  getUsersDialog,
  getKnownMethodsDialog,
} from "./../../../../utils/dialogsOfApi";
import {
  getDialogOfEnrollmentTypes,
  getDialogOfSubscriptionTypes,
} from "./../../../../utils/dialogsOfConstantsLists";
import { hasJoiningApplicationSubscriptionDeleteImage } from "./../../../../utils/privilegeHelper";
import {
  USER_TYPE,
  SUBSCRIPTION_TYPE_TOKENS,
} from "./../../../../utils/constantLists";

import generalMixin from "./../../../../utils/generalMixin";
import { validationMixin } from "vuelidate";

export default {
  mixins: [generalMixin, validationMixin],
  components: {
    CustomFileInput,
    CustomInput,
    CustomInputInt,
    DateTimePicker,
    TextArea,
    CustomSelectBox,
  },
  data() {
    return {
      language: getLanguage(),
      priceListTokenOptions: [],
      knownMethodTokenOptions: [],
      userTokenOptions: [],
      enrollmentTypeTokenOptions: getDialogOfEnrollmentTypes(),
      subscriptionTypeTokenOptions: getDialogOfSubscriptionTypes(),
      SUBSCRIPTION_TYPE_TOKENS,
    };
  },
  props: {
    joiningApplicationSubscription: {
      type: Object,
    },
    submitName: {
      type: String,
    },
    id: {
      type: String,
      default: "id",
    },
    deleteFileStatus: {
      type: Boolean,
      default: false,
    },
    bottomSheetName: {
      type: String,
      default: "",
    },
  },
  computed: {},
  methods: {
    async getPriceListsDialog() {
      this.isLoading = true;
      this.priceListTokenOptions = await getPriceListsDialog();
      this.isLoading = false;
    },
    async getKnownMethodsDialog() {
      this.isLoading = true;
      this.knownMethodTokenOptions = await getKnownMethodsDialog();
      this.isLoading = false;
    },
    baseTreeChanged(data) {
      this.joiningApplicationSubscription.educationalCategoryData.systemComponentHierarchyToken =
        data.hierarchyToken;
      this.joiningApplicationSubscription.educationalCategoryData.systemComponentToken =
        data.componentToken;
      this.joiningApplicationSubscription.educationalCategoryToken =
        data.parentToken;
    },
    async getStudentsDialog() {
      this.isLoading = true;
      let params = {
        modelName: "students",
        userTypeToken: USER_TYPE.Student,
      };
      this.userTokenOptions = await getUsersDialog(params);
      this.isLoading = false;
    },
    async submitForm() {
      bottomSheetScrollToTop();
      // this.$v.$touch();
      // if (
      //   this.$v.joiningApplicationSubscription.priceListToken.required &&
      //   this.$v.joiningApplicationSubscription
      //     .joiningApplicationSubscriptionDescriptionAr.isValidTextAr &&
      //   this.$v.joiningApplicationSubscription
      //     .joiningApplicationSubscriptionDescriptionEn.isValidTextEn
      // ) {
      //   this.$emit("submitForm");
      // }
      // if (
      //   this.joiningApplicationSubscription.subscriptionTypeToken ==
      //   SUBSCRIPTION_TYPE_TOKENS.Package
      // ) {
      //   this.joiningApplicationSubscription.subscriptionToDateTime = "";
      //   this.joiningApplicationSubscription.subscriptionRequestSessionsNumber =
      //     "";
      // } else if (
      //   this.joiningApplicationSubscription.subscriptionTypeToken ==
      //   SUBSCRIPTION_TYPE_TOKENS.Duration
      // ) {
      //   this.joiningApplicationSubscription.subscriptionRequestSessionsNumber =
      //     "";
      // }
      if (
        this.joiningApplicationSubscription.subscriptionTypeToken !=
        (SUBSCRIPTION_TYPE_TOKENS.Session || SUBSCRIPTION_TYPE_TOKENS.Duration)
      ) {
        this.joiningApplicationSubscription.subscriptionRequestSessionsNumber =
          "";
        this.joiningApplicationSubscription.subscriptionToDateTime = "";
      }
      this.$emit("submitForm");
    },
    checkPrivilege,
    hasJoiningApplicationSubscriptionDeleteImage,
    fullPathFileFromServer,
  },
  created() {
    this.getPriceListsDialog();
  },
};
</script>
