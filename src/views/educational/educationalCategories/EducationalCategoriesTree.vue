<template>
  <div class="">
    <DashboardNavbar
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
        <div class="custom-cards">
          <CustomTreeView
            v-for="(item, index) in treeData"
            v-on:emitData="
              educationalCategories.educationalCategory.fillData($event)
            "
            :treeData="item"
            :key="index"
          />
        </div>

        <EducationalCategoryInfo
          :token="
            educationalCategories.educationalCategory.educationalCategoryToken
          "
        />
        <EducationalCategoryDelete
          :educationalCategory="educationalCategories.educationalCategory"
          v-on:refresh="getAllEducationalCategories(true)"
        />
        <EducationalCategoryChangeActivationType
          :educationalCategory="educationalCategories.educationalCategory"
          v-on:refresh="getAllEducationalCategories(true)"
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
        v-on:refresh="getAllEducationalCategories(true)"
      />
      <EducationalCategoryUpdate
        :token="
          educationalCategories.educationalCategory.educationalCategoryToken
        "
        v-on:refresh="getAllEducationalCategories(true)"
      />
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "./../../../layouts/components/DashboardNavbar.vue";
import PreLoader from "./../../../components/general/PreLoader.vue";
import ExceptionWithImg from "./../../../components/general/ExceptionWithImg.vue";
import CustomBottomSheetQRCode from "./../../../components/general/CustomBottomSheetQRCode.vue";
import CustomPagination from "./../../../components/general/CustomPagination.vue";
import CustomTreeView from "./../../../components/general/CustomTreeView.vue";
import EducationalCategoryAdd from "./components/EducationalCategoryAdd.vue";
import EducationalCategoryUpdate from "./components/EducationalCategoryUpdate.vue";
import EducationalCategoryTabs from "./components/EducationalCategoryTabs.vue";
import EducationalCategoryInfo from "./components/EducationalCategoryInfo.vue";
import EducationalCategoryDelete from "./components/EducationalCategoryDelete.vue";
import EducationalCategoryChangeActivationType from "./components/EducationalCategoryChangeActivationType.vue";
import EducationalCategoryFilter from "./components/EducationalCategoryFilter.vue";
import EducationalCategoryTree from "./../../../models/educational/educationalCategories/EducationalCategoryTree";
import EducationalCategoriesMixin from "./EducationalCategoriesMixin";
import icon from "@/assets/images/qr-code.svg";
import icon2 from "@/assets/images/type.svg";
import iconOpenFolder from "@/assets/images/open-folder.svg";

export default {
  mixins: [EducationalCategoriesMixin],
  components: {
    DashboardNavbar,
    PreLoader,
    ExceptionWithImg,
    CustomBottomSheetQRCode,
    CustomPagination,
    CustomTreeView,
    EducationalCategoryAdd,
    EducationalCategoryUpdate,
    EducationalCategoryTabs,
    EducationalCategoryInfo,
    EducationalCategoryDelete,
    EducationalCategoryChangeActivationType,
    EducationalCategoryFilter,
  },
  computed: {
    treeData: function () {
      return this.educationalCategories.educationalCategoriesData.map(
        (item) => new EducationalCategoryTree(item.fullTreeData)
      );
    },
  },
  data() {
    return {
      treeDatazzz: {
        name: "سنه أولي",
        image: icon,
        actions: [
          {
            type: "link",
            title: this.$t("EducationalCategories.modelName"),
            icon: iconOpenFolder,
            route: {
              name: "EducationalCategories",
              params: { parentEducationalCategoryToken: "zzzzz" },
            },
          },
          {
            type: "bottomSheet",
            title: "zz",
            icon: iconOpenFolder,
            actionName: "bottomSheet",
            data: { token: "zzzzz" },
          },
          {
            type: "modal",
            title: "zz",
            icon: iconOpenFolder,
            actionName: "bottomSheet",
            data: { token: "zzzzz" },
          },
        ],
        children: [
          { name: "عربي", image: icon2 },
          { name: "دراسات", image: icon2 },
          {
            name: "علوم",
            image: icon,
            children: [
              {
                name: "ترم أول",
                image: icon,
                children: [{ name: "شهر أكتوبر" }, { name: "شهر نوفمبر" }],
              },
              { name: "ترم تاني", image: icon2 },
              { name: "ترم تالت", image: icon2 },
              {
                name: "ترم رابع",
                image: icon,
                children: [{ name: "شهر أكتوبر" }, { name: "شهر نوفمبر" }],
              },
            ],
          },
        ],
      },
    };
  },
  async created() {
    this.getAllEducationalCategories(true);
  },
};
</script>
