from sqlalchemy import create_engine
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

'''数据库连接配置'''
# 异步连接URL
sync_database_url = 'mysql+aiomysql://root:pass@localhost/WebAMS'
# sync_database_url='sqlite+aiosqlite:///amisadmin.db'
# 同步连接URL
database_url = 'mysql+pymysql://root:pass@localhost/WebAMS'
# database_url='sqlite:///amisadmin.db'

# 创建异步引擎对象
sync_engine = create_async_engine(sync_database_url)
# 创建异步会话管理对象
AsyncSessionLocal = sessionmaker(bind=sync_engine, expire_on_commit=False, class_=AsyncSession)


# 创建非异步引擎对象
engine = create_engine(database_url)
# 创建非异步会话管理对象
SessionLocal = sessionmaker(bind=engine)