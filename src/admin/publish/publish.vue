<template>
  <div>
    <!-- form -->
    <el-form :model="articleForm" :rules="rules" ref="articleref" @submit.native.prevent label-width="80px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="articleForm.title" size="medium" style="width: 500px" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="articleForm.author" size="medium" style="width: 130px" placeholder="作者"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-input @keyup.enter.native="createTag" size="medium" v-model="articleForm.createTag" style="width: 130px" placeholder="输入标签并回车"></el-input><br>
        <el-tag v-for="(item, index) in articleForm.tags" 
          :key="index"
          :type="item.type"
          size="small"
          style="margin: 0 10px 0 0"
          closable
          @close="delTag(item)">{{item.name}}</el-tag>
      </el-form-item>
      <el-form-item label="分类" prop="cate">
        <el-radio-group v-model="articleForm.cate">
          <el-radio v-for="item in categories" :key="item.cateId" :label="item.cateId">{{item.cateName}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- markdown -->
    <mavon-editor ref="mdRef" v-model="mdContent"
      @imgAdd="imgAdd" 
      :toolbars="toolbars"
      style="box-shadow: 0 0px 3px rgba(0,0,0,0.157), 0 0px 3px rgba(0,0,0,0.227)"></mavon-editor>
    <!-- save btns -->
    <section style="margin-top: 20px">
      <el-button @click="handleSave('articleref', 0)" size="small">保存</el-button>
      <el-button @click="handleSave('articleref', 1)" type="primary" size="small">保存并发布</el-button>
    </section>
    <!-- 确认提交dialog -->
    <el-dialog :title="submitTitle" :visible.sync="submitVisible" width="30%">
      <span>{{submitTxt}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="submitVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
import { getCategories, createArticle, uploadImg, baseUrl, previewArticle } from '../../api/api'

export default {
  name: '',
  data () {
    return {
      mdContent: '',           // mavon-editor值
      categories: [],          // 分类
      articleForm: {
        title: '',
        author: '',
        createTag: '',
        tags: [],
        cate: ''
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        tags: [
          { type: 'array', required: true, message: '请输入标签', trigger: 'blur' }
        ],
        cate: [
          { type: 'number', required: true, message: '请选择分类', trigger: 'blur' }
        ]
      },
      toolbars: {               // mavon-editor 工具栏
        bold: true,             // 粗体
        italic: true,           // 斜体
        header: true,           // 标题
        underline: true,        // 下划线
        strikethrough: true,    // 中划线
        mark: true,             // 标记
        superscript: false,     // 上角标
        subscript: false,       // 下角标
        quote: true,            // 引用
        ol: true,               // 有序列表
        ul: true,               // 无序列表
        link: true,             // 链接
        imagelink: true,        // 图片链接
        code: true,             // code
        table: true,            // 表格
        fullscreen: true,       // 全屏编辑
        readmodel: true,        // 沉浸式阅读
        htmlcode: true,         // 展示html源码
        help: true,             // 帮助
        undo: true,             // 上一步
        redo: true,             // 下一步
        trash: true,            // 清空
        save: false,            // 保存（触发events中的save事件）
        navigation: false,      // 导航目录
        alignleft: true,        // 左对齐
        aligncenter: true,      // 居中
        alignright: true,       // 右对齐
        subfield: true,         // 单双栏模式
        preview: true           // 预览
      },
      submitTitle: '',
      submitVisible: false,
      submitTxt: '',
      saveType: '',
      editId: ''                // 编辑
    }
  },
  methods: {
    // 获取分类
    getCategories () {
      getCategories().then(res => {
        res = res.data
        if (res.code === 200) {
          this.categories = res.result
        }
      })
    },
    // 图片上传
    imgAdd (pos, $file) {
      // 将图片上传到服务器
      let formdata = new FormData()
      formdata.append('image', $file)
      let options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      uploadImg(formdata, options).then(res => {
        res = res.data
        // 将返回的url替换文本中的图片url
        this.$refs.mdRef.$img2Url(pos, baseUrl + res.result.imgUrl)
      })
    },
    // 创建tag
    createTag () {
      let repeat = this.articleForm.tags.find(val => {
        if (val.name === this.articleForm.createTag) {
          return true
        } else {
          return false
        }
      })
      if (repeat) {
        this.$message.error('重复的标签')
      } else {
        let tagObj = {
          name: this.articleForm.createTag,
          type: [null, 'success', 'info', 'warning', 'danger'][parseInt(Math.random() * 5)]
        }
        this.articleForm.tags.push(tagObj)
        this.articleForm.createTag = ''
      }
    },
    // 删除tag
    delTag (tag) {
      let index = this.articleForm.tags.findIndex(val => val.name === tag.name)
      this.articleForm.tags.splice(index, 1)
    },
    // 保存/保存并发布
    handleSave (ref, type) {
      this.$refs[ref].validate(valid => {
        if (valid) {
          this.saveType = type
          this.submitTitle = '提示'
          this.submitTxt = type === 0 ? '确定保存吗?' : type === 1 ? '确定保存并发布吗?' : ''
          this.submitVisible = true
        } else {
          return false
        }
      })
    },
    // 文章提交
    submitConfirm () {
      let data = {
        title: this.articleForm.title,
        author: this.articleForm.author,
        tags: this.articleForm.tags.map(item => item.name),
        cate: this.articleForm.cate,
        mdContent: this.mdContent,
        status: this.saveType
      }
      // console.log(data)
      // return
      createArticle(data).then(res => {
        res = res.data
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: 'success',
            duration: 1500
          })
          this.articleForm.title = ''
          this.articleForm.author = ''
          this.articleForm.createTag = ''
          this.articleForm.tags = []
          this.articleForm.cate = ''
          this.mdContent = ''
          this.submitVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 编辑 获取文章数据
    getArticle (id) {
      let data = {
        id
      }
      previewArticle(data).then(res => {
        res = res.data
        if (res.code === 200) {
        }
      })
    }
  },
  mounted () {
    this.getCategories()
    this.editId = this.$route.query.id
    if (this.editId) {
      this.getArticle(this.editId)
    }
  }
}
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>
