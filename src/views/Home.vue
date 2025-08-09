<template>
  <div class="w-[90%] max-w-full mx-auto my-10 space-y-8">
    <!-- Header -->
    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-base font-semibold">Visão Geral</h2>
      <div class="flex items-center gap-2 text-xs">
        <label class="whitespace-nowrap">Auto-atualizar</label>
        <input type="checkbox" v-model="autoRefresh" class="h-4 w-4 cursor-pointer" />
        <select class="border rounded px-2 py-1" v-model.number="intervalMs" :disabled="!autoRefresh">
          <option :value="15000">15s</option>
          <option :value="30000">30s</option>
          <option :value="60000">1 min</option>
          <option :value="120000">2 min</option>
        </select>
        <button class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          :disabled="loading" @click="refreshAll">
          {{ loading ? 'Atualizando...' : 'Atualizar' }}
        </button>
      </div>
    </div>

    <div class="text-[11px] text-gray-500 mb-4">
      <span v-if="lastCheck">Última verificação: {{ formatDateTime(lastCheck) }}</span>
      <span v-else>Nunca verificado</span>
      <span v-if="error" class="ml-2 text-red-600">• {{ error }}</span>
    </div>

    <!-- Total de Logs -->
    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Logs -->
      <div class="bg-white shadow rounded-xl p-4 flex-1 lg:max-w-xs">
        <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-blue-700">
          <span>📜</span> Logs
        </h3>
        <div class="grid grid-cols-1 gap-3">
          <div class="rounded-xl border p-4 bg-blue-50">
            <div class="text-xs text-blue-700">Total de Logs</div>
            <div class="text-2xl font-semibold mt-1 text-blue-900">{{ totals.logs }}</div>
          </div>
        </div>
      </div>

      <!-- Integrações -->
      <div class="bg-white shadow rounded-xl p-4 flex-[2]">
        <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700">
          <span>🔗</span> Integrações
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div class="rounded-xl border p-4 bg-gray-50">
            <div class="text-xs text-gray-700">Total</div>
            <div class="text-2xl font-semibold mt-1 text-gray-900">{{ totals.integracoes.total }}</div>
          </div>
          <div class="rounded-xl border p-4 bg-yellow-50">
            <div class="text-xs text-yellow-700">⚙️ Em execução</div>
            <div class="text-2xl font-semibold mt-1 text-yellow-900">{{ totals.integracoes.emexecucao }}</div>
          </div>
          <div class="rounded-xl border p-4 bg-red-50">
            <div class="text-xs text-red-700">🚨 Parado</div>
            <div class="text-2xl font-semibold mt-1 text-red-900">{{ totals.integracoes.parado }}</div>
          </div>
          <div class="rounded-xl border p-4 bg-blue-50">
            <div class="text-xs text-blue-700">💤 Não iniciado</div>
            <div class="text-2xl font-semibold mt-1 text-blue-900">{{ totals.integracoes.naoiniciado }}</div>
          </div>
          <div class="rounded-xl border p-4 bg-green-50">
            <div class="text-xs text-green-700">✅ Concluído</div>
            <div class="text-2xl font-semibold mt-1 text-green-900">{{ totals.integracoes.concluido }}</div>
          </div>
        </div>
      </div>
    </div>


    <!-- Automações -->
    <div class="bg-white shadow rounded-xl p-4">
      <h3 class="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-700">
        <span>🤖</span> Automações
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <div class="rounded-xl border p-4 bg-gray-50">
          <div class="text-xs text-gray-700">Total</div>
          <div class="text-2xl font-semibold mt-1 text-gray-900">{{ totals.automacoes.total }}</div>
        </div>
        <div class="rounded-xl border p-4 bg-yellow-50">
          <div class="text-xs text-yellow-700">⚙️ Em execução</div>
          <div class="text-2xl font-semibold mt-1 text-yellow-900">{{ totals.automacoes.emexecucao }}</div>
        </div>
        <div class="rounded-xl border p-4 bg-red-50">
          <div class="text-xs text-red-700">🚨 Parado</div>
          <div class="text-2xl font-semibold mt-1 text-red-900">{{ totals.automacoes.parado }}</div>
        </div>
        <div class="rounded-xl border p-4 bg-blue-50">
          <div class="text-xs text-blue-700">💤 Não iniciado</div>
          <div class="text-2xl font-semibold mt-1 text-blue-900">{{ totals.automacoes.naoiniciado }}</div>
        </div>
        <div class="rounded-xl border p-4 bg-green-50">
          <div class="text-xs text-green-700">✅ Concluído/Ativo</div>
          <div class="text-2xl font-semibold mt-1 text-green-900">{{ totals.automacoes.concluido }}</div>
        </div>
        <div class="rounded-xl border p-4 bg-gray-200">
          <div class="text-xs text-gray-800">⛔ Inativo</div>
          <div class="text-2xl font-semibold mt-1 text-gray-900">{{ totals.automacoes.inativo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
import axios from 'axios'
import { urlApi } from '../environment';

/** ENDPOINTS */
const URL_AUTOMACOES = `${urlApi}/automacao/parada`
const URL_INTEGRACOES = `${urlApi}/integracao/allentidades`
const URL_LOGS = `${urlApi}/log/allentidades`

/** HEADERS */
const HEADERS = {
  'conecta-supply-api-appkey': 'conecta-supply-key-vlrzks',
  'conecta-supply-api-apptoken': 'GjbH5dDYhZgoqT16GGLAUsJDI4BGsA3WH5tB6XncKrqZbfVFKu',
  'Content-Type': 'application/json'
}

const loading = ref(false)
const error = ref('')
const lastCheck = ref(null)

const autoRefresh = ref(true)
const intervalMs = ref(60000)
let timerId = null

// Totais exibidos
const totals = reactive({
  logs: 0,
  integracoes: {
    total: 0,
    emexecucao: 0,
    parado: 0,
    naoiniciado: 0,
    concluido: 0,
    outros: 0
  },
  automacoes: {
    total: 0,
    emexecucao: 0,
    parado: 0,
    naoiniciado: 0,
    concluido: 0, // inclui 'ativo' normalizado
    inativo: 0,
    outros: 0
  }
})

function formatDateTime(value) {
  if (!value) return '-'
  const d = new Date(value)
  return isNaN(d.getTime()) ? '-' : d.toLocaleString()
}

/** Utils para normalizar resposta (array | objeto) */
function toArray(possibleArray) {
  if (Array.isArray(possibleArray)) return possibleArray
  if (!possibleArray) return []
  return [possibleArray]
}

/** Conta por status dado um array e um mapa de normalização */
function countByStatus(items, normalize = (s) => s) {
  const counts = {
    total: 0,
    emexecucao: 0,
    parado: 0,
    naoiniciado: 0,
    concluido: 0,
    inativo: 0,
    outros: 0
  }
  counts.total = items.length
  for (const it of items) {
    const raw = (it?.status || '').toString().toLowerCase()
    const st = normalize(raw)
    if (st in counts) counts[st]++
    else if (['emexecucao', 'parado', 'naoiniciado', 'concluido', 'inativo'].includes(st)) counts[st]++
    else counts.outros++
  }
  return counts
}

async function fetchLogs() {
  try {
    const { data } = await axios.get(URL_LOGS, { headers: HEADERS })
    if (Array.isArray(data)) {
      totals.logs = data.length
    } else if (typeof data === 'number') {
      totals.logs = data
    } else if (data && typeof data.total === 'number') {
      totals.logs = data.total
    } else {
      // fallback: tente computar a partir de chaves comuns
      totals.logs = Array.isArray(data?.items) ? data.items.length : 0
    }
  } catch (e) {
    console.error('Erro ao buscar logs:', e)
    throw new Error('Falha ao buscar logs')
  }
}

async function fetchIntegracoes() {
  try {
    const { data } = await axios.get(URL_INTEGRACOES, { headers: HEADERS })
    const list = toArray(data)
    const c = countByStatus(list, (s) => s) // status já vem como concluido, emexecucao, etc
    Object.assign(totals.integracoes, c)
  } catch (e) {
    console.error('Erro ao buscar integrações:', e)
    throw new Error('Falha ao buscar integrações')
  }
}

async function fetchAutomacoes() {
  try {
    const { data } = await axios.get(URL_AUTOMACOES, { headers: HEADERS })
    const list = toArray(data)
    // Normaliza 'ativo' -> 'concluido' para manter consistência com seu app
    const c = countByStatus(list, (s) => (s === 'ativo' ? 'concluido' : s))
    Object.assign(totals.automacoes, c)
  } catch (e) {
    console.error('Erro ao buscar automações:', e)
    throw new Error('Falha ao buscar automações')
  }
}

async function refreshAll() {
  loading.value = true
  error.value = ''
  try {
    await Promise.all([fetchLogs(), fetchIntegracoes(), fetchAutomacoes()])
    lastCheck.value = new Date()
  } catch (e) {
    error.value = e.message || 'Falha ao atualizar dados'
  } finally {
    loading.value = false
  }
}

function startTimer() {
  stopTimer()
  if (autoRefresh.value) {
    timerId = setInterval(refreshAll, intervalMs.value)
  }
}
function stopTimer() {
  if (timerId) {
    clearInterval(timerId)
    timerId = null
  }
}

watch([autoRefresh, intervalMs], startTimer)

onMounted(() => {
  refreshAll()
  startTimer()
  document.addEventListener('visibilitychange', handleVisibility)
})

onBeforeUnmount(() => {
  stopTimer()
  document.removeEventListener('visibilitychange', handleVisibility)
})

function handleVisibility() {
  if (document.hidden) {
    stopTimer()
  } else {
    refreshAll()
    startTimer()
  }
}
</script>
