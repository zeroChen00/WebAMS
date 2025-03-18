from sqlmodel import SQLModel
from fastapi_amis_admin.amis.components import TableCRUD,PageSchema
from fastapi_amis_admin.utils.translation import i18n as _
from sqlmodel import SQLModel
from fastapi.staticfiles import StaticFiles
from .core import site, app, auth
from .scheduler.tasks import scheduler
from .api.export_api import router
from .admin.page import SrcDataPage,ScanDataPage,ScanDataPage_Campus, SrcDataPageUpdate, DepartmentPage

# 注册路由
app.include_router(router)

# 注册页面
site.register_admin(DepartmentPage)
site.register_admin(SrcDataPage)
site.register_admin(ScanDataPage)
site.register_admin(ScanDataPage_Campus)
site.register_admin(SrcDataPageUpdate)


@app.on_event("startup")
async def UserRegister():
    '''启动时执行 用户注册以及定时任务'''
    await site.db.async_run_sync(SQLModel.metadata.create_all, is_session=False)
    # 创建默认管理员,用户名: admin,密码: admin, 请及时修改密码!!!
    await auth.create_role_user("root")
    await auth.create_role_user("admin")
    # 运行site的startup方法,加载casbin策略等
    await site.router.startup()
    
    if not auth.enforcer.enforce("u:admin", site.unique_id, "page", "page"):
        await auth.enforcer.add_policy("u:admin", site.unique_id, "page", "page", "allow")

    scheduler.start()

# 挂载静态文件目录
app.mount("/static", StaticFiles(directory="static"), name="static")

# 挂载app
site.mount_app(app)