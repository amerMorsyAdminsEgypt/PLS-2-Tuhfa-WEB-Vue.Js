<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(paymentMethod, index) in paymentMethodsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="paymentMethod.paymentMethodNameCurrent"
      :description="paymentMethod.fullCode"
      :imagePath="paymentMethod.paymentMethodImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setPaymentMethodData(paymentMethod);
            openBottomSheet('PaymentMethodInfo');
          "
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
    </CustomCard>
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
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
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
