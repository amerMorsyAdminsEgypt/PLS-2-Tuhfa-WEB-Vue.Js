<template>
  <div v-if="priceListsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="6">{{ $t("PriceLists.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th class="cell-lg">{{ $t("EducationalCategories.name") }}</th>
          <th>{{ $t("PriceLists.packagePriceForClient") }}</th>
          <th>{{ $t("PriceLists.sessionPriceForClient") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(priceList, index) in priceListsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(priceList.priceListImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(priceList.fullCode) }}</td>
          <td>
            {{ isDataExist(priceList.priceListNameCurrent) }}
          </td>
          <td>
            {{
              isDataExist(
                priceList.educationalCategoryInfoData
                  ? priceList.educationalCategoryInfoData
                      .educationalCategoryNameCurrent
                  : ""
              )
            }}
          </td>
          <td>{{ isDataExist(priceList.priceListPackagePriceForClient) }}</td>
          <td>{{ isDataExist(priceList.priceListSessionPriceForClient) }}</td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setPriceListData(priceList);
                    openBottomSheet('PriceListInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriceListData(priceList);
                    openBottomSheet('PriceListQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPriceListEdit())">
                <button
                  @click="
                    setPriceListData(priceList);
                    openBottomSheet('PriceListUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPriceListFinaleDelete())">
                <button
                  v-b-modal.PriceListDelete
                  :title="$t('delete')"
                  @click="setPriceListData(priceList)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPriceListChangeActivationType())">
                <button
                  v-b-modal.PriceListChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setPriceListData(priceList)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPriceListData(priceList);
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
  hasPriceListEdit,
  hasPriceListFinaleDelete,
  hasPriceListChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "PriceListsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["priceListsData", "filterData", "defaultImg"],
  methods: {
    setPriceListData(priceList) {
      this.$emit("setPriceListData", priceList);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPriceListEdit,
    hasPriceListFinaleDelete,
    hasPriceListChangeActivationType,
  },
};
</script>
