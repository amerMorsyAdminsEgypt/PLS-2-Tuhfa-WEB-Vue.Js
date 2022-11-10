<template>
  <CustomBottomSheet
    :refName="'UserOperationInfo'"
    size="xl"
    :headerText="$t('UserOperations.data')"
    :headerIcon="userOperation.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOperation.fullCode"
        :title="$t('UserOperations.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOperation.operationTypeData.operationTypeNameCurrent"
        :title="$t('OperationTypes.name')"
        :imgName="'operationTypes.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOperation.bodyPartData.bodyPartNameCurrent"
        :title="$t('BodyParts.name')"
        :imgName="'bodyParts.svg'"
      />

      <DataLabelGroup
        :className="'col-lg-6'"
        :value="
          formateDateTimeLang(
            userOperation.operationDate,
            userOperation.operationDate
          )
        "
        :title="$t('UserOperations.operationDateTime')"
        :imgName="'dateAndTime.svg'"
      />

      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOperation.userOperationDescriptionAr"
        :title="$t('UserOperations.descriptionAr')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOperation.userOperationDescriptionEn"
        :title="$t('UserOperations.descriptionEn')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOperation.userOperationDescriptionUnd"
        :title="$t('UserOperations.descriptionUnd')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="userOperation.userOperationNotes"
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
  props: ["userOperation"],
  methods: {
    formateDateTimeLang,
  },
};
</script>
