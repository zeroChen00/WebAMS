from fastapi_amis_admin.admin import ModelAdmin
from datetime import datetime
from fastapi_amis_admin.utils.translation import i18n as _
from fastapi_amis_admin.crud.parser import TableModelT,get_modelfield_by_alias
from typing import Dict,Any
from datetime import datetime
from ..db.database import SessionLocal
from sqlmodel import select
from .model import ScanData, SrcData, ScanData_Campus, DepartmentData

class SrcModelAdmin(ModelAdmin):
    def update_item(self, obj: TableModelT, values: Dict[str, Any]) -> None:
        """自定义更新数据: 添加自动更新时间"""
        for k, v in values.items():
            field = get_modelfield_by_alias(self.model, k)
            if not field and not hasattr(obj, k):
                continue
            name = field.name if field else k
            if isinstance(v, dict):
                # Relational attributes, nested;such as: setattr(article.content, "body", "new body")
                sub = getattr(obj, name)
                if not isinstance(sub, dict):  # Ensure that the attribute is an object.
                    self.update_item(sub, v)
                    continue
            setattr(obj, name, v)
        # 设置modify_time为当前时间
        setattr(obj, 'modify_time', datetime.now())

class DepartmentModelAdmin(ModelAdmin):
    """部门联系人只能查看本部门域名信息"""
    def update_item(self, obj: TableModelT, values: Dict[str, Any]) -> None:
        # 建立数据库引擎和会话
        try:
            # 查询该部门的所有联系人信息
            department_query = select(DepartmentData).where(DepartmentData.unit == self.unit)
            department_records = SessionLocal.exec(department_query).all()
            # 存储联系人信息的列表
            names = []
            accounts = []
            phones = []
            for record in department_records:
                names.append(record.name)
                accounts.append(record.account)
                phones.append(record.phone)
            # 将联系人信息拼接成字符串
            linkman_name = ','.join(names)
            linkman_account = ','.join(accounts)
            linkman_phone = ','.join(phones)
            # 在 srcdata 表中找到对应的记录
            src_query = select(SrcData).where(SrcData.unit == self.unit)
            src_records = SessionLocal.exec(src_query)
            for src_record in src_records:
                # 更新 srcdata 表中的记录
                src_record.linkman_name = linkman_name
                src_record.linkman_account = linkman_account
                src_record.linkman_phone = linkman_phone
                SessionLocal.add(src_record)
                print(src_record)
            SessionLocal.commit()
        except Exception as e:
            print(f"Error occurred: {e}")
        finally:
            SessionLocal.close()