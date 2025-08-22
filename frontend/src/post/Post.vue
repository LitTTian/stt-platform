<template>
  <v-layout class="rounded-md border">

    <!-- 顶部标题 -->
    <v-app-bar color="surface-light" flat>
    <v-container class="d-flex flex-column justify-start align-start">
        <!-- 标题 -->
        <v-toolbar-title class="text-xl font-bold">
        {{ postTitle }}
        </v-toolbar-title>

        <!-- 统计信息 -->
        <div
        class="d-flex align-center text-gray-500 text-sm mt-1"
        style="gap: 32px;"
        >
        <!-- 发布时间 -->
        <div class="d-flex align-center gap-1">
            <v-icon size="16">mdi-calendar</v-icon>
            {{ formatDate(post.created_at) }}
        </div>

        <!-- 阅读量 -->
        <div class="d-flex align-center gap-1">
            <v-icon size="16">mdi-eye</v-icon>
            {{ post.view_count }}
        </div>

        <!-- 点赞 -->
        <div class="d-flex align-center gap-1">
            <v-icon size="16">mdi-thumb-up-outline</v-icon>
            {{ post.like_count }}
        </div>

        <!-- 收藏 -->
        <div class="d-flex align-center gap-1">
            <v-icon size="16">mdi-heart-outline</v-icon>
            {{ post.favorite_count || 0 }}
        </div>
        </div>
    </v-container>
    </v-app-bar>

    <!-- 右侧边栏：作者信息 + 目录 -->
    <v-navigation-drawer
      color="surface-variant"
      location="end"
      name="drawer"
      permanent
      width="280"
    >
      <v-container>
        <!-- 作者信息 -->
         <v-card class="mb-4" outlined rounded="lg">
    <v-card-title class="text-lg font-semibold">作者信息</v-card-title>
    <v-card-text>
        <div class="d-flex align-center gap-4 mb-2" style="gap: 20px;">
        <!-- 头像 -->
        <v-avatar size="64">
            <img :src="author.avatar_url || 'https://i.pravatar.cc/150?img=3'" alt="作者头像" />
        </v-avatar>

        <div>
            <div class="font-medium text-lg">{{ author.name || '匿名用户' }}</div>
            <div class="text-sm text-gray-500">注册 {{ author.registeredYears || 1 }} 天</div>
        </div>
        </div>

        <!-- 用户统计 -->
        <div class="d-flex justify-between mt-4 text-gray-600" style="gap: 32px;">
        <div class="text-center">
            <div class="font-bold">{{ author.post_count || 0 }}</div>
            <div class="text-sm">发帖</div>
        </div>
        <div class="text-center">
            <div class="font-bold">{{ author.follower_count || 0 }}</div>
            <div class="text-sm">粉丝</div>
        </div>
        <div class="text-center">
            <div class="font-bold">{{ author.like_received || 0 }}</div>
            <div class="text-sm">获赞</div>
        </div>
        </div>
    </v-card-text>
    </v-card>

        <!-- 目录（只展示 text/html 的标题类块） -->
        <v-card outlined rounded="lg">
          <v-card-title class="text-lg font-semibold">目录</v-card-title>
          <v-list>
            <v-list-item
              v-for="block in tocBlocks"
              :key="block.id"
              :title="blockTitle(block)"
            />
          </v-list>
        </v-card>
      </v-container>
    </v-navigation-drawer>

    <!-- 主内容区域 -->
    <v-main class="d-flex align-center justify-center">
    <v-container>
        <div class="post-blocks">
        <div
            v-for="block in post.blocks"
            :key="block.id"
            class="timeline-block"
        >
            <!-- 左侧时间节点 -->
            <div class="timeline-left">
            <div
                v-if="blockTimeMap[block.id]"
                :class="['time-label', blockTimeMap[block.id].type]"
            >
                {{ blockTimeMap[block.id].time }}
                <div v-if="nextTimeMap[block.id]" class="time-diff">
                {{ nextTimeMap[block.id] }}
                </div>
            </div>
            </div>

            <!-- 右侧内容 -->
            <div class="timeline-right">
            <BlockCard :block="block" />
            </div>
        </div>
        </div>
    </v-container>
    </v-main>


    <!-- 底部评论区 -->
    <v-footer color="surface-light" app>
      <v-container>
        <v-card class="p-4 w-full">
          <v-card-title class="text-lg font-semibold">评论区</v-card-title>
          <v-card-text>
            <p v-for="(c, i) in comments" :key="i" class="mb-2">
              <strong>{{ c.user }}</strong>: {{ c.text }}
            </p>
          </v-card-text>
        </v-card>
      </v-container>
    </v-footer>
  </v-layout>
</template>

<script setup>
import { computed } from 'vue'
import BlockCard from './blocks/BlockCard.vue'

const postTitle = '示例帖子标题'

const post = {
  id: 1,
  user_id: 101,
  created_at: '2025-08-22T10:00:00Z',
  cover_url: 'https://picsum.photos/800/300',
  like_count: 12,
  comment_count: 5,
  view_count: 134,
  blocks: [
    { id: 1001, content_type: 'text', content: '这是文章的第一段文字。' },
    {
        id: 2001,
        content_type: 'md',
        content: `## 这是公会里的渣男瓜！

他有两个号：一个**高富帅战士**，一个温柔奶妈。  
两个号轮流和妹子聊天，甜言蜜语，从不重样。  
真·网游渣男模板啊！
    `
    },
    {
      id: 1005, content_type: 'link', title:'疯狂星期四，肯德基什么值得吃？', content: 'https://www.bilibili.com/video/BV1NR8rzQEcW/?share_source=copy_web&vd_source=72e75a709a8493d132af1e42fffd4597'
    },
    { id: 1003, content_type: 'html', content: '<h2>小标题</h2><p>这是带有<strong>HTML</strong>标签的内容。</p>' },
    {
        id: 2002,
        content_type: 'md',
        content: `
__副本__ 里他总是拉妹子组队，然后随手送装备，喊“你最棒了”。  
副本结束就消失得无影无踪。  
大家都怀疑：这是游戏里的渣男教科书吗？

- 表格：

| 星期一 | 星期二 | 星期三 | 星期四 | 星期五 | 星期六 | 星期天 |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| 和妹妹玩   | 和妹妹玩       | 和妹妹玩       | 疯狂星期四        | 和妹妹玩        | 和妹妹玩       | 和妹妹玩       |

`
    },
        {
        id: 2005,
        content_type: 'link',
        title: '苦主方提供的聊天记录',
        content: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
        id: 2003,
        content_type: 'md',
        content: `
线下聚会也不放过，他大方送礼物，表面暖男，背地里把妹子加到自己的小号私聊群里。  
玩得风生水起，还让人误以为是真暖男。
`
    },
    // { id: 1002, content_type: 'img', content: 'https://picsum.photos/600/400' },


        // 示例 PDF 链接
    {
        id: 2005,
        content_type: 'link',
        title: '瓜主方提供的聊天记录',
        content: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
        id: 2004,
        content_type: 'md',
        content: `
最后一天，他的两个号被同一个妹子抓包，聊天记录全曝光。  
公会炸锅，他还试图开脱：“游戏而已，别当真”。  
从此他的外号是——史上最会游戏渣男。
`
    },
    // 示例 PDF 链接
    
    {
        id: 2004,
        content_type: 'md',
        content: `
最后一天，他的两个号被同一个妹子抓包，聊天记录全曝光。  
公会炸锅，他还试图开脱：“游戏而已，别当真”。  
从此他的外号是——史上最会游戏渣男。
`
    },
        {
        id: 2004,
        content_type: 'md',
        content: `
最后一天，他的两个号被同一个妹子抓包，聊天记录全曝光。  
公会炸锅，他还试图开脱：“游戏而已，别当真”。  
从此他的外号是——史上最会游戏渣男。
`
    },
        {
        id: 2004,
        content_type: 'md',
        content: `
最后一天，他的两个号被同一个妹子抓包，聊天记录全曝光。  
公会炸锅，他还试图开脱：“游戏而已，别当真”。  
从此他的外号是——史上最会游戏渣男。
`
    },

    ],
    block_times: [
        { id: 2001, time: '2025-08-22 10:00', type: 'start' },
        { id: 2003, time: '2025-08-22 12:00', type: 'event' }
    ]
}

const author = {
    id: 1,
    name: 'xxxxxx',
    avatar: 'https://picsum.photos/100/100',
    post_count: 1000,
    follower_count: 500,
    like_received: 2000
}

const comments = [
  // { user: 'Alice', text: '写得不错 👍' },
  // { user: 'Bob', text: '图片很好看' }
]


// 格式化日期，只显示年月日
const formatDate = (datetime) => {
  const d = new Date(datetime)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`
}

// 提取目录的 block（比如 HTML 里的标题）
// const tocBlocks = post.blocks.filter(b => b.content_type === 'md' || b.content_type === 'text')
const tocBlocks = post.blocks.filter(b => b.content_type != 'img' && b.content_type != 'link')
const blockTitle = (block) => {
  if (block.content_type === 'md') {
    // 简单取前几个字符
    return block.content.replace(/<[^>]*>/g, '').slice(0, 20) + '...'
  }
  return block.content.slice(0, 20) + '...'
}

// HL: 时间节点
import dayjs from 'dayjs'
// Map 方便快速查找 block 对应时间
const blockTimeMap = computed(() => {
  const map = {}
  post.block_times.forEach(bt => map[bt.id] = bt)
  return map
})

// 计算到下一个时间节点的间隔
const nextTimeMap = computed(() => {
  const result = {}
  // 按时间顺序排序
  const timeBlocks = post.block_times
    .map(bt => ({ ...bt, date: dayjs(bt.time) }))
    .sort((a, b) => a.date - b.date)

  for (let i = 0; i < timeBlocks.length - 1; i++) {
    const cur = timeBlocks[i]
    const next = timeBlocks[i + 1]
    const diffHours = next.date.diff(cur.date, 'hour')
    result[cur.id] = `+${diffHours}h`
  }

  return result
})
</script>
<style>
.timeline-block {
  display: flex;
  gap: 16px;
}

.timeline-left {
  width: 140px;
  text-align: right;
  padding-right: 16px;
  font-size: 12px;
}

.time-label.start {
  color: green;
  font-weight: bold;
}

.time-label.event {
  color: orange;
  font-weight: bold;
}

.time-diff {
  font-size: 10px;
  color: gray;
}

.timeline-right {
  flex: 1;
}
</style>