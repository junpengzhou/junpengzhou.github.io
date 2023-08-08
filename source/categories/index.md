---
title: 分类
date: 2021-08-07 16:57:01
aside: false
---

<style>
  #libCategories .card-wrap:hover .card-info:after {
    width: 300%;
  }
</style>
<link rel="stylesheet" type="text/css" href="https://npm.elemecdn.com/js-heo@1.0.11/3dCard/no3d.css">

<div id='libCategories'>
	<div id="lib-cards" class="container">
		<a href='javascript:void(0);' onClick='pjax.loadUrl("/categories/技术分享/")'>
			<card data-image="https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/undraw_cloud_hosting_7xb1.svg">
				<h1 slot="header">技术分享</h1>
				<p slot="content">架构设计、前端技术、后端技术</p>
			</card>
		</a>
    	<a href='javascript:void(0);' onClick='pjax.loadUrl("/categories/学习分享/")'>
    	  <card data-image="https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/undraw_books_re_8gea.svg">
    		<h1 slot="header">学习分享</h1>
    		<p slot="content">读书笔记、英语学习、学习经验</p>
    	  </card>
    	</a>
    	<a href='javascript:void(0);' onClick='pjax.loadUrl("/categories/日常分享/")'>
    	  <card data-image="https://junpengzhou-1305658609.cos.ap-nanjing.myqcloud.com/blog/undraw_traveling_yhxq.svg">
    		<h1 slot="header">日常分享</h1>
    		<p slot="content">生活经验、美食制作、好物推荐</p>
    	  </card>
    	</a>
    </div>
</div>

<script src='https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.min.js' data-pjax></script>

<script type="text/javascript" src="https://npm.elemecdn.com/anzhiyu-theme-static@1.0.7/no3d/no3d.js" data-pjax></script>
