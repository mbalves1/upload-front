<template>
  <div class="flex flex-col w-full border rounded-xl sm:h-90vh sm-pb-10">
    <div class="min-h-150px sm:h-150px flex items-center sm:justify-between bg-#41729F rounded-t-xl">
      <div class="flex items-center px-10 bg-#41729F">
        <v-icon style="font-size:40px; color:white; background:#41729F">mdi-finance</v-icon>
        <p class="text-lg sm:text-3xl font-bold ml-4 text-white bg-#41729F">Dashboard</p>
      </div>
      <div @click="openModal" class="flex items-center border mr-4 pa-2 rounded-lg bg-grey">
        <p class="text-xl font-bold mr-2 ml-2 text-white bg-grey mt-1 cursor-pointer">Upload</p>
        <v-icon style="font-size:20px; color:white;">mdi-file</v-icon>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="h-70px flex items-center justify-center ma-10 pa-8 bg-#f2f2f2 rounded">
      <div class="text-5xl mr-2 font-bold">
        
        <v-tooltip text="Escolha qual mês deseja visualizar clicando na engrenagem" location="start">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props" style="font-size:20px; color:grey;">mdi-alert-circle-outline</v-icon>
          </template>
        </v-tooltip>

        {{selectYear}}
      </div>

      <v-menu
        :close-on-content-click="false"
        location="bottom right">
        <template v-slot:activator="{ props }">
          <v-icon size="20" class="pl-4" v-bind="props">mdi-cog-outline</v-icon>
        </template>
        <v-card>
          <p class="text-sm pa-2">Escolha o ano</p>
          <v-divider></v-divider>
          <v-radio-group v-model="selectYear" class="flex">
            <v-radio label="2023" value="2023"></v-radio>
            <v-radio label="2022" value="2022"></v-radio>
            <v-radio label="2021" value="2021"></v-radio>
          </v-radio-group>
        </v-card>
      </v-menu>
    </div>
    <v-row class="mx-10">
      <v-col cols="12" lg="6" class="gap-1">
        <div class="flex justify-center">
          <div class="font-bold">
            Data de Início
          </div>
        </div>
        <div class="sm:h-250px">
          <BarChart :data="chartDataBar" :options="chartOptions"></BarChart>
        </div>
      </v-col>
      <v-col cols="12" lg="6" class="gap-1">
        <div class="flex justify-center">
          <div class="font-bold">
            Data de Cancelamento
          </div>
        </div>
        <div class="sm:h-250px">
          <BarChart :data="chartDataChurnBar" :options="chartOptions"></BarChart>
        </div>
      </v-col>
    </v-row>
    <v-row class="mx-10">
      <v-col cols="12" lg="6" class="gap-1">
        <div class="flex justify-center">
          <div class="font-bold">
            Contas Ativas/Canceladas
          </div>
        </div>
        <div class="sm:h-250px">
          <BarChart :data="chartActivesAccount" :options="chartOptions"></BarChart>
        </div>
      </v-col>
      <v-col cols="12" lg="3" class="gap-1">
        <div class="flex justify-center">
          <div class="font-bold flex flex-col">
            Destaques do ano
            <i class="text-grey">Maior e menor valor</i>
          </div>
        </div>
        <div class="sm:h-250px">
          <BarChart :data="highestValue" :options="chartOptions"></BarChart>
        </div>
      </v-col>
      <v-col cols="12" lg="3" class="gap-1">
        <div class="flex justify-center">
          <div class="font-bold">
            Ativos e Churn do ano
          </div>
        </div>
        <div class="sm:h-250px">
          <DoughnutChart :data="chartActived" :options="chartOptionsDoughnut"></DoughnutChart>
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
const emit = defineEmits(['openModal'])
const months = useMonths()
const dataLoading = ref()
const openUpload = ref(false)
const data = ref()

const selectYear = ref(2022)

const getDataResponse = (items) => {
  data.value = items
}

const openModal = () => {
  emit('openModal', true)
}

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

const initial = ref()

const chartDataBar = computed(() => {
  const responseDate = props.data;
  const ano = Number(selectYear.value);

  const datasFiltradas = responseDate.filter((data) => {
    const dataInicio = new Date(data.dataInicio);
    return dataInicio.getFullYear() === ano;
  });

  const totalPorMes = datasFiltradas.reduce((acc, data) => {
    const mes = getMes(data.dataInicio);
    const valor = parseFloat(data.valor);

    const item = acc.find((item) => item.mes === mes);
    if (!item) {
      acc.push({ mes, valor });
    } else {
      item.valor += valor;
    }

    return acc;
  }, []);

  totalPorMes.sort((a, b) => a.mes - b.mes);
  initial.value = totalPorMes.sort((a, b) => a.mes - b.mes);

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

const churn = ref()

function getMes(data) {
  const date = new Date(data);
  if (/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/.test(data)) {
    return data.split('-')[1];
  } else {
    return date.getMonth();
  }
}

const chartDataChurnBar = computed(() => {
  const responseDate = props.data;
  const ano = Number(selectYear.value);

  const datasFiltradas = responseDate.filter((data) => {
    const dataCancelamento = new Date(data.dataCancelamento);
    return dataCancelamento.getFullYear() === ano;
  });

  const totalPorMes = datasFiltradas.reduce((acc, data) => {
    const mes = getMes(data.dataCancelamento);
    const valor = parseFloat(data.valor);

    const item = acc.find((item) => item.mes === mes);
    if (!item) {
      acc.push({ mes, valor });
    } else {
      item.valor += valor;
    }

    return acc;
  }, []);

  totalPorMes.sort((a, b) => a.mes - b.mes);
  churn.value = totalPorMes.sort((a, b) => a.mes - b.mes);

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

const chartActivesAccount = computed(() => {
  return {
    labels: months.value,
    datasets: [
      {
        backgroundColor: ['#41729F'],
        data: initial.value.map((item) => item.valor),
        borderRadius: 5
      },
      {
        backgroundColor: ['#A82810'],
        data: churn.value.map((item) => item.valor),
        borderRadius: 5
      }
    ]
  };
});

const chartActived = computed(() => {
  const responseDate = props.data;
  const ano = Number(selectYear.value);

  const datasFiltradas = responseDate.filter((data) => {
    const status = new Date(data.dataStatus);
    return status.getFullYear() === ano;
  });

  const atived = datasFiltradas.filter((data) => {
    return data.status === 'Ativa';
  })

  const churn = datasFiltradas.filter((data) => {
    return data.status === 'Cancelada';
  })

  return {
    labels: ['Ativo', 'Churn'],
    datasets: [
      {
        backgroundColor: ['#5885AF', '#A82810'],
        data: [atived.length, churn.length],
        borderRadius: 5
      }
    ]
  }
})

const highestValue = computed(() => {
  const responseDate = props.data;
  const ano = Number(selectYear.value);

  const datasFiltradas = responseDate.filter((data) => {
    const status = new Date(data.dataStatus);
    return status.getFullYear() === ano;
  });
  
  const formatNumber = datasFiltradas.map(({valor, idAssinante}) => {
    return {
      valor: +valor,
      idAssinante: idAssinante
    }
  })
  const maxValue = Math.max(...formatNumber.map((obj) => obj.valor));
  const minValue = Math.min(...formatNumber.map((obj) => obj.valor));
  const users = formatNumber.filter((obj) => obj.valor === maxValue || obj.valor === minValue).map((obj) => obj.idAssinante);

  return {
    labels: users,
    datasets: [
      {
        backgroundColor: ['#5885AF', '#A82810'],
        data: [maxValue, minValue],
        borderRadius: 5
      }
    ]
  }
})

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

const chartOptionsDoughnut = computed(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'left',
          labels: {
            usePointStyle: true
          }
        }
      }
    };
  });
</script>