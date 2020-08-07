<template>
  <v-app>
    <v-main>
      <v-app-bar color="success" class="app-bar" dark>
        <v-app-bar-nav-icon class=""></v-app-bar-nav-icon>
        <v-toolbar-title class="appbar-title">
          <v-icon class="ma-2" color="white">far fa-sticky-note</v-icon>
          M.E.V.N TODO APP
        </v-toolbar-title>
      </v-app-bar>
      <v-card class="mt-10">
        <v-tabs v-model="tabType" color="success" grow>
          <v-tab v-for="tab in tabsTitles" :key="tab.id"
            >{{ tab.text }}
            <v-icon class="ml-5">{{ tab.icon }}</v-icon>
          </v-tab>
          <v-tabs-items v-model="tabType">
            <v-tab-item>
              <v-card color="success">
                <v-list two-line subheader>
                  <v-list-item v-for="todo in todos" :key="todo.id">
                    <v-list-item-content>
                      <div class="d-flex flex-row align-center">
                        <v-checkbox
                          :input-value="todo.completed"
                          v-on:click="updateCompleted(todo)"
                          class="ml-5 mr-5"
                          color="success"
                        ></v-checkbox>

                        <p class="ma-0" :class="{ completed: todo.completed }">
                          {{ todo.todo }}
                        </p>
                      </div>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon>fa-info-circle</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-text-field
                class="pa-5"
                v-model="input"
                placeholder="Please Enter your Todo"
                color="success"
              ></v-text-field>
              <v-btn
                style="width: 80%;margin-left: 10%"
                class="align-center"
                v-on:click="addTodo"
                >Add</v-btn
              >
            </v-tab-item>
            <v-tab-item>
              <v-card color="success">
                <v-list>
                  <v-list-item v-for="todo in todos" :key="todo._id">
                    <v-list-item-content>
                      <v-text-field
                        color="success"
                        v-model="index[todo._id]"
                        :placeholder="todo.todo"
                      ></v-text-field>
                    </v-list-item-content>
                    <v-list-item-action class="d-flex flex-row align-center">
                      <v-btn
                        v-on:click="updateTodo(todo)"
                        class="ml-3 mr-3"
                        icon
                      >
                        <v-icon>fa-check-circle</v-icon>
                      </v-btn>
                      <v-btn v-on:click="deleteTodo(todo)" icon>
                        <v-icon>far fa-trash-alt</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Todos from "./components/todos.vue";
import todos from "@/components/todos.vue";
import Axios from "axios";


export default Vue.extend({
  name: "App",

  data: () => ({
    input: "",
    index: [],
    editedInput: {},
    tabType: "tab",
    todos: [],
    tabsTitles: [
      {
        text: "Todos",
        icon: "far fa-clipboard",
        id: 1
      },
      {
        text: "Add",
        icon: "far fa-plus-square",
        id: 2
      },
      {
        text: "Edit",
        icon: "far fa-edit",
        id: 3
      }
    ]
    //
  }),
  mounted() {
    Axios.get("/todos").then(res => (this.todos = [...res.data]));
  },
  updated() {
    Axios.get("/todos").then(res => (this.todos = [...res.data]));
  },

  methods: {
    addTodo: function() {
      Axios.post("/todos/add", {
        todo: this.input,
        completed: false
      });
      this.todos = [...this.todos];
      this.input = "";
    },
    deleteTodo: function(param: object | any) {
      Axios.delete(`/todos/delete/${param._id}`, {
        todo: param.todo,
        completed: param.completed
      });
    },
    updateCompleted: function(param: any) {
      Axios.put(`/todos/update/${param._id}`, {
        todo: param.todo,
        completed: !param.completed
      });
    },
    updateTodo: function(param: any) {
      Axios.put("/todos/update/" + param._id, {
        todo: this.index[param._id],
        completed: false
      });
    },
    log: function(param: any) {
      console.log(param);
    }
  }
});
</script>

<style scoped lang="sass">
.app-bar
  color: white !important
  text-align: center !important

.appbar-title
  width: 100%
  font-family: Roboto
  text-align: center !important

.completed
  text-decoration: line-through
</style>
