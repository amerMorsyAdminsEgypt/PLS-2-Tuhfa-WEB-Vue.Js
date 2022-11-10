<template>
  <div class="">
    <div class="reports-cards">
      <div v-if="checkPrivilege(hasEstablishmentRole())" class="reports-card">
        <router-link :to="{ name: 'EstablishmentRoles' }" class="">
          <img src="@/assets/images/establishment-role.svg" />{{
            $t("EstablishmentRoles.modelName")
          }}
        </router-link>
      </div>

      <div v-if="checkPrivilege(hasUserValidSetting())" class="reports-card">
        <router-link :to="{ name: 'UserValidSettings' }" class="">
          <img src="@/assets/images/UserValidSettings.svg" />{{
            $t("UserValidSettings.modelName")
          }}
        </router-link>
      </div>

      <!-- <div class="reports-card">
        <router-link to="/sectors" class="">
          <img src="@/assets/images/sectors.svg" />{{ $t("sectors") }}
        </router-link>
      </div>

      <div class="reports-card">
        <router-link to="/jobs" class="">
          <img src="@/assets/images/jobs.svg" />{{ $t("jobs") }}
        </router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { checkPrivilege } from "@/utils/functions";
import {
  hasEstablishmentRole,
  hasUserValidSetting,
} from "@/utils/privilegeHelper";

export default {
  computed: {
    ...mapGetters(["usersPrivilegeData"]),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    checkPrivilege,
    hasEstablishmentRole,
    hasUserValidSetting,
  },
};
</script>
