<template>
  <div class="list-article" v-loading="loading">
    <el-table :data="tableData">
      <el-table-column prop="id" label="ID" width="50"> </el-table-column>
      <el-table-column prop="title" label="标题" > </el-table-column>
      <el-table-column prop="desc" label="描述" > </el-table-column>
      <el-table-column  label="时间"> 
        <template slot-scope="scope">{{ scope.row.created_at}}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleDetail(scope.row.id)"
            type="text"
            size="small"
            >查看</el-button
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
// import { toDate } from "../../base.js";
export default {
  name: "ListArticle",
  data() {
    return {
      tableData: null,
      post: null,
      error: null,
      pagesize: 10,
      currentPage: 1,
      total: 1,
      loading: true
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
      this.$router.push({ path: `/home/list-article/${this.currentPage}` });
      this.fetchArticle();
    }
  },
  methods: {
    fetchArticle() {
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
      this.axios
        .get("/articles?page_num=" + this.currentPage)
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
      this.$router.push({ path: `/home/view-article/${id}` });
    },
    handleDelete(articleID) {
      this.$confirm("确认删除此篇文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .delete("/admin/article/" + articleID)
            .then(response => {
              if (response.status <= 40000) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.fetchArticle();
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
      this.fetchArticle();
    }
  }
};
</script>

<style>
.list-article {
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
}
.list-article .pagination {
  background-color: white;
  position: relative;
  box-shadow: 0 0 2px 0 rgba(58, 58, 58, 0.2);
  padding: 1em;
  margin-bottom: 5em;
}
</style>

