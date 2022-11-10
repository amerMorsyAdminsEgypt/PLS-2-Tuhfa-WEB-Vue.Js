<template>
  <CustomBottomSheet
    :refName="'UserScientificDegreeInfo'"
    size="xl"
    :headerText="$t('UserScientificDegrees.data')"
    :headerIcon="userScientificDegree.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userScientificDegree.fullCode"
        :title="$t('UserScientificDegrees.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userScientificDegree.userScientificDegreeNameAr"
        :title="$t('UserScientificDegrees.nameAr')"
        :imgName="'UserScientificDegrees.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userScientificDegree.userScientificDegreeNameEn"
        :title="$t('UserScientificDegrees.nameEn')"
        :imgName="'UserScientificDegrees.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userScientificDegree.userScientificDegreeNameUnd"
        :title="$t('UserScientificDegrees.nameUnd')"
        :imgName="'UserScientificDegrees.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userScientificDegree.joiningDate,
            userScientificDegree.joiningTime
          )
        "
        :title="$t('UserScientificDegrees.joiningDateTime')"
        :imgName="'dateAndTime.svg'"
      />
      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userScientificDegree.obtainingDate,
            userScientificDegree.obtainingTime
          )
        "
        :title="$t('UserScientificDegrees.obtainingDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userScientificDegree.userScientificDegreeDescriptionAr"
        :title="$t('UserScientificDegrees.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userScientificDegree.userScientificDegreeDescriptionEn"
        :title="$t('UserScientificDegrees.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userScientificDegree.userScientificDegreeDescriptionUnd"
        :title="$t('UserScientificDegrees.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userScientificDegree.userScientificDegreeNotes"
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
  props: ["userScientificDegree"],
  methods: {
    formateDateTimeLang,
  },
};
</script>
