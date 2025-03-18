from sqlmodel import SQLModel,select
from fastapi_amis_admin.models.fields import Field,Column
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from fastapi_amis_admin.utils.translation import i18n as _
from enum import Enum
from sqlalchemy import Text
from fastapi_user_auth.auth.models import BaseUser
# 假设的枚举类型
class SystemType(Enum):
    网上办事大厅 = "网上办事大厅"
    电子邮件系统 = "电子邮件系统"
    网站群管理系统 = "网站群管理系统"
    教务管理系统 = "教务管理系统"
    安防监控系统 = "安防监控系统"
    人事管理系统 = "人事管理系统"
    科研管理系统 = "科研管理系统"
    资产管理系统 = "资产管理系统"
    身份管理系统 = "身份管理系统"
    电子图书馆系统 = "电子图书馆系统"
    校园一卡通系统 = "校园一卡通系统"
    财务管理系统 = "财务管理系统"
    数据平台 = "数据平台"
    OA系统 = "OA系统"
    档案管理系统 = "档案管理系统"
    迎新管理系统 = "迎新管理系统"
    大型仪器设备共享平台 = "大型仪器设备共享平台"
    在线教学平台 = "在线教学平台"
    实验室管理系统 = "实验室管理系统"
    学生资助系统 = "学生资助系统"
    外事管理系统 = "外事管理系统"
    校友管理系统 = "校友管理系统"
    期刊管理系统 = "期刊管理系统"
    招生管理系统 = "招生管理系统"
    网盘存储系统 = "网盘存储系统"
    实习就业系统 = "实习就业系统"
    离校管理系统 = "离校管理系统"
    网络安全管理平台 = "网络安全管理平台"
    智慧教室管理系统 = "智慧教室管理系统"
    融媒体管理系统 = "融媒体管理系统"
    电子签章系统 = "电子签章系统"
    视频会议系统 = "视频会议系统"
    健康管理系统 = "健康管理系统"
    校园楼宇管理系统 = "校园楼宇管理系统"
    后勤管理系统 = "后勤管理系统"
    工会管理系统 = "工会管理系统"
    党务管理系统 = "党务管理系统"
    其他 = "其他"


class DepartmentData(SQLModel, table=True):
    '''定义部门-负责人数据模型'''
    __tablename__ = 'departmentdata'
    id: int = Field(primary_key=True)
    unit: str | None = Field(default=None, title='部门', max_length=50)
    account : str | None = Field(default=None, title='账号', max_length=10)
    name: str | None = Field(default=None, title='姓名', max_length=10)
    user_type: str | None  = Field(default=None, title='用户类型', max_length=10)
    phone: str | None  = Field(default=None, title='手机号', max_length=11)
    mail: str | None  = Field(default=None, title='邮箱', max_length=30)
    


class SrcData(SQLModel, table=True):
    '''定义Web资产数据模型'''
    __tablename__ = 'srcdata'
    # 基础字段
    id: int = Field(primary_key=True)
    domain: str = Field(title='域名', max_length=100)
    IP: str = Field(title='IP地址', max_length=100)
    unit: str | None = Field(default=None, title='部门类型', max_length=100)
    system: str | None = Field(default=None, title='信息系统名称', max_length=100)

    # 安管平台字段
    anguan_id: str | None = Field(default=None, title='安管平台ID', max_length=6)
    department_code: str | None = Field(default=None, title='部门代码', max_length=10)

    # 系统字段
    system_type: SystemType = Field(default='其他', title='系统类型')
    # system_type: str | None = Field(default=None, title='系统类型', max_length=100)
    system_type_other: str | None = Field(default=None, title='其他系统类型', max_length=100)

    # 联络员
    linkman_name: str | None = Field(default=None, title='联络员姓名')
    linkman_account : str | None = Field(default=None, title='联络员账号')
    linkman_phone: str | None  = Field(default=None, title='联系方式')

    # 等保字段
    protection_level: str | None = Field(default=None, title='等保备案级别', max_length=50)
    protection_name: str | None = Field(default=None, title='等保备案名称', max_length=100)
    protection_number: str | None = Field(default=None, title='等保备案编号', max_length=50)
    protection_time: datetime | None = Field(default=None, title='等保备案时间')

    # 供应链字段
    company: str = Field(default='其他', title='开发商名称')
    product: str | None = Field(default=None, title='产品名称', sa_column=Column(Text))
    product_version: str | None = Field(default=None, title='产品版本号', sa_column=Column(Text))

    # 其他字段
    used: bool = Field(default=1, title='域名使用')
    inter_alive: bool = Field(default=1, title='校园网存活')
    public_alive: bool = Field(default=0, title='互联网存活')
    xw_waf: bool = Field(default=0, title='玄武盾解析')
    fore_url: str | None = Field(default=None, title='前台地址', sa_column=Column(Text))
    back_url: str | None = Field(default=None, title='后台地址', sa_column=Column(Text))
    modify_time: datetime | None = Field(default=datetime.now(), title='修改时间')


class Version(SQLModel, table=True):
    '''定义版本号数据模型'''
    __tablename__ = 'version'
    id: int = Field(primary_key=True)
    version: str = Field(title = '版本号', max_length=10)

    @classmethod
    async def get_latest_version(self, async_session: AsyncSession):
        '''获取version最新值'''
        result = await async_session.execute(select(self).order_by(self.id.desc()).limit(1))
        return result.scalar_one_or_none()


class ScanData(SQLModel, table=True):
    '''定义扫描结果数据模型'''
    __tablename__ = 'scandata'
    id: int = Field(primary_key=True)
    flag: int = Field(title='标识')
    domain: str = Field(title='域名', max_length=100)
    IP: str = Field(title='IP地址', max_length=100)
    unit: str | None = Field(default=None, title='使用单位', max_length=100)
    system: str | None = Field(default=None, title='系统名称', max_length=100)
    port: str | None = Field(default=None, title='端口', max_length=50)
    server: str | None = Field(default=None, title='协议', max_length=50)
    website: str | None = Field(default=None, title='网站', max_length=100)
    status: str | None = Field(default=None, title='响应', max_length=3)
    title: str | None = Field(default=None, title='标题', max_length=100)
    finger: str | None = Field(default=None, title='指纹', max_length=100)
    version_id: str = Field(title = '版本号', max_length=14)
    fore_url: str | None = Field(default=None, title='前台地址', sa_column=Column(Text))
    back_url: str | None = Field(default=None, title='后台地址', sa_column=Column(Text))


class Version_Campus(SQLModel, table=True):
    '''定义校园网版本号数据模型'''
    __tablename__ = 'version_campus'
    id: int = Field(primary_key=True)
    version: str = Field(title = '版本号', max_length=10)

    @classmethod
    async def get_latest_version(self, async_session: AsyncSession):
        '''获取version最新值'''
        result = await async_session.execute(select(self).order_by(self.id.desc()).limit(1))
        return result.scalar_one_or_none()
    

class ScanData_Campus(SQLModel, table=True):
    '''定义扫描结果数据模型'''
    __tablename__ = 'scandata_campus'
    id: int = Field(primary_key=True)
    IP: str = Field(title='IP地址', max_length=100)
    port: str | None = Field(default=None, title='端口', max_length=21)
    server: str | None = Field(default=None, title='协议', max_length=50)
    website: str | None = Field(default=None, title='网站', max_length=100)
    status: str | None = Field(default=None, title='响应', max_length=3)
    title: str | None = Field(default=None, title='标题', max_length=100)
    finger: str | None = Field(default=None, title='指纹', max_length=100)
    version_id: str = Field(title = '版本号', max_length=14)
    remark: str | None = Field(default=None, title='备注', max_length=100)