<template>
    <div class="container" style="min-height: 100%; padding-bottom: 100px">
      <!-- <el-form-item label="upload" prop="delivery">
        <el-button type="primary" size="small">
          upload <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-form-item> -->
      <div style="display: inline-block"></div>
      <div style="display: inline-block"></div>
  
      <el-card class="box-card" v-for="(picture, index) in pictureList" :key="picture.url">
        <div slot="header" class="clearfix">
          <span></span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="deleteImage(index)">
            Delete image
          </el-button>
        </div>
        <div style="display: inline-block">
          <el-image style="width: 200px; height: 200px" :src="picture.url" fit="fill"></el-image>
        </div>
        <el-table :data="picture.tagList" style="width: 100%">
          <el-table-column
            prop="tagName"
            label="tag"
          >
              <!-- <span v-if="!tagItem.component">{{ row[tagItem.tag] }}</span> -->
          </el-table-column>
  
          <el-table-column
            label="DeleteButtun"
          >
            <template slot-scope="scope">
              <el-button type="danger" @click="deleteTag(index, scope.$index)" size="small">Delete tag</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-form :model="picture.tagList">
        <!-- <b>{{ picture.tagList }}</b> -->
          <el-form-item>
            <el-input v-model="addTagList[index]" placeholder="tag" style="width:150px; margin-right:10px;margin-top:20px" clearable></el-input>
            <el-button  type="primary" @click="addTag(index,addTagList[index])">Add tag</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Vue from "vue";
  export default {
    props: [],
    components: {},
    data() {
      return {
        addTagList: [],
        tagItem: "",
        propList: [
          {
            label: "tag",
            prop: "tag",
          },
          {
            label: "delete",
            prop: "lc-component",
            delete: true,
          },
        ],
        row: "",
        pictureList: [
          // {
          //   url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          //   tagList: [
          //     {tagName: "car"},
          //     {tagName: "people"},
          //     {tagName: "bird"},
          //     {tagName: "flower"},
          //   ]
          // },
          // {
          //   url: "https://tse2-mm.cn.bing.net/th/id/OIP-C.kYO3AJReuSwviH4z57e4lgHaEo?w=313&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7",
          //   tagList: [
          //     {tagName: "car"},
          //     {tagName: "people"},
          //     {tagName: "bird"},
          //     {tagName: "flower"},
          //   ]
          // },
        ]
      };
    },
    watch: {},
    computed: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
      axios.get("getAllimages").then((res) => {
        // console.log(res.data);
        this.pictureList = res.data.pictureList;
      });
    },
    beforeUpdate() {},
    updated() {},
    destoryed() {},
    methods: {
      request() {},
      deleteImage(index){
        console.log(this.pictureList[index].url);
        console.log(index);
        axios({
                method: 'post',
                url: 'deleteImage',
                headers:{
                  'Authorization': "Bearer " + Vue.prototype.$jwt
                },
                data: {
                  url: this.pictureList[index].url,
                }
            })
            .then(res => {
                console.log(res.data.message);
            }).catch(err => {
                console.log(err);
            });
        this.$delete(this.pictureList, index);
      },
      deleteTag(picIndex,tagIndex){
        this.$delete(this.pictureList[picIndex].tagList, tagIndex);
      },
      addTag(picIndex,tagName){
        console.log(this.pictureList[picIndex].url);
        console.log(tagName);
        this.pictureList[picIndex].tagList.push({"tagName":tagName});
      },
    },
    fillter: {},
  };
  </script>
  
  <style scoped>
  .box-card {
  }
  .clearfix {
  }
  .container {
  }
  .el-icon--right {
  }
  .el-icon-upload {
  }
  </style>
  