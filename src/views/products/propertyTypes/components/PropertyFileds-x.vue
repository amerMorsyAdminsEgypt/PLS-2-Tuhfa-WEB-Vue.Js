<template>
  <div class="">
    <PreLoader v-if="isLoading" />

    <div class="my-card">
      <span class="my-card-title">
        {{ $t("PropertyTypes.listItems.modelName") }}
      </span>

      <div v-if="propertyDetailsData.length == 0" class="my-card-no-content">
        {{ $t("PropertyTypes.listItems.noItems") }}
      </div>
      <template v-else>
        <div
          class="my-card"
          v-for="(item, index) in propertyDetailsData"
          :key="index"
        >
          <span class="my-card-title">{{ index + 1 }}</span>

          <span class="remove-slice-container">
            <button
              @click="removeSlice(index)"
              type="button"
              class="btn btn-remove-slice"
            >
              ×
            </button>
          </span>

          <div class="row">
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-[${index}][propertyNameAr]`"
              :value="item.propertyNameAr"
              v-on:changeValue="item.propertyNameAr = $event"
              :title="$t('PropertyTypes.listItems.nameAr')"
              :imgName="'PropertyTypes.svg'"
            />
            <CustomInput
              :className="'col-md-6'"
              :id="`${id}-[${index}][propertyNameEn]`"
              :value="item.propertyNameEn"
              v-on:changeValue="item.propertyNameEn = $event"
              :title="$t('PropertyTypes.listItems.nameEn')"
              :imgName="'PropertyTypes.svg'"
            />
            <!-- <CustomInput
              :className="'col-md-4'"
              :id="`${id}-[${index}][propertyNameUnd]`"
              :value="item.propertyNameUnd"
              v-on:changeValue="item.propertyNameUnd = $event"
              :title="$t('PropertyTypes.listItems.nameUnd')"
              :imgName="'PropertyTypes.svg'"
            /> -->

            <CustomSelectBox
              :className="'col-md-4'"
              :id="`${id}-[${index}][propertyFieldTypeToken]`"
              :value="item.propertyFieldTypeToken"
              :options="propertyFieldTypeTokenOptions"
              v-on:changeValue="
                item.propertyFieldTypeToken = $event;
                item.propertyFieldDefaultValueAr = '';
                item.propertyFieldDefaultValueEn = '';
                item.propertyFieldDefaultValueUnd = '';
                item.dropDownListToken = '';
                item.propertyFieldDefaultValueToken = '';
              "
              :title="$t('ConstantsListSelect.PropertyFieldTypes')"
              :imgName="'PropertyFieldTypes.svg'"
            />

            <template
              v-if="item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Text"
            >
              <CustomInput
                :className="'col-md-4'"
                :id="`${id}-[${index}][propertyFieldDefaultValueAr]`"
                :value="item.propertyFieldDefaultValueAr"
                v-on:changeValue="item.propertyFieldDefaultValueAr = $event"
                :title="$t('PropertyTypes.listItems.defaultValueAr')"
                :imgName="'PropertyTypes.svg'"
              />
              <CustomInput
                :className="'col-md-4'"
                :id="`${id}-[${index}][propertyFieldDefaultValueEn]`"
                :value="item.propertyFieldDefaultValueEn"
                v-on:changeValue="item.propertyFieldDefaultValueEn = $event"
                :title="$t('PropertyTypes.listItems.defaultValueEn')"
                :imgName="'PropertyTypes.svg'"
              />
              <!-- <CustomInput
                :className="'col-md-4'"
                :id="`${id}-[${index}][propertyFieldDefaultValueUnd]`"
                :value="item.propertyFieldDefaultValueUnd"
                v-on:changeValue="item.propertyFieldDefaultValueUnd = $event"
                :title="$t('PropertyTypes.listItems.defaultValueUnd')"
                :imgName="'PropertyTypes.svg'"
              /> -->
            </template>

            <CustomInput
              v-if="
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Email ||
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Link
              "
              :className="'col-md-4'"
              :id="`${id}-[${index}][propertyFieldDefaultValueAr]`"
              :value="item.propertyFieldDefaultValueAr"
              v-on:changeValue="item.propertyFieldDefaultValueAr = $event"
              :title="$t('PropertyTypes.listItems.defaultValue')"
              :imgName="'PropertyTypes.svg'"
            />
            <CustomInputFloat
              v-else-if="
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Number ||
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Decimal ||
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Percentage
              "
              :className="'col-md-4'"
              :id="`${id}-[${index}][propertyFieldDefaultValueAr]`"
              :value="item.propertyFieldDefaultValueAr"
              v-on:changeValue="item.propertyFieldDefaultValueAr = $event"
              :title="$t('PropertyTypes.listItems.defaultValue')"
              :imgName="'PropertyTypes.svg'"
            />
            <CustomInputInt
              v-else-if="
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Integer
              "
              :className="'col-md-4'"
              :id="`${id}-[${index}][propertyFieldDefaultValueAr]`"
              :value="item.propertyFieldDefaultValueAr"
              v-on:changeValue="item.propertyFieldDefaultValueAr = $event"
              :title="$t('PropertyTypes.listItems.defaultValue')"
              :imgName="'PropertyTypes.svg'"
            />

            <DateTimePicker
              v-else-if="
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.DateTime
              "
              class="col-md-4"
              :id="`${id}-[${index}][propertyFieldDefaultValueAr]`"
              type="dateTime"
              :value="item.propertyFieldDefaultValueAr"
              :title="$t('PropertyTypes.listItems.defaultValue')"
              v-on:changeValue="
                item.propertyFieldDefaultValueAr = $event.dateTime
              "
              :language="language"
            />
            <DateTimePicker
              v-else-if="
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Date
              "
              class="col-md-4"
              :id="`${id}-[${index}][propertyFieldDefaultValueAr]`"
              type="date"
              :value="item.propertyFieldDefaultValueAr"
              :title="$t('PropertyTypes.listItems.defaultValue')"
              v-on:changeValue="item.propertyFieldDefaultValueAr = $event.date"
              :language="language"
              :imgName="'date.svg'"
            />
            <DateTimePicker
              v-else-if="
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Time
              "
              class="col-md-4"
              :id="`${id}-[${index}][propertyFieldDefaultValueAr]`"
              type="time"
              :value="item.propertyDateTime"
              :title="$t('PropertyTypes.listItems.defaultValue')"
              v-on:changeValue="
                item.propertyDateTime = $event.dateTime;
                item.propertyFieldDefaultValueAr = $event.timeCustomized;
              "
              :language="language"
              :imgName="'time.svg'"
            />

            <CustomCheckbox
              v-else-if="
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.Logical
              "
              :className="'col-md-4'"
              :value="item.propertyFieldDefaultValueAr"
              v-on:changeValue="item.propertyFieldDefaultValueAr = $event"
              :title="$t('PropertyTypes.listItems.defaultValue')"
            />

            <template
              v-else-if="
                item.propertyFieldTypeToken == PROPERTY_FIELD_TYPES.DropDownList
              "
            >
              <CustomSelectBox
                :className="'col-md-4'"
                :id="`${id}-[${index}][dropDownListToken]`"
                :value="item.dropDownListToken"
                :options="dropDownListTokenOptions"
                v-on:changeValue="
                  item.dropDownListToken = $event;
                  dropDownListTokenChanged($event, index);
                "
                :title="$t('DropDownLists.select')"
                :imgName="'DropDownLists.svg'"
              />
              <CustomSelectBox
                :className="'col-md-4'"
                :id="`${id}-[${index}][propertyFieldDefaultValueToken]`"
                :value="item.propertyFieldDefaultValueToken"
                :options="item.defaultValueOptions"
                v-on:changeValue="item.propertyFieldDefaultValueToken = $event"
                :title="$t('PropertyTypes.listItems.defaultValue')"
                :imgName="'DropDownLists.svg'"
              />
            </template>
          </div>
        </div>
      </template>
      <div class="add-slice-container">
        <button
          @click="addSlice()"
          type="button"
          class="btn btn-add-slice"
          :title="$t('add')"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PreLoader from "./../../../../components/general/PreLoader.vue";
import CustomInput from "./../../../../components/general/CustomInput.vue";
import CustomInputFloat from "./../../../../components/general/CustomInputFloat.vue";
import CustomInputInt from "./../../../../components/general/CustomInputInt.vue";
import DateTimePicker from "./../../../../components/general/DateTimePicker.vue";
import CustomSelectBox from "./../../../../components/general/CustomSelectBox.vue";
import CustomCheckbox from "./../../../../components/general/CustomCheckbox.vue";
import PropertyDetailsData from "./../../../../models/products/propertyTypes/PropertyDetailsData";
import apiDropDownList from "./../../../../api/products/dropDownLists";
import { PROPERTY_FIELD_TYPES } from "./../../../../utils/constantLists";
import { getLanguage } from "./../../../../utils/functions";
import { STATUS } from "./../../../../utils/constants";
import { getDialogOfPropertyFieldTypes } from "./../../../../utils/dialogsOfConstantsLists";
import generalMixin from "./../../../../utils/generalMixin";

export default {
  mixins: [generalMixin],
  components: {
    PreLoader,
    CustomInput,
    CustomInputFloat,
    CustomInputInt,
    DateTimePicker,
    CustomSelectBox,
    CustomCheckbox,
  },
  data() {
    return {
      language: getLanguage(),
      propertyFieldTypeTokenOptions: getDialogOfPropertyFieldTypes(),
      PROPERTY_FIELD_TYPES,
    };
  },
  props: {
    propertyDetailsData: {
      type: Array,
      default: () => [],
    },
    dropDownListTokenOptions: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: "id",
    },
  },
  methods: {
    addSlice() {
      this.propertyDetailsData.push(new PropertyDetailsData());
    },
    removeSlice(index) {
      this.propertyDetailsData.splice(index, 1);
    },
    async dropDownListTokenChanged(token, index) {
      this.isLoading = true;
      this.propertyDetailsData[index].defaultValueOptions = [];
      if (token) {
        try {
          let filter = { token: token };
          const response = await apiDropDownList.getDetails(filter);
          if (
            response.data.status == STATUS.SUCCESS &&
            response.data.dropDownList &&
            response.data.dropDownList.dropDownListItemsData &&
            response.data.dropDownList.dropDownListItemsData.length > 0
          ) {
            this.propertyDetailsData[index].defaultValueOptions =
              response.data.dropDownList.dropDownListItemsData.map(
                (element) => {
                  return {
                    value: element.dropDownListItemToken,
                    text: element.dropDownListItemNameCurrent,
                  };
                }
              );
          } else if (response.data.status == STATUS.INVALID_TOKEN) {
            this.$store.dispatch("logoutUser", response.data.msg);
          } else {
            this.propertyDetailsData[index].defaultValueOptions.push({
              value: "",
              text: response.data.msg,
            });
          }
        } catch (e) {
          this.propertyDetailsData[index].defaultValueOptions.push({
            value: "",
            text: this.$t("errorCatch"),
          });
        }
      }
      this.isLoading = false;
    },
  },
};
</script>
