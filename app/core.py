from .admin._AuthAdminSite import MyAuthAdminSite
from fastapi_amis_admin.admin.settings import Settings
from .db.database import database_url,engine
from fastapi import FastAPI, Depends, Request, Response
from ipaddress import ip_address, ip_network
from starlette.middleware.base import RequestResponseEndpoint

# 实例化site
site = MyAuthAdminSite(settings=Settings(
    database_url_async = database_url,
    site_path = '/WebAMS',
    site_title ='Web资产管理系统',
    site_icon ='/static/site_ico/favicon.png',
    language = 'Python',
    version = '1.0.0',
    # amis_cdn = "https://unpkg.zhihu.com",
    amis_cdn = "/static"
    # amis_pkg = "amis@6.7.0",
    # amis_cdn = "/static",
    # amis_pkg = "amis6.7.0",
))

# 实例化认证参数
auth = site.auth

# 全局登录认证
# app = FastAPI()
app = FastAPI(dependencies=[Depends(auth.requires()())], docs_url=None)

# 定义允许访问的IP地址范围
ALLOWED_IPS = {"58.192.113.0/24","127.0.0.1"}

# 以中间件白名单的形式限制IP访问
@app.middleware("http")
async def check_ip(request: Request, call_next: RequestResponseEndpoint):
    # 检查真实IP
    x_forwarded_for = request.headers.get("x-forwarded-for")
    if x_forwarded_for:
        client_ip = x_forwarded_for.split(",")[0].strip()  # 获取第一个IP
    else:
        client_ip = request.client.host

    if not any(ip_address(client_ip) in ip_network(ip) for ip in ALLOWED_IPS):
        return Response('{"detail": "Forbidden"}', status_code=403)
    response = await call_next(request)
    return response