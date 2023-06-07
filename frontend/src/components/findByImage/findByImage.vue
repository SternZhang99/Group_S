<template>
  <div>
    <div style="margin-bottom: 50px">
      <el-upload class="upload-demo" action="uploadImage" :show-file-list="false" :before-upload="beforeUpload"
        >
        <el-button size="small" type="primary">Click to upload</el-button>
        <div slot="tip" class="el-upload__tip">
          ensure image size less than 1MB
        </div>
      </el-upload>
    </div>

    <div>
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Results</span>
      </div>
      <div v-if="pictureList">{{ this.text }}</div>
      <el-image v-for="(picture) in pictureList" :key="picture.url" style="width: 200px; height: 200px" :src="picture.url"
        fit="fill"></el-image>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue"
export default {
  data() {
    return {
      fileList: [
      ],
      imageurl: "",
      tagForm: {
        tags: [""],
      },
      respData: {
        links: ["test"
        ],
      },
      text:"Submit image to see the result.",
      pictureList:[
      ]
    };
  },
  computed: {
    headers() {
      return {
        "Content-Type": "application/json",
      };
    },
  },
  methods: {
    uploadImage(){
        console.log("uploaded");
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // 将文件转化为 base64 编码格式
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imgBase64 = reader.result.split(',')[1]
          //   console.log(imgBase64)
          // 将处理后的文件通过 ajax 的方式上传到服务器
          axios({
            method: 'post',
            url: 'findByImage',
            headers:{
                'Authorization': "Bearer " + Vue.prototype.$jwt
            },
            data: {
              image: imgBase64,
            }
          })
            .then(res => {
              this.imageurl = res.data.url;
              console.log(res.data);
              this.pictureList = res.data.pictureList
              resolve(false);
            }).catch(err => {
              reject(err);
            });
        };
      });
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //     //   alert("submit!");
    //       console.log(JSON.stringify(this.tagForm));
    //       axios({
    //           method: 'post',
    //           url: 'query',
    //           data: {
    //           tags: this.tagForm,
    //           }
    //       })
    //       .then(res => {
    //           console.log(res.data.pictureList);
    //           this.pictureList = res.data.pictureList
    //       }).catch(err => {
    //           console.log(err);
    //       });
    //     } else {
    //       return false;
    //     }
    //   });
    // },

  },

};
</script>
<style>
.main {
  display: flex;
  justify-content: center;
  /* flex-direction: column; */
}


.table {
  margin-left: 10px;
}

.box-card {

}
</style>