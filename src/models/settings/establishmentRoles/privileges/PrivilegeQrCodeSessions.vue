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
              :id="`${id}-generateMyQrCodeVCD`"
              v-model="model.generateMyQrCodeVCD"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-generateMyQrCodeVCD`">{{
              $t("QrCodeSessions.generate")
            }}</label>
          </div>

          <div class="form-label-group col-md-6 col-lg-4">
            <input
              type="checkbox"
              :id="`${id}-enquiryQrCodeVCD`"
              v-model="model.enquiryQrCodeVCD"
              class="checkbox"
            />
            <label class="mt-1 ml-2" :for="`${id}-enquiryQrCodeVCD`">{{
              $t("QrCodeSessions.enquiry")
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
