# 部署说明

# 一、综述

基于[fastapi-amis-admin](https://github.com/amisadmin/fastapi-amis-admin)和[fastapi-user-auth](https://github.com/amisadmin/fastapi_user_auth)的轻量级 数据增删改查可视化项目，适用于技术服务人员快速搭建前端框架。

本demo用于**网络安全行业**域名的整理、定期扫描的管理维护。

声明：数据结构保留，项目数据已删除，仅做demo展示，使用时请自行定义数据结构。

**警告：该项目基于任务脚本开发，定制化程度较高，无法直接应用，仅做参考**。



# 二、目录结构

```
|- app
|	|- admin
|		|- _AuthAdminSite.py 重写AuthAdminSite，自定义登录界面
|		|- _ModelAmin.py 重写ModelAmin，增删改查机制微调
|		|- model.py *数据模型，根据业务类型自定义，数据类型影响后续展示界面
|		|- page.py *展示界面，与数据类型挂钩
|	|- api
|		|- export_api.py 导出的api接口
|	|- db
|		|- database.py 数据库配置文件
|		|- version.py 使用版本号过滤默认数据，可不单独写成模块
|	|-scheduler
|		|- tasks.py 定时任务，用于启动扫描脚本
|	|- core.py 核心配置文件
|	|- WebAMS.py 注册文件
|- script 脚本目录
|- static 静态目录
|- upload 上传目录
|- run.py 启动入口

```



# 三、注意事项

**python 3.10及以上版本运行**



1、新建数据库webams，设置密码；并修改数据库配置。

```
app/db/database.py
```

或者使用文件数据库

```
sync_engine_url='sqlite+aiosqlite:///amisadmin.db'
```



2、修改访问白名单

```
/app/core.py  # 做了白名单，非白名单ip不可访问应用，需要对此处进行更改。
```



3、运行代码（若第一次报错，再次运行即可），初始化数据库表后导入基础数据。

```
需要在version表中填入初始化数据，否则相关页面无法显示。如2025010110。
```



4、初始化账号

```
默认账号root:root、admin:admin
需要登录root账号给root、admin角色赋权;并新建账号，继承相应角色权限

注意！
管理员及超级管理员账号均重新建立并赋权；然后禁用默认admin、root账号！
由于登录处未做验证码以及字段加密，所以登录处可爆破！一定要禁用默认账号！
白名单策略也是进一步保障作用，不建议取消

有兴趣可自行添加验证码机制。
```



5、其他

```
数据库的等待超时设置为0（不配置），否则长时间不使用时，数据接口会报错

固定字段在model模型中。enum字段模型需要前后命名保持一致，中文、英文，不支持特殊字符。
```



6、demo代码运行（使用sqlite数据库，部分页面已赋权，可直接使用admin账号登录）

```
python run.py
访问：
http://127.0.0.1:8080/WebAMS
账号：
admin:admin root/root
```



# 四、实例化效果展示

1、登录界面

![image-20250318143149778](./README.assets/image-20250318143149778.png)



2、支持多角色，需要赋权相应页面及数据权限

![image-20250318143430021](./README.assets/image-20250318143430021.png)



3、用户管理

![image-20250318143552677](./README.assets/image-20250318143552677.png)



4、域名底表维护

![image-20250318144021604](./README.assets/image-20250318144021604.png)



5、底表扫描信息（需要脚本支撑）

![image-20250318144240499](./README.assets/image-20250318144240499.png)



6、资产全量扫描信息（需要脚本支撑）

![image-20250318144421915](./README.assets/image-20250318144421915.png)
