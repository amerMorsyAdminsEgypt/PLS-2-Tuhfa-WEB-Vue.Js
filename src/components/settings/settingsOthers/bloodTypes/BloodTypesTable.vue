<template>
  <div v-if="bloodTypesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="3">{{ $t("BloodTypes.data") }}</th>
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
          v-for="(bloodType, index) in bloodTypesData"
          :key="bloodType.bloodTypeToken"
        >
          <td>{{ ++index + pagination.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(bloodType.bloodTypeImagePath, defaultImg)
              "
              :onerror="`this.src='${defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(bloodType.fullCode) }}</td>
          <td>
            {{ isDataExist(bloodType.bloodTypeNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li>
                <button
                  @click="
                    setBloodTypeData(bloodType);
                    openBottomSheet('BloodTypeInfo');
                  "
                  :title="$t('info')"
                >
                  <img src="@/assets/images/info.svg" />
                </button>
              </li>
              <li>
                <button
                  @click="
                    setBloodTypeData(bloodType);
                    openBottomSheet('BloodTypeQRCode');
                  "
                  :title="$t('BloodTypes.qrCode')"
                >
                  <qrcode-vue
                    :value="bloodType.fullCode"
                    :size="40"
                    level="H"
                  />
                </button>
              </li>
              <li v-if="checkPrivilege(hasBloodTypeEdit())">
                <router-link
                  :to="{
                    name: 'BloodTypeEdit',
                    params: {
                      bloodTypeToken: bloodType.bloodTypeToken,
                    },
                  }"
                  :title="$t('edit')"
                >
                  <img src="@/assets/images/pencil.svg" />
                </router-link>
              </li>
              <li v-if="checkPrivilege(hasBloodTypeFinaleDelete())">
                <button
                  v-b-modal.BloodTypeDelete
                  :title="$t('delete')"
                  @click="setBloodTypeData(bloodType)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <!-- v-if="
                  checkPrivilege(
                    usersPrivilegeData.usersPrivilegeBloodType.update
                  )
                " -->
              <li>
                <button
                  :title="$t('actionsData.modelName')"
                  @click="
                    setBloodTypeData(bloodType);
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
  hasBloodTypeEdit,
  hasBloodTypeFinaleDelete,
} from "@/utils/privilegeHelper";
import FloatingMenu from "@/components/general/FloatingMenu.vue";
import QrcodeVue from "qrcode.vue";
import generalMixin from "@/utils/generalMixin";

export default {
  name: "BloodTypesTable",
  mixins: [generalMixin],
  components: {
    FloatingMenu,
    QrcodeVue,
  },
  data() {
    return {};
  },
  props: ["bloodTypesData", "bloodTypeData", "pagination", "defaultImg"],
  methods: {
    setBloodTypeData(bloodType) {
      this.$emit("setBloodTypeData", bloodType);
    },
    isDataExist,
    checkPrivilege,
    fullPathFileFromServer,
    hasBloodTypeEdit,
    hasBloodTypeFinaleDelete,
  },
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
};
</script>
