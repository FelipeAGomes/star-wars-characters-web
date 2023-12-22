<template>
  <router-link to="/" class="back-button">
    <q-btn outline style="color: yellow;" label="Back" />
  </router-link>
  <div class="details-page">
    <div v-if="loading" class="loading-message">
      <q-spinner-hourglass
        color="yellow"
        size="3em"
      />
    </div>
    <div v-else-if="characterDetails" class="details-container">
      <div v-for="(characterDetails, index) in currentReceived"
          :key="index">
        <q-list>
          <q-card-section>
            <img :src="characterDetails.photo" alt="Character Image" />
          </q-card-section>
          <q-card-section class="character-details-section">
            <div class="text-h6">Name: {{ capitalizeFirstLetter(characterDetails.name) }}</div>
            <div class="attribute">Height: {{ capitalizeFirstLetter(characterDetails.height) }} cm</div>
            <div class="attribute">Gender: {{ capitalizeFirstLetter(characterDetails.gender) }}</div>
            <div class="attribute">Birth Year: {{ capitalizeFirstLetter(characterDetails.birth_Year) }}</div>
            <div class="attribute">Eye Color: {{ capitalizeFirstLetter(characterDetails.eye_Color) }}</div>
            <div class="attribute">Hair Color: {{ capitalizeFirstLetter(characterDetails.hair_Color) }}</div>
            <div class="attribute">Skin Color: {{ capitalizeFirstLetter(characterDetails.skin_Color) }}</div>
          </q-card-section>
        </q-list>
      </div>
    </div>
    <div v-else>
      <p class="no-character-message">No character details found for {{ capitalizeFirstLetter($route.params.name) }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, computed } from 'vue';

export default {
  setup () {
    const loading = ref(true);
    const characterDetails = ref(null);
    const currentReceived = computed(()=>{
      return characterDetails.value
    });
    async function fetchCharacterDetails() {
      try {
        this.loading = true;
        const characterName = this.$route.params.name;
        const response = await axios.get(`https://localhost:7160/api/Characters/${characterName}`);
        console.log('response',response)
        
        if (response.data && response.data.length > 0) {
          this.characterDetails = response.data;
        } else {
          console.warn('No character details found for', characterName);
          this.characterDetails = null;
        }
      } catch (error) {
        console.error('Error fetching character details:', error);
      } finally {
        this.loading = false;
      }
    }
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return {
      fitModes: [ 'cover' ],
      loading,
      characterDetails,
      capitalizeFirstLetter,
      fetchCharacterDetails,
      currentReceived
    }
  },
  watch: {
    $route(to, from) {
      if (to.params.name !== from.params.name) {
        this.fetchCharacterDetails();
      }
    },
  },
  created() {
    if (this.$route.params.name) {
      this.fetchCharacterDetails();
    }
  },
};
</script>

<style scoped>
.details-page {
  background-color: #000;
}

.back-button {
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 1000;
  color: #1e88e5;
  text-decoration: none;
  cursor: pointer;
}

.character-details-section {
  color: #f8f9fa;
}

.no-character-message {
  color: #f8f9fa;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}

.loading-message {
  color: #f8f9fa;
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
</style>
