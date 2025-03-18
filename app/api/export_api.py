from ..db.database import AsyncSessionLocal
from sqlmodel import select
from ..admin.model import SrcData,ScanData, ScanData_Campus, DepartmentData
from fastapi.responses import JSONResponse
from fastapi.responses import StreamingResponse
from typing import Optional
from ..db.version import get_version_value,get_version_value_campus
import pandas as pd
from io import BytesIO
from fastapi import APIRouter
import random
import base64
from PIL import Image, ImageDraw, ImageFont
import io,string

# 初始化路由
router = APIRouter()

@router.get("/WebAMS/API/SrcData_Export_Excle")
async def export_src_data():
    '''导出Web资产表格'''
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(SrcData))
        src_data_list = result.scalars().all()

    data = [
        {
            'domain': src_data.domain,
            'IP': src_data.IP,
            'unit': src_data.unit,
            'system': src_data.system,
            'anguan_id': src_data.anguan_id,
            'department_code': src_data.department_code,
            'system_type': src_data.system_type.value if src_data.system_type else None,
            'system_type_other': src_data.system_type_other,
            'linkman_name': src_data.linkman_name,
            'linkman_account': src_data.linkman_account,
            'linkman_phone': src_data.linkman_phone,
            'protection_level': src_data.protection_level,
            'protection_name': src_data.protection_name,
            'protection_number': src_data.protection_number,
            'protection_time': src_data.protection_time.strftime("%Y-%m-%d") if src_data.protection_time else None,
            'company': src_data.company,
            'product': src_data.product,
            'product_version': src_data.product_version,
            'used': src_data.used if src_data.used is not None else True,
            'inter_alive': src_data.inter_alive if src_data.inter_alive is not None else True,
            'public_alive': src_data.public_alive if src_data.public_alive is not None else True,
            'xw_waf': src_data.xw_waf if src_data.xw_waf is not None else True,
            'fore_url': src_data.fore_url,
            'back_url': src_data.back_url,
            'modify_time': src_data.modify_time.strftime("%Y-%m-%d %H:%M:%S") if src_data.modify_time else None
        }
        for src_data in src_data_list
    ]

    response_data = {
        "status": 0,
        "msg": "ok",
        "data": {
            "count": len(data),
            "rows": data
        }
    }

    return JSONResponse(content=response_data)


@router.get("/WebAMS/API/ScanData_Export_Excle_Format")
async def export_scan_data(version_id: Optional[int] = None):
    '''格式化导出扫描结果表格, 配置合并单元格，易读'''
    if version_id is None:
        version_id = await get_version_value()
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(ScanData).where(ScanData.version_id == version_id))
        scan_data_list = result.scalars().all()

    data = [
        {
            'domain': scan_data.domain,
            'IP': scan_data.IP,
            'unit': scan_data.unit,
            'system': scan_data.system,
            'port': scan_data.port,
            'server': scan_data.server,
            'website': scan_data.website,
            'status': scan_data.status,
            'title': scan_data.title,
            'finger': scan_data.finger,
            'fore_url': scan_data.fore_url,
            'back_url': scan_data.back_url,
        }
        for scan_data in scan_data_list
    ]

    df = pd.DataFrame(data)
    df.columns = ['域名', 'IP地址', '使用单位', '系统名称', '端口', '服务', '网站', '响应码', '标题', '指纹', '前台地址', '后台地址']  # Set Chinese column headers
    output = BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False, sheet_name='ScanData')
        worksheet = writer.sheets['ScanData']
        
        for col in ['域名', 'IP地址', '使用单位', '系统名称']:
            start_row = 1
            for i in range(1, len(df)):
                if scan_data_list[i].flag != scan_data_list[start_row - 1].flag:
                    if start_row < i:
                        worksheet.merge_range(start_row, df.columns.get_loc(col), i, df.columns.get_loc(col), df.at[start_row - 1, col])
                    start_row = i + 1
            if start_row < len(df):
                worksheet.merge_range(start_row, df.columns.get_loc(col), len(df), df.columns.get_loc(col), df.at[start_row - 1, col])

    output.seek(0)

    version_value = await get_version_value()
    filename = f"域名资产梳理表_{version_value}.xlsx".encode("utf-8").decode("latin-1")
    headers = {
        'Content-Disposition': f'attachment; filename={filename};',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    return StreamingResponse(output, headers=headers)


@router.get("/WebAMS/API/ScanData_Export_Excle_Unformat")
async def export_scan_data(version_id: Optional[int] = None):
    '''非格式化导出扫描结果表格, 用于waf配置等脚本处理'''
    if version_id is None:
        version_id = await get_version_value()
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(ScanData).where((ScanData.version_id == version_id) & (ScanData.website != '')))
        scan_data_list = result.scalars().all()

    data = [
        {
            'domain': scan_data.domain,
            'IP': scan_data.IP,
            'unit': scan_data.unit,
            'system': scan_data.system,
            'website': scan_data.port,
            'port': scan_data.port.split(':')[-1] if ':' in scan_data.port else scan_data.port,
            'server': 'http' if 'http://' in scan_data.website else 'https' if 'https://' in scan_data.website else None
        }
        for scan_data in scan_data_list
    ]

    df = pd.DataFrame(data)
    df.columns = ['域名', 'IP地址', '使用单位', '系统名称', '网站', '端口', '协议']
    
    output = BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False, sheet_name='ScanData')

    output.seek(0)

    version_value = await get_version_value()
    filename = f"域名资产_waf配置联动_{version_value}.xlsx".encode("utf-8").decode("latin-1")
    headers = {
        'Content-Disposition': f'attachment; filename={filename};',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    return StreamingResponse(output, headers=headers)


@router.get("/WebAMS/API/ScanData_Campus_Export_Excle")
async def export_scan_campus_data():
    '''导出校园网资产表格'''
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(ScanData_Campus))
        scan_data_campus_list = result.scalars().all()

    data = [
        {
            'IP': scan_data_campus.IP,
            'port': scan_data_campus.port,
            'server': scan_data_campus.server,
            'website': scan_data_campus.website,
            'status': scan_data_campus.status,
            'title': scan_data_campus.title,
            'finger': scan_data_campus.finger,
            'remark': scan_data_campus.remark,
            'version_id': scan_data_campus.version_id
        }
        for scan_data_campus in scan_data_campus_list
    ]

    df = pd.DataFrame(data)
    df.columns = ['IP地址', '端口', '服务', '网站', '响应码', '标题', '指纹', '备注', '版本号']
    output = BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False, sheet_name='ScanData_Campus')

    output.seek(0)

    version_value = await get_version_value_campus()
    filename = f"校园网资产梳理_{version_value}.xlsx".encode("utf-8").decode("latin-1")
    headers = {
        'Content-Disposition': f'attachment; filename={filename};',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    return StreamingResponse(output, headers=headers)


@router.get("/WebAMS/API/Department_Export_Excle")
async def export_department_data():
    '''导出部门维护信息表格'''
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(DepartmentData))
        department_list = result.scalars().all()

    data = [
        {
            'unit': department.unit,
            'account': department.account,
            'name': department.name,
            'user_type': department.user_type,
            'phone': department.phone,
            'mail': department.mail
        }
        for department in department_list
    ]

    df = pd.DataFrame(data)
    df.columns = ['部门', '账号', '姓名', '用户类型', '手机号', '邮箱']
    output = BytesIO()
    with pd.ExcelWriter(output, engine='xlsxwriter') as writer:
        df.to_excel(writer, index=False, sheet_name='Department')

    output.seek(0)

    filename = f"部门信息维护表.xlsx".encode("utf-8").decode("latin-1")
    headers = {
        'Content-Disposition': f'attachment; filename={filename};',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
    return StreamingResponse(output, headers=headers)


# @router.get('/WebAMS/API/Verification_Code')
def verification_code():
    '''验证码生成,base64格式'''
    # 定义图片大小及背景颜色
    image = Image.new('RGB', (48, 30), color=(73, 109, 137))
    # 使用系统自带字体，或指定字体文件路径
    font_path = "./static/arial.ttf"
    fnt = ImageFont.truetype(font_path, 15)
    d = ImageDraw.Draw(image)

    captcha_text = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    d.text((10, 10), captcha_text, font=fnt, fill=(255, 255, 255))

    for _ in range(random.randint(3, 5)):
        start = (random.randint(0, image.width), random.randint(0, image.height))
        end = (random.randint(0, image.width), random.randint(0, image.height))
        d.line([start, end], fill=(random.randint(50, 200), random.randint(50, 200), random.randint(50, 200)))

    for _ in range(100):
        xy = (random.randrange(0, image.width), random.randrange(0, image.height))
        d.point(xy, fill=(random.randint(50, 200), random.randint(50, 200), random.randint(50, 200)))

    buf = io.BytesIO()
    image.save(buf, format='PNG')
    buf.seek(0)
    img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('utf-8')

    return {
        'status': 0,
        'msg': '',
        'data': {
            'img': img_str
        }
    }