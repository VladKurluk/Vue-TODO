<template>
  <div class="column">
    <h1 class="title">{{ columnTitle }}<br />tasks</h1>
    <button
      :class="color"
      class="button is-fullwidth"
      @click.prevent="newTask"
    >Add new</button>
    <div
      class="card"
      v-for="(task, index) in sortedItems"
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
            @click="$emit('editTask', task)"
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
</template>

<script>
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
      return this.list.filter(r => r.type === this.taskType)
    },
    sortedItems () {
      const sortFor = this.task
      return sortFor.sort((a, b) => b.time - a.time)
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
      this.$emit('newTaskType', this.taskType)
    }
  }
}
</script>

<style lang="scss">
.card {
  margin-bottom: 5px;
  border: 1px solid #cecece;
}
</style>
