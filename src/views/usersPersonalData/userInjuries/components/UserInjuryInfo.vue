<template>
  <CustomBottomSheet
    :refName="'UserInjuryInfo'"
    size="xl"
    :headerText="$t('UserInjuries.data')"
    :headerIcon="userInjury.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userInjury.fullCode"
        :title="$t('UserInjuries.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userInjury.injuryTypeData.injuryTypeNameCurrent"
        :title="$t('InjuryTypes.name')"
        :imgName="'injuryTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userInjury.bodyPartData.bodyPartNameCurrent"
        :title="$t('BodyParts.name')"
        :imgName="'bodyParts.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(userInjury.injuryDate, userInjury.injuryTime)
        "
        :title="$t('UserInjuries.injuryDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userInjury.injuryRecoveryStartDate,
            userInjury.injuryRecoveryStartTime
          )
        "
        :title="$t('UserInjuries.recoveryStartDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userInjury.injuryRecoveryEndDate,
            userInjury.injuryRecoveryEndTime
          )
        "
        :title="$t('UserInjuries.recoveryEndDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userInjury.userInjuryDescriptionAr"
        :title="$t('UserInjuries.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userInjury.userInjuryDescriptionEn"
        :title="$t('UserInjuries.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userInjury.userInjuryDescriptionUnd"
        :title="$t('UserInjuries.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userInjury.userInjuryNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import { formateDateTimeLang } from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["userInjury"],
  methods: {
    formateDateTimeLang,
  },
};
</script>
