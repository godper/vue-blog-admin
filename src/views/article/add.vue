<template>
  <div class="view-article">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="主题">
        <el-select
          v-model="form.topic"
          value-key="id"
          clearable
          placeholder="请选择主题"
        >
          <el-option
            v-for="item in topics"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-select
          v-model="form.tags"
          value-key="id"
          multiple
          filterable
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in tags"
            :key="item.id"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.preview"></el-input>
      </el-form-item>

      <el-form-item label="封面">
        <el-upload
          class="cover-uploader"
          :action="uploadURL"
          :headers="imgheaders"
          accept="image/*"
          name="image"
          :show-file-list="false"
          :on-success="handleCoverrSuccess"
          :before-upload="beforeCoverrUpload"
        >
          <img v-if="form.cover_image_url" :src="form.cover_image_url" class="cover" />
          <i v-else class="el-icon-plus cover-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="内容">
        <mavon-editor
          v-model="form.content"
          ref="md"
          @imgAdd="$imgAdd"
          style="font-size: 18px"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button @click="onback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>




<script>
export default {
  name: "AddArticle",
  data() {
    return {
      tags: [],
      topics: [],
      form: {
        title: "",
        content: "",
        cover_image_url: "",
        preview: "",
        topic: null,
        tags: []
      },
      imageUrl: '',
      imgheaders: {token: this.$store.state.token},
      uploadURL: this.axios.defaults.baseURL + "/admin/upload"
    };
  },
  methods: {
    handleCoverrSuccess(res) {
      if (res.status <40000) {
        this.form.cover_image_url = res.data.image_url;
      } else {
        this.$message.error(res.msg);
      }
    },

    beforeCoverrUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      this.axios({
        url: "/admin/upload",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(response => {
        if (response.status <= 40000) {
          this.$refs.md.$img2Url(pos, response.data.image_url);
        }
      });
    },

    onSubmit() {
      var request = {
        method: "post",
        url: "/admin/article",
        data: this.form
      };
      this.axios(request)
        .then(response => {
          if (response.status <= 40000) {
            this.$message.success(response.msg);
            this.$router.push({ path: `/home/list-article` });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    onback() {
      this.$router.go(-1);
    },

    fetchTags() {
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/tags")
        .then(response => {
          if (response.status <= 40000) {
            this.tags = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    fetchTopics() {
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/topics")
        .then(response => {
          if (response.status <= 40000) {
            this.topics = response.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.fetchTags();
    this.fetchTopics();
  }
};
</script>

<style>
.view-article {
  background-color: white;
  text-align: left;
  padding: 20px;
}

.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409eff;
}
.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.cover {
  height: 178px;
  display: block;
}
</style>