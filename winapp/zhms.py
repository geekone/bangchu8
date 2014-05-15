# -*- coding:utf-8 -*-

import sqlite3
from BeautifulSoup import BeautifulSoup
import pymongo
import time
import win32com.client

class Zhmsnews:

	#读取Access数据
	#accessdb 火车头数据源 catename 新闻分类名称
	def getAccessToSqlite(self,accessdb= None,catename="",catenum=0):
		data_list = []
		conn = win32com.client.Dispatch(r'ADODB.Connection')
		DSN = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="+ accessdb +";"
		conn.Open(DSN)
		rs = win32com.client.Dispatch(r'ADODB.Recordset')
		rs.Cursorlocation = 3
		rs_name = "SELECT * FROM Content"
		rs.Open('[' + rs_name + ']',conn,1,3)
		rs.MoveFirst()
		for x in range(rs.RecordCount):
			if rs.EOF:
				print "End of records"
				break
			else:
				data_list.append([rs.Fields.Item(3).Value,rs.Fields.Item(4).Value,rs.Fields.Item(5).Value,rs.Fields.Item(6).Value,rs.Fields.Item(8).Value,catename,catenum])
				rs.MoveNext()
		rs.Close()
		conn.Close()
		i = 0
		for data in data_list:
			if data[0] is not None:
				self.insertDatabase(data)
			print i
			i = i + 1


	def insertDatabase(self,data):
		conn = sqlite3.connect("news.db")
		sql = "SELECT * FROM zhms where title1='%s'" %(data[0])
		cur = conn.cursor()
		cur.execute(sql)
		if cur.fetchone() == None:
			sql = "INSERT INTO zhms(title1,content1,title,content,url,catename,catenum) VALUES('%s','%s','%s','%s','%s','%s','%d')" %(data[0].replace('\'','\"'),data[1].replace('\'','\"'),data[2].replace('\'','\"'),data[3].replace('\'','\"'),data[4],data[5],data[6])
			try:
				cur.execute(sql)
				conn.commit()
			except Exception,e:
				print data[3]
				print e
				exit(1)
			finally:
				cur.close()
				conn.close()



	#通过ID取得SQLITE里面的数据
	def getDataById(self,id):
		conn = sqlite3.connect("news.db")
		sql = "SELECT * FROM zhms WHERE id = '%d'" %(id)
		cur = conn.cursor()
		cur.execute(sql)
		data = cur.fetchone()
		cur.close()
		conn.close()
		return data

	#通过分类ID取得100条
	def getDataByCateid(self,cateid):
		conn = sqlite3.connect("news.db")
		sql = "SELECT * FROM zhms WHERE catenum = '%d' limit 100" %(cateid)
		cur = conn.cursor()
		cur.execute(sql)
		list = cur.fetchall()
		cur.close()
		conn.close()
		return list
		

	def insertMongo(self,data):
		connection = pymongo.Connection("localhost",27017)
		db = connection.bangchu8
		newses = db.newses
		news = newses.find_one({"title":data[3]})
		if news == None:
			news = {"title":data[3],"content":data[4],"url":data[5],"catename":data[6],"cateid":data[7],"created":time.strftime("%Y-%m-%d",time.localtime())}
			print newses.insert(news)
		connection.disconnect()




if __name__ == "__main__":
	#测试 
	obj = Zhmsnews()
	# 测试插入103最前面的100条
	for i in range(1,101):
		data = obj.getDataById(i)
		obj.insertMongo(data)

	list = obj.getDataByCateid(104)
	for data in list:
		obj.insertMongo(data)



	