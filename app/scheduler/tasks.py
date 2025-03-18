from fastapi_scheduler import SchedulerAdmin
import subprocess
from ..core import site

# 绑定 定时任务
scheduler = SchedulerAdmin.bind(site)

# 定时任务每个月1号 22点开始
@scheduler.scheduled_job('cron', month='*', day='1', hour=22)
# @scheduler.scheduled_job('cron', minute='*')
def run_domain():
    subprocess.run(['python', 'script/domainrun_mysql.py'])


# 定时任务每个月10号 22点开始
@scheduler.scheduled_job('cron', month='*', day='10', hour=22)
def run_sysfind():
    subprocess.run(['python', 'script/sysfind_mysql.py'])