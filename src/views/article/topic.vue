<template>
  <div class="list-topic" v-loading="loading">
    <el-button @click="dialogFormVisible = true">添加主题</el-button>
    <el-dialog title="添加主题" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="主题名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTopic">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑主题弹窗 -->
    <el-dialog title="编辑主题" :visible.sync="editdialogFormVisible">
      <el-form :model="editform">
        <el-form-item label="主题名称" :label-width="formLabelWidth">
          <el-input v-model="editform.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTopic">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="name" label="主题"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="editVisibel(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleDelete(scope.row.id)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ListTopic",
  data() {
    return {
      tableData: null,
      loading: true,
      dialogFormVisible: false,
      form: {
        name: ""
      },
      formLabelWidth: "120px",

      editdialogFormVisible: false,
      editform: {
        id: "",
        name: ""
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    fetchTopic() {
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/topics")
        .then(response => {
          if (response.status <= 40000) {
            this.tableData = response.data;
            this.loading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editVisibel(item) {
      this.editdialogFormVisible = true;
      this.editform = item;
    },
    editTopic() {
      this.axios
        .put("/admin/topic/" + this.editform.id, this.editform)
        .then(response => {
          if (response.status <= 40000) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.editdialogFormVisible = false;
            this.fetchTopic();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addTopic() {
      this.axios
        .post("/admin/topic", this.form)
        .then(response => {
          if (response.status <= 40000) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogFormVisible = false;
            this.fetchTopic();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDetail(id) {
      this.$router.push({ path: `/home/view-topic/${id}` });
    },
    handleDelete(topicID) {
      this.$confirm("确认删除此篇文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete("/admin/topic/" + topicID)
            .then(response => {
              if (response.status <= 40000) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.fetchTopic();
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetchTopic();
  }
};
</script>

<style>
.list-topic {
  text-align: left;
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  padding: 1em;
  margin-bottom: 5em;
}
</style>