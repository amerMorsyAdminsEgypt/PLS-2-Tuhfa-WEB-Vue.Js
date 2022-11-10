<template>
  <div v-if="personalCardTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("PersonalCardTypes.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(personalCardType, index) in personalCardTypesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  personalCardType.personalCardTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(personalCardType.fullCode) }}</td>
          <td>
            {{ isDataExist(personalCardType.personalCardTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setPersonalCardTypeData(personalCardType);
                    openBottomSheet('PersonalCardTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPersonalCardTypeData(personalCardType);
                    openBottomSheet('PersonalCardTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPersonalCardTypeEdit())">
                <button
                  @click="
                    setPersonalCardTypeData(personalCardType);
                    openBottomSheet('PersonalCardTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasPersonalCardTypeFinaleDelete())">
                <button
                  v-b-modal.PersonalCardTypeDelete
                  :title="$t('delete')"
                  @click="setPersonalCardTypeData(personalCardType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="checkPrivilege(hasPersonalCardTypeChangeActivationType())"
              >
                <button
                  v-b-modal.PersonalCardTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setPersonalCardTypeData(personalCardType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setPersonalCardTypeData(personalCardType);
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
  hasPersonalCardTypeEdit,
  hasPersonalCardTypeFinaleDelete,
  hasPersonalCardTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "PersonalCardTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["personalCardTypesData", "filterData", "defaultImg"],
  methods: {
    setPersonalCardTypeData(personalCardType) {
      this.$emit("setPersonalCardTypeData", personalCardType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasPersonalCardTypeEdit,
    hasPersonalCardTypeFinaleDelete,
    hasPersonalCardTypeChangeActivationType,
  },
};
</script>
