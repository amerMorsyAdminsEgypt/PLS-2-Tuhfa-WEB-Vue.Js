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
              :id="`${id}-add`"
              v-model="model.add"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-add`">{{ $t("add") }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-update`"
              v-model="model.update"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-update`">{{
              $t("edit")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-archive`"
              v-model="model.archive"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-archive`">{{
              $t("archive")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-restore`"
              v-model="model.restore"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-restore`">{{
              $t("restore")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-delete`"
              v-model="model.delete"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-delete`">{{
              $t("finalDelete")
            }}</label>
          </div>
          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-deleteImage`"
              v-model="model.deleteImage"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-deleteImage`">{{
              $t("deleteImage")
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
