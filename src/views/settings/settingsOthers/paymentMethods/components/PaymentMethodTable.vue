<template>
  <div v-if="paymentMethodsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("PaymentMethods.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(paymentMethod, index) in paymentMethodsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  paymentMethod.paymentMethodImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(paymentMethod.fullCode) }}</td>
          <td>
            {{ isDataExist(paymentMethod.paymentMethodNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setPaymentMethodData(paymentMethod);
                    openBottomSheet('PaymentMethodInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPaymentMethodData(paymentMethod);
                    openBottomSheet('PaymentMethodQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPaymentMethodEdit())">
                <button
                  @click="
                    setPaymentMethodData(paymentMethod);
                    openBottomSheet('PaymentMethodUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPaymentMethodFinaleDelete())">
                <button
                  v-b-modal.PaymentMethodDelete
                  :title="$t('delete')"
                  @click="setPaymentMethodData(paymentMethod)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPaymentMethodChangeActivationType())">
                <button
                  v-b-modal.PaymentMethodChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setPaymentMethodData(paymentMethod)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPaymentMethodData(paymentMethod);
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
} from "./../../../../../utils/functions";
import {
  hasPaymentMethodEdit,
  hasPaymentMethodFinaleDelete,
  hasPaymentMethodChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "PaymentMethodsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["paymentMethodsData", "filterData", "defaultImg"],
  methods: {
    setPaymentMethodData(paymentMethod) {
      this.$emit("setPaymentMethodData", paymentMethod);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPaymentMethodEdit,
    hasPaymentMethodFinaleDelete,
    hasPaymentMethodChangeActivationType,
  },
};
</script>
