<template>
  <CustomBottomSheet
    :refName="'DiscussionInfo'"
    size="xl"
    :headerText="$t('Discussions.data')"
    :headerIcon="discussion.icon"
  >
    <div class="row">
      <DataLabelGroup
        :className="'col-md-6'"
        :value="discussion.fullCode"
        :title="$t('Discussions.code')"
        :imgName="'code.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="discussion.discussionTitleCurrent"
        :title="$t('Discussions.title')"
        :imgName="'discussions.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="discussion.discussionTypeNameCurrent"
        :title="$t('general.type')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="discussion.discussionClosedStateTypeNameCurrent"
        :title="$t('general.state')"
        :imgName="'type.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="discussion.discussionDescriptionCurrent"
        :title="$t('description')"
        :imgName="'description.svg'"
      />
      <DataLabelGroup
        :className="'col-md-6'"
        :value="discussion.discussionNotes"
        :title="$t('notes')"
        :imgName="'notes.svg'"
      />
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["discussion"],
};
</script>
