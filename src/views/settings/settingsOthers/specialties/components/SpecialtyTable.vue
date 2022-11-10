<template>
  <div v-if="specialtiesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("Specialties.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(specialty, index) in specialtiesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  specialty.specialtieImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(specialty.fullCode) }}</td>
          <td>
            {{ isDataExist(specialty.specialtieNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setSpecialtyData(specialty);
                    openBottomSheet('SpecialtyInfo');
                  "
                  :title="$t('info')"
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
  hasSpecialtyEdit,
  hasSpecialtyFinaleDelete,
  hasSpecialtyChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "SpecialtiesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
