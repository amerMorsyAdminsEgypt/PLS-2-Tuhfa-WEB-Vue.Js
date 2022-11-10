<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(bodyPart, index) in bodyPartsData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="bodyPart.bodyPartNameCurrent"
      :description="bodyPart.fullCode"
      :imagePath="bodyPart.bodyPartImagePath"
      :defaultImg="defaultImg"
      :index="++index + filterData.currentIndex"
    >
      <li v-if="bodyPart.isHaveChildrenStatus">
        <router-link
          :to="{
            name: 'BodyParts',
            params: {
              parentBodyPartToken: bodyPart.bodyPartToken,
            },
          }"
          :title="$t('BodyParts.modelName')"
        >
          <img src="@/assets/images/open.svg" />
        </router-link>
      </li>
      <li>
        <button
          :title="$t('info')"
          @click="
            setBodyPartData(bodyPart);
            openBottomSheet('BodyPartInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setBodyPartData(bodyPart);
            openBottomSheet('BodyPartQRCode');
          "
          :title="$t('general.qrCode')"
        >
          <img src="@/assets/images/qr-code.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBodyPartEdit())">
        <button
          @click="
            setBodyPartData(bodyPart);
            openBottomSheet('BodyPartUpdate');
          "
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBodyPartFinaleDelete())">
        <button
          v-b-modal.BodyPartDelete
          :title="$t('delete')"
          @click="setBodyPartData(bodyPart)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li v-if="checkPrivilege(hasBodyPartChangeActivationType())">
        <button
          v-b-modal.BodyPartChangeActivationType
          :title="$t('changeActivationType')"
          @click="setBodyPartData(bodyPart)"
        >
          <img src="@/assets/images/changeActivationType.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setBodyPartData(bodyPart);
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
  hasBodyPartEdit,
  hasBodyPartFinaleDelete,
  hasBodyPartChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import CustomCard from "./../../../../../components/general/CustomCard.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
  },
  props: ["bodyPartsData", "filterData", "defaultImg"],
  methods: {
    setBodyPartData(bodyPart) {
      this.$emit("setBodyPartData", bodyPart);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasBodyPartEdit,
    hasBodyPartFinaleDelete,
    hasBodyPartChangeActivationType,
  },
};
</script>
