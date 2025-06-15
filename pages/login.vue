<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-200 to-blue-500"
  >
    <div class="bg-white/30 p-6 rounded-xl shadow-md w-72">
      <h2 class="text-white text-xl font-semibold mb-4">Sign in</h2>
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <p v-if="!isValidEmail.value" class="text-red-500 text-sm mt-1">
        {{emailMessage}}
      </p>
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input mt-2"
      />
      <p v-if="!isValidPassword.value" class="text-red-500 text-sm mt-1">
        {{passwordMessage}}
      </p>
      <Button @click="checkValue" label="Login" class="mt-4 w-full" />
    </div>

    <MessageBox
      v-if="showMessage"
      :show="showMessage"
      :type="typeMessage"
      :message="messageBox"
      title="Info"
      @close="showMessage = false"
    />
  </div>
</template>

<script setup>
const email = ref("");
const password = ref("");
const showMessage = ref(false);
const typeMessage = ref("");
const messageBox = ref("");
const isValidEmail = ref(true)
const isValidPassword = ref(true)
const emailMessage = ref("");
const passwordMessage = ref("");

const checkValue = () => {
  const emailChecked1 = computed(() => email.value === '');
  const emailChecked2 = computed(() => !email.value.includes("@"));
  const passwordChecked = computed(() => password.value.length === 0);
  const router = useRouter();

  if (emailChecked1.value) {
    isValidEmail.value = false;
    emailMessage.value = "Email harus diisi!"
  } else if (emailChecked2.value) {
    isValidEmail.value = false;
    emailMessage.value = "Email harus mengandung @"
  } else {
    emailMessage.value = ""
    isValidEmail.value = true;
  }

  if (passwordChecked.value) {
    isValidPassword.value = false;
    passwordMessage.value = "Password harus diisi!"
  } else {
    passwordMessage.value = ""
    isValidPassword.value = true;
  }
  const canSubmit = computed(
    () => isValidEmail.value && isValidPassword.value
  );
  if (canSubmit.value) {
    router.push("/home");
  }
};
</script>
