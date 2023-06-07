<template>
    <div class="main">
      <el-form :model="tagForm" ref="tagForm" label-width="100px" class="form">
        <div class="inline-items">
          <el-form-item
            v-for="(tag, index) in tagForm.tags"
            :label="'Tag' + (index + 1)"
            :key="index"
            :inline="true"
            :rules="{
              required: true,
              message: 'Tag cannot be null',
              trigger: 'blur',
            }"
          >
            <el-input
              v-model="tagForm.tags[index]"
              placeholder="tags"
              style="width:150px; margin-right:5px"
              clearable
            ></el-input>
            <el-button
              @click.prevent="removeTag(index)"
              type="danger"
              size="medium"
              >Delete</el-button
            >
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('tagForm')"
            >Submit</el-button
          >
          <el-button @click="addTag()">Add tag</el-button>
        </el-form-item>
      </el-form>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Results</span>
        </div>
        <div v-if="pictureList">{{ this.text }}</div>
        <el-card v-for="(picture) in pictureList" :key="picture">
          <el-image :key="picture" style="width: 200px; height: 200px" :src="picture" fit="fill"></el-image>
          <br>
          {{ picture }}
        </el-card>
      </el-card>
    </div>
  </template>
  <script>
  import axios from 'axios';
  import Vue from "vue"
  export default {
    data() {
      return {
        tagForm: {
          tags: [""],
        },
        respData: {
          links: [
            "test",
          ],
        },
        text:"Submit tags to see the result. If you wanna send multiple tags, use Add Tag.",
        pictureList:[
        ]
      };
    },
    methods: {
      addTag() {
        this.tagForm.tags.push("");
        console.log("push,", JSON.stringify(this.tagForm));
      },
      removeTag(index) {
        this.$delete(this.tagForm.tags, index);
        console.log("delete,", JSON.stringify(this.tagForm));
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          //   alert("submit!");
            console.log(JSON.stringify(this.tagForm));
            axios({
                method: 'post',
                url: 'query',
                headers:{
                  'Authorization': "Bearer " + Vue.prototype.$jwt
                },
                data: {
                  tags: this.tagForm,
                }
            })
            .then(res => {
                console.log(res.data.pictureList);
                this.pictureList = res.data.pictureList
            }).catch(err => {
                console.log(err);
            });
          } else {
            return false;
          }
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .main {
    display: flex;
    justify-content: center;
    /* flex-direction: column; */
  }
  .form {
  }
  
  .table {
    margin-left: 10px;
  }
  
  .box-card {
    width: 800px;
    margin-left: 100px;
  }
  </style>
  