<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(color, index) in colorsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="color.colorNameCurrent"
      :description="color.fullCode"
      :imagePath="color.colorImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setColorData(color);
            openBottomSheet('ColorInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setColorData(color);
            openBottomSheet('ColorQRCode');
          "
          :title="$t('Colors.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasColorEdit())">
        <button
          @click="
            setColorData(color);
            openBottomSheet('ColorUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasColorFinaleDelete())">
        <button
          v-b-modal.ColorDelete
          :title="$t('delete')"
          @click="setColorData(color)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasColorChangeActivationType())">
        <button
          v-b-modal.ColorChangeActivationType
          :title="$t('changeActivationType')"
          @click="setColorData(color)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setColorData(color);
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
  hasColorEdit,
  hasColorFinaleDelete,
  hasColorChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["colorsData", "filterData", "defaultImg"],
  methods: {
    setColorData(color) {
      this.$emit("setColorData", color);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasColorEdit,
    hasColorFinaleDelete,
    hasColorChangeActivationType,
  },
};
</script>
