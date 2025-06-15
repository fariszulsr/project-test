<template>
  <div class="screen">
    <button @click="$router.back()" class="back-button">
      <ChevronLeftIcon class="w-6 h-6 text-gray-600" />
    </button>
    <div class="card space-y-3">
      <h2 class="text-white text-xl">Form Data</h2>
      <input v-model="nama" type="text" class="input" placeholder="Nama" />
      <p v-if="!isValidNama.value" class="text-red-500 text-sm mt-1">
        {{ namaMessage }}
      </p>
      <input
        v-model="hp"
        type="number"
        class="input"
        placeholder="No Handphone"
      />
      <p v-if="!isValidHp.value" class="text-red-500 text-sm mt-1">
        {{ hpMessage }}
      </p>
      <input v-model="email" type="email" class="input" placeholder="Email" />
      <p v-if="!isValidEmail.value" class="text-red-500 text-sm mt-1">
        {{ emailMessage }}
      </p>
      <textarea
        v-model="alamat"
        type="text"
        class="input"
        placeholder="Alamat"
      ></textarea>
      <p v-if="!isValidAlamat.value" class="text-red-500 text-sm mt-1">
        {{ alamatMessage }}
      </p>
      <select v-model="province" class="input">
        <option value="" disabled>-- Pilih Province --</option>
        <option v-for="prov in provinces" :key="prov" :value="prov">
          {{ prov }}
        </option>
      </select>
      <p v-if="!isValidProvince" class="text-red-500 text-sm">
        {{ provinceMessage }}
      </p>

      <select v-model="city" class="input" :disabled="cities.length === 0">
        <option value="" disabled>-- Pilih City --</option>
        <option v-for="cty in cities" :key="cty" :value="cty">
          {{ cty }}
        </option>
      </select>
      <p v-if="!isValidCity" class="text-red-500 text-sm">{{ cityMessage }}</p>

      <select
        v-model="district"
        class="input"
        :disabled="districts.length === 0"
      >
        <option value="" disabled>-- Pilih District --</option>
        <option v-for="dist in districts" :key="dist" :value="dist">
          {{ dist }}
        </option>
      </select>
      <p v-if="!isValidDistrict" class="text-red-500 text-sm">
        {{ districtMessage }}
      </p>

      <div class="flex flex-col items-center space-y-2">
        <label for="file-upload" class="relative cursor-pointer group">
          <div
            class="w-24 h-24 mt-2 rounded-xl overflow-hidden border-2 border-gray-300 hover:border-blue-500"
          >
            <img
              v-if="photoPreview"
              :src="photoPreview"
              alt="Foto"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
            >
              <UserIcon class="h-10 w-10 text-gray-500" />
            </div>
            <div
              class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold transition-opacity duration-200"
            >
              Ganti
            </div>
          </div>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handlePhotoUpload"
        />
        <p v-if="!isValidPhoto" class="text-red-500 text-sm">
          {{ photoMessage }}
        </p>
      </div>

      <div class="flex justify-end">
        <Button
          @click="checkValue"
          customClass="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4 rounded-[500px] w-[25%] text-center"
          label="Get"
        />
      </div>

      <Teleport to="body">
        <ModalKonfirmasi
          :show="showModal"
          title="Konfirmasi"
          message="Apakah anda yakin untuk menampilkan data?"
          @confirm="handleConfirm"
          @cancel="showModal = false"
        />
      </Teleport>

      <Teleport to="body">
        <MessageBox
          v-if="showMessage"
          :show="showMessage"
          :type="typeMessage"
          :message="messageBox"
          title="Form Data"
          @close="showMessage = false"
        >
          <div class="space-y-3">
            <pre class="whitespace-pre-wrap text-xl justify-start">{{
              hasil
            }}</pre>
            <div v-if="photoPreview" class="mt-4 flex justify-center">
              <img
                :src="photoPreview"
                alt="Foto Upload"
                class="w-32 h-32 object-cover rounded-xl border"
              />
            </div>
          </div>
        </MessageBox>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { UserIcon } from "@heroicons/vue/24/solid";
import { ref, computed, watch } from "vue";
import ModalKonfirmasi from "~/components/ModalKonfirmasi.vue";
import MessageBox from "@/components/MessageBox.vue";

const locationData = {
  "Jawa Barat": {
    Bandung: ["Coblong", "Sukajadi"],
    Bekasi: ["Bekasi Utara", "Bekasi Selatan"],
  },
  "DKI Jakarta": {
    "Jakarta Selatan": ["Kebayoran Baru", "Tebet"],
    "Jakarta Barat": ["Grogol", "Palmerah"],
  },
};

const provinces = Object.keys(locationData);
const cities = ref([]);
const districts = ref([]);
const showModal = ref(false);
const showMessage = ref(false);
const typeMessage = ref("");
const messageBox = ref("");

const nama = ref("");
const namaMessage = ref("");
const isValidNama = ref(true);
const hp = ref("");
const hpMessage = ref("");
const isValidHp = ref(true);
const email = ref("");
const emailMessage = ref("");
const isValidEmail = ref(true);
const alamat = ref("");
const alamatMessage = ref("");
const isValidAlamat = ref(true);
const province = ref("");
const provinceMessage = ref("");
const isValidProvince = ref(true);
const city = ref("");
const cityMessage = ref("");
const isValidCity = ref(true);
const district = ref("");
const districtMessage = ref("");
const isValidDistrict = ref(true);
const photo = ref("");
const photoMessage = ref("");
const isValidPhoto = ref(true);
const photoPreview = ref("");
const hasil = ref("");

watch(province, (prov) => {
  city.value = "";
  district.value = "";
  cities.value = prov ? Object.keys(locationData[prov]) : [];
  districts.value = [];
});

watch(city, (cty) => {
  district.value = "";
  districts.value =
    province.value && cty ? locationData[province.value][cty] : [];
});

const handlePhotoUpload = (e) => {
  const file = e.target.files[0];
  if (!file) {
    photo.value = "";
    photoPreview.value = "";
    return;
  }

  if (!file.type.startsWith("image/")) {
    isValidPhoto.value = false;
    photoMessage.value = "File harus berupa gambar!";
    return;
  }

  isValidPhoto.value = true;
  photoMessage.value = "";
  photo.value = file;

  const reader = new FileReader();
  reader.onload = () => {
    photoPreview.value = reader.result;
  };
  reader.readAsDataURL(file);
};

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

  validate(nama, isValidNama, namaMessage, "Nama tidak boleh kosong!");
  validate(hp, isValidHp, hpMessage, "No handphone tidak boleh kosong!");
  validate(email, isValidEmail, emailMessage, "Email tidak boleh kosong!");
  validate(alamat, isValidAlamat, alamatMessage, "Alamat tidak boleh kosong!");
  validate(
    province,
    isValidProvince,
    provinceMessage,
    "Province harus dipilih!"
  );
  validate(city, isValidCity, cityMessage, "City harus dipilih!");
  validate(
    district,
    isValidDistrict,
    districtMessage,
    "District harus dipilih!"
  );
  validate(photo, isValidPhoto, photoMessage, "Photo tidak boleh kosong!");

  const canSubmit = computed(
    () =>
      isValidNama.value &&
      isValidHp.value &&
      isValidEmail.value &&
      isValidAlamat.value &&
      isValidProvince.value &&
      isValidCity.value &&
      isValidDistrict.value &&
      isValidPhoto.value
  );

  if (canSubmit.value) {
    showModal.value = true;
  }
};

const handleConfirm = () => {
  showModal.value = false;
  showMessage.value = true;
  typeMessage.value = "success";

  hasil.value = `
Nama: ${nama.value}
No Handphone: ${hp.value}
Email: ${email.value}
Alamat: ${alamat.value}
Province: ${province.value}
City: ${city.value}
District: ${district.value}
Foto: ${photo.value.name || "Tidak diketahui"}
  `;
};
</script>
