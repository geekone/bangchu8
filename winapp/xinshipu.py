# -*- coding:utf-8 -*-

import sqlite3
import win32com.client
#处理心食谱的数据
class Xinshipu:

	#读取Access数据
	#accessdb 火车头数据源 catename 分类名称
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
				data_list.append([rs.Fields.Item(3).Value,rs.Fields.Item(4).Value,rs.Fields.Item(5).Value,rs.Fields.Item(8).Value,catename,catenum])
				rs.MoveNext()
		rs.Close()
		conn.Close()
		i = 0
		for data in data_list:
			self.insertDatabase(data)
			print i
			i = i + 1


	#读取Access数据
	#accessdb 火车头数据源 catename 分类名称
	def getAccessToSqlite2(self,accessdb= None,category="",catename="",catenum=0):
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
				data_list.append([rs.Fields.Item(3).Value,rs.Fields.Item(4).Value,rs.Fields.Item(5).Value,rs.Fields.Item(8).Value,category,catename,catenum])
				rs.MoveNext()
		rs.Close()
		conn.Close()
		i  = 0 
		for data in data_list:
			self.insertDatabase2(data)
			print i
			i = i+1



	def insertDatabase(self,data):
		conn = sqlite3.connect("cook.db")
		sql = "SELECT * FROM xinshipu where url = '%s' and catenum = '%s'" %(data[3],data[5])
		cur = conn.cursor()
		cur.execute(sql)
		if cur.fetchone() == None:
			sql = "INSERT INTO xinshipu(title,content,content1,url,catename,catenum) VALUES('%s','%s','%s','%s','%s','%d')" %(data[0],data[1].replace('\'','\"'),data[2].replace('\'','\"'),data[3],data[4],data[5])
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

	def insertDatabase2(self,data):
		conn = sqlite3.connect("cook.db")
		sql = "SELECT * FROM xinshipuall where url = '%s' and catenum = '%s'" %(data[3],data[5])
		cur = conn.cursor()
		cur.execute(sql)
		if cur.fetchone() == None:
			sql = "INSERT INTO xinshipuall(title,content,content1,url,category,catename,catenum) VALUES('%s','%s','%s','%s','%s','%s','%d')" %(data[0],data[1].replace('\'','\"'),data[2].replace('\'','\"'),data[3],data[4],data[5],data[6])
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


	




