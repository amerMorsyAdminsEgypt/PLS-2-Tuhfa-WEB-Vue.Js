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
              :id="`${id}-viewData`"
              v-model="model.viewData"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-viewData`">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-viewDialog`"
              v-model="model.viewDialog"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-viewDialog`">{{
              $t("viewDialog")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-sellCards`"
              v-model="model.sellCards"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-sellCards`">{{
              $t("SellCards.add")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-notification`"
              v-model="model.notification"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-notification`">{{
              $t("sendNotification")
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
