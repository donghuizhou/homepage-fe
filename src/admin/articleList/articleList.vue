<template>
  <div>
    <!-- 表格 -->
    <el-table :data="resData.result" v-loading="tableLoading" stripe fit style="width: 100%; color: #333">
      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" label="创建时间" width="180px">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题"></el-table-column>
      <el-table-column align="center" prop="author" label="作者"></el-table-column>
      <el-table-column align="center" prop="category" label="分类">
        <template slot-scope="scope">
          <span style="color:	#1E90FF" v-if="scope.row.category === 1">博客</span>
          <span style="color: #FF4500" v-if="scope.row.category === 2">随笔</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标签">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.tags" 
            :type="[null, 'success', 'info', 'warning', 'danger'][parseInt(Math.random() * 5)]" 
            style="margin: 0 2px 0 0" 
            size="mini" 
            :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="readingAmounts" label="阅读数"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span style="color: #66CD00" v-if="scope.row.status === 1">已发布</span>
          <span style="color: #F04E6E" v-if="scope.row.status === 0">未发布</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" width="180px">
        <template slot-scope="scope">
          <span>{{scope.row.updateTime | formatTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="390px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="previewArticle(scope.row)">预览</el-button>
          <el-button size="mini" @click="showComments(scope.row, 1)">查看评论</el-button>
          <el-button size="mini" type="info" @click="editArticle(scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click="changeStatus(scope.row)" v-if="scope.row.status === 1">下线</el-button>
          <el-button size="mini" type="success" @click="changeStatus(scope.row)" v-if="scope.row.status === 0">发布</el-button>
          <el-button size="mini" type="danger" @click="delArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination background style="text-align: right"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="resData.count">
    </el-pagination>
    <!-- 查看评论 -->
    <el-dialog :title="commentTitle" :visible.sync="commentVisible" width="50%">
      <el-table :data="commentData.result" v-loading="commentLoading" fit highlight-current-row style="width: 100%; color: #333">
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.time | formatTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="critics" label="评论人" align="center"></el-table-column>
        <el-table-column prop="message" label="内容" align="center"></el-table-column>
      </el-table>
      <!-- 评论的分页 -->
      <el-pagination background style="text-align: right"
        @current-change="commentsCurrentChange"
        :current-page.sync="commentCurrentPage"
        :page-size="commentPageSize"
        layout="total, prev, pager, next"
        :total="commentData.count">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentVisible = false" type="primary" size="small">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 通用dialog -->
    <el-dialog :title="commonTitle" :visible.sync="commonVisible" width="360px">
      <span>{{commonTxt}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="commonVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="commonSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 预览 -->
    <el-dialog :title="previewTitle" :visible.sync="previewVisible" width="70%">
      <mavon-editor ref="previewRef" v-model="previewCont"
        :toolbarsFlag="toolbarsFlag"
        :subfield="subfield"
        :default_open="defaultOpen"
        class="mavonEditor"></mavon-editor>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="previewVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
  import { getArticles, getComments, changeStatus, delArticle, previewArticle } from '@/api/api'
  import { timeConvert } from '@/utils/utils'

  export default {
    name: '',
    data () {
      return {
        tableLoading: false,
        currentPage: 1,
        pageSize: 10,
        resData: {},
        commentTitle: '',                 // 评论
        commentVisible: false,
        commentData: {},
        commentLoading: false,
        commentCurrentPage: 1,
        commentPageSize: 10,
        rowTmp: {},                       // 暂存row数据
        commonTitle: '',                  // 通用dialog
        commonVisible: false,
        commonTxt: '',
        previewTitle: '',                 // 预览
        previewVisible: false,
        previewCont: '',
        toolbarsFlag: false,              // mavon-editor配置
        subfield: false,
        defaultOpen: 'preview'
      }
    },
    filters: {
      formatTime (val) {
        return timeConvert(val)
      }
    },
    methods: {
      // 请求表格数据
      getTableData (val) {
        this.tableLoading = true
        let data = {
          offset: val,
          page_size: this.pageSize
        }
        getArticles(data).then(res => {
          this.tableLoading = false
          if (res.data.code === 200) {
            this.resData = res.data
          }
        })
      },
      // 分页
      handleCurrentChange (val) {
        this.getTableData(val)
      },
      // 查看评论
      showComments (row, val) {
        this.rowTmp = row
        this.commentTitle = '评论'
        this.commentLoading = true
        let data = {
          id: this.rowTmp._id,
          offset: val,
          page_size: this.commentPageSize
        }
        getComments(data).then(res => {
          this.commentLoading = false
          if (res.data.code === 200) {
            this.commentData = res.data
          }
        })
        this.commentVisible = true
      },
      // 评论 分页
      commentsCurrentChange (val) {
        this.showComments(this.rowTmp._id, val)
      },
      // 发布 下线
      changeStatus (row) {
        this.rowTmp = row
        this.commonTitle = row.status === 0 ? '发布' : row.status === 1 ? '下线' : ''
        this.commonTxt = row.status === 0 ? '是否发布该文章？' : row.status === 1 ? '是否下线该文章？' : ''
        this.commonVisible = true
      },
      // 删除
      delArticle (row) {
        this.rowTmp = row
        this.commonTitle = '删除'
        this.commonTxt = '是否删除该篇文章？'
        this.commonVisible = true
      },
      // 通用 dialog 提交
      commonSubmit () {
        if (this.commonTitle === '发布' || this.commonTitle === '下线') {
          let data = {
            id: this.rowTmp._id,
            status: this.rowTmp.status === 0 ? 1 : this.rowTmp.status === 1 ? 0 : ''
          }
          changeStatus(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.getTableData(this.currentPage)
              this.commonVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
        if (this.commonTitle === '删除') {
          let data = {
            id: this.rowTmp._id
          }
          delArticle(data).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
              this.getTableData(this.currentPage)
              this.commonVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
        }
      },
      // 预览
      previewArticle (row) {
        this.previewTitle = '预览'
        this.previewCont = ''
        this.previewVisible = true
        let data = {
          id: row._id
        }
        previewArticle(data).then(res => {
          res = res.data
          if (res.code === 200) {
            this.previewCont = res.result.content
          }
        })
      },
      // 编辑
      editArticle (row) {
        this.$router.push({
          name: 'adminPublish',
          query: {
            id: row._id
          }
        })
      }
    },
    mounted () {
      this.getTableData(1)
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
