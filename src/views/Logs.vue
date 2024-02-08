<template >
  <div class="container mx-sm flex flex-col">
    <div class="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border my-10">
      <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border py-3">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="block w-full overflow-hidden md:w-max">
            <nav>
              <ul role="tablist" class="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
                <li role="tab"
                  class="mx-1 relative flex items-center justify-center  h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                  data-value="all">
                  <div class="z-20 text-inherit" v-on:click="fetchLogs()">
                    &nbsp;&nbsp;Todos&nbsp;&nbsp;{{ totalLogs }}
                  </div>
                  <div class="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                </li>
                <li v-for="entidade in entidades" role="tab"
                  class="mx-1 relative flex items-center justify-center  h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
                  data-value="all">
                  <div class="z-20 text-inherit" v-on:click="fetchLogs(entidade)">
                    &nbsp;&nbsp;{{ entidade.nome }}&nbsp;{{ entidade.quantidade }}&nbsp;&nbsp;
                  </div>
                  <div class="absolute inset-0 z-10 h-full bg-white rounded-md shadow"></div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <div class="overflow-y-auto" style="height: 29.5rem;"> <!-- Defina a altura máxima que desejar, por exemplo, max-h-80 -->
          <table class="w-full text-left table-auto min-w-max">
            <thead class="sticky top-0 bg-white">
              <tr>
                <th
                  class="px-3 py-2 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p
                    class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
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
                    class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Data
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
                    class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Processo
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
                <!-- <th
                  class="px-3 py-2 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p
                    class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Tipo
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th> -->
                <th
                  class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p
                    class="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Log
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                      stroke="currentColor" aria-hidden="true" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                    </svg>
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(log, index) in logs" class="border-b transition duration-300 ease-in-out"
                @click="statusModal = !statusModal" v-on:click="toggleModal(index)">
                <td class="whitespace-nowrap px-3 py-2">{{ log.entidade.nome }}</td>
                <td class="whitespace-nowrap px-3 py-2">{{ log.data }}</td>
                <td class="whitespace-nowrap px-3 py-2">{{ log.processo }}</td>
                <!-- <td class="whitespace-nowrap px-3 py-2">{{ log.tipo }}</td> -->
                <td class="whitespace-nowrap px-3 py-2">{{ log.log }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div v-if="statusModal" data-te-modal-init data-te-backdrop="false"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50" tabindex="-1"
    aria-hidden="true">
    <div data-te-modal-dialog-ref
      class="pointer-events-none relative w-auto opacity-100 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:my-7 min-[576px]:max-w-[500px]">
      <div
        class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
        <div
          class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-2 dark:border-opacity-50">
          <h5 class="text-xl font-medium leading-normal text-white dark:text-neutral-200">
            Log
          </h5>
          <button type="button"
            class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-modal-dismiss aria-label="Close" @click="statusModal = false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="relative flex-auto p-4 bg-white" data-te-modal-body-ref>
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  Entidade
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name" type="text" :value="logs[index].entidade.nome" disabled>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  Data
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name" type="data" :value="logs[index].data" disabled>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  Message
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text" :value="logs[index].log" disabled>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  Body
                </label>
                <textarea
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text" :value="(JSON.stringify(logs[index]?.body?.pedido) || logs[index].log)" disabled>
                </textarea>
              </div>
            </div>
            <div v-if="logs[index]?.body?.errors" class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  Body
                </label>
                <textarea
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text" :value="(logs[index]?.body?.errors || logs[index].log)" disabled>
                </textarea>
              </div>
            </div>
          </form>
        </div>
        <div
          class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
          <button type="button"
            class="inline-block rounded bg-primary-100 px-3 py-1 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
            data-te-modal-dismiss data-te-ripple-init data-te-ripple-color="light" @click="statusModal = false">
            <span class="text-white">Close</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="statusModal" class="absolute inset-0 z-40 opacity-25 bg-black"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { urlApi } from '../environment';

let index = ref({});
let statusModal = ref(false);
const logs = ref([]);
const entidades = ref([]);
const entidadesContador = ref([]);
const totalLogs = ref(0);

const toggleModal = (indexx) => {
  index.value = indexx
  statusModal = !statusModal;
}

function formatarData(dataOriginal) {
  // Crie um novo objeto Date com a string de data original
  const data = new Date(dataOriginal);
  // Extraia o dia, mês e ano da data
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  // Formate a data no formato desejado (dd/mm/aaaa)
  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

// Função para atualizar o contador de entidades
async function contaRegistros() {

  try {
    const url = `${urlApi}/log/allentidades`
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
    entidadesContador.value = [];
    totalLogs.value = 0;
    response.data.forEach(log => {
      const pos = entidadesContador.value.findIndex(fi => fi._id === log.entidade._id);
      if (pos === -1) {
        entidadesContador.value.push({
          _id: log.entidade._id,
          nome: log.entidade.nome,
          quantidade: 1,
          // grupoeconomico: log.grupoeconomico._id
        })
      } else {
        entidadesContador.value[pos].quantidade++;
      }
    });
    // Limpar array antes de adicionar novos valores
    entidades.value = [];
    for (const entidadeContador of entidadesContador.value) {
      entidades.value.push({
        nome: entidadeContador.nome,
        quantidade: entidadeContador.quantidade,
        _id: entidadeContador._id
      });
      totalLogs.value += entidadeContador.quantidade
    }
  } catch (error) {
    console.error(error);
  }
}

// Função para buscar os logs da API
async function fetchLogs(entidade) {
  try {
    const url = `${urlApi}/log/allentidades?entidadeExterna=${entidade?._id || ''}`
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
    logs.value = response.data;
    logs.value.forEach(log => log.data = formatarData(log.data))
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchLogs);
onMounted(contaRegistros);
</script>     