<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container>
        <router-view 
          :books="books"
          @add-book-list="addBook"
          @update-book-info="updateBookInfo"
          @delete-local-storage="deleteLocalStorage"
          @delete-book-info="deleteBookInfo"
          />
        </v-container>
    </v-main>
    <div :class="{fadeIn: visible}">
      <button v-show="visible" class="Page-Btn" @click="returnTop">
          <v-icon>mdi-arrow-up</v-icon>
      </button>
    </div>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from './global/Footer.vue';
import Header from './global/Header.vue';
const STORAGE_KEY = 'books'

export default {
  name: 'App',

  components: {
    Header,
    Footer,
  },

  data(){
    return{
      books: [],
      newBook: null,
      visible: false
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY));
      } catch(e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },

  methods: {
    addBook(e) {
      let flag = 0
      //console.log(e.bookid)
      for (let i = 0, n = this.books.length; i < n; ++i){
        if (this.books[i].bookid == e.bookid){
          flag = 1
          break;
        }
      }

      if(flag == 0){
      this.books.push({
        id: this.books.length,
        bookid: e.bookid,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: '',
      });
    //this.newBook = '';
      this.saveBooks();
      //最後に追加したidの取得
      //console.log(this.books.slice(-1)[0].id)
      this.goToEditPage(this.books.slice(-1)[0].id)
      }else{
        flag = 0
        window.alert("すでに登録済みです")
      }
    },
    removeBook(x) {
      this.books.splice(x, 1);
      this.saveBooks();
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
    updateBookInfo(e){
      const updateInfo = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: this.books[e.id].title,
        image: this.books[e.id].image,
        description: this.books[e.id].description
      }
      this.books.splice(e.id, 1, updateInfo)
      this.saveBooks()
      this.$router.push('/view')
    },
    deleteBookInfo(e){
      const j = e.id
      this.books.splice(j, 1)
      this.saveBooks()
      this.$router.push('/view')
    },
    goToEditPage(id){
      this.$router.push(`/edit/${id}`)
    },
    deleteLocalStorage(){
      const isDeleted = 'localStorageのデータを削除してもいいですか？'
      if(window.confirm(isDeleted)){
        localStorage.setItem(STORAGE_KEY, '')
        localStorage.removeItem(STORAGE_KEY)
        this.books = []
        window.location.reload()
      }
    },
    returnTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
      handleScroll() {
        if (window.scrollY > 200) {
          this.visible = true;
        } else {
          this.visible = false;
        }
      },
  }
};

</script>

<style>
  .Page-Btn{
  position: fixed;
  right: 20px;
  bottom: 40px;
  width: 40px;
  height: 40px;
  line-height: 35px;
  text-align: center;
  border-radius: 50%;
  background: #e3e3fc;
}

.fadeIn {
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  75% {
    opacity: 0.75;
  }
  90% {
    opacity: 0.9;
  }
  100% {
    opacity: 1;
  }
}
</style>