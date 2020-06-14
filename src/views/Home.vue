<template>
  <!--查看曲目-->
  <div class="main-body">
    <div class="result">
      <p class="result-name" lang="ja">
        <span v-if="!songSelect.name">请选择曲目</span>
        {{songSelect.name}}
      </p>
      <p class="level">
        <span>魔王</span> -
        <span>难度</span>：★x
        <span>{{songSelect.level}}</span>
      </p>
      <p>
        良
        <span v-show="!show">{{songGrade.great}}</span>
        <input v-show="show" v-model="songGrade.great" />
      </p>
      <p>
        可
        <span v-show="!show">{{songGrade.good}}</span>
        <input v-show="show" v-model="songGrade.good" />
      </p>
      <p>
        不可
        <span v-show="!show">{{songGrade.miss}}</span>
        <input v-show="show" v-model="songGrade.miss" />
      </p>
    </div>
    <div class="select-body">
      <div>
        <button class="category-select" @click="selectCategory()">选择曲目</button>
        <button v-show="!show" class="category-select" @click="show=true">修改成绩</button>
        <button v-show="show" class="category-select" @click="gradeSumbit()">确认修改</button>
        <div class="category-list" v-show="categoryShow">
          <p
            v-for="category in categorys"
            :key="category.index"
            @click="getCategorySongs(category)"
          >{{category}}</p>
        </div>
        <ul class="song-list" v-if="songShow">
          <li
            v-for="song in categorySongs"
            :key="song.index"
            @click="selectSong(song)"
          >{{song.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [],
      categorySongs: [],
      songSelect: {},
      categoryShow: false,
      songShow: false,
      categorys: [
        "J-POP",
        "动画歌曲",
        "VOCALOID",
        "综艺曲目",
        "游戏音乐",
        "Namco原创"
      ],
      songGrade: {
        name: "",
        great: 0,
        good: 0,
        miss: 0
      },
      show: false
    };
  },
  mounted() {
    this.getSongs();
  },
  methods: {
    getSongs() {
      this.$axios({
        method: "GET",
        url: "/getSongs"
      })
        .then(res => {
          if (res.data) {
            this.songs = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectCategory() {
      this.categoryShow = true;
      this.songShow = false;
    },
    getCategorySongs(category) {
      this.categoryShow = false;
      this.categorySongs = [];
      for (const song of this.songs) {
        if (song.category === category) {
          this.categorySongs.push(song);
        }
      }
      this.songShow = true;
    },
    selectSong(song) {
      this.songSelect = song;
      this.songGrade.name = song.name;
      this.$axios({
        method: "POST",
        url: "/getGrade",
        data: this.songGrade
      })
        .then(res => {
          if (res.data) {
            this.songGrade.great = res.data.great;
            this.songGrade.good = res.data.good;
            this.songGrade.miss = res.data.miss;
          } else {
            this.songGrade.great = 0;
            this.songGrade.good = 0;
            this.songGrade.miss = 0;
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.songShow = false;
    },
    gradeSumbit() {
      this.show = false;
      this.$axios({
        method: "POST",
        url: "/submitGrade",
        data: this.songGrade
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
input {
  width: 30vw;
  text-align: center;
}

.main-body {
  padding: 30px;
  margin: auto;
  margin-top: 15vh;
  max-width: 600px;
  user-select: none;
}

.main-body .result {
  border: 5px #ffd81e solid;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 0 5px #999;
  text-align: center;
}

.main-body .result p {
  margin: 0;
  padding: 0;
}

.main-body .result-name {
  color: #ec1e06;
  font-size: 32px;
  line-height: 1.2;
}

.main-body .result-name-cn {
  color: #333;
  font-size: 24px;
  line-height: 1.5;
}

.main-body .result-level {
  color: #333;
  font-size: 18px;
  line-height: 1.5;
}

.select-body .category-select {
  width: auto;
  font-size: 18px;
  padding: 5px;
  color: #fff;
  background-color: #ec1e06;
  border: 3px solid #ffa66b;
  border-right-color: #b53000;
  border-bottom-color: #b53000;
  margin-top: 15px;
  margin-right: 7px;
  margin-left: 7px;
  margin-bottom: 10px;
}

.song-select {
  width: auto;
  max-width: 600px;
  font-size: 18px;
  padding: 5px;
  color: #fff;
  background-color: #21a1ba;
  border: 3px solid #7dc5d4;
  border-right-color: #0c6472;
  border-bottom-color: #0c6472;
  margin-right: 7px;
  margin-left: 7px;
  margin-bottom: 10px;
}

.song-list {
  height: 35vh;
  overflow-y: scroll;
  width: 30vw;
  margin: auto;
  padding-left: 2vw;
}

.category-list {
  margin: auto;
  width: 40%;
  position: relative;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.category-list p {
  line-height: 1.5;
  background-color: white;
  margin: 0;
  border: 1px solid black;
}

li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>