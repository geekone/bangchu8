# -*- coding:utf-8 -*-

import sqlite3
from BeautifulSoup import BeautifulSoup
import pymongo
import datetime

#解析表Xinshipuall，并插入mongodb
class Parsexinshipuall:

	#通过分类编号取出sqlite表里的 list数据
	def getListFromSqlite(self,catenum):
		conn = sqlite3.connect("cook.db")
		sql = "SELECT id FROM xinshipuall where catenum = '%d'" %(catenum)
		cur = conn.cursor()
		cur.execute(sql)
		list = cur.fetchall()
		cur.close()
		conn.close()
		return list


	#通过ID得取sqlite里面的单个数组，内部方法
	def getDataById(self,id):
		conn = sqlite3.connect("cook.db")
		sql = "SELECT * FROM xinshipuall where id = '%d'" %(id)
		cur = conn.cursor()
		cur.execute(sql)
		data =  cur.fetchone()
		cur.close()
		conn.close()
		return data

	#解析HTML id 代表编号 返回 title,img,summary,cailiao,content
	def parseHtml(self,id):
		data = self.getDataById(id)
		soup = BeautifulSoup(data[2])
		# 取出TITLE IMG SUMMARY 食材 做法
		soup = BeautifulSoup(data[3])

		if soup.find('img'):
			_img = soup.find("img").get("src")
			h1 = soup.find('h1')		#取到TITLE,这里取的是HTML里面，其实数据库里面还有一个字段，放在title1里面
			_title = h1.text
		
		
			# 介绍，材料的不同判断解析
			p_list = soup.findAll("p")
			if len(p_list) < 2:
				_summary = ""
				_cailiao = p_list[0].text
			else:
				if p_list[0].get("class") == "summary":
					_summary = p_list[0].text
					_cailiao = p_list[1].text
				else:
					_summary = ""
					_cailiao = p_list[0].text
		
			# 做法
			content = soup.text
			content = content.split(u"做法")[1]
			_content = content.replace("google_ad_section_end()","")
		
			_tag = data[6]
		

		else:
			_img = ""
			_title = ""
			_summary = ""
			_cailiao = ""
			_content = ""
			_tag = u"视频"
		
		# 上面是html解析的，下面是本来数据库自带的
		_title1 = data[1]
		_url = data[4]
		_category = data[5]		#多了一个大类
		_cateid = data[7]
		_created = datetime.datetime.utcnow()
	
		
		# print "sum="+_summary,"cailiao="+_cailiao,"tag="+_tag,"content="+_content
		# exit(1)
		data =[_title,_img,_summary,_cailiao,_content,_title1,_url,_category,_tag,_cateid,_created]
		self.insertMongo(data)
		



	#把数据插入mongodb 内部函数
	def insertMongo(self,data):
		connection = pymongo.Connection("localhost",27017)
		db = connection.bangchu8
		cooks = db.cooks
		cook = cooks.find_one({"url":data[6],"cateid":data[9]})	#判断之前的数据存在没有
		if cook == None:
			cook = {"title":data[0],"img":data[1],"summary":data[2],"cailiao":data[3],"content":data[4],"title1":data[5],"url":data[6],"category":data[7],"tag":data[8],"cateid":data[9],"created":data[10]}
			print cooks.insert(cook)
		connection.disconnect()


	#综合以上的最后执行函数,catenum 是分类编号
	def do_sqlite_to_mongo(self,catenum):
		list =self.getListFromSqlite(catenum)
		for data in list:
			self.parseHtml(data[0])



	#测试Mongodb数据连接
	def testMongo(self):
		connection = pymongo.Connection('localhost',27017)
		db = connection.bangchu8
		cooks = db.cooks
		cook =  cooks.find_one({"cateid":148})
		print cook.get("title")
		print cook["summary"]


