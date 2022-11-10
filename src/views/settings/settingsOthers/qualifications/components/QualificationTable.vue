<template>
  <div v-if="qualificationsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Qualifications.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(qualification, index) in qualificationsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  qualification.qualificationImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(qualification.fullCode) }}</td>
          <td>
            {{ isDataExist(qualification.qualificationNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setQualificationData(qualification);
                    openBottomSheet('QualificationInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setQualificationData(qualification);
                    openBottomSheet('QualificationQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasQualificationEdit())">
                <button
                  @click="
                    setQualificationData(qualification);
                    openBottomSheet('QualificationUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasQualificationFinaleDelete())">
                <button
                  v-b-modal.QualificationDelete
                  :title="$t('delete')"
                  @click="setQualificationData(qualification)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasQualificationChangeActivationType())">
                <button
                  v-b-modal.QualificationChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setQualificationData(qualification)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setQualificationData(qualification);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li>
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  checkPrivilege,
  isDataExist,
  fullPathFileFromServer,
} from "./../../../../../utils/functions";
import {
  hasQualificationEdit,
  hasQualificationFinaleDelete,
  hasQualificationChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "QualificationsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["qualificationsData", "filterData", "defaultImg"],
  methods: {
    setQualificationData(qualification) {
      this.$emit("setQualificationData", qualification);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasQualificationEdit,
    hasQualificationFinaleDelete,
    hasQualificationChangeActivationType,
  },
};
</script>
