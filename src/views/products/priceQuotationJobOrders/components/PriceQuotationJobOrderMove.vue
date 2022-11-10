<template>
  <b-modal id="PriceQuotationJobOrderMove" scrollable centered hide-footer>
    <PreLoader v-if="isLoading" />

    <template #modal-title>
      <h3>
        <img src="@/assets/images/alert.svg" class="icon-lg" />
        {{ $t("alert") }}
      </h3>
    </template>
    <div class="row">
      <DataLabelGroup
        :className="'col-md-12'"
        :value="priceQuotationJobOrder.fullCode"
        :title="$t('PriceQuotationJobOrders.code')"
        :imgName="'code.svg'"
      />
      <CustomRadio
        :className="'col-md-12'"
        :id="`jobOrderHistoryWorkTypeToken`"
        :value="priceQuotationJobOrder.jobOrderHistoryWorkTypeToken"
        :options="filteredQuotationJobOrderHistoryWorkTypeTokenOptions"
        v-on:changeValue="moveToChanged($event)"
        :title="$t('PriceQuotationJobOrders.moveTo')"
        :imgName="`EducationalGroupTransfers.svg`"
      />
      <form autocomplete="off" class="row">
        <TextArea
          :className="'col-md-12'"
          :id="`jobOrderHistoryWorkNotes`"
          :value="priceQuotationJobOrder.jobOrderHistoryWorkNotes"
          v-on:changeValue="
            priceQuotationJobOrder.jobOrderHistoryWorkNotes = $event
          "
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
      </form>
    </div>
    <div class="modal-footer">
      <button
        name="submit"
        type="submit"
        class="btn btn-submit"
        @click.prevent="movePriceQuotationJobOrder"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('PriceQuotationJobOrderMove')"
      >
        {{ $t("no") }}
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import PreLoader from "./../../../../components/general/PreLoader.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import CustomRadio from "./../../../../components/general/CustomRadio.vue";
import TextArea from "./../../../../components/general/TextArea.vue";
import { STATUS } from "./../../../../utils/constants";
import apiPriceQuotationJobOrder from "./../../../../api/products/priceQuotationJobOrders";
import { JOB_ORDER_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";
import { getDialogOfJobOrderHistoryWorkType } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import PriceQuotationJobOrderlMixin from "./PriceQuotationJobOrderlMixin";

export default {
  mixins: [generalMixin, PriceQuotationJobOrderlMixin],
  components: {
    PreLoader,
    DataLabelGroup,
    CustomRadio,
    TextArea,
  },
  props: ["priceQuotationJobOrder", "allawedMoveToTokens"],
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      isMoveToTokenEmpty: true,
      jobOrderTokenOptions: getDialogOfJobOrderHistoryWorkType(),
    };
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    filteredQuotationJobOrderHistoryWorkTypeTokenOptions() {
      return this.jobOrderTokenOptions.filter((item) => {
        return this.allawedMoveToTokens.includes(item.value);
      });
    },
  },
  methods: {
    moveToChanged(token) {
      this.priceQuotationJobOrder.jobOrderHistoryWorkTypeToken = token;
      if (token) {
        this.isMoveToTokenEmpty = false;
      } else {
        this.isMoveToTokenEmpty = true;
      }
    },
    async movePriceQuotationJobOrder() {
      this.isLoading = true;
      let params = {
        userAuthorizeToken: this.userAuthorizeToken,
        jobOrderHistoryDtoItemList: [
          {
            priceQuotationJobOrderToken:
              this.priceQuotationJobOrder.priceQuotationJobOrderToken,
            jobOrderHistoryWorkNotes:
              this.priceQuotationJobOrder.jobOrderHistoryWorkNotes,
          },
        ],
      };
      if (this.isMoveToTokenEmpty) {
        this.showMsg(this.$t("PriceQuotationJobOrders.selectMoveTo"));
      } else {
        try {
          let response = {};
          switch (this.priceQuotationJobOrder.jobOrderHistoryWorkTypeToken) {
            case JOB_ORDER_HISTORY_WORK_TYPES.NewlyWanted:
              response = await apiPriceQuotationJobOrder.moveToNewlyWanted(
                params
              );
              break;
            case JOB_ORDER_HISTORY_WORK_TYPES.WorkProgres:
              response = await apiPriceQuotationJobOrder.moveToWorkProgres(
                params
              );
              break;
            case JOB_ORDER_HISTORY_WORK_TYPES.FinishNotCustomerReceived:
              response =
                await apiPriceQuotationJobOrder.moveToFinishNotCustomerReceived(
                  params
                );
              break;
            case JOB_ORDER_HISTORY_WORK_TYPES.FinishCustomerReceived:
              response =
                await apiPriceQuotationJobOrder.moveToFinishCustomerReceived(
                  params
                );
              break;
            case JOB_ORDER_HISTORY_WORK_TYPES.Canceled:
              response = await apiPriceQuotationJobOrder.moveToCanceled(params);
              break;

            default:
              break;
          }

          if (response.data.status == STATUS.SUCCESS) {
            this.showMsg(response.data.msg, true);
            this.$bvModal.hide("PriceQuotationJobOrderMove");
            this.$emit("refresh");
          } else if (response.data.status == STATUS.INVALID_TOKEN) {
            this.$store.dispatch("logoutUser", response.data.msg);
            this.showMsg(response.data.msg);
          } else {
            this.showMsg(response.data.msg);
          }
        } catch (error) {
          this.showMsg(this.$t("errorCatch"));
        }
      }

      this.isLoading = false;
    },
  },
  async created() {
    // this.handelOptions();
  },
};
</script>
