import { STATUS, VIEW_TYPES } from "./../../../utils/constants";
import { ACTIVATION_TYPE } from "./../../../utils/constantLists";
import EducationalCategories from "./../../../models/educational/educationalCategories/EducationalCategories";
import apiEducationalCategory from "./../../../api/educational/educationalCategories";
import { getDialogOfActivationTypes } from "./../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../utils/generalMixin";
import generalSettingsMixin from "./../../../utils/generalSettingsMixin";
import { checkPrivilege } from "./../../../utils/functions";
import {
  hasEducationalCategoryAdd,
  hasEducationalCategoryViewActive,
  hasEducationalCategoryViewArchive,
  hasEducationalCategoryViewBlocked,
} from "./../../../utils/privilegeHelper";

export default {
  mixins: [generalMixin, generalSettingsMixin],
  computed: {
    hasData() {
      return this.educationalCategories.educationalCategoriesData.length != 0;
    },
    activationTypesTokensOptions: function () {
      let arr = [];
      if (checkPrivilege(hasEducationalCategoryViewActive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Active
        );
        obj.totalNumber =
          this.educationalCategories.activationStatistics.totalActiveCount || 0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalCategoryViewArchive())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Archived
        );
        obj.totalNumber =
          this.educationalCategories.activationStatistics.totalArchivedCount ||
          0;
        if (obj) arr.push(obj);
      }
      if (checkPrivilege(hasEducationalCategoryViewBlocked())) {
        let obj = this.activationTypesTokenOptions.find(
          (e) => e.value === ACTIVATION_TYPE.Blocked
        );
        obj.totalNumber =
          this.educationalCategories.activationStatistics.totalBlockedCount ||
          0;
        if (obj) arr.push(obj);
      }
      return arr;
    },
  },
  data() {
    return {
      educationalCategories: new EducationalCategories(),
      VIEW_TYPES,
      activationTypesTokenOptions: getDialogOfActivationTypes(),
    };
  },
  methods: {
    checkPrivilege,
    hasEducationalCategoryAdd,
    changePagination(pagination) {
      this.educationalCategories.filterData.fillData(pagination);
      this.getAllEducationalCategories();
    },
    changeActivationType(data) {
      this.updateActivationTypeTokens("educationalCategories", data);
      this.educationalCategories.filterData.activationTypeTokens = data;
      this.getAllEducationalCategories();
    },
    search(data) {
      this.educationalCategories.filterData.fillData(data);
      this.getAllEducationalCategories();
    },
    async getAllEducationalCategories(fullTreeDataInclude = false) {
      this.isLoading = true;
      try {
        this.educationalCategories.filterData.fullTreeDataInclude =
          fullTreeDataInclude;
        this.educationalCategories.filterData.parentEducationalCategoryDataInclude = true;
        this.educationalCategories.filterData.gradingPlanDataInclude = true;
        this.educationalCategories.filterData.systemComponentDataInclude = true;
        this.educationalCategories.filterData.systemComponentsHierarchyDataInclude = true;
        this.educationalCategories.filterData.parentEducationalCategoryToken =
          this.parentEducationalCategoryToken;
        this.educationalCategories.filterData.getOnlyParentEducationalCategories =
          this.parentEducationalCategoryToken ? false : true;

        this.educationalCategories.educationalCategoriesData = [];
        const response = await apiEducationalCategory.getAll(
          this.educationalCategories.filterData
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.exceptionMsg = null;
        } else if (response.data.status == STATUS.NO_INTERNET) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noInternet.svg";
        } else if (response.data.status == STATUS.NO_CONTENT) {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = "illustrator-noData.svg";
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
        } else {
          this.exceptionMsg = response.data.msg;
          this.exceptionImg = null;
        }
        this.educationalCategories.fillData(response.data);
      } catch (error) {
        this.exceptionMsg = this.$t("errorCatch");
        this.exceptionImg = null;
      }
      this.isLoading = false;
    },
  },
};
