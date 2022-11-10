<template>
  <div v-if="relativeRelationTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("RelativeRelationTypes.data") }}</th>
          <th rowspan="2">{{ $t("general.degree") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th>{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(relativeRelationType, index) in relativeRelationTypesData"
          :key="index"
        >
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  relativeRelationType.relativeRelationTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(relativeRelationType.fullCode) }}</td>
          <td>
            {{
              isDataExist(relativeRelationType.relativeRelationTypeNameCurrent)
            }}
          </td>
          <td>
            {{
              isDataExist(
                relativeRelationType.relativeRelationKinShipDegreeNameCurrent
              )
            }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setRelativeRelationTypeData(relativeRelationType);
                    openBottomSheet('RelativeRelationTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setRelativeRelationTypeData(relativeRelationType);
                    openBottomSheet('RelativeRelationTypeQRCode');
                  "
                  :title="$t('general.qrCode')"
                >
                  <img src="@/assets/images/qr-code.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasRelativeRelationTypeEdit())">
                <button
                  @click="
                    setRelativeRelationTypeData(relativeRelationType);
                    openBottomSheet('RelativeRelationTypeUpdate');
                  "
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </button>
              </li>
              <li v-if="checkPrivilege(hasRelativeRelationTypeFinaleDelete())">
                <button
                  v-b-modal.RelativeRelationTypeDelete
                  :title="$t('delete')"
                  @click="setRelativeRelationTypeData(relativeRelationType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <li
                v-if="
                  checkPrivilege(hasRelativeRelationTypeChangeActivationType())
                "
              >
                <button
                  v-b-modal.RelativeRelationTypeChangeActivationType
                  :title="$t('changeActivationType')"
                  @click="setRelativeRelationTypeData(relativeRelationType)"
                >
                  <img src="@/assets/images/changeActivationType.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setRelativeRelationTypeData(relativeRelationType);
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
  hasRelativeRelationTypeEdit,
  hasRelativeRelationTypeFinaleDelete,
  hasRelativeRelationTypeChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "RelativeRelationTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
  },
  props: ["relativeRelationTypesData", "filterData", "defaultImg"],
  methods: {
    setRelativeRelationTypeData(relativeRelationType) {
      this.$emit("setRelativeRelationTypeData", relativeRelationType);
    },
    checkPrivilege,
    isDataExist,
    fullPathFileFromServer,
    hasRelativeRelationTypeEdit,
    hasRelativeRelationTypeFinaleDelete,
    hasRelativeRelationTypeChangeActivationType,
  },
};
</script>
