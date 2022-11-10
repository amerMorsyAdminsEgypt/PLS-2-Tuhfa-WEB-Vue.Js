<template>
  <CustomBottomSheet
    :refName="'GradingPlanInfo'"
    size="xl"
    :headerText="$t('GradingPlans.data')"
    :headerIcon="gradingPlan.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="gradingPlan.fullCode"
        :title="$t('GradingPlans.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="gradingPlan.gradingPlanNameAr"
        :title="$t('GradingPlans.nameAr')"
        :imgName="'GradingPlans.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="gradingPlan.gradingPlanNameEn"
        :title="$t('GradingPlans.nameEn')"
        :imgName="'GradingPlans.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="gradingPlan.gradingPlanNameUnd"
        :title="$t('GradingPlans.nameUnd')"
        :imgName="'GradingPlans.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="gradingPlan.gradingPlanDescriptionAr"
        :title="$t('GradingPlans.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="gradingPlan.gradingPlanDescriptionEn"
        :title="$t('GradingPlans.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="gradingPlan.gradingPlanDescriptionUnd"
        :title="$t('GradingPlans.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="gradingPlan.gradingPlanNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-12'"
        :value="gradingPlan.gradingPlanSlicesTypeNameCurrent"
        :title="$t('general.gradingPlanType')"
        :imgName="'type.svg'"
      />
      <div class="my-card row" v-if="gradingPlan.gradingPlanSlicesData.length">
        <span class="my-card-title">{{
          $t("GradingPlans.gradingPlanSlicesData")
        }}</span>
        <table class="my-table mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("GradingPlans.degreeFrom") }}</th>
              <th>{{ $t("GradingPlans.degreeTo") }}</th>
              <th>{{ $t("GradingPlans.degreeNameAr") }}</th>
              <th>{{ $t("GradingPlans.degreeNameEn") }}</th>
              <th>{{ $t("GradingPlans.degreeNameUnd") }}</th>
              <th>{{ $t("notes") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(type, index) in gradingPlan.gradingPlanSlicesData"
              :key="index"
            >
              <td>{{ ++index }}</td>
              <td>
                {{ isDataExist(type.degreeFrom) }}
              </td>
              <td>
                {{ isDataExist(type.degreeTo) }}
              </td>
              <td>
                {{ isDataExist(type.degreeNameAr) }}
              </td>
              <td>
                {{ isDataExist(type.degreeNameEn) }}
              </td>
              <td>
                {{ isDataExist(type.degreeNameUnd) }}
              </td>
              <td>
                {{ isDataExist(type.degreeNotes) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../../components/general/DataLabelGroup.vue";
import { isDataExist } from "../../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["gradingPlan"],
  methods: {
    isDataExist,
  },
};
</script>
