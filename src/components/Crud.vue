<template>
  <div class="center">
    <table class="center" border="1">
      <tr>
        <th>id</th>
        <th>password</th>
        <th>author</th>
        <th colspan="2">operation</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>
          <span>{{user.id}}</span>
        </td>
        <td>
          <span v-show="!isEditable(user.id)">{{user.password}}</span>
          <input type="text" v-show="isEditable(user.id)" v-model="user.password" />
        </td>
        <td>
          <span v-show="!isEditable(user.id)">{{user.author}}</span>
          <input type="text" v-show="isEditable(user.id)" v-model="user.author" />
        </td>
        <td>
          <button v-show="!isEditable(user.id)" @click="write(user.id)">修改</button>
          <button v-show="isEditable(user.id)" @click="update(user.id)">确认</button>
        </td>
        <td>
          <button @click="del(user.id)">删除</button>
        </td>
      </tr>
    </table>
    <input type="text" v-model="userName" placeholder="用户名" />
    <button @click="add()">增加新用户</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      editRow: [],
      userName: ""
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios({
        method: "GET",
        url: "/get"
      })
        .then(res => {
          console.log(res);
          this.users = res.data;
          this.calRow();
        })
        .catch(err => {
          this.add();
          console.log(err);
        });
    },
    add() {
      this.$axios({
        method: "POST",
        url: "/add",
        data:{id:this.userName}
      })
        .then(res => {
          console.log(res);
          this.getUser();
        })
        .catch(err => {
          console.log(err);
        });
    },
    write(id) {
      let i = this.checkIndex(id);
      this.editRow[i].value = true;
    },
    update(id) {
      let i = this.checkIndex(id);
      this.editRow[i].value = false;
      this.$axios({
        method: "POST",
        url: "/update",
        data: this.users[i]
      })
        .then(res => {
          console.log(res);
          this.getUser();
        })
        .catch(err => {
          console.log(err);
        });
    },
    del(id) {
      this.$axios({
        method: "POST",
        url: "/del",
        data: { id: id }
      })
        .then(res => {
          console.log(res);
          this.getUser();
        })
        .catch(err => {
          console.log(err);
        });
    },
    calRow() {
      this.editRow = [];
      for (let user of this.users) {
        this.editRow.push({ id: user.id, value: false });
      }
    },
    isEditable(id) {
      let value;
      for (let row of this.editRow) {
        if (row.id === id) {
          value = row.value;
        }
      }
      return value;
    },
    checkIndex(id) {
      let ret;
      for (let i = 0; i < this.users.length; i++) {
        if (id === this.users[i].id) {
          ret = i;
          break;
        }
      }
      console.log(ret);
      return ret;
    }
  }
};
</script>

<style scoped>
.center {
  text-align: center;
  margin: auto;
}
</style>