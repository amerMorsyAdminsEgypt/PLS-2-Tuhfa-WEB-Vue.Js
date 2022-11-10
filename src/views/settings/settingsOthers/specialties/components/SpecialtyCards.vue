<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(specialty, index) in specialtiesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="specialty.specialtieNameCurrent"
      :description="specialty.fullCode"
      :imagePath="specialty.specialtieImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setSpecialtyData(specialty);
            openBottomSheet('SpecialtyInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSpecialtyData(specialty);
            openBottomSheet('SpecialtyQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSpecialtyEdit())">
        <button
          @click="
            setSpecialtyData(specialty);
            openBottomSheet('SpecialtyUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSpecialtyFinaleDelete())">
        <button
          v-b-modal.SpecialtyDelete
          :title="$t('delete')"
          @click="setSpecialtyData(specialty)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasSpecialtyChangeActivationType())">
        <button
          v-b-modal.SpecialtyChangeActivationType
          :title="$t('changeActivationType')"
          @click="setSpecialtyData(specialty)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setSpecialtyData(specialty);
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
  hasSpecialtyEdit,
  hasSpecialtyFinaleDelete,
  hasSpecialtyChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["specialtiesData", "filterData", "defaultImg"],
  methods: {
    setSpecialtyData(specialty) {
      this.$emit("setSpecialtyData", specialty);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasSpecialtyEdit,
    hasSpecialtyFinaleDelete,
    hasSpecialtyChangeActivationType,
  },
};
</script>
