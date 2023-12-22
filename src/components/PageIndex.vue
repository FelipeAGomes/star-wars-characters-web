<template>
  <div>
    <h4>Fictional Characters</h4>
    <SearchBar/>
    <div v-if="currentLoading" class="loading-message">
      <q-spinner-hourglass
        color="yellow"
        size="3em"
      />
    </div>
    <div v-else-if="receivedData" class="characters">
      <q-list>
        <router-link
          v-for="(character, index) in currentReceived"
          :key="index"
          :to="{ name: 'CharacterDetails', params: { name: character.name } }"
          class="character-item"
        >
          <q-item clickable>
            <q-item-section>
              <q-img
                v-for="mode in fitModes"
                :key="mode"
                :src="character.photo"
                alt="Character Image"
                style="max-width: 300px;"
                :fit="mode"
              >
                <div class="absolute-bottom text-subtitle1 text-center">
                  {{ character.name }}
                </div>
              </q-img>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          color="yellow"
          :max="9"
          boundary-links
          @update:model-value="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import SearchBar from './SearchBar.vue';

export default {
  components: { SearchBar },
  setup() {
    const loading = ref(true);
    const fitModes = ref(['cover']);
    const current = ref(1);
    const receivedData = ref(null);
    const currentReceived = computed(()=>{
      return receivedData.value
    })
    const currentLoading = computed(()=>{
      return loading.value
    })

    const makeRequest = async (page = 1) => {
      try {
        loading.value = true;
        const response = await axios.get(`https://localhost:7160/api/Characters?page=${page}`);
        receivedData.value = response.data;
      } catch (error) {
        console.error('Error making the request:', error);
      }finally{
        loading.value = false;
      }
    };

    const changePage = (page) => {
      current.value = page;
      makeRequest(page);
    };

    onMounted(() => {
      makeRequest();
    });

    return {
      fitModes,
      current,
      receivedData,
      changePage,
      currentReceived,
      loading,
      currentLoading
    };
  },
};
</script>

<style scoped>
  img {
    width: 200px;
  }

  .characters {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }

  .character-item {
    width: 20%;
    box-sizing: border-box;
    margin-top: 10px;
    display: inline-block;
  }

  @media (max-width: 1024px) {
    .character-item {
      width: 100%;
      display: block;
      margin-top: 10px;
    }
  }
</style>
