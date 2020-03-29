<template>
  <div id="app" class="section">
    <div class="columns">
      <task-list
        :list="taskList"
        :taskType="'todo'"
        @toggleEditor="isOpen = true"
        @deleteTask="deleteRecord"
        @newTaskType="taskInType"
        @editTask="editRecord"
      />

      <task-list
        :list="taskList"
        :taskType="'in progress'"
        @toggleEditor="isOpen = true"
        @deleteTask="deleteRecord"
        @editTask="editRecord"
        @newTaskType="taskInType"
      />

      <task-list
        :list="taskList"
        :taskType="'done'"
        @toggleEditor="isOpen = true"
        @deleteTask="deleteRecord"
        @editTask="editRecord"
        @newTaskType="taskInType"
      />

      <editor
        :editedObj="editedTask"
        :typeTask="newTask"
        @createdTask="createRecord"
        @toggleEditor="isOpen = false"
        @update="updateRecord"
        v-model="isOpen"
      />
    </div>
  </div>
</template>

<script>
import TaskList from '@/components/TaskList'
import Editor from '@/components/Editor'

export default {
  name: 'App',
  components: {
    Editor,
    TaskList
  },
  data: () => ({
    taskList: [],
    editedTask: null,
    newTask: null,
    isOpen: false,
    index: null
  }),
  methods: {
    taskInType (data) {
      this.newTask = {
        type: data
      }
      this.isOpen = true
    },
    createRecord (data) {
      this.taskList.push(data)
      this.saveInStorage()
    },
    editRecord (data) {
      this.taskList.forEach((item, index, array) => {
        if (item.time === data.time) {
          this.index = index
        }
      })
      this.editedTask = data
      this.isOpen = true
    },
    updateRecord (data) {
      this.taskList.forEach((item, index, array) => {
        this.taskList.splice(this.index, 1, data)
      })
      this.saveInStorage()
      this.isOpen = false
      this.editedTask = {}
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
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
