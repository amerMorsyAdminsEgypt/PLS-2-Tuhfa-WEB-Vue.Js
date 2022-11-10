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
              :id="`${id}-notificationView`"
              v-model="model.notificationView"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-notificationView`">{{
              $t("view")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-notificationRead`"
              v-model="model.notificationRead"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-notificationRead`">{{
              $t("notifications.Read")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-notificationOpen`"
              v-model="model.notificationOpen"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-notificationOpen`">{{
              $t("notifications.Open")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-notificationArchive`"
              v-model="model.notificationArchive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-notificationArchive`">{{
              $t("archive")
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
