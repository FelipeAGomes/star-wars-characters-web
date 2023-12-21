<!-- CharacterDetails.vue -->
<template>
  <router-link to="/" class="back-button">
    Back
  </router-link>
  <div class="details-page">
    <div v-if="characterDetails" class="details-container">
      <q-card>
        <q-card-section>
          <q-avatar>
            <img :src="characterImage(characterDetails)" alt="Character Image" />
          </q-avatar>
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
      </q-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      characterDetails: null,
    };
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
  methods: {
    async fetchCharacterDetails() {
      try {
        const characterName = this.$route.params.name;
        const response = await axios.get(`https://localhost:7160/api/Characters/${characterName}`);
        
        console.log(response.data[0])
        this.characterDetails = response.data[0];
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    },
    characterImage(character) {
      return `https://placekitten.com/200/300?random=${character.name}`;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>

<style scoped>
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
</style>
