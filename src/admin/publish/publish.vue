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
    <mavon-editor ref="mdRef" v-model="value" @imgAdd="imgAdd"></mavon-editor>
    <el-button @click="handleSave('articleref')" type="primary" size="small">保存</el-button>
  </div>
</template>

<script type='text/ecmascript-6'>
  import axios from 'axios'
  import { getCategories } from '../../api/api'

  export default {
    name: '',
    data () {
      return {
        value: '',
        categories: [],
        articleForm: {
          title: '',
          author: '',
          createTag: '',
          tags: [],
          cate: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入作者', trigger: 'blur' }
          ],
          tags: [
            { type: 'array', required: true, message: '请输入标签', trigger: 'blur' }
          ],
          cate: [
            { type: 'number', required: true, message: '请选择分类', trigger: 'blur' }
          ]
        }
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
        axios.post('/articles/uploadImg', formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          res = res.data
          // 将返回的url替换文本中的图片url
          this.$refs.mdRef.$img2Url(pos, res.result.imgUrl)
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
      // 保存
      handleSave (ref) {
        this.$refs[ref].validate((valid) => {
          if (valid) {
            console.log('ok')
          } else {
            return false
          }
        })
      }
    },
    mounted () {
      this.getCategories()
    }
  }
</script>

<style lang='stylus' scoped rel='stylesheet/stylus'>
</style>