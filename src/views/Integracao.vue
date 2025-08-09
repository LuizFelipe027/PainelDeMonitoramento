<template>
  <div class="container mx-sm flex flex-col text-xs">
    <div class="relative flex flex-col w-[90%] h-full mx-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border my-10">
      <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border py-3">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="block w-full overflow-x-auto md:overflow-hidden md:w-full">
            <!-- <div> -->
            <!-- <label for="titleEntidades">Entidades:</label>
              <nav v-for="entidade in entidades" class="flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                <ul role="tablist" class="flex flex-wrap items-center space-x-1">
                  <li v-for="objEntidade in entidade" role="tab"
                    class="mx-1 relative flex items-center justify-center  px-2 py-1 font-sans antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                    data-value="all">
                    <div class="z-20 text-inherit" v-on:click="fetchIntegracoes(objEntidade)">
                      &nbsp;&nbsp;{{ objEntidade.nome }}&nbsp;{{ objEntidade.quantidade }}&nbsp;&nbsp;
                    </div>
                    <div class="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
              <label for="titleEntidades">Status:</label>
              <nav class="flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                <ul role="tablist" class="flex flex-wrap items-center space-x-1">
                  <li role="tab"
                    class="mx-1 relative flex items-center justify-center  h-full px-2 py-1 font-sans antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                    data-value="all">
                    <div class="z-20 text-inherit" v-on:click="fetchIntegracoes()">
                      &nbsp;&nbsp;Todos&nbsp;&nbsp;{{ totalIntegracoes }}
                    </div>
                    <div class="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                  </li>
                  <li v-for="statusIntegracao in statusIntegracoes" role="tab"
                    class="mx-1 relative flex items-center justify-center px-2 py-1 font-sans antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                    data-value="all">
                    <div class="z-20 text-inherit" v-on:click="fetchIntegracoes(statusIntegracao)">
                      &nbsp;&nbsp;{{ statusIntegracao.status }}&nbsp;{{ statusIntegracao.quantidade }}&nbsp;&nbsp;
                    </div>
                    <div class="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                  </li>
                </ul>
              </nav> -->

            <!-- <div class="relative inline-block">
                <select
                  class="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                  <option value="opcao1">Opção 1</option>
                  <option value="opcao2">Opção 2</option>
                  <option value="opcao3">Opção 3</option>
                  <option value="opcao4">Opção 4</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                 
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 12L6 8h8l-4 4z" />
                  </svg>
                </div>
              </div> -->

            <!-- <div>
            <label for="titleEntidades">Entidades:</label>
              <nav v-for="entidade in entidades" class="flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                <ul role="tablist" class="flex flex-wrap items-center space-x-1">
                  <li v-for="objEntidade in entidade" role="tab"
                    class="mx-1 relative flex items-center justify-center  px-2 py-1 font-sans antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                    data-value="all">
                    <div class="z-20 text-inherit" v-on:click="fetchIntegracoes(objEntidade)">
                      &nbsp;&nbsp;{{ objEntidade.nome }}&nbsp;{{ objEntidade.quantidade }}&nbsp;&nbsp;
                    </div>
                    <div class="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                  </li>
                </ul>
              </nav>
            </div>
            <div>
            -->


            <div class="flex flex-row">
              <div class="max-w-40 flex flex-col">
                <label class="text-black font-bold" for="titleEntidades">Status:</label>
                <nav class="flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                  <select id="entidades" class="border-none" v-model="integracaoSelecionada" @change="fetchIntegracoes">
                    <option v-for="(integracao, index) in statusIntegracoes" :key="index" :value="integracao.status">
                      {{ integracao.nomeStatus }}
                    </option>
                  </select>
                </nav>
              </div>
              <div class="max-w-40  flex flex-col">
                <label class="text-black font-bold" for="titleEntidades">Entidade:</label>
                <nav class="flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                  <select id="entidades" class="border-none" v-model="entidadeSelecionada" @change="fetchIntegracoes">
                    <option v-for="(entidade, index) in entidades" :key="index" :value="entidade._id">
                      {{ entidade.nome }}
                    </option>
                  </select>
                </nav>
              </div>
            </div>

            <!-- </div> -->
          </div>
        </div>
      </div>
      <!-- <div class="overflow-x-auto"> -->
      <div class="overflow-x-auto" style="height: 70vh;">
        <table class="w-full text-left table-auto min-w-max">
          <thead class="sticky top-0 bg-white">
            <tr>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Status
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="px-3 py-2 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Entidade
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="px-3 py-2 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Grupo Eco.
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="px-3 py-2 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Função
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="px-3 py-2 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Tipo
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Empresa
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Nome
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Dias
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Qtd.Total
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Qtd.Atualizado
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Dt.Inicio
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Dt.Fim
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
              <th
                class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                <p
                  class="flex items-center justify-between gap-2 font-sans antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  Ult.Atu.
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                  </svg>
                </p>
              </th>
            </tr>
          </thead>
          <tbody style="max-height: 25rem;">
            <tr v-for="integracao in integracoes" class="border-b transition duration-300 ease-in-out">
              <td class="whitespace-nowrap px-3 py-2" :title="integracao.status">
                <span v-if="integracao.status === 'concluido'"
                  class="inline-block h-4 w-4 rounded-full bg-green-500"></span>
                <span v-else-if="integracao.status === 'inativo'"
                  class="inline-block h-4 w-4 rounded-full bg-grey-500"></span>
                <span v-else-if="integracao.status === 'naoiniciado'"
                  class="inline-block h-4 w-4 rounded-full bg-blue-500"></span>
                <span v-else-if="integracao.status === 'parado'"
                  class="inline-block h-4 w-4 rounded-full bg-red-500"></span>
                <span v-else-if="integracao.status === 'emexecucao'"
                  class="inline-block h-4 w-4 rounded-full bg-yellow-500"></span>
                <span v-else>{{ integracao.status }}</span>
              </td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.entidade.nome }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.grupoeconomico.nome }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.funcao }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.tipo }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao?.empresa?.sigla || '' }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao?.empresa?.nome || '' }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.paramDias }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.qtdTotal }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.qtdAtualizado }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.dataInicio }}</td>
              <td class="whitespace-nowrap px-3 py-2">{{ integracao.dataFim }}</td>
              <!-- <td class="whitespace-nowrap px-3 py-2">{{ integracao.status }}</td> -->

              <td class="whitespace-nowrap px-3 py-2">{{ integracao.ultimaAtualizacao }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { urlApi } from '../environment';

const integracoes = ref([]);
const entidades = ref([]);
const entidadesContador = ref([]);
const statusContador = ref([]);
const statusIntegracoes = ref([]);
const totalIntegracoes = ref(0);
const integracaoSelecionada = ref('');
const entidadeSelecionada = ref('');
let filtroAuxiliar = '';
let abaAtiva = ref(true);


function formatarData(dataOriginal) {
  const data = new Date(dataOriginal);
  // Extrair componentes de data e hora
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');
  const segundo = String(data.getSeconds()).padStart(2, '0');
  // Formatar a data
  const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
  return dataFormatada;
}

// Função para atualizar o contador de entidades
// async function contaStatus() {

//   try {
//     const url = `${urlApi}/integracao/allentidades`
//     const response = await axios.get(
//       url,
//       {
//         headers: {
//           'conecta-supply-api-appkey': 'conecta-supply-key-vlrzks',
//           'conecta-supply-api-apptoken': 'GjbH5dDYhZgoqT16GGLAUsJDI4BGsA3WH5tB6XncKrqZbfVFKu',
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//     statusContador.value = [];
//     response.data.forEach(integracao => {
//       const pos = statusContador.value.findIndex(fi => fi.status === integracao.status);
//       if (pos === -1) {
//         statusContador.value.push({
//           status: integracao.status,
//           quantidade: 1,
//           // grupoeconomico: log.grupoeconomico._id
//         })
//       } else {
//         statusContador.value[pos].quantidade++;
//       }
//     });
//     // Limpar array antes de adicionar novos valores
//     statusIntegracoes.value = [];
//     for (const entidadeContador of statusContador.value) {
//       statusIntegracoes.value.push({
//         status: entidadeContador.status,
//         quantidade: entidadeContador.quantidade

//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// Função para atualizar o contador de entidades
async function contaRegistros() {

  try {
    const url = `${urlApi}/integracao/allentidades`
    const response = await axios.get(
      url,
      {
        headers: {
          'conecta-supply-api-appkey': 'conecta-supply-key-vlrzks',
          'conecta-supply-api-apptoken': 'GjbH5dDYhZgoqT16GGLAUsJDI4BGsA3WH5tB6XncKrqZbfVFKu',
          'Content-Type': 'application/json'
        }
      }
    );
    entidades.value = response.data.reduce((acc, m) => {
      // Verifica se o nome já existe na lista de entidades
      const exists = acc.some(entidade => entidade.nome === m.entidade.nome);
      // Se o nome não existir na lista, adiciona à lista de entidades
      if (!exists) {
        acc.push({ nome: m.entidade.nome, _id: m.entidade._id });
      }
      return acc;
    }, [{ nome: 'Selecione', _id: '' }]);

    statusIntegracoes.value = response.data.reduce((acc, m) => {
      // Verifica se o nome já existe na lista de entidades
      const exists = acc.some(integracao => integracao.status === m.status);
      // Se o nome não existir na lista, adiciona à lista de integracaos
      if (!exists) {
        let nomeStatus = '';
        switch (m.status) {
          case 'naoiniciado':
            nomeStatus = 'Não Iniciado';
            break;
          case 'parado':
            nomeStatus = 'Parado';
            break;
          case 'emexecucao':
            nomeStatus = 'Em Execução';
            break;
          case 'concluido':
            nomeStatus = 'Concluído';
            break;
          case 'inativo':
            nomeStatus = 'Inativo';
            break;
          default:
            break;
        }
        acc.push({
          nomeStatus: nomeStatus,
          status: m.status
        });
      }
      return acc;
    }, [{ nomeStatus: 'Selecione', status: '' }]);


  } catch (error) {
    console.error(error);
  }
}

// Função para buscar os integracoes da API
async function fetchIntegracoes(filtro) {

  let url = `${urlApi}/integracao/allentidades?entidadeExterna=${entidadeSelecionada.value || ''}&status=${integracaoSelecionada?.value || ''}`
  try {
    const response = await axios.get(
      url,
      {
        headers: {
          'conecta-supply-api-appkey': 'conecta-supply-key-vlrzks',
          'conecta-supply-api-apptoken': 'GjbH5dDYhZgoqT16GGLAUsJDI4BGsA3WH5tB6XncKrqZbfVFKu',
          'Content-Type': 'application/json'
        }
      }
    );
    integracoes.value = response.data;
    integracoes.value.forEach(integracao => {
      integracao.dataInicio = integracao.dataInicio ? formatarData(integracao.dataInicio) : '';
      integracao.dataFim = integracao.dataFim ? formatarData(integracao.dataFim) : '';
      integracao.ultimaAtualizacao = integracao.ultimaAtualizacao ? formatarData(integracao.ultimaAtualizacao) : '';
    })

    // Defina a ordem desejada dos status
    const order = {
      "emexecucao": 0,
      "parado": 1,
      "concluido": 2,
      "naoiniciado": 3
    };

    // Ordenar o array de acordo com o status
    integracoes.value.sort((a, b) => {
      return order[a.status] - order[b.status];
    });

  } catch (error) {
    console.error(error);
  }
};

async function atualizarConteudo() {
  fetchIntegracoes();
  contaRegistros();
}

// Evento para verificar a mudança de visibilidade da aba
document.addEventListener("visibilitychange", () => {
  abaAtiva = !document.hidden;
  if (abaAtiva && window.location.pathname === '/integracoes') {
    // Se a aba tornou-se visível, atualize o conteúdo imediatamente
    atualizarConteudo();
  }
});

setInterval(() => {
  // Verificar se a aba está ativa
  if (abaAtiva && window.location.pathname === '/integracoes') {
    atualizarConteudo();
  }
}, 5000);

onMounted(atualizarConteudo);
</script>