<template>
  <div class="container mx-sm flex flex-col text-xs">
   <div class="relative flex flex-col w-[90%] max-w-full h-full mx-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border my-10 overflow-x-auto">
      <!-- Header / Controls -->
      <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border py-3">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 class="text-base font-semibold">Automação • Monitor</h2>

          <div class="flex flex-wrap items-center gap-2">
            <label class="text-[11px] text-gray-600">Auto-atualizar</label>
            <input type="checkbox" v-model="autoRefresh" class="h-4 w-4 cursor-pointer" />

            <select class="border rounded px-2 py-1" v-model.number="intervalMs" :disabled="!autoRefresh">
              <option :value="15000">15s</option>
              <option :value="30000">30s</option>
              <option :value="60000">1 min</option>
              <option :value="120000">2 min</option>
              <option :value="300000">5 min</option>
            </select>

            <button class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
              :disabled="loading" @click="refreshNow" title="Atualizar agora">
              {{ loading ? 'Atualizando...' : 'Atualizar' }}
            </button>
          </div>
        </div>

        <div class="mt-2 text-[11px] text-gray-500">
          <span v-if="lastCheck">Última verificação: {{ formatDateTime(lastCheck) }}</span>
          <span v-else>Nunca verificado</span>
          <span v-if="error" class="ml-2 text-red-600">• {{ error }}</span>
        </div>
      </div>

      <!-- Content -->
      <div class="px-4 pb-4">
        <!-- Paradas -->
        <section class="mb-6">
          <button class="w-full text-left font-bold py-2" @click="toggle('parado')">
            <span class="mr-2">{{ collapsed.parado ? '▶' : '▼' }}</span> 🚨 Paradas
            <span class="ml-2 text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-700">{{ grupos.parado.length }}</span>
          </button>
          <div v-if="!collapsed.parado" class="border rounded-md overflow-x-auto">
            <table class="w-full text-left table-auto">
              <thead class="sticky top-0 bg-white text-[11px]">
                <tr class="border-b">
                  <th class="px-3 py-2">Status</th>
                  <th class="px-3 py-2">Entidade</th>
                  <th class="px-3 py-2">Nome</th>
                  <th class="px-3 py-2">Progresso</th>
                  <th class="px-3 py-2">Próx.Exec.</th>
                  <th class="px-3 py-2">Dt.Iní.</th>
                  <th class="px-3 py-2">Dt.Fim</th>
                  <th class="px-3 py-2">Últ.Atualização</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in grupos.parado" :key="a._id" class="border-b hover:bg-gray-50">
                  <td class="whitespace-nowrap px-3 py-2">
                    <span class="inline-block h-3 w-3 rounded-full bg-red-500" :title="a.status"></span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-2">{{ a.entidade?.nome || '-' }}</td>
                  <td class="whitespace-nowrap px-3 py-2 font-medium">{{ a.nome }}</td>
                  <td class="whitespace-nowrap px-3 py-2 font-medium">{{ a.progresso }}%</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.proximaExecucao) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.dataInicio) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.dataFim) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.ultimaAtualizacao) }}</td>
                </tr>
                <tr v-if="!grupos.parado.length">
                  <td colspan="7" class="px-3 py-4 text-center text-gray-500 italic">Nenhuma automação parada.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Em Execução -->
        <section class="mb-6">
          <button class="w-full text-left font-bold py-2" @click="toggle('emexecucao')">
            <span class="mr-2">{{ collapsed.emexecucao ? '▶' : '▼' }}</span> ⚙️ Em Execução
            <span class="ml-2 text-[10px] px-2 py-0.5 rounded bg-yellow-100 text-yellow-800">{{ grupos.emexecucao.length
              }}</span>
          </button>
          <div v-if="!collapsed.emexecucao" class="border rounded-md overflow-x-auto">
            <table class="w-full text-left table-auto">
              <thead class="sticky top-0 bg-white text-[11px]">
                <tr class="border-b">
                  <th class="px-3 py-2">Status</th>
                  <th class="px-3 py-2">Entidade</th>
                  <th class="px-3 py-2">Nome</th>
                  <th class="px-3 py-2">Progresso</th>
                  <th class="px-3 py-2">Próx.Exec.</th>
                  <th class="px-3 py-2">Dt.Iní.</th>
                  <th class="px-3 py-2">Dt.Fim</th>
                  <th class="px-3 py-2">Últ.Atualização</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in grupos.emexecucao" :key="a._id" class="border-b hover:bg-gray-50">
                  <td class="whitespace-nowrap px-3 py-2">
                    <span class="inline-block h-3 w-3 rounded-full bg-yellow-500" :title="a.status"></span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-2">{{ a.entidade?.nome || '-' }}</td>
                  <td class="whitespace-nowrap px-3 py-2 font-medium">{{ a.nome }}</td>
                  <td class="whitespace-nowrap px-3 py-2 font-medium">{{ a.progresso }}%</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.proximaExecucao) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.dataInicio) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.dataFim) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.ultimaAtualizacao) }}</td>
                </tr>
                <tr v-if="!grupos.emexecucao.length">
                  <td colspan="7" class="px-3 py-4 text-center text-gray-500 italic">Nenhuma automação em execução.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Concluídas / Ativas -->
        <section>
          <button class="w-full text-left font-bold py-2" @click="toggle('concluido')">
            <span class="mr-2">{{ collapsed.concluido ? '▶' : '▼' }}</span> ✅ Concluídas
            <span class="ml-2 text-[10px] px-2 py-0.5 rounded bg-green-100 text-green-800">{{ grupos.concluido.length
              }}</span>
          </button>
          <div v-if="!collapsed.concluido" class="border rounded-md overflow-x-auto ">
            <table class="w-full text-left table-auto">
              <thead class="sticky top-0 bg-white text-[11px]">
                <tr class="border-b">
                  <th class="px-3 py-2">Status</th>
                  <th class="px-3 py-2">Entidade</th>
                  <th class="px-3 py-2">Nome</th>
                  <th class="px-3 py-2">Progresso</th>
                  <th class="px-3 py-2">Próx.Exec.</th>
                  <th class="px-3 py-2">Dt.Iní.</th>
                  <th class="px-3 py-2">Dt.Fim</th>
                  <th class="px-3 py-2">Últ.Atualização</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in grupos.concluido" :key="a._id" class="border-b hover:bg-gray-50">
                  <td class="whitespace-nowrap px-3 py-2">
                    <span class="inline-block h-3 w-3 rounded-full bg-green-500" :title="a.status"></span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-2">{{ a.entidade?.nome || '-' }}</td>
                  <td class="whitespace-nowrap px-3 py-2 font-medium">{{ a.nome }}</td>
                  <td class="whitespace-nowrap px-3 py-2 font-medium">{{ a.progresso }}%</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.proximaExecucao) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.dataInicio) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.dataFim) }}</td>
                  <td class="whitespace-nowrap px-3 py-2">{{ formatDateTime(a.ultimaAtualizacao) }}</td>
                </tr>
                <tr v-if="!grupos.concluido.length">
                  <td colspan="7" class="px-3 py-4 text-center text-gray-500 italic">Nenhuma automação concluída.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue'
  import axios from 'axios'
  import { urlApi } from '../environment';

  /**
   * Ajuste este endpoint para o ambiente de produção/homologação.
   * No app móvel você usa /api/automacao/parada; aqui manteremos o mesmo.
   * Se preferir, extraia para um arquivo environment.
   */
  const API_URL = `${urlApi}/automacao/parada`

  const HEADERS = {
    'conecta-supply-api-appkey': 'conecta-supply-key-vlrzks',
    'conecta-supply-api-apptoken': 'GjbH5dDYhZgoqT16GGLAUsJDI4BGsA3WH5tB6XncKrqZbfVFKu',
    'Content-Type': 'application/json'
  }

  const automacoes = ref([])
  const loading = ref(false)
  const error = ref('')
  const lastCheck = ref(null)

  const autoRefresh = ref(true)
  const intervalMs = ref(60000)
  let timerId = null

  const collapsed = reactive({
    parado: false,
    emexecucao: true,
    concluido: true
  })

  /** Normaliza e agrupa por status, mapeando 'ativo' -> 'concluido' (compatível com seu app) */
  const automacoesNormalizadas = computed(() =>
    automacoes.value.map(a => ({
      ...a,
      status: a.status === 'ativo' ? 'concluido' : a.status
    }))
  )

  const grupos = computed(() => ({
    parado: automacoesNormalizadas.value.filter(a => a.status === 'parado'),
    emexecucao: automacoesNormalizadas.value.filter(a => a.status === 'emexecucao'),
    concluido: automacoesNormalizadas.value
      .filter(a => a.status === 'concluido')
      .sort((a, b) => {
        const pa = new Date(a.proximaExecucao || 0).getTime()
        const pb = new Date(b.proximaExecucao || 0).getTime()
        return pb - pa
      })
  }))

  function toggle(key) {
    collapsed[key] = !collapsed[key]
  }

  function formatDateTime(dateLike) {
    if (!dateLike) return '-'
    const d = new Date(dateLike)
    if (Number.isNaN(d.getTime())) return '-'
    return d.toLocaleString()
  }

  async function fetchAutomacoes() {
    loading.value = true
    error.value = ''
    try {
      const { data } = await axios.get(API_URL, { headers: HEADERS })
      automacoes.value = Array.isArray(data) ? data : []
      lastCheck.value = new Date()
    } catch (e) {
      console.error('Erro ao buscar automações:', e)
      error.value = 'Falha ao buscar automações'
    } finally {
      loading.value = false
    }
  }

  function startTimer() {
    stopTimer()
    if (autoRefresh.value) {
      timerId = setInterval(fetchAutomacoes, intervalMs.value)
    }
  }
  function stopTimer() {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    }
  }
  function refreshNow() {
    fetchAutomacoes()
  }

  watch([autoRefresh, intervalMs], startTimer)

  onMounted(() => {
    fetchAutomacoes()
    startTimer()
    document.addEventListener('visibilitychange', handleVisibility)
  })

  onBeforeUnmount(() => {
    stopTimer()
    document.removeEventListener('visibilitychange', handleVisibility)
  })

  function handleVisibility() {
    // Pausa quando a aba não está visível; retoma quando volta
    if (document.hidden) {
      stopTimer()
    } else {
      fetchAutomacoes()
      startTimer()
    }
  }
</script>

<style scoped>
  /* opcional: pequenos ajustes de tabela em telas menores */
  table {
    font-size: 12px;
  }

  @media (max-width: 640px) {
    table {
      font-size: 11px;
    }
  }
</style>
