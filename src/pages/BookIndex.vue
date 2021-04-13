<template>
<div>
    <v-row>
        <v-col cols=9>
            <v-text-field label="本のタイトルを検索" v-model="keyword">
            </v-text-field>
        </v-col>

        <v-col style="padding-top:20px" cols=3>
            <v-btn
                color="primary"
                @click="search(keyword)">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12" md="6"
        v-for="(book,index) in searchResults" :key="book.index">
            <v-card class="mx-auto">
                <v-row>
                    <v-col cols="4">
                        <v-img :src="book.image"></v-img>
                    </v-col>
                    <v-col cols="8">
                        <v-card-title>{{ book.title }}</v-card-title>
                        {{ book.description }}
                        <v-spacer></v-spacer>
                        <v-card-actions>
                            <v-btn
                                fab dark color="indigo"
                                @click="addBookList(index)">
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>  
</div>  
</template>

<script>

export default {

    name: 'BookIndex',

            data(){
                return{
                  keyword:'',
                  searchResults:[]  
                }
            },
            methods:{
                addBookList(index){
                    //console.log(this.searchResults[index].bookid)
                    this.$emit('add-book-list',this.searchResults[index])
                },
                async search(keyword){
                    this.searchResults = []
                    //クエリーストリングを作成
                    const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'
                    const params = {
                        q: `intitle:${keyword}`,
                        maxResults:40
                    }
                    const queryParams = new URLSearchParams(params)
                    console.log(baseUrl + queryParams)

                //fetchでJSON取得
                const response = await fetch(baseUrl + queryParams)
                .then(response => response.json())
                //console.log(response.items)
                //必要な情報を配列でpush
                for(let book of response.items ){
                    let bookid = book.id
                    let title = book.volumeInfo.title
                    let img = book.volumeInfo.imageLinks
                    let description = book.volumeInfo.description
                    this.searchResults.push({
                        bookid: bookid ? bookid : '',
                        title: title ? title : '',
                        image: img ? img.thumbnail : '',
                        description: description ? description.slice(0, 40) : ''
                    })
                }
                }

            }
}
</script>

<style>

</style>