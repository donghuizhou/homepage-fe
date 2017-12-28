<template>
  <div>
    <!-- 表格 -->
    <el-table :data="resData.result" v-loading="tableLoading" border fit highlight-current-row style="width: 100%; color: #333">
      <el-table-column align="center" type="index" label="#"></el-table-column>
      <el-table-column align="center" label="时间" width="180px">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题"></el-table-column>
      <el-table-column align="center" prop="author" label="作者"></el-table-column>
      <el-table-column align="center" prop="category" label="分类">
        <template slot-scope="scope">
          <span style="color: #337ab7">{{scope.row.category === 1 ? '博客' : scope.row.category === 2 ? '随笔' : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="标签">
        <template slot-scope="scope">
          <el-tag v-for="(item, index) in scope.row.tags" 
            :type="['success','info', 'warning', 'danger'][parseInt(Math.random() * 4)]" 
            style="margin: 0 2px 0 0" 
            size="mini" 
            :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="readingAmounts" label="阅读数"></el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status === 0 ? '未发布' : scope.row.status === 1 ? '已发布' : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="390px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">预览</el-button>
          <el-button size="mini" type="primary">查看评论</el-button>
          <el-button size="mini" type="info">编辑</el-button>
          <el-button size="mini" type="warning" v-if="scope.row.status === 1">下线</el-button>
          <el-button size="mini" type="success" v-if="scope.row.status === 0">发布</el-button>
          <el-button size="mini" type="danger">删除</el-button>
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
  </div>
</template>

<script type='text/ecmascript-6'>
  import { getArticles } from '@/api/api'
  import { timeConvert } from '@/utils/utils'

  export default {
    name: '',
    data () {
      return {
        tableLoading: false,
        currentPage: 1,
        pageSize: 10,
        resData: {}
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
        getArticles(data)
          .then(res => {
            this.tableLoading = false
            if (res.data.code === 200) {
              this.resData = res.data
            }
          })
      },
      // 分页
      handleCurrentChange (val) {
        this.getTableData(val)
      }
    },
    mounted () {
      this.getTableData(1)
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
