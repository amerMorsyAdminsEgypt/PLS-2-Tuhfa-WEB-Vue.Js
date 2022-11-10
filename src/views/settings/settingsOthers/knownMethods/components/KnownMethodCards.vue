<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(knownMethod, index) in knownMethodsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="knownMethod.knownMethodNameCurrent"
      :description="knownMethod.fullCode"
      :imagePath="knownMethod.knownMethodImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setKnownMethodData(knownMethod);
            openBottomSheet('KnownMethodInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setKnownMethodData(knownMethod);
            openBottomSheet('KnownMethodQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasKnownMethodEdit())">
        <button
          @click="
            setKnownMethodData(knownMethod);
            openBottomSheet('KnownMethodUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasKnownMethodFinaleDelete())">
        <button
          v-b-modal.KnownMethodDelete
          :title="$t('delete')"
          @click="setKnownMethodData(knownMethod)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasKnownMethodChangeActivationType())">
        <button
          v-b-modal.KnownMethodChangeActivationType
          :title="$t('changeActivationType')"
          @click="setKnownMethodData(knownMethod)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setKnownMethodData(knownMethod);
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
  hasKnownMethodEdit,
  hasKnownMethodFinaleDelete,
  hasKnownMethodChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["knownMethodsData", "filterData", "defaultImg"],
  methods: {
    setKnownMethodData(knownMethod) {
      this.$emit("setKnownMethodData", knownMethod);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasKnownMethodEdit,
    hasKnownMethodFinaleDelete,
    hasKnownMethodChangeActivationType,
  },
};
</script>
