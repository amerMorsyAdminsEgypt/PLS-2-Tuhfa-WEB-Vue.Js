<template>
  <div class="">
    <DashboardNavbar
      v-on:updateViewType="updateViewType('educationalCategories', $event)"
      :viewType="generalSetting.educationalCategories.viewType"
      :viewTypeStatus="true"
      v-on:updateActivationTypeTokens="changeActivationType($event)"
      :activationTypeTokens="
        generalSetting.educationalCategories.activationTypeTokens
      "
      :activationTypesTokensOptions="activationTypesTokensOptions"
      :activationTypeStatus="true"
      :btnAddTitle="$t('EducationalCategories.add')"
      :btnAddName="'EducationalCategoryAdd'"
      :btnAddStatus="checkPrivilege(hasEducationalCategoryAdd())"
      :filterSheetName="'filterSheet'"
      :filterSheetStatus="true"
    />
    <PreLoader v-if="isLoading" />

    <div class="app-content pagination-with-content">
      <EducationalCategoryTabs />

      <template v-if="hasData">
        <EducationalCategoryTable
          v-if="
            generalSetting.educationalCategories.viewType == VIEW_TYPES.table
          "
          v-on:setEducationalCategoryData="
            educationalCategories.educationalCategory.fillData($event)
          "
          :educationalCategoriesData="
            educationalCategories.educationalCategoriesData
          "
          :defaultImg="educationalCategories.educationalCategory.defaultImg"
          :filterData="educationalCategories.filterData"
        />

        <EducationalCategoryCards
          v-else-if="
            generalSetting.educationalCategories.viewType == VIEW_TYPES.cards
          "
          v-on:setEducationalCategoryData="
            educationalCategories.educationalCategory.fillData($event)
          "
          :educationalCategoriesData="
            educationalCategories.educationalCategoriesData
          "
          :defaultImg="educationalCategories.educationalCategory.defaultImg"
          :filterData="educationalCategories.filterData"
        />

        <ActionsData :actionsData="educationalCategories.educationalCategory" />
        <EducationalCategoryInfo
          :token="
            educationalCategories.educationalCategory.educationalCategoryToken
          "
        />
        <EducationalCategoryDelete
          :educationalCategory="educationalCategories.educationalCategory"
          v-on:refresh="getAllEducationalCategories(false)"
        />
        <EducationalCategoryChangeActivationType
          :educationalCategory="educationalCategories.educationalCategory"
          v-on:refresh="getAllEducationalCategories(false)"
        />
        <CustomBottomSheetQRCode
          :refName="'EducationalCategoryQRCode'"
          :code="educationalCategories.educationalCategory.fullCode"
          :codeTitle="$t('EducationalCategories.code')"
          :name="
            educationalCategories.educationalCategory
              .educationalCategoryNameCurrent
          "
          :nameTitle="$t('EducationalCategories.name')"
          :nameIcon="'EducationalCategories.svg'"
        />
      </template>
      <ExceptionWithImg
        v-if="exceptionMsg"
        :msg="exceptionMsg"
        :image="exceptionImg"
      />
      <CustomPagination
        v-if="hasData"
        :paginationData="educationalCategories.filterData"
        v-on:changePagination="changePagination($event)"
      />
      <EducationalCategoryFilter
        :theFilterData="educationalCategories.filterData"
        v-on:search="search($event)"
      />

      <EducationalCategoryAdd
        :educationalCategory="educationalCategories.educationalCategory"
        v-on:refresh="getAllEducationalCategories(false)"
      />
      <EducationalCategoryUpdate
        :token="
          educationalCategories.educationalCategory.educationalCategoryToken
        "
        v-on:refresh="getAllEducationalCategories(false)"
      />
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import ActionsData from "./../../../components/general/ActionsData.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import EducationalCategoryAdd from "./components/EducationalCategoryAdd.vue";
import EducationalCategoryUpdate from "./components/EducationalCategoryUpdate.vue";
import EducationalCategoryCards from "./components/EducationalCategoryCards.vue";
import EducationalCategoryTable from "./components/EducationalCategoryTable.vue";
import EducationalCategoryTabs from "./components/EducationalCategoryTabs.vue";
import EducationalCategoryInfo from "./components/EducationalCategoryInfo.vue";
import EducationalCategoryDelete from "./components/EducationalCategoryDelete.vue";
import EducationalCategoryChangeActivationType from "./components/EducationalCategoryChangeActivationType.vue";
import EducationalCategoryFilter from "./components/EducationalCategoryFilter.vue";
import EducationalCategoriesMixin from "./EducationalCategoriesMixin";

export default {
  mixins: [EducationalCategoriesMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    ActionsData,
    CustomBottomSheetQRCode,
    CustomPagination,
    EducationalCategoryAdd,
    EducationalCategoryUpdate,
    EducationalCategoryCards,
    EducationalCategoryTable,
    EducationalCategoryTabs,
    EducationalCategoryInfo,
    EducationalCategoryDelete,
    EducationalCategoryChangeActivationType,
    EducationalCategoryFilter,
  },
  props: {
    parentEducationalCategoryToken: {
      type: String,
      default: "",
    },
  },
  watch: {
    parentEducationalCategoryToken: function () {
      this.getAllEducationalCategories(false);
    },
  },
  async created() {
    this.getAllEducationalCategories(false);
  },
};
</script>
