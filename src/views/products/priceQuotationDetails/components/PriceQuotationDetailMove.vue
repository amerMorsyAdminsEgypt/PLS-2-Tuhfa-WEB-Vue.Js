<template>
  <b-modal id="PriceQuotationDetailMove" scrollable centered hide-footer>
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
        :value="priceQuotationDetail.fullCode"
        :title="$t('PriceQuotationDetails.code')"
        :imgName="'code.svg'"
      />
      <CustomRadio
        :className="'col-md-12'"
        :id="`quotationDetailsHistoryWorkTypeToken`"
        :value="priceQuotationDetail.quotationDetailsHistoryWorkTypeToken"
        :options="filteredQuotationDetailsHistoryWorkTypeTokenOptions"
        v-on:changeValue="moveToChanged($event)"
        :title="$t('PriceQuotationDetails.moveTo')"
        :imgName="`EducationalGroupTransfers.svg`"
      />
      <form autocomplete="off" class="row">
        <TextArea
          :className="'col-md-12'"
          :id="`quotationDetailsHistoryWorkNotes`"
          :value="priceQuotationDetail.quotationDetailsHistoryWorkNotes"
          v-on:changeValue="
            priceQuotationDetail.quotationDetailsHistoryWorkNotes = $event
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
        @click.prevent="movePriceQuotationDetail"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('PriceQuotationDetailMove')"
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
import apiPriceQuotationDetail from "./../../../../api/products/priceQuotationDetails";
import { QUOTATION_DETAILS_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";
import { getDialogOfQuotationDetailsHistoryWorkType } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";
import PriceQuotationDetailMixin from "./PriceQuotationDetailMixin";

export default {
  mixins: [generalMixin, PriceQuotationDetailMixin],
  components: {
    PreLoader,
    DataLabelGroup,
    CustomRadio,
    TextArea,
  },
  props: ["priceQuotationDetail", "allawedMoveToTokens"],
  data() {
    return {
      isLoading: false,
      exceptionMsg: null,
      exceptionImg: null,
      isMoveToTokenEmpty: true,
      quotationDetailsHistoryWorkTypeTokenOptions:
        getDialogOfQuotationDetailsHistoryWorkType(),
    };
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    filteredQuotationDetailsHistoryWorkTypeTokenOptions() {
      return this.quotationDetailsHistoryWorkTypeTokenOptions.filter((item) => {
        return this.allawedMoveToTokens.includes(item.value);
      });
    },
  },
  methods: {
    moveToChanged(token) {
      this.priceQuotationDetail.quotationDetailsHistoryWorkTypeToken = token;
      if (token) {
        this.isMoveToTokenEmpty = false;
      } else {
        this.isMoveToTokenEmpty = true;
      }
    },
    async movePriceQuotationDetail() {
      this.isLoading = true;
      let params = {
        userAuthorizeToken: this.userAuthorizeToken,
        quotationDetailsHistoryDtoItemList: [
          {
            priceQuotationDetailsToken:
              this.priceQuotationDetail.priceQuotationDetailsToken,
            quotationDetailsHistoryWorkNotes:
              this.priceQuotationDetail.quotationDetailsHistoryWorkNotes,
          },
        ],
      };
      if (this.isMoveToTokenEmpty) {
        this.showMsg(this.$t("PriceQuotationDetails.selectMoveTo"));
      } else {
        try {
          let response = {};
          switch (
            this.priceQuotationDetail.quotationDetailsHistoryWorkTypeToken
          ) {
            case QUOTATION_DETAILS_HISTORY_WORK_TYPES.NewlyWanted:
              response = await apiPriceQuotationDetail.moveToNewlyWanted(
                params
              );
              break;
            case QUOTATION_DETAILS_HISTORY_WORK_TYPES.WorkProgres:
              response = await apiPriceQuotationDetail.moveToWorkProgres(
                params
              );
              break;
            case QUOTATION_DETAILS_HISTORY_WORK_TYPES.ReviewedByCustomer:
              response = await apiPriceQuotationDetail.moveToReviewedByCustomer(
                params
              );
              break;
            case QUOTATION_DETAILS_HISTORY_WORK_TYPES.RejectedByCustomer:
              response = await apiPriceQuotationDetail.moveToRejectedByCustomer(
                params
              );
              break;
            case QUOTATION_DETAILS_HISTORY_WORK_TYPES.WaitingForQuotes:
              response = await apiPriceQuotationDetail.moveToWaitingForQuotes(
                params
              );
              break;
            case QUOTATION_DETAILS_HISTORY_WORK_TYPES.CanceledbyCustomer:
              response = await apiPriceQuotationDetail.moveToCanceledbyCustomer(
                params
              );
              break;

            default:
              break;
          }

          if (response.data.status == STATUS.SUCCESS) {
            this.showMsg(response.data.msg, true);
            this.$bvModal.hide("PriceQuotationDetailMove");
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
