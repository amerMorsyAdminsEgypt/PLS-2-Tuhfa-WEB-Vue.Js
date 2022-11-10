<template>
  <div class="row my-card">
    <DataLabelGroup
      :className="'col-md-6'"
      :value="complaint.complaintTitleCurrent"
      :title="$t('Complaints.title')"
      :imgName="'complaints.svg'"
    />
    <DataLabelGroup
      :className="'col-md-6'"
      :value="complaint.complaintStatusTypeNameCurrent"
      :title="$t('general.state')"
      :imgName="'type.svg'"
    />
    <DataLabelGroup
      :className="'col-md-6'"
      :value="complaint.complainingPersonUserInfoData.userNameCurrent"
      :title="$t('Complaints.complainingPersonUser')"
      :imgName="'user.svg'"
    />
    <DataLabelGroup
      :className="'col-md-6'"
      :value="complaint.complainingPersonUserInfoData.userPhoneWithCC"
      :title="$t('Users.phone')"
      :imgName="'phone.svg'"
    />

    <DataLabelGroup
      :className="'col-md-6'"
      :value="complaint.priorityTypeInfoData.priorityTypeNameCurrent"
      :title="$t('PriorityTypes.name')"
      :imgName="'priorityTypes.svg'"
    />
    <DataLabelGroup
      :className="'col-md-6'"
      :value="complaint.complaintTypeInfoData.complaintTypeNameCurrent"
      :title="$t('ComplaintTypes.name')"
      :imgName="'complaintTypes.svg'"
    />
    <DataLabelGroup
      :className="'col-md-6'"
      :value="complaint.complaintSectorInfoData.complaintSectorNameCurrent"
      :title="$t('ComplaintSectors.name')"
      :imgName="'complaintSectors.svg'"
    />
    <DataLabelGroup
      :className="'col-md-6'"
      :value="complaint.complaintNotes"
      :title="$t('notes')"
      :imgName="'notes.svg'"
    />
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../utils/functions";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  name: "ComplaintsTable",
  mixins: [generalMixin],
  components: { DataLabelGroup },
  props: ["complaint", "filterData", "defaultImg"],
  data() {
    return {};
  },
  methods: {
    isDataExist,
    fullPathFileFromServer,
  },
};
</script>
