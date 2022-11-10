<template>
  <div>
    <PreLoader v-if="isLoading" />

    <CustomBottomSheet
      refName="EducationalGroupAddStudents"
      size="xl"
      :headerText="$t('EducationalGroups.addStudents')"
      :headerIcon="educationalGroup.icon"
      @opened="getEducationalJoiningApplicationsDialog()"
    >
      <form autocomplete="off">
        <div class="my-card">
          <div class="row">
            <DataLabelGroup
              :className="'col-md-12'"
              :value="educationalGroup.educationalCategoryNameCurrent"
              :title="$t('EducationalCategories.name')"
              :imgName="'EducationalCategories.svg'"
            />
            <DataLabelGroup
              :className="'col-md-12'"
              :value="educationalGroup.educationalGroupNameCurrent"
              :title="$t('EducationalGroups.name')"
              :imgName="'EducationalGroups.svg'"
            />

            <CustomSelectBoxMultiple
              :className="'col-md-12'"
              :id="`addStudents-educationalJoiningApplicationTokens`"
              :value="educationalGroup.educationalJoiningApplicationTokens"
              :options="educationalJoiningApplicationTokensOptions"
              v-on:changeValue="
                educationalGroup.educationalJoiningApplicationTokens = $event
              "
              :title="$t('EducationalJoiningApplications.select')"
              :imgName="'EducationalJoiningApplications.svg'"
              :returnArrayOfObjects="false"
            />
          </div>
        </div>

        <div class="form-footer">
          <button
            name="submit"
            type="submit"
            class="btn btn-submit"
            @click.prevent="addStudents()"
          >
            {{ $t("add") }}
          </button>
          <button
            class="btn btn-cancel"
            @click.prevent="closeBottomSheet('EducationalGroupAddStudents')"
          >
            {{ $t("cancel") }}
          </button>
        </div>
      </form>
    </CustomBottomSheet>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import CustomSelectBoxMultiple from "./../../../../components/general/CustomSelectBoxMultiple.vue";
import { STATUS } from "./../../../../utils/constants";
import apiEducationalGroup from "./../../../../api/educational/educationalGroups";
import { getEducationalJoiningApplicationsDialog } from "./../../../../utils/dialogsOfApi";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomBottomSheet,
    DataLabelGroup,
    CustomSelectBoxMultiple,
  },
  props: ["educationalGroup"],
  data() {
    return {
      educationalJoiningApplicationTokensOptions: [],
    };
  },
  methods: {
    async addStudents() {
      this.isLoading = true;
      // let formData = objectToFormData(this.educationalGroup);
      try {
        const response = await apiEducationalGroup.addStudents(
          this.educationalGroup
        );
        if (response.data.status == STATUS.SUCCESS) {
          this.showMsg(response.data.msg, true);
          this.closeBottomSheet("EducationalGroupAddStudents");
          this.$emit("refresh");
        } else if (response.data.status == STATUS.INVALID_TOKEN) {
          this.$store.dispatch("logoutUser", response.data.msg);
          this.showMsg(response.data.msg);
        } else {
          this.showMsg(response.data.msg);
        }
      } catch (error) {
        this.showMsg(this.$t("errorCatch"));
      }
      this.isLoading = false;
    },
    async getEducationalJoiningApplicationsDialog() {
      this.isLoading = true;
      let params = {
        educationalCategoryToken:
          this.educationalGroup.educationalCategoryToken,
      };
      this.educationalJoiningApplicationTokensOptions =
        await getEducationalJoiningApplicationsDialog(params);
      this.isLoading = false;
    },
  },
  created() {
    // this.getEducationalJoiningApplicationsDialog();
  },
};
</script>
