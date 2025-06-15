<template>
  <div class="screen">
    <button @click="$router.back()" class="back-button">
      <ChevronLeftIcon class="w-6 h-6 text-gray-600" />
    </button>
    <div class="card">
      <h2 class="text-white text-xl mb-4">Get The Stars</h2>
      <input type="number" v-model="input" placeholder="" class="input" />
      <p v-if="!isValidInput.value" class="text-red-500 text-sm mt-1">
        {{ inputMessage }}
      </p>
      <div class="mt-4 space-y-1 text-white">
        <label class="block"
          ><input type="radio" value="1" v-model="type" /> Type 1</label
        >
        <label class="block"
          ><input type="radio" value="2" v-model="type" /> Type 2</label
        >
        <label class="block"
          ><input type="radio" value="3" v-model="type" /> Type 3</label
        >
      </div>
      <p v-if="!isValidType.value" class="text-red-500 text-sm mt-1">
        {{ radioMessage }}
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
        message="Apakah anda yakin untuk menampilkan bintang?"
        @confirm="handleConfirm"
        @cancel="showModal = false"
      />

      <MessageBox
        v-if="showMessage"
        :show="showMessage"
        :type="typeMessage"
        :message="messageBox"
        title="Get The Stars"
        @close="showMessage = false"
      >
        <div class="space-y-1">
          <div
            v-for="(row, i) in triangleRows"
            :key="i"
            :class="[
              'flex gap-1 text-yellow-400 text-2xl',
              type === '1'
                ? 'justify-start'
                : type === '2'
                ? 'justify-center'
                : 'justify-end',
            ]"
          >
            <span v-for="n in row" :key="n">⭐</span>
          </div>
        </div>
      </MessageBox>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import ModalKonfirmasi from "~/components/ModalKonfirmasi.vue";
import MessageBox from "~/components/MessageBox.vue";
import { ref, computed } from "vue";
const input = ref(0);
const type = ref("");
const isValidInput = ref(true);
const isValidType = ref(true);
const showModal = ref(false);
const showMessage = ref(false);
const messageBox = ref("");
const inputMessage = ref("");
const radioMessage = ref("");
const typeMessage = ref("");

const triangleRows = computed(() => {
  const rows = [];
  let total = 0;
  let nextRow = 1;
  const value = Number(input.value);

  while (total + nextRow <= value) {
    rows.push(nextRow);
    total += nextRow;
    nextRow++;
  }

  const remaining = value - total;
  if (remaining > 0) rows.push(remaining);

  return rows;
});

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

  validate(
    input,
    isValidInput,
    inputMessage,
    "Nilai harus lebih besar dari 0!"
  );
  validate(type, isValidType, radioMessage, "Harus pilih salah satu!");

  const canSubmit = computed(() => isValidInput.value && isValidType.value);

  if (canSubmit.value) {
    showModal.value = true;
  }
};

const handleConfirm = () => {
  showModal.value = false;
  showMessage.value = true;
  typeMessage.value = "success";
};
</script>
