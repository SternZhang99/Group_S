<template>
  <div>
    <el-upload
      class="upload-demo"
      action="uploadImage"
      :show-file-list="false"
      :before-upload="beforeUpload"
      style="width=50%"
    >
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">
        ensure image size less than 1MB
      </div>
    </el-upload>
    <el-card v-if="imageurl" class="box-card" style="position=center">
      <div slot="header" class="clearfix">
        <span>Uploaded image url</span>
      </div>
      <el-image style="width: 200px; height: 200px" :src="this.imageurl" fit="fill"></el-image>
      {{ this.imageurl }}
    </el-card>
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
      imageurl: ""
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
    async uploadImage(imageData) {
    let formData = new FormData();
    formData.append('file', imageData);
    
    try {
      let response = await axios.post('upload', formData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
    //   let response = await axios.post('upload', formData);
      this.imageurl = response.data.url;
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },
    beforeUpload(file){
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
            url: 'upload',
            headers:{
                'Authorization': "Bearer " + Vue.prototype.$jwt
            },
            data: {
              image: imgBase64,
            }
          })
          .then(res => {
            this.imageurl = res.data.url;
            console.log(res);
            resolve(false);
          }).catch(err => {
            reject(err);
          });
        };
      });
    }

  },

};
</script>