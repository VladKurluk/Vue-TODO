<template>
  <transition name="fade" mode="out-in">
    <div
      class="column is-one-third"
      v-if="value"
      >
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Title"
            required
            v-model="title"
          >
        </div>
      </div>

      <div class="field">
        <label class="label">Task description</label>
        <div class="control">
          <textarea
            class="textarea is-1"
            placeholder="Task description"
            v-model="body"
          ></textarea>
        </div>
      </div>

      <div class="field">
        <label class="label">Task type</label>
        <div class="control">
          <div class="select">
            <select v-model="type">
              <option>todo</option>
              <option>in progress</option>
              <option>done</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button
            v-if="!edited"
            class="button is-info is-outlined"
            @click="createTask"
          >Create</button>
          <button
            v-else
            class="button is-info is-outlined"
            @click="updateTask"
          >Update</button>
        </div>
        <div class="control">
          <button
            class="button is-link is-danger"
            @click="cancel"
          >Cancel</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Editor',
  data: () => ({
    title: '',
    body: '',
    type: null,
    edited: false
  }),
  props: ['value', 'editedObj', 'typeTask'],
  watch: {
    editedObj (val) {
      this.edited = true
      this.title = val.title
      this.body = val.body
      this.type = val.type
      this.time = Date.now()
    },
    typeTask (val) {
      if (val.title === undefined) {
        this.edited = false
      }
      this.type = val.type
      this.title = ''
      this.body = ''
      this.type = val.type
    }
  },
  methods: {
    createTask () {
      // Emited custom event for transfer data in parent component
      this.$emit('createdTask', {
        title: this.title,
        body: this.body,
        type: this.type,
        time: Date.now()
      })
      // Emited custom event for hide Editor component after record been created
      this.$emit('toggleEditor')
      this.clearForm()
    },
    updateTask () {
      const updatedTaskInfo = {
        title: this.title,
        body: this.body,
        type: this.type,
        time: Date.now()
      }
      // this.$emit('toggleEditor')
      this.$emit('update', updatedTaskInfo)
      this.clearForm()
    },
    cancel () {
      this.$emit('toggleEditor')
      this.clearForm()
    },
    clearForm () {
      // Clear form
      this.title = ''
      this.body = ''
      this.type = null
      this.edited = false
    }
  }
}
</script>

<style lang="scss">
@keyframes slidePageIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0%);
  }
}

@keyframes slidePageDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.fade-enter-active {
  animation: slidePageIn .6s forwards;
  animation-timing-function: cubic-bezier(.8, -0.49, .36, 1);
}

.fade-leave-active {
  animation: slidePageDown .6s forwards;
  animation-timing-function: cubic-bezier(.8, -0.49, .36, 1);
}
</style>
