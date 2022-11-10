<template>
  <CustomBottomSheet
    :refName="'UserSysteamInterestInfo'"
    size="xl"
    :headerText="$t('UserSysteamInterests.data')"
    :headerIcon="userSysteamInterest.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userSysteamInterest.interestTypeNameCurrent"
        :title="$t('ConstantsListSelect.InterestTypesName')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          userSysteamInterest.priorityTypeInfoData
            ? userSysteamInterest.priorityTypeInfoData
                .replyStatusTypeNameCurrent
            : ''
        "
        :title="$t('PriorityTypes.name')"
        :imgName="'priorityTypes.svg'"
      />

      <!-- <DataLabelGroup
        :className="'col-md-6'"
        :value="userSysteamInterest.interestStatusNameCurrent"
        :title="$t('UserSysteamInterests.name')"
        :imgName="'UserSysteamOtherInterests.svg'"
      /> -->

      <template
        v-if="userSysteamInterest.interestTypeToken == INTEREST_TYPES.Place"
      >
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            userSysteamInterest.placeInfoData
              ? userSysteamInterest.placeInfoData.placeTypeNameCurrent
              : ''
          "
          :title="$t('Places.placeType')"
          :imgName="'type.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="
            userSysteamInterest.placeInfoData
              ? userSysteamInterest.placeInfoData.placeNameCurrent
              : ''
          "
          :title="$t('Places.name')"
          :imgName="'places.svg'"
        />
      </template>

      <DataLabelGroup
        v-else-if="
          userSysteamInterest.interestTypeToken ==
          INTEREST_TYPES.EducationalCategory
        "
        :className="'col-md-12'"
        :value="
          userSysteamInterest.educationalCategoryInfoData
            ? userSysteamInterest.educationalCategoryInfoData
                .educationalCategoryNameCurrent
            : ''
        "
        :title="$t('EducationalCategories.name')"
        :imgName="'EducationalCategories.svg'"
      />

      <DataLabelGroup
        v-else-if="
          userSysteamInterest.interestTypeToken ==
          INTEREST_TYPES.EducationalGroup
        "
        :className="'col-md-12'"
        :value="
          userSysteamInterest.educationalGroupInfoData
            ? userSysteamInterest.educationalGroupInfoData
                .educationalGroupNameCurrent
            : ''
        "
        :title="$t('EducationalGroups.name')"
        :imgName="'EducationalGroups.svg'"
      />

      <DataLabelGroup
        v-else-if="
          userSysteamInterest.interestTypeToken == INTEREST_TYPES.Service
        "
        :className="'col-md-12'"
        :value="
          userSysteamInterest.serviceInfoData
            ? userSysteamInterest.serviceInfoData.serviceNameCurrent
            : ''
        "
        :title="$t('Services.name')"
        :imgName="'services.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userSysteamInterest.systeamInterestDescriptionAr"
        :title="$t('UserSysteamInterests.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userSysteamInterest.systeamInterestDescriptionEn"
        :title="$t('UserSysteamInterests.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userSysteamInterest.systeamInterestDescriptionUnd"
        :title="$t('UserSysteamInterests.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userSysteamInterest.systeamInterestNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            userSysteamInterest.systeamInterestDateFrom,
            userSysteamInterest.systeamInterestTimeFrom
          )
        "
        :title="$t('FollowInterests.dateTimeFrom')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="
          formateDateTimeLang(
            userSysteamInterest.systeamInterestDateTo,
            userSysteamInterest.systeamInterestTimeTo
          )
        "
        :title="$t('FollowInterests.dateTimeTo')"
        :imgName="'dateAndTime.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { INTEREST_TYPES } from "./../../../../utils/constantLists";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["userSysteamInterest"],
  data() {
    return { INTEREST_TYPES };
  },
  methods: {
    formateDateTimeLang,
  },
};
</script>
