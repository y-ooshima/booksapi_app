<template>
  <div>
      <v-app-bar
        absolute
        color="#6A76AB"
        dark
        shrink-on-scroll
        prominent
        
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
      <!-- src="@/assets/backImg.jpeg" -->
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
  
        <v-app-bar-title>
          <div class="title">
            <h2>Memories Book</h2>
            <p>~読んだ本を思い出に残そう~</p>
          </div>
        </v-app-bar-title>
  
        <template v-slot:extension>
          <v-tabs align-with-title>
            <v-tab color="secondary" to="/">検索</v-tab>
            <v-tab color="secondary" to="/view">表示</v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="300px"
      >
        <v-container style="height: 250px;"></v-container>
      </v-sheet>
  </div>
</template>

<script>
export default {
  name:"Header",
}

</script>

<style>

.title{
  width: 200px;
}

</style>