<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(complaintType, index) in complaintTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="complaintType.complaintTypeNameCurrent"
      :description="complaintType.fullCode"
      :imagePath="complaintType.complaintTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setComplaintTypeData(complaintType);
            openBottomSheet('ComplaintTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setComplaintTypeData(complaintType);
            openBottomSheet('ComplaintTypeQRCode');
          "
          :title="$t('ComplaintTypes.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintTypeEdit())">
        <button
          @click="
            setComplaintTypeData(complaintType);
            openBottomSheet('ComplaintTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintTypeFinaleDelete())">
        <button
          v-b-modal.ComplaintTypeDelete
          :title="$t('delete')"
          @click="setComplaintTypeData(complaintType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasComplaintTypeChangeActivationType())">
        <button
          v-b-modal.ComplaintTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setComplaintTypeData(complaintType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setComplaintTypeData(complaintType);
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
  hasComplaintTypeEdit,
  hasComplaintTypeFinaleDelete,
  hasComplaintTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["complaintTypesData", "filterData", "defaultImg"],
  methods: {
    setComplaintTypeData(complaintType) {
      this.$emit("setComplaintTypeData", complaintType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasComplaintTypeEdit,
    hasComplaintTypeFinaleDelete,
    hasComplaintTypeChangeActivationType,
  },
};
</script>
