from .database import AsyncSessionLocal
from ..admin.model import Version, Version_Campus


async def get_version_value():
    '''获取最新的版本号, 如2024010110'''
    async with AsyncSessionLocal() as session:
        latest_version = await Version.get_latest_version(session)
        return latest_version.version
    
async def get_version_value_campus():
    '''获取最新的版本号, 如2024010110'''
    async with AsyncSessionLocal() as session:
        latest_version = await Version_Campus.get_latest_version(session)
        return latest_version.version

# async def get_filter_data(username):
#     '''获取过滤条件的data值, 键值对表示'''
#     async with AsyncSessionLocal() as session:
#         # 构建查询条件
#         query = select(SrcData).where(
#             (SrcData.linkman == username) | (SrcData.unit == "")
#         )
        
#         # 执行查询
#         sql = await session.execute(query)
#         results = sql.scalars().all()

#         return {result for result in results}