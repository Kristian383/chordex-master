<template>
  <div class="delete-container">
    <div v-if="!requestReceived" class="in-process">
      <p>Deleting your account... Please wait.</p>
    </div>
    <div v-else>
      <p>{{ infoMsg }}</p>
    </div>
    <the-loader v-if="!requestReceived"></the-loader>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const token = ref("");
    const email = ref("");
    const requestReceived = ref(false);
    const infoMsg = ref("");

    onMounted(() => {
      store.commit("removeSidebar");
      token.value = router.currentRoute.value.query.token;
      email.value = router.currentRoute.value.query.email;

      if (!token.value || !email.value) {
        router.push("/home");
        return;
      }

      store
        .dispatch("deleteAccount", {
          token: token.value,
          email: email.value,
        })
        .then((res) => {
          if (res.success) {
            infoMsg.value = "Your account has been deleted.";
            store.dispatch("logout");
            setTimeout(() => {
              router.push("/home");
            }, 7000);
          } else {
            infoMsg.value = res.message;
          }
          requestReceived.value = true;
        });
    });

    return {
      requestReceived,
      infoMsg,
    };
  },
};
</script>

<style scoped>
.delete-container {
  margin: auto;
}
</style>