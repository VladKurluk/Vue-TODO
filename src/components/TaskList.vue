<template>
  <div class="column">
    <h1 class="title has-text-centered">{{ columnTitle }}<br />tasks</h1>
    <button
      :class="color"
      class="button is-fullwidth"
      @click.prevent="newTask"
      >
        Add new task
      </button>
    <div v-if="timesSorted.length">
      <div
        class="card"
        v-for="(task, index) in timesSorted"
        :key="index"
      >
        <div class="card-content">
          <p class="title">{{ task.title }}</p>
          <p class="subtitle">{{ task.body }}</p>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <span>{{ task.time | time('datetime') }}</span>
          </p>
          <p class="card-footer-item">
            <button
              class="button is-info is-rounded"
              @click="editTask(task)"
            >Edit</button>
          </p>
          <p class="card-footer-item">
            <button
              class="button is-danger is-rounded"
              @click="$emit('deleteTask', task.time)"
            >Delete</button>
          </p>
        </footer>
      </div>
    </div>
    <p v-else class="subtitle has-text-centered">No tasks yet</p>
  </div>
</template>

<script>
import { bus } from '../main'
export default {
  name: 'TaskList',
  data: () => ({}),
  props: {
    list: {
      type: Array
    },
    taskType: {
      type: String,
      required: true
    }
  },
  computed: {
    task () {
      // Array filtering by type
      return this.list.filter(r => r.type === this.taskType)
    },
    timesSorted () {
      // Array sorting by created time
      const tasks = this.task
      return tasks.sort((a, b) => b.time - a.time)
    },
    columnTitle () {
      return this.taskType.toUpperCase()
    },
    color () {
      return this.taskType === 'todo' ? 'is-danger' : this.taskType === 'in progress' ? 'is-warning' : 'is-primary'
    }
  },
  methods: {
    newTask () {
      bus.$emit('typeRecord', this.taskType)
      bus.$emit('openEditor')
    },
    editTask (data) {
      bus.$emit('editRecord', data)
      bus.$emit('openEditor')
    }
  }
}
</script>

<style lang="scss">
.card {
  margin-bottom: 5px;
  border: 1px solid #cecece;
}
.is-fullwidth {
  margin-bottom: 10px;
}
</style>
