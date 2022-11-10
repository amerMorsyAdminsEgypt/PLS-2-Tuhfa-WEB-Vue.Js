<template>
  <div v-if="religionsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Religions.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(religion, index) in religionsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(religion.religionImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(religion.fullCode) }}</td>
          <td>
            {{ isDataExist(religion.religionNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setReligionData(religion);
                    openBottomSheet('ReligionInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setReligionData(religion);
                    openBottomSheet('ReligionQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReligionEdit())">
                <button
                  @click="
                    setReligionData(religion);
                    openBottomSheet('ReligionUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReligionFinaleDelete())">
                <button
                  v-b-modal.ReligionDelete
                  :title="$t('delete')"
                  @click="setReligionData(religion)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasReligionChangeActivationType())">
                <button
                  v-b-modal.ReligionChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setReligionData(religion)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setReligionData(religion);
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
  hasReligionEdit,
  hasReligionFinaleDelete,
  hasReligionChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "ReligionsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["religionsData", "filterData", "defaultImg"],
  methods: {
    setReligionData(religion) {
      this.$emit("setReligionData", religion);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasReligionEdit,
    hasReligionFinaleDelete,
    hasReligionChangeActivationType,
  },
};
</script>
