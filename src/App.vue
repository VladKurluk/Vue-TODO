<template>
  <div id="app" class="section">
    <div class="columns">
      <task-list
        :list="taskList"
        :taskType="'todo'"
        @deleteTask="deleteRecord"
      />

      <task-list
        :list="taskList"
        :taskType="'in progress'"
        @deleteTask="deleteRecord"
      />

      <task-list
        :list="taskList"
        :taskType="'done'"
        @deleteTask="deleteRecord"
      />

      <editor
        v-model="isOpen"
        @createdTask="createRecord"
        @update="updateRecord"
        @toggleEditor="isOpen = false"
      />
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'
import Editor from '@/components/Editor'
import { bus } from './main'

export default {
  name: 'App',
  components: {
    Editor,
    TaskList
  },
  data: () => ({
    taskList: [],
    isOpen: false,
    index: null
  }),
  methods: {
    createRecord (data) {
      this.taskList.push(data)
      this.saveInStorage()
    },
    indexOfEditedRecord (data) {
      // Save the index in the array for the record that is being edited
      this.taskList.forEach((item, index, array) => {
        if (item.time === data.time) {
          this.index = index
        }
      })
    },
    updateRecord (data) {
      this.taskList.forEach((item, index, array) => {
        this.taskList.splice(this.index, 1, data)
      })
      this.saveInStorage()
      this.isOpen = false
    },
    deleteRecord (val) {
      this.taskList.forEach((item, index, array) => {
        if (item.time === val) {
          this.taskList.splice(index, 1)
        }
      })
      this.saveInStorage()
    },
    saveInStorage () {
      const data = JSON.stringify(this.taskList)
      localStorage.setItem('tasks', data)
    }
  },
  mounted () {
    if (localStorage.tasks) {
      this.taskList = JSON.parse(localStorage.getItem('tasks'))
    }
    bus.$on('openEditor', data => {
      this.isOpen = true
    })
    bus.$on('editRecord', data => {
      this.indexOfEditedRecord(data)
    })
  }
}
</script>

<style lang="scss">
body {
  background-color: hsl(0, 0%, 96%);
  min-height: 100vh;
}
</style>
