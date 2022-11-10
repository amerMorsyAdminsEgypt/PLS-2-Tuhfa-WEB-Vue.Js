<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(complaintSector, index) in complaintSectorsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="complaintSector.complaintSectorNameCurrent"
      :description="complaintSector.fullCode"
      :imagePath="complaintSector.complaintSectorImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setComplaintSectorData(complaintSector);
            openBottomSheet('ComplaintSectorInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setComplaintSectorData(complaintSector);
            openBottomSheet('ComplaintSectorQRCode');
          "
          :title="$t('ComplaintSectors.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintSectorEdit())">
        <button
          @click="
            setComplaintSectorData(complaintSector);
            openBottomSheet('ComplaintSectorUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintSectorFinaleDelete())">
        <button
          v-b-modal.ComplaintSectorDelete
          :title="$t('delete')"
          @click="setComplaintSectorData(complaintSector)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintSectorChangeActivationType())">
        <button
          v-b-modal.ComplaintSectorChangeActivationType
          :title="$t('changeActivationType')"
          @click="setComplaintSectorData(complaintSector)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setComplaintSectorData(complaintSector);
            openBottomSheet('ActionsData');
          "
          :title="$t('actionsData.modelName')"
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../../utils/functions";
import {
  hasComplaintSectorEdit,
  hasComplaintSectorFinaleDelete,
  hasComplaintSectorChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["complaintSectorsData", "filterData", "defaultImg"],
  methods: {
    setComplaintSectorData(complaintSector) {
      this.$emit("setComplaintSectorData", complaintSector);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasComplaintSectorEdit,
    hasComplaintSectorFinaleDelete,
    hasComplaintSectorChangeActivationType,
  },
};
</script>
