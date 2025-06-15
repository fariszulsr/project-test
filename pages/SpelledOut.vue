<template>
  <div class="screen">
    <button @click="$router.back()" class="back-button">
      <ChevronLeftIcon class="w-6 h-6 text-gray-600" />
    </button>
    <div class="card">
      <h2 class="text-white text-xl mb-4">Spelled Out</h2>
      <div class="flex items-center gap-2">
        <span class="text-white text-xl">Rp</span>
        <input v-model="amount" type="number" class="input" />
      </div>
      <p v-if="!isValidAmount.value" class="text-red-500 text-sm mt-1">
        {{ amountMessage }}
      </p>
      <div class="flex justify-end">
        <Button
          @click="checkValue"
          customClass="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4 rounded-[500px] w-[25%] text-center"
          label="Get"
        />
      </div>

      <ModalKonfirmasi
        :show="showModal"
        title="Konfirmasi"
        :message="`Apakah anda yakin untuk spelled out Rp ${amount}?`"
        @confirm="handleConfirm"
        @cancel="showModal = false"
      />

      <MessageBox
        v-if="showMessage"
        :show="showMessage"
        :type="typeMessage"
        :message="messageBox"
        title="Spelled Out"
        @close="showMessage = false"
      >
        {{ hasil }}
      </MessageBox>
    </div>
  </div>
</template>

<script setup>
const amount = ref(0);
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import ModalKonfirmasi from "~/components/ModalKonfirmasi.vue";
import MessageBox from "@/components/MessageBox.vue";
import { terbilang } from "@/utils/terbilang";
const showModal = ref(false);
const showMessage = ref(false);
const typeMessage = ref("");
const messageBox = ref("");
const isValidAmount = ref(true);
const amountMessage = ref("");

const checkValue = () => {
  const validate = (val, stateRef, msgRef, msg) => {
    if (!val.value) {
      stateRef.value = false;
      msgRef.value = msg;
    } else {
      stateRef.value = true;
      msgRef.value = "";
    }
  };

  validate(amount, isValidAmount, amountMessage, "Nilai harus lebih besar dari 0!");

  const canSubmit = computed(() => isValidAmount.value);

  if (canSubmit.value) {
    showModal.value = true;
  }
};

const handleConfirm = () => {
  showModal.value = false;
  showMessage.value = true;
  typeMessage.value = "success";
};

const hasil = computed(() => {
  const raw = terbilang(amount.value).trim();
  if (!raw) return "";
  const withCapital = raw.charAt(0).toUpperCase() + raw.slice(1);
  return `${withCapital} rupiah`;
});
</script>
