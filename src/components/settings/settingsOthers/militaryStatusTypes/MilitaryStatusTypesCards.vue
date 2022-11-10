<template>
  <div class="row custom-cards">
    <CustomCard
      v-for="(militaryStatusType, index) in militaryStatusTypesData"
      :key="index"
      :className="'col-sm-6 col-md-4 col-lg-3'"
      :title="militaryStatusType.militaryStatusTypeNameCurrent"
      :description="militaryStatusType.fullCode"
      :imagePath="militaryStatusType.militaryStatusTypeImagePath"
      :defaultImg="defaultImg"
    >
      <li>
        <button
          :title="$t('info')"
          @click="
            setMilitaryStatusTypeData(militaryStatusType);
            openBottomSheet('MilitaryStatusTypeInfo');
          "
        >
          <img src="@/assets/images/info.svg" />
        </button>
      </li>
      <li>
        <button
          @click="
            setMilitaryStatusTypeData(militaryStatusType);
            openBottomSheet('MilitaryStatusTypeQRCode');
          "
          :title="$t('MilitaryStatusTypes.qrCode')"
        >
          <qrcode-vue
            :value="militaryStatusType.fullCode"
            :size="40"
            level="H"
          />
        </button>
      </li>
      <li v-if="checkPrivilege(hasMilitaryStatusTypeEdit())">
        <router-link
          :to="{
            name: 'MilitaryStatusTypeEdit',
            params: {
              militaryStatusTypeToken:
                militaryStatusType.militaryStatusTypeToken,
            },
          }"
          :title="$t('edit')"
        >
          <img src="@/assets/images/pencil.svg" />
        </router-link>
      </li>
      <li v-if="checkPrivilege(hasMilitaryStatusTypeFinaleDelete())">
        <button
          v-b-modal.MilitaryStatusTypeDelete
          :title="$t('delete')"
          @click="setMilitaryStatusTypeData(militaryStatusType)"
        >
          <img src="@/assets/images/trash.svg" />
        </button>
      </li>
      <li>
        <!-- v-if="
            checkPrivilege(
              usersPrivilegeData.usersPrivilegeMilitaryStatusType.update
            )
          " -->
        <button
          :title="$t('actionsData.modelName')"
          @click="
            setMilitaryStatusTypeData(militaryStatusType);
            openBottomSheet('ActionsData');
          "
        >
          <img src="@/assets/images/actions-data.svg" />
        </button>
      </li>
    </CustomCard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  isDataExist,
  checkPrivilege,
  fullPathFileFromServer,
} from "@/utils/functions";
import {
  hasMilitaryStatusTypeEdit,
  hasMilitaryStatusTypeFinaleDelete,
} from "@/utils/privilegeHelper";
import CustomCard from "@/components/general/CustomCard.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    CustomCard,
    QrcodeVue,
  },
  data() {
    return {};
  },
  props: [
    "militaryStatusTypesData",
    "militaryStatusTypeData",
    "pagination",
    "defaultImg",
  ],
  methods: {
    setMilitaryStatusTypeData(militaryStatusType) {
      this.$emit("setMilitaryStatusTypeData", militaryStatusType);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasMilitaryStatusTypeEdit,
    hasMilitaryStatusTypeFinaleDelete,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>
