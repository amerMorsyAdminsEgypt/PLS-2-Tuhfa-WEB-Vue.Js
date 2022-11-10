<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(communicationType, index) in communicationTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="communicationType.communicationTypeNameCurrent"
      :description="communicationType.fullCode"
      :imagePath="communicationType.communicationTypeImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setCommunicationTypeData(communicationType);
            openBottomSheet('CommunicationTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCommunicationTypeData(communicationType);
            openBottomSheet('CommunicationTypeQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCommunicationTypeEdit())">
        <button
          @click="
            setCommunicationTypeData(communicationType);
            openBottomSheet('CommunicationTypeUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCommunicationTypeFinaleDelete())">
        <button
          v-b-modal.CommunicationTypeDelete
          :title="$t('delete')"
          @click="setCommunicationTypeData(communicationType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasCommunicationTypeChangeActivationType())">
        <button
          v-b-modal.CommunicationTypeChangeActivationType
          :title="$t('changeActivationType')"
          @click="setCommunicationTypeData(communicationType)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setCommunicationTypeData(communicationType);
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
  hasCommunicationTypeEdit,
  hasCommunicationTypeFinaleDelete,
  hasCommunicationTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["communicationTypesData", "filterData", "defaultImg"],
  methods: {
    setCommunicationTypeData(communicationType) {
      this.$emit("setCommunicationTypeData", communicationType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasCommunicationTypeEdit,
    hasCommunicationTypeFinaleDelete,
    hasCommunicationTypeChangeActivationType,
  },
};
</script>
