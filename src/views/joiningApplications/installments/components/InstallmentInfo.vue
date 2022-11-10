<template>
  <CustomBottomSheet
    :refName="'InstallmentInfo'"
    size="xl"
    :headerText="$t('Installments.data')"
    :headerIcon="installment.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          installment.debtUserInfoData
            ? installment.debtUserInfoData.userNameCurrent
            : ''
        "
        :title="$t('students.name')"
        :imgName="'students.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.fullCode"
        :title="$t('Installments.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.installmentNameAr"
        :title="$t('Installments.nameAr')"
        :imgName="'installments.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.installmentNameEn"
        :title="$t('Installments.nameEn')"
        :imgName="'installments.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.installmentNameUnd"
        :title="$t('Installments.nameUnd')"
        :imgName="'installments.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.installmentDescriptionAr"
        :title="$t('Installments.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.installmentDescriptionEn"
        :title="$t('Installments.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.installmentDescriptionUnd"
        :title="$t('Installments.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.installmentNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.totalScheduleInstallmentMoneyWithCurrency"
        :title="$t('general.value')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.totalScheduleIPaidMoneyWithCurrency"
        :title="$t('general.paid')"
        :imgName="'money.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="installment.totalScheduleRemainderMoneyWithCurrency"
        :title="$t('general.remainding')"
        :imgName="'money.svg'"
      />
    </div>
    <DataLabelGroup
      :className="'col-md-12'"
      :value="installment.cancelTypeNameCurrent"
      :title="$t('general.type')"
      :imgName="'type.svg'"
    />
    <div class="my-card row" v-if="installment.cancelUserToken">
      <span class="my-card-title">{{ $t("Installments.dataCancel") }}</span>
      <DataLabelGroup
        :className="'col-md-12'"
        :value="
          installment.cancelUserInfoDate
            ? installment.cancelUserInfoDate.userNameCurrent
            : ''
        "
        :title="$t('userMakeAction')"
        :imgName="'user.svg'"
      />
      <!-- <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            installment.cancelUserInfoDate ? installment.cancelUserInfoDate : '',
            
          )
        "
        :title="$t('userMakeAction')"
        :imgName="'user.svg'"
      /> -->
    </div>
    <div class="my-card row" v-if="installment.installmentDebtsData.length">
      <span class="my-card-title">{{ $t("Debts.data") }}</span>
      <table class="my-table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th class="cell-lg">{{ $t("title") }}</th>
            <th>{{ $t("general.type") }}</th>
            <th>{{ $t("Debts.schedulingStatusType") }}</th>
            <th>{{ $t("general.value") }}</th>
            <th>{{ $t("general.paid") }}</th>
            <th>{{ $t("general.remainding") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(debt, index) in installment.installmentDebtsData"
            :key="index"
          >
            <td>{{ ++index }}</td>
            <td>
              {{ isDataExist(debt.debtInfoData.debtTitleCurrent) }}
            </td>
            <td>
              {{ isDataExist(debt.debtInfoData.debtTypeNameCurrent) }}
            </td>
            <td>
              {{
                isDataExist(debt.debtInfoData.schedulingStatusTypeNameCurrent)
              }}
            </td>
            <td>
              {{ isDataExist(debt.debtInfoData.debtMoneyWithCurrency) }}
            </td>
            <td>
              {{ isDataExist(debt.debtInfoData.paidMoneyWithCurrency) }}
            </td>
            <td>
              {{ isDataExist(debt.debtInfoData.remainderMoneyWithCurrency) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="my-card row"
      v-if="installment.installmentScheduleTimesInfoData.length"
    >
      <span class="my-card-title">{{
        $t("Installments.dataScheduleTime")
      }}</span>
      <table class="my-table mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("general.value") }}</th>
            <th>{{ $t("general.paid") }}</th>
            <th>{{ $t("general.remainding") }}</th>
            <th>{{ $t("general.scheduleDateTime") }}</th>
            <th>{{ $t("notes") }}</th>
            <th v-if="checkPrivilege(hasInstallmentPaymentAdd())">
              <i class="fas fa-sliders-h"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(
              scheduleTime, index
            ) in installment.installmentScheduleTimesInfoData"
            :key="index"
          >
            <td>{{ ++index }}</td>

            <td>
              {{ isDataExist(scheduleTime.installmentMoneyWithCurrency) }}
            </td>
            <td>
              {{ isDataExist(scheduleTime.paidMoneyWithCurrency) }}
            </td>
            <td>
              {{ isDataExist(scheduleTime.remainderMoneyWithCurrency) }}
            </td>
            <td>
              {{
                formateDateTimeLang(
                  scheduleTime.installmentDate,
                  scheduleTime.installmentTime
                )
              }}
            </td>
            <td>
              {{ isDataExist(scheduleTime.installmentNotes) }}
            </td>
            <td
              class="fmenu-item-container"
              v-if="checkPrivilege(hasInstallmentPaymentAdd())"
            >
              <button
                v-if="scheduleTime.remainderMoney > 0"
                @click="addInstallmentPayment(scheduleTime)"
                :title="$t('pay')"
              >
                <img class="item-img-table" src="@/assets/images/pay.svg" />
              </button>
              <div v-else>--</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
// import FloatingMenu from "./../../../../components/general/FloatingMenu.vue";
import {
  checkPrivilege,
  isDataExist,
  formateDateTimeLang,
} from "./../../../../utils/functions";
import generalMixin from "./../../../../utils/generalMixin";
import { hasInstallmentPaymentAdd } from "./../../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin],
  components: {
    CustomBottomSheet,
    DataLabelGroup,
    // FloatingMenu,
  },
  props: ["installment"],
  data() {
    return {};
  },
  methods: {
    checkPrivilege,
    isDataExist,
    formateDateTimeLang,
    hasInstallmentPaymentAdd,
    addInstallmentPayment(scheduleTime) {
      this.$emit("addInstallmentPayment", scheduleTime);
    },
  },
  async created() {},
};
</script>
