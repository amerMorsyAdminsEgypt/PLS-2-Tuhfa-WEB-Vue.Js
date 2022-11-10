<template>
  <div v-if="placesData" class="table-container">
    <table class="my-table">
      <thead>
        <tr>
          <th rowspan="2">#</th>
          <th colspan="5">{{ $t("Places.data") }}</th>
          <th rowspan="2">{{ $t("SystemComponentsHierarchies.place") }}</th>
          <th rowspan="2">{{ $t("SystemComponents.place") }}</th>
          <th rowspan="2"><i class="fas fa-sliders-h"></i></th>
        </tr>
        <tr>
          <th>{{ $t("general.image") }}</th>
          <th>{{ $t("general.code") }}</th>
          <th class="cell-lg">{{ $t("general.name") }}</th>
          <th>{{ $t("phone1") }}</th>
          <th>{{ $t("Places.address") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(place, index) in placesData" :key="index">
          <td>{{ ++index + filterData.currentIndex }}</td>
          <td>
            <img
              class="item-img-table"
              :src="
                fullPathFileFromServer(place.placeImagePath, place.defaultImg)
              "
              :onerror="`this.src='${place.defaultImg}'`"
            />
          </td>
          <td>{{ isDataExist(place.fullCode) }}</td>
          <td>
            {{ isDataExist(place.placeNameCurrent) }}
          </td>
          <td class="table-phone-number">
            {{ isDataExist(place.placePhone1WithCC) }}
          </td>
          <td>
            {{ isDataExist(place.placeAddressCurrent) }}
          </td>
          <td>
            {{ isDataExist(place.systemComponentHierarchyNameCurrent) }}
          </td>
          <td>
            {{ isDataExist(place.systemComponentNameCurrent) }}
          </td>
          <td class="fmenu-item-container">
            <FloatingMenu>
              <li v-if="checkPrivilege(hasPlaceUserFinaleDelete())">
                <button
                  v-b-modal.PlaceUserDelete
                  :title="$t('delete')"
                  @click="setPlaceUserData(place.model)"
                >
                  <img src="@/assets/images/trash.svg" />
                </button>
              </li>
              <!-- <li>
                <button
                  @click="
                    setPlaceUserData(place.model);
                    openBottomSheet('ActionsData');
                  "
                  :title="$t('actionsData.modelName')"
                >
                  <img src="@/assets/images/actions-data.svg" />
                </button>
              </li> -->
            </FloatingMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  isDataExist,
  fullPathFileFromServer,
} from "./../../../utils/functions";

import generalMixin from "./../../../utils/generalMixin";
import FloatingMenu from "./../../../components/general/FloatingMenu.vue";
import { checkPrivilege } from "./../../../utils/functions";
import { hasPlaceUserFinaleDelete } from "./../../../utils/privilegeHelper";

export default {
  name: "PlacesTable",
  mixins: [generalMixin],
  components: { FloatingMenu },
  props: ["placesData", "filterData"],
  methods: {
    setPlaceUserData(placeUser) {
      this.$emit("setPlaceUserData", placeUser);
    },
    checkPrivilege,
    hasPlaceUserFinaleDelete,
    isDataExist,
    fullPathFileFromServer,
  },
  computed: {},
};
</script>
