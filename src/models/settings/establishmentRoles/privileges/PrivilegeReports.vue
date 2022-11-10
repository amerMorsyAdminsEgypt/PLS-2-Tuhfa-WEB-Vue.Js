<template>
  <div class="">
    <b-button v-b-toggle="id" class="btn btn-lg btn-collapse">
      {{ modelName }}
      <i class="fa fa-angle-down" aria-hidden="true"></i>
    </b-button>
    <b-collapse :id="id">
      <div class="my-card">
        <div class="row">
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-usersPrivilegeBrands`"
              v-model="model.usersPrivilegeBrands.report"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-usersPrivilegeBrands`">{{
              $t("brands.modelName")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-usersPrivilegeCards`"
              v-model="model.usersPrivilegeCards.report"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-usersPrivilegeCards`">{{
              $t("Cards.modelName")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-usersPrivilegeSellCards`"
              v-model="model.usersPrivilegeSellCards.report"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-usersPrivilegeSellCards`">{{
              $t("SellCards.modelName")
            }}</label>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["modelName", "id", "model"],
};
</script>
