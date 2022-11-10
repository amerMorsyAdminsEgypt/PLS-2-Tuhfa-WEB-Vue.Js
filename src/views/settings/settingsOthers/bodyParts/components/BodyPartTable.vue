<template>
  <div v-if="bodyPartsData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("BodyParts.data") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bodyPart, index) in bodyPartsData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(bodyPart.bodyPartImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(bodyPart.fullCode) }}</td>
          <td>
            {{ isDataExist(bodyPart.bodyPartNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
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
                  @click="
                    setBodyPartData(bodyPart);
                    openBottomSheet('BodyPartInfo');
                  "
                  :title="$t('info')"
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
  hasBodyPartEdit,
  hasBodyPartFinaleDelete,
  hasBodyPartChangeActivationType,
} from "./../../../../../utils/privilegeHelper";
import FloatingMenu from "./../../../../../components/general/FloatingMenu.vue";
import generalMixin from "./../../../../../utils/generalMixin";

export default {
  name: "BodyPartsTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
