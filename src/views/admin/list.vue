<template>
  <div class="list-admin" v-loading="loading">
    <el-button @click="dialogFormVisible = true">添加管理员</el-button>

    <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.adminname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password_confirm"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑管理员" :visible.sync="editdialogFormVisible">
      <el-form :model="editform">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="editform.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="editform.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input
            v-model="editform.password_confirm"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdmin">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="adminname" label="账号名"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="created_at" label="时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleedit(scope.row)" type="text" size="small"
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

    <div class="pagination" v-if="nosingle">
      <div class="block">
        <el-pagination
          background
          :hide-on-single-page="nosingle"
          :current-page.sync="currentPage"
          layout="total, prev, pager, next"
          :page-size="pagesize"
          :total="total"
          color="lightblue"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListUser",
  data() {
    return {
      tableData: null,
      post: null,
      error: null,
      pagesize: 10,
      currentPage: 1,
      total: 1,
      loading: true,

      dialogFormVisible: false,
      form: {
        adminname: "",
        password: "",
        password_confirm: ""
      },
      formLabelWidth: "120px",

      editdialogFormVisible: false,
      editform: {
        id: "",
        nickname: "",
        password: "",
        password_confirm: ""
      }
    };
  },
  computed: {
    nosingle() {
      return this.total > this.pagesize;
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    currentPage: function() {
      this.$router.push({ path: `/home/list-admin/${this.currentPage}` });
      this.fetchadmin();
    }
  },
  methods: {
    handleedit(item) {
      this.editdialogFormVisible = true;
      this.editform = item;
    },
    editAdmin() {
      this.axios
        .put("/admin/info/" + this.editform.id, this.editform)
        .then(response => {
          if (response.status <= 40000) {
            this.$message({
              type: "success",
              message: "修改成功!"
            });
            this.editdialogFormVisible = false;
            this.fetchadmin();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addAdmin() {
      this.axios
        .post("/admin/register", this.form)
        .then(response => {
          if (response.status <= 40000) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.dialogFormVisible = false;
            this.fetchadmin();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchadmin() {
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/admin/admins?page_num=" + this.currentPage)
        .then(response => {
          if (response.status <= 40000) {
            this.tableData = response.data.items;
            this.total = response.data.total;
            this.loading = false;
          }
          window.scrollTo(0, 0);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleDetail(id) {
      this.$router.push({ path: `/home/view-admin/${id}` });
    },
    handleDelete(ID) {
      this.$confirm("确认删除此管理员?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete("/admin/admin/" + ID)
            .then(response => {
              if (response.status <= 40000) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.$router.go(0);
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
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    var cu = this.currentPage;
    if (this.$route.params.page_num) {
      this.currentPage = parseInt(this.$route.params.page_num);
    }
    if (this.currentPage == cu) {
      this.fetchadmin();
    }
  }
};
</script>

<style>
.list-admin {
  text-align: left;
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  padding: 1em;
}
.list-admin .pagination {
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  padding: 1em;
  margin-bottom: 5em;
}
</style>