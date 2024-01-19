<template>
  <div class="flex flex-col w-full border rounded-xl h-100vh">
    <div class="h-150px flex items-center justify-between bg-#41729F rounded-t-xl">
      <div class="flex items-center px-10 bg-#41729F">
        <v-icon style="font-size:40px; color:white; background:#41729F">mdi-finance</v-icon>
        <p class="text-3xl font-bold ml-4 text-white bg-#41729F">Dashboard</p>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="h-70px flex items-center justify-center ma-4">
      <div class="text-5xl mr-2 font-bold">{{selectYear}}</div>

      <v-menu
        v-model="year"
        :close-on-content-click="false"
        location="bottom right">
        <template v-slot:activator="{ props }">
          <v-icon size="20" class="pl-4" v-bind="props">mdi-cog-outline</v-icon>
        </template>
        <v-card>
          <p class="text-sm pa-2">Cartões cadastrados</p>
          <v-divider></v-divider>
          <v-radio-group v-model="selectYear" class="flex">
            <v-radio label="2023" value="2023"></v-radio>
            <v-radio label="2022" value="2022"></v-radio>
            <v-radio label="2021" value="2021"></v-radio>
          </v-radio-group>
        </v-card>
      </v-menu>
    </div>
    <v-row>
      <v-col cols="12" lg="6" class="gap-1">
        <div class="flex justify-center">
          <div>
            Data de Início
          </div>
        </div>
        <div>
          <BarChart :data="chartDataBar" :options="chartOptions"></BarChart>
        </div>
      </v-col>
      <v-col cols="12" lg="6" class="gap-1">
        <div class="flex justify-center">
          <div>
            Data de Cancelamento
          </div>
        </div>
        <div>
          <BarChart :data="chartDataChurnBar" :options="chartOptions"></BarChart>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6" class="gap-1">
        <div class="flex justify-center">
          <div>
            Data de Início
          </div>
        </div>
        <div>
          <BarChart :data="chartDataBar" :options="chartOptions"></BarChart>
        </div>
      </v-col>
      <v-col cols="12" lg="6" class="gap-1">
        <div class="flex justify-center">
          <div>
            Data de Cancelamento
          </div>
        </div>
        <div>
          <BarChart :data="chartDataBar" :options="chartOptions"></BarChart>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Array
  },
})

const months = useMonths()
const dataLoading = ref()
const year = ref(2023)

const selectYear = ref(2022)

const chartDataFakeBar = computed(() => {
  return {
    labels: months.value,
    datasets: [
      {
        backgroundColor: ['#41729F', '#5885AF', '#274472', '#C3E0E5', '#41729F', '#5885AF'],
        data: [1000, 9000, 600, 3000, 230, 900, 200, 2000, 1000, 6250, 3000, 0],
        borderRadius: 5
      }
    ]
  };
});

const chartDataBar = computed(() => {
    const responseDate = props.data;
    const ano = Number(selectYear.value);

    const datasFiltradas = responseDate.filter((data) => {
      const dataInicio = new Date(data.dataInicio);
      return dataInicio.getFullYear() === ano;
    });

    datasFiltradas.forEach((data) => {
      const mes = data.dataInicio.split('-')[1];
      data.mes = mes
      data.valor = parseFloat(data.valor);
    });

    const totalPorMes = [];

    datasFiltradas.forEach((data) => {
      const mes = data.mes;
      const valor = data.valor;

      if (!totalPorMes.find((item) => item.mes === mes)) {
        totalPorMes.push({ mes, valor });
      } else {
        const item = totalPorMes.find((item) => item.mes === mes);
        item.valor += valor;
      }
    });

    totalPorMes.sort((a, b) => a.mes - b.mes);

  return {
    labels: months.value,
    datasets: [
      {
        backgroundColor: ['#41729F', '#5885AF', '#274472', '#C3E0E5', '#41729F', '#5885AF'],
        data: totalPorMes.map((item) => item.valor),
        borderRadius: 5
      }
    ]
  };
});

const chartDataChurnBar = computed(() => {
    const responseDate = props.data;
    // const ano = Number(selectYear.value);
    const ano = 2022;

    const datasFiltradas = responseDate.filter((data) => {
      const dataCancelamento = new Date(data.dataCancelamento);
      return dataCancelamento.getFullYear() === ano;
    });

    datasFiltradas.forEach((data) => {
      const mes = data.dataCancelamento.split('-')[1];
      data.mes = mes
      return data.valor = parseFloat(data.valor);
    });

    const totalPorMes = [];

    datasFiltradas.forEach((data) => {
      const mes = data.mes;
      const valor = data.valor;

      if (!totalPorMes.find((item) => item.mes === mes)) {
        totalPorMes.push({ mes, valor });
      } else {
        const item = totalPorMes.find((item) => item.mes === mes);
        item.valor += valor;
      }
    });

    totalPorMes.sort((a, b) => a.mes - b.mes);

  return {
    labels: months.value,
    datasets: [
      {
        backgroundColor: ['#FBAA60', '#FBC490', '#F67B50', '#A82810', '#FBAA60', '#FBC490'],
        data: totalPorMes.map((item) => item.valor),
        borderRadius: 5
      }
    ]
  };
});

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      filler: {
        propagate: false
      },
    },
    scales: {
      y: {
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  };
});
</script>