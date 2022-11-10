<template>
  <CustomBottomSheet
    :refName="'UserExperienceInfo'"
    size="xl"
    :headerText="$t('UserExperiences.data')"
    :headerIcon="userExperience.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.fullCode"
        :title="$t('UserExperiences.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperienceNameAr"
        :title="$t('UserExperiences.PlaceNameAr')"
        :imgName="'UserExperiences.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperienceNameEn"
        :title="$t('UserExperiences.PlaceNameEn')"
        :imgName="'UserExperiences.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperienceNameUnd"
        :title="$t('UserExperiences.PlaceNameUnd')"
        :imgName="'UserExperiences.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperiencePlaceNameAr"
        :title="$t('UserExperiences.PlaceNameAr')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperiencePlaceNameEn"
        :title="$t('UserExperiences.PlaceNameEn')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperiencePlaceNameUnd"
        :title="$t('UserExperiences.PlaceNameUnd')"
        :imgName="'address.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.generalJobData.generalJobNameCurrent"
        :title="$t('GeneralJobs.name')"
        :imgName="'generalJobs.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.experienceDurationCurrent"
        :title="$t('general.duration')"
        :imgName="'time.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userExperience.startDate,
            userExperience.startTime
          )
        "
        :title="$t('UserExperiences.startDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(userExperience.endDate, userExperience.endTime)
        "
        :title="$t('UserExperiences.endDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperienceDescriptionAr"
        :title="$t('UserExperiences.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperienceDescriptionEn"
        :title="$t('UserExperiences.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperienceDescriptionUnd"
        :title="$t('UserExperiences.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userExperience.userExperienceNotes"
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
  props: ["userExperience"],
  methods: {
    formateDateTimeLang,
  },
};
</script>
