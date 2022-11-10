<template>
  <div v-if="priceQuotationAffiliateOperationsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">
            {{ $t("PriceQuotationAffiliateOperations.data") }}
          </th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(
            priceQuotationAffiliateOperation, index
          ) in priceQuotationAffiliateOperationsData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  priceQuotationAffiliateOperation.priceQuotationAffiliateOperationImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(priceQuotationAffiliateOperation.fullCode) }}</td>
          <td>
            {{
              isDataExist(
                priceQuotationAffiliateOperation.priceQuotationAffiliateOperationTitleCurrent
              )
            }}
          </td>

          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setPriceQuotationAffiliateOperationData(
                      priceQuotationAffiliateOperation
                    );
                    openBottomSheet('PriceQuotationAffiliateOperationInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriceQuotationAffiliateOperationData(
                      priceQuotationAffiliateOperation
                    );
                    openBottomSheet('PriceQuotationAffiliateOperationQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasPriceQuotationAffiliateOperationEdit())"
              >
                <button
                  @click="
                    setPriceQuotationAffiliateOperationData(
                      priceQuotationAffiliateOperation
                    );
                    openBottomSheet('PriceQuotationAffiliateOperationUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(
                    hasPriceQuotationAffiliateOperationFinaleDelete()
                  )
                "
              >
                <button
                  v-b-modal.PriceQuotationAffiliateOperationDelete
                  :title="$t('delete')"
                  @click="
                    setPriceQuotationAffiliateOperationData(
                      priceQuotationAffiliateOperation
                    )
                  "
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(
                    hasPriceQuotationAffiliateOperationChangeActivationType()
                  )
                "
              >
                <button
                  v-b-modal.PriceQuotationAffiliateOperationChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="
                    setPriceQuotationAffiliateOperationData(
                      priceQuotationAffiliateOperation
                    )
                  "
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriceQuotationAffiliateOperationData(
                      priceQuotationAffiliateOperation
                    );
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import {
  hasPriceQuotationAffiliateOperationEdit,
  hasPriceQuotationAffiliateOperationFinaleDelete,
  hasPriceQuotationAffiliateOperationChangeActivationType,
} from "./../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../utils/generalMixin";
import generalSettingsMixin from "./../../../../utils/generalSettingsMixin";

export default {
  name: "PriceQuotationAffiliateOperationsTable",
  mixins: [generalMixin, generalSettingsMixin],
  components: {
    FloatingMenu,
  },
  props: ["priceQuotationAffiliateOperationsData", "filterData", "defaultImg"],
  methods: {
    setPriceQuotationAffiliateOperationData(priceQuotationAffiliateOperation) {
      this.$emit(
        "setPriceQuotationAffiliateOperationData",
        priceQuotationAffiliateOperation
      );
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPriceQuotationAffiliateOperationEdit,
    hasPriceQuotationAffiliateOperationFinaleDelete,
    hasPriceQuotationAffiliateOperationChangeActivationType,
  },
};
</script>
