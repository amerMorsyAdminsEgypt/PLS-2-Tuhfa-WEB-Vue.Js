<template>
  <div v-if="expensesTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="4">{{ $t("ExpensesTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("general.defaultPrice") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expensesType, index) in expensesTypesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  expensesType.expensesTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(expensesType.fullCode) }}</td>
          <td>
            {{ isDataExist(expensesType.expensesTypeNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(expensesType.expensesTypeDefaultPrice) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setExpensesTypeData(expensesType);
                    openBottomSheet('ExpensesTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setExpensesTypeData(expensesType);
                    openBottomSheet('ExpensesTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasExpensesTypeEdit())">
                <button
                  @click="
                    setExpensesTypeData(expensesType);
                    openBottomSheet('ExpensesTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasExpensesTypeFinaleDelete())">
                <button
                  v-b-modal.ExpensesTypeDelete
                  :title="$t('delete')"
                  @click="setExpensesTypeData(expensesType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasExpensesTypeChangeActivationType())">
                <button
                  v-b-modal.ExpensesTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setExpensesTypeData(expensesType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setExpensesTypeData(expensesType);
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
  hasExpensesTypeEdit,
  hasExpensesTypeFinaleDelete,
  hasExpensesTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ExpensesTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["expensesTypesData", "filterData", "defaultImg"],
  methods: {
    setExpensesTypeData(expensesType) {
      this.$emit("setExpensesTypeData", expensesType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasExpensesTypeEdit,
    hasExpensesTypeFinaleDelete,
    hasExpensesTypeChangeActivationType,
  },
};
</script>
