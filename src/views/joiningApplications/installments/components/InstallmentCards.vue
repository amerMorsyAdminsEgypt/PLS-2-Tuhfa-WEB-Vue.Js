<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(installment, index) in installmentsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="installment.installmentNameCurrent"
      :description="installment.fullCode"
      :imagePath="installment.installmentImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
      :indexBg="getClass(installment)"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setInstallmentData(installment);
            openBottomSheet('InstallmentInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setInstallmentData(installment);
            openBottomSheet('InstallmentQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasInstallmentEdit())">
        <button
          @click="
            setInstallmentData(installment);
            openBottomSheet('InstallmentUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>

      <li
        v-if="
          checkPrivilege(hasInstallmentCancel()) &&
          installment.totalScheduleIPaidMoney == 0 &&
          installment.cancelTypeToken == CANCEL_TYPE_TOKENS.NotCanceled
        "
      >
        <button
          :title="$t('cancel')"
          @click="
            setInstallmentData(installment);
            openBottomSheet('InstallmentDelete');
          "
        >
          <img src="@/assets/images/cancel.svg" />
        </button>
      </li>

      <li>
        <button
          @click="
            setInstallmentData(installment);
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
} from "./../../../../utils/functions";
import {
  hasInstallmentEdit,
  hasInstallmentCancel,
} from "./../../../../utils/privilegeHelper";
import CustomCard from "./../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../utils/generalMixin";
import { CANCEL_TYPE_TOKENS } from "./../../../../utils/constantLists";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["installmentsData", "filterData", "defaultImg"],
  data() {
    return {
      CANCEL_TYPE_TOKENS,
    };
  },
  methods: {
    getClass(installment) {
      let className = "status-grey";
      // paid all
      if (installment.totalScheduleRemainderMoney == 0) {
        className = "status-green";
      } else if (installment.totalScheduleRemainderMoney > 0) {
        className = "status-yellow";
      }

      // canceled
      if (installment.cancelTypeToken == CANCEL_TYPE_TOKENS.Canceled) {
        className = "status-red";
      }
      return className;
    },
    setInstallmentData(installment) {
      this.$emit("setInstallmentData", installment);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasInstallmentEdit,
    hasInstallmentCancel,
  },
};
</script>
