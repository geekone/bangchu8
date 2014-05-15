# -*- coding:utf-8 -*-

# 主函数

from xinshipu import Xinshipu
from parsexinshipu import Parsexinshipu
from parsexinshipuall import Parsexinshipuall

from zhms import Zhmsnews


import sqlite3
import MySQLdb



# 插入火车头解析出来的list数据到MYSQL
def insertToMySQL(data):
    conn = MySQLdb.connect(host="localhost",user="root",passwd="",db="ajaxj2",charset="utf8")
    sql  = "SELECT * FROM xinshipu where title = '%s'" %(data[0])
    cur = conn.cursor()
    cur.execute(sql)
    if cur.fetchone() == None:
        sql = "INSERT INTO xinshipu(title,url,catename,catenum) VALUES('%s','%s','%s','%d')" %(data[0],data[3],data[4],data[5])
        try:
            cur.execute(sql)
            conn.commit()
        except Exception,e:
            print e
            exit(1)
        finally:
            cur.close()
            conn.close()


#初始化数据库和表
def init_database():
	# cook.db
	# conn = sqlite3.connect('cook.db')
	# cur = conn.cursor()
	# cur.execute('''
 #              create table if not exists xinshipu
 #              (id integer primary key,title text, content text,content1 text,url text,catename text,catenum integer)
 #              ''')

	#另一个表,多了一个大分类,猪,鸡
	# cur.execute('''
 #              create table if not exists xinshipuall
 #              (id integer primary key,title text, content text,content1 text,url text,category,catename text,catenum integer)
 #              ''')
	# cur.close()
	# conn.close()

	# news.db
	conn = sqlite3.connect('news.db')
	cur = conn.cursor()
	cur.execute('''
				create table if not exists zhms
				(id integer primary key,title1 text,content1 text,title text,content text,url text,catename text,catenum integer)
				''')
	cur.close()
	conn.close()

#读取火车头的数据到Sqlite
def readAccessToSqlite():
	obj = Xinshipu()

	# 火车头数据库 网友食谱
	# 148 家常
	AccessDB = "E:/LocoySpider/Data/LocoySpider/148/SpiderResult.mdb"
	obj.getAccessToSqlite(AccessDB,u'家常',148)

	AccessDB = "E:/LocoySpider/Data/LocoySpider/149/SpiderResult.mdb"
	obj.getAccessToSqlite(AccessDB,u'小吃',149)

	AccessDB = "E:/LocoySpider/Data/LocoySpider/150/SpiderResult.mdb"
	obj.getAccessToSqlite(AccessDB,u'素菜',150)

	AccessDB = "E:/LocoySpider/Data/LocoySpider/151/SpiderResult.mdb"
	obj.getAccessToSqlite(AccessDB,u'面食',151)

	AccessDB = "E:/LocoySpider/Data/LocoySpider/152/SpiderResult.mdb"
	obj.getAccessToSqlite(AccessDB,u'咸鲜味',152)


	# 大全部分
	AccessDB = "E:/LocoySpider/Data/LocoySpider/153/SpiderResult.mdb"
	obj.getAccessToSqlite2(AccessDB,u'猪',u'猪肉',153)

	AccessDB = "E:/LocoySpider/Data/LocoySpider/154/SpiderResult.mdb"
	obj.getAccessToSqlite2(AccessDB,u'猪',u'排骨',154)

	AccessDB = "E:/LocoySpider/Data/LocoySpider/155/SpiderResult.mdb"
	obj.getAccessToSqlite2(AccessDB,u'猪',u'猪蹄',155)

	AccessDB = "E:/LocoySpider/Data/LocoySpider/156/SpiderResult.mdb"
	obj.getAccessToSqlite2(AccessDB,u'猪',u'猪肚',156)

	AccessDB = "E:/LocoySpider/Data/LocoySpider/157/SpiderResult.mdb"
	obj.getAccessToSqlite2(AccessDB,u'猪',u'猪排',157)


#解析cooks
def parse():
	# obj = Parsexinshipu()
	# obj.parseHtml(566)
	# obj.do_sqlite_to_mongo(149)
	# obj.do_sqlite_to_mongo(150)
	# obj.do_sqlite_to_mongo(151)
	# obj.do_sqlite_to_mongo(152)


	obj = Parsexinshipuall()
	# obj.parseHtml(1)
	# obj.do_sqlite_to_mongo(153)
	# obj.do_sqlite_to_mongo(154)
	obj.do_sqlite_to_mongo(155)
	obj.do_sqlite_to_mongo(156)
	obj.do_sqlite_to_mongo(157)




#主运行函数
def run_xinshipu():
	parse()



	



#运行zhms news 主函数
def run_zhms():
	# init_database()		 #初始化数据库
	obj = Zhmsnews()

	# 从access 导入 sqlite3

	# AccessDB = "D:/projects/bangchu8/103/SpiderResult.mdb"
	# obj.getAccessToSqlite(AccessDB,u"饮食养性",103)

	# AccessDB = "D:/projects/bangchu8/104/SpiderResult.mdb"
	# obj.getAccessToSqlite(AccessDB,u"美容保健",104)


	# AccessDB = "D:/projects/bangchu8/105/SpiderResult.mdb"
	# obj.getAccessToSqlite(AccessDB,u"营养饮食",105)

	# AccessDB = "D:/projects/bangchu8/106/SpiderResult.mdb"
	# obj.getAccessToSqlite(AccessDB,u"烹饪技巧",106)


	# AccessDB = "D:/projects/bangchu8/107/SpiderResult.mdb"
	# obj.getAccessToSqlite(AccessDB,u"饮食误区",107)


	# AccessDB = "D:/projects/bangchu8/108/SpiderResult.mdb"
	# obj.getAccessToSqlite(AccessDB,u"食物档案",108)





if __name__ == '__main__':
	# run_xinshipu()
	run_zhms()





