<template>
  <transition name="fade" mode="out-in">
    <div
      class="column is-one-third"
      v-if="value"
      >
      <form @submit.prevent="createTask">
        <div class="field is-fullwidth">
          <label class="label is-pulled-left">Title</label>
          <div class="control">
            <input
              class="input is-primary"
              :class="{'is-danger': $v.title.$dirty && !$v.title.required}"
              type="text"
              placeholder="Title"
              v-model="title"
            >
            <p
            v-if="$v.title.$dirty && !$v.title.required"
            class="help is-danger"
            >This field is required</p>
          </div>
        </div>

        <div class="field is-fullwidth">
          <label class="label is-pulled-left">Task description</label>
          <div class="control">
            <textarea
              class="textarea"
              :class="{'is-danger': $v.body.$dirty && !$v.body.minLength || $v.body.$dirty && !$v.body.required}"
              placeholder="Task description"
              v-model="body"
            ></textarea>
            <p
              v-if="$v.body.$dirty && !$v.body.minLength"
              class="help is-danger"
            >Minimum number of characters is {{$v.body.$params.minLength.min}}</p>
            <p
              v-if="$v.body.$dirty && !$v.body.required"
              class="help is-danger"
            >This field is required</p>
          </div>
        </div>

        <div v-if="typeTask !== null && edited" class="field is-fullwidth">
          <label class="label is-pulled-left">Task type</label>
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
        <div v-else class="field is-fullwidth">
          <label class="label is-pulled-left">Task type</label>
          <div class="control">
            <div class="select">
              <select v-model="type">
                <option>{{typeTask.type}}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control">
            <button
              v-if="!edited"
              class="button is-info is-outlined"
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
      </form>
    </div>
  </transition>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Editor',
  data: () => ({
    title: '',
    body: '',
    type: null,
    edited: false
  }),
  props: ['value', 'editedObj', 'typeTask'],
  validations: {
    title: { required },
    body: { required, minLength: minLength(10) }
  },
  watch: {
    editedObj (val) {
      this.edited = true
      this.title = val.title
      this.body = val.body
      this.type = val.type
      this.time = Date.now()
    },
    typeTask (val) {
      this.$v.$reset()
      if (val.title === undefined) {
        this.edited = false
        this.type = val.type
      } else {
        this.type = null
      }
      this.title = ''
      this.body = ''
    }
  },
  methods: {
    createTask () {
      // Validation form
      if (this.$v.$invalid) {
        this.$v.$touch()
        return true
      } else {
        // Emited custom event for transfer data in parent component
        this.$emit('createdTask', {
          title: this.title,
          body: this.body,
          type: this.type,
          time: Date.now()
        })
        this.clearForm()
        // Emited custom event for hide Editor component after record been created
        this.$emit('toggleEditor')
      }
    },
    updateTask () {
      // Validation form
      if (this.$v.$invalid) {
        this.$v.$touch()
        return true
      } else {
        const updatedTaskInfo = {
          title: this.title,
          body: this.body,
          type: this.type,
          time: Date.now()
        }
        this.$emit('update', updatedTaskInfo)
        this.clearForm()
      }
    },
    cancel () {
      this.$emit('toggleEditor')
      this.clearForm()
    },
    clearForm () {
      this.$v.$reset()
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
