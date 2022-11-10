<template>
  <b-modal id="PriceQuotationMove" scrollable centered hide-footer>
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
        :value="priceQuotation.fullCode"
        :title="$t('PriceQuotations.code')"
        :imgName="'code.svg'"
      />

      <CustomRadio
        :className="'col-md-12'"
        :id="`quotationHistoryWorkTypeToken`"
        :value="quotationHistoryWorkTypeToken"
        :options="filteredQuotationHistoryWorkTypeTokenOptions"
        v-on:changeValue="quotationHistoryWorkTypeToken = $event"
        :title="$t('PriceQuotations.moveTo')"
        :imgName="`EducationalGroupTransfers.svg`"
      />
      <form autocomplete="off" class="row">
        <TextArea
          :className="'col-md-12'"
          :id="`quotationHistoryWorkNotes`"
          :value="priceQuotation.quotationHistoryWorkNotes"
          v-on:changeValue="priceQuotation.quotationHistoryWorkNotes = $event"
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
        @click.prevent="movePriceQuotation"
      >
        {{ $t("yes") }}
      </button>
      <button
        name="submit"
        type="submit"
        class="btn btn-cancel"
        @click.prevent="$bvModal.hide('PriceQuotationMove')"
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
import apiPriceQuotation from "./../../../../api/products/priceQuotations";
import { PRICE_QUOTATION_HISTORY_WORK_TYPES } from "./../../../../utils/constantLists";
import { getDialogOfPriceQuotationsHistoryWorkType } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    DataLabelGroup,
    CustomRadio,
    TextArea,
  },
  props: ["priceQuotation", "allawedMoveToTokens"],
  data() {
    return {
      quotationHistoryWorkTypeToken: "",
      quotationHistoryWorkTypeTokenOptions:
        getDialogOfPriceQuotationsHistoryWorkType(),
    };
  },
  computed: {
    ...mapGetters(["userAuthorizeToken"]),
    filteredQuotationHistoryWorkTypeTokenOptions() {
      return this.quotationHistoryWorkTypeTokenOptions.filter((item) => {
        return this.allawedMoveToTokens.includes(item.value);
      });
    },
  },
  methods: {
    async movePriceQuotation() {
      this.isLoading = true;
      let params = {
        userAuthorizeToken: this.userAuthorizeToken,
        priceQuotationHistoryDtoItemList: [
          {
            priceQuotationToken: this.priceQuotation.priceQuotationToken,
            priceQuotationHistoryWorkNotes:
              this.priceQuotation.priceQuotationHistoryWorkNotes,
          },
        ],
      };
      if (!this.quotationHistoryWorkTypeToken) {
        this.showMsg(this.$t("PriceQuotations.selectMoveTo"));
      } else {
        try {
          let response = {};
          switch (this.quotationHistoryWorkTypeToken) {
            case PRICE_QUOTATION_HISTORY_WORK_TYPES.RejectedQuotesFormCustomer:
              response = await apiPriceQuotation.moveToReject(params);
              break;
            case PRICE_QUOTATION_HISTORY_WORK_TYPES.AcceptQuotesFormCustomer:
              response = await apiPriceQuotation.moveToApproved(params);
              break;
            case PRICE_QUOTATION_HISTORY_WORK_TYPES.Canceled:
              response = await apiPriceQuotation.moveToCancel(params);
              break;
            default:
              break;
          }

          if (response.data.status == STATUS.SUCCESS) {
            this.showMsg(response.data.msg, true);
            this.$bvModal.hide("PriceQuotationMove");
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
