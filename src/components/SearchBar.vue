<template>
    <div class="q-pa-md q-gutter-y-md column" style="max-width: 300px; margin: 0 auto;">
      <q-input dark dense standout v-model="text" @keyup.enter="searchCharacters">
        <template v-slot:append>
          <q-icon v-if="text === ''" name="search" @click="searchCharacters" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="clearSearch" />
        </template>
      </q-input>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const text = ref('');
      const router = useRouter();
  
      const searchCharacters = () => {
        if (text.value.trim() !== '') {
          // Navigate to the CharacterDetails page with the query parameter
          router.push({ name: 'CharacterDetails', params: { name: text.value } });
        }
      };
  
      const clearSearch = () => {
        text.value = '';
      };
  
      return {
        text,
        searchCharacters,
        clearSearch,
      };
    },
  };
  </script>
  