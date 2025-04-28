<script>
import { Document, Paragraph, TextRun, Packer } from 'docx';
import { saveAs } from 'file-saver';
import moment from "moment/moment.js";
export default {
  name: "CourseTaskListDownloader",
  props: ['tasks'],
  methods: {
    formatDate(dateString) {
      if (!dateString) return 'Не указано';
      return moment(dateString).local().format('YYYY-MM-DD HH:mm')
    },

    getStatusText(status) {
      const statusMap = {
        0: 'Не начато',
        1: 'В процессе',
        2: 'Готово',
      };
      return statusMap[status] || 'Неизвестно';
    },

    async generateDocx() {

      const children = this.tasks.map(task => {
        return new Paragraph({
          children: [
            new TextRun({
              text: `Название: ${task.name}`,
              bold: true,
              size: 24
            }),
            new TextRun({
              text: `\nОписание: ${task.text}`,
              break: 1
            }),
            new TextRun({
              text: `\nДедлайн: ${this.formatDate(task.deadline)}`,
              break: 1
            }),
            new TextRun({
              text: `\nСтатус: ${this.getStatusText(task.status)}`,
              break: 1
            }),
            new TextRun({
              text: '\n\n',
              break: 1
            })
          ]
        });
      });

      const doc = new Document({
        title: "Список заданий курса",
        description: "Генерация списка заданий курса",
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: "Список заданий курса",
              heading: "Heading1",
              spacing: {
                after: 200
              }
            }),
            ...children
          ]
        }]
      });


      const blob = await Packer.toBlob(doc);
      saveAs(blob, "список_заданий_курса.docx");
    }
  }
}
</script>

<template>
  <q-btn color="primary" label="Скачать задания" @click="generateDocx"></q-btn>
</template>

<style scoped>

</style>
