<template>
  <CustomBottomSheet
    :refName="'UserQualificationInfo'"
    size="xl"
    :headerText="$t('UserQualifications.data')"
    :headerIcon="userQualification.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userQualification.fullCode"
        :title="$t('UserQualifications.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userQualification.userQualificationNameAr"
        :title="$t('UserQualifications.nameAr')"
        :imgName="'UserQualifications.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userQualification.userQualificationNameEn"
        :title="$t('UserQualifications.nameEn')"
        :imgName="'UserQualifications.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userQualification.userQualificationNameUnd"
        :title="$t('UserQualifications.nameUnd')"
        :imgName="'UserQualifications.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userQualification.joiningDate,
            userQualification.joiningTime
          )
        "
        :title="$t('UserQualifications.joiningDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userQualification.obtainingDate,
            userQualification.obtainingTime
          )
        "
        :title="$t('UserQualifications.obtainingDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userQualification.userQualificationDescriptionAr"
        :title="$t('UserQualifications.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userQualification.userQualificationDescriptionEn"
        :title="$t('UserQualifications.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userQualification.userQualificationDescriptionUnd"
        :title="$t('UserQualifications.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userQualification.userQualificationNotes"
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
  props: ["userQualification"],
  methods: {
    formateDateTimeLang,
  },
};
</script>
