<template>
  <CustomBottomSheet
    :refName="'ComplaintInfo'"
    size="xl"
    :headerText="$t('Complaints.data')"
    :headerIcon="complaint.icon"
  >
    <div class="row">
      <div class="col-md-12">
        <div class="main-container mb-2">
          <div
            v-if="complaint.complaintMediaTypeToken == MEDIA_TYPE_TOKENS.image"
            class="media-container"
          >
            <img
              class="media-item"
              :src="
                fullPathFileFromServer(
                  complaint.complaintMediaPath,
                  complaint.defaultImg
                )
              "
              :onerror="`this.src='${complaint.defaultImg}'`"
            />
          </div>
          <div
            v-if="complaint.complaintMediaTypeToken == MEDIA_TYPE_TOKENS.video"
            class="media-container"
          >
            <video controls class="media-item" style="cursor: pointer">
              <source
                :src="
                  fullPathFileFromServer(
                    complaint.complaintMediaPath,
                    complaint.defaultImg
                  )
                "
                type="video/mp4"
                :onerror="`this.src='${complaint.defaultImg}'`"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div />
        </div>
      </div>
    </div>
    <div class="my-card">
      <span class="my-card-title">{{ $t("Complaints.data") }}</span>
      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.fullCode"
          :title="$t('Complaints.code')"
          :imgName="'code.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complaintTitleAr"
          :title="$t('Complaints.titleAr')"
          :imgName="'complaints.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complaintTitleEn"
          :title="$t('Complaints.titleEn')"
          :imgName="'complaints.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complaintTitleUnd"
          :title="$t('Complaints.titleUnd')"
          :imgName="'complaints.svg'"
        />

        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complaintDescriptionAr"
          :title="$t('Complaints.descriptionAr')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complaintDescriptionEn"
          :title="$t('Complaints.descriptionEn')"
          :imgName="'description.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complaintDescriptionUnd"
          :title="$t('Complaints.descriptionUnd')"
          :imgName="'description.svg'"
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
          :className="'col-md-12'"
          :value="complaint.complaintNotes"
          :title="$t('notes')"
          :imgName="'notes.svg'"
        />
        <template
          v-if="
            complaint.complaintStatusTypeToken == COMPLAINT_STATUS_TYPE.Closed
          "
        >
          <DataLabelGroup
            :className="'col-md-6'"
            :value="complaint.closedByUserInfoData.userNameCurrent"
            :title="$t('Complaints.closedBy')"
            :imgName="'user.svg'"
          />
          <DataLabelGroup
            :className="'col-md-6'"
            :value="
              formateDateTimeLang(complaint.closedDate, complaint.closedTime)
            "
            :title="$t('actionsData.dateTime')"
            :imgName="'dateAndTime.svg'"
          />
          <DataLabelGroup
            :className="'col-md-12'"
            :value="complaint.closedNotes"
            :title="$t('notes')"
            :imgName="'notes.svg'"
          />
        </template>
      </div>
    </div>
    <div class="my-card">
      <span class="my-card-title">{{
        $t("Complaints.complainingPersonUser")
      }}</span>
      <div class="row">
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complainingPersonUserInfoData.fullCode"
          :title="$t('general.code')"
          :imgName="'number.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complainingPersonUserInfoData.userNameCurrent"
          :title="$t('general.name')"
          :imgName="'user.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6 phone-number'"
          :value="complaint.complainingPersonUserInfoData.userPhoneWithCC"
          :title="$t('phoneNumber')"
          :imgName="'phone.svg'"
        />
        <DataLabelGroup
          :className="'col-md-6'"
          :value="complaint.complainingPersonUserInfoData.userTypeNameCurrent"
          :title="$t('general.type')"
          :imgName="'type.svg'"
        />
      </div>
    </div>
  </CustomBottomSheet>
</template>

<script>
import CustomBottomSheet from "./../../../../components/general/CustomBottomSheet.vue";
import DataLabelGroup from "./../../../../components/general/DataLabelGroup.vue";
import {
  COMPLAINT_STATUS_TYPE,
  MEDIA_TYPE_TOKENS,
} from "./../../../../utils/constantLists";
import {
  formateDateTimeLang,
  fullPathFileFromServer,
} from "./../../../../utils/functions";

export default {
  components: {
    CustomBottomSheet,
    DataLabelGroup,
  },
  props: ["complaint"],
  data() {
    return {
      COMPLAINT_STATUS_TYPE: COMPLAINT_STATUS_TYPE,
      MEDIA_TYPE_TOKENS,
    };
  },
  methods: {
    formateDateTimeLang,
    fullPathFileFromServer,
  },
};
</script>
