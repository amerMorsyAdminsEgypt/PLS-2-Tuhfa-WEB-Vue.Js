<template>
  <div v-if="militaryStatusTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("MilitaryStatusTypes.data") }}</th>
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
          v-for="(militaryStatusType, index) in militaryStatusTypesData"
          :key="militaryStatusType.militaryStatusTypeToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(
                  militaryStatusType.militaryStatusTypeImagePath,
                  defaultImg
                )
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(militaryStatusType.fullCode) }}</td>
          <td>
            {{ isDataExist(militaryStatusType.militaryStatusTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setMilitaryStatusTypeData(militaryStatusType);
                    openBottomSheet('MilitaryStatusTypeInfo');
                  "
                  :title="$t('info')"
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
              <!-- v-if="
                  checkPrivilege(
                    usersPrivilegeData.usersPrivilegeMilitaryStatusType.update
                  )
                " -->
              <li>
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
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "MilitaryStatusTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
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
