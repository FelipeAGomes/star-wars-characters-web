<!-- FictionalCharacters.vue -->
<template>
  <div>
    <h1>Fictional Characters</h1>
    <div v-if="dadosRecebidos" class="characters">
      <q-list>
        <!-- Utilize router-link para criar links para CharacterDetails -->
        <router-link
          v-for="(character, index) in dadosRecebidos"
          :key="index"
          :to="{ name: 'CharacterDetails', params: { name: character.name } }"
          class="character-item"
        >
          <q-item clickable>
            <q-item-section>
              <q-avatar>
                <img :src="characterImage(character)" alt="Character Image" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <div class="attribute text-h6">{{ character.name }}</div>
            </q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dadosRecebidos: null,
    };
  },
  created() {
    this.fazerRequisicao();
  },
  methods: {
    async fazerRequisicao() {
      try {
        const response = await axios.get('https://localhost:7160/api/Characters?page=1');
        this.dadosRecebidos = response.data;
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    },
    characterImage(character) {
      return `https://placekitten.com/200/300?random=${character.name}`;
    },
    async searchCharacters() {
      // Faça a requisição de busca quando o usuário digitar
      try {
        const response = await axios.get(`https://localhost:7160/api/SearchCharacters?query=${this.searchTerm}`);
        this.dadosRecebidos = response.data;
      } catch (error) {
        console.error('Erro ao fazer a requisição de busca:', error);
      }
    },
  },
};
</script>

<style scoped>
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
