<script>
import Api from "src/helpers/Api.js";
import * as XLSX from 'xlsx';
import moment from "moment/moment.js";
export default {
  name: "TaskOutdatedExcelDownload",
  props: ['task_id'],
  methods: {
    async downloadOutdated(){
      let response = await Api.get('/getOutdatedReport?task_id='+this.task_id);
      if (response.status === 200 && response.data.success){
        let report = response.data.data.report;
        if (report.length === 0) {
          alert("Все студенты сдали задание вовремя");
          return;
        }

        const dataForExcel = report.map(item => ({
          'ID пользователя': item.user_id,
          'Имя': item.firstname,
          'Фамилия': item.surname,
          'Отчество': item.patronymic,
          'Статус': item.status === 1 ? 'В процессе' : (item.status === 2 ? 'Готово' : 'Не начато'),
          'Дата изменения статуса': item.last_status_changed ?
            moment(item.last_status_changed).local().format('YYYY-MM-DD HH:mm') : '',
        }));


        const ws = XLSX.utils.json_to_sheet(dataForExcel);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Отчет");
        XLSX.writeFile(wb, "Отчет_пользователей.xlsx");
      }
    }
  }
}
</script>

<template>
  <q-btn color="primary" label="Просрочившие" @click="downloadOutdated"></q-btn>
</template>

<style scoped>

</style>
