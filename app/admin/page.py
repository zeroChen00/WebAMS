from fastapi import Request
from fastapi_amis_admin.admin import ModelAdmin
from .model import ScanData, SrcData, ScanData_Campus, DepartmentData
from fastapi_amis_admin.amis.components import TableCRUD,PageSchema
import datetime
from fastapi_amis_admin.utils.translation import i18n as _
from ..db.version import get_version_value, get_version_value_campus
from ._ModelAdmin import SrcModelAdmin,DepartmentModelAdmin
from fastapi_amis_admin.amis import PageSchema
from fastapi_amis_admin.amis.types import AmisAPI
from fastapi_amis_admin.amis.components import FormItem
from fastapi_amis_admin.utils.pydantic import annotation_outer_type
from fastapi_user_auth.auth.schemas import SystemUserEnum
# from ._AuthSelectModelAdmin import MyAuthSelectModelAdmin
# from fastapi_user_auth.mixins.admin import AuthSelectModelAdmin
from fastapi_user_auth.mixins.admin import AuthFieldModelAdmin

class DepartmentPage(DepartmentModelAdmin):
    '''部门-联络员信息维护页面'''
    page_schema = PageSchema(sort=5, label='部门信息维护')
    model = DepartmentData
    list_display = [DepartmentData.unit, DepartmentData.account, DepartmentData.name, DepartmentData.user_type, DepartmentData.phone, DepartmentData.mail]
    search_fields = [DepartmentData.unit, DepartmentData.account, DepartmentData.name, DepartmentData.user_type, DepartmentData.phone, DepartmentData.mail]

    async def get_list_table(self, request: Request) -> TableCRUD:
        '''
            重写表格, 自定义导出excle
        '''
        headerToolbar = [
            "filter-toggler",
            "reload",
            "bulkActions",
            {"type": "columns-toggler", "align": "right", "draggable": True},
            {"type": "drag-toggler", "align": "right"},
            # {"type": "pagination", "align": "right"},
            {
                "type": "tpl",
                "tpl": _("SHOWING ${items|count} OF ${total} RESULT(S)"),
                "className": "v-middle",
                "align": "right",
            },
        ]
        headerToolbar.extend(await self.get_actions(request, flag="toolbar"))
        itemActions = []
        if not self.display_item_action_as_column:
            itemActions = await self.get_actions(request, flag="item")
        filter_form = None
        if await self.has_filter_permission(request, None):
            filter_form = await self.get_list_filter_form(request)
        table = TableCRUD(
            api=await self.get_list_table_api(request),
            autoFillHeight=True,
            headerToolbar=headerToolbar,
            filterTogglable=True,
            filterDefaultVisible=False,
            filter=filter_form,
            syncLocation=False,
            keepItemSelectionOnPageChange=True,
            perPage=self.list_per_page,
            itemActions=itemActions,
            bulkActions=await self.get_actions(request, flag="bulk"),
            footerToolbar=[
                "statistics",
                "switch-per-page",
                "pagination",
                {
                    "type": "button",
                    "label": "导出Excle",
                    "actionType": "url",
                    "url": "/WebAMS/API/Department_Export_Excle",
                }
            ],
            columns=await self.get_list_columns(request),
            primaryField=self.pk_name,
            quickSaveItemApi=f"put:{self.router_path}/item/${self.pk_name}"
        )
        # 追加操作列
        action_columns = await self._get_list_columns_for_actions(request)
        table.columns.extend(action_columns)
        # 追加内联模型列
        link_model_columns = await self._get_list_columns_for_link_model(request)
        if link_model_columns:
            table.columns.extend(link_model_columns)
            table.footable = True
        return table


class SrcDataPageUpdate(AuthFieldModelAdmin):
    '''部门联络员分发填表'''
    page_schema = PageSchema(sort=4, label='信息填报')
    model = SrcData
    list_display = [SrcData.domain,SrcData.IP,SrcData.unit,SrcData.system,SrcData.system_type,SrcData.system_type_other,SrcData.used,SrcData.linkman_name,SrcData.linkman_account,SrcData.linkman_phone,SrcData.company,SrcData.product,SrcData.product_version,SrcData.fore_url,SrcData.back_url]
    search_fields = [SrcData.domain,SrcData.IP,SrcData.unit,SrcData.system,SrcData.system_type_other,SrcData.linkman_name,SrcData.linkman_account,SrcData.product,SrcData.product_version,SrcData.fore_url,SrcData.back_url]

    async def get_list_table_api(self, request: Request) -> AmisAPI:
        username = await self.site.auth.get_current_user_identity(request) or SystemUserEnum.GUEST

        '''重写表格数据，限制数据以 部门所有者 为查询条件'''
        api = AmisAPI(
            method="POST",
            url=f"{self.router_path}/list?" + "page=${page}&perPage=${perPage}&orderBy=${orderBy}&orderDir=${orderDir}",
            data={"&": "$$"},
            # data={"&": "$$", "linkman_account": f"[~]"+username},
            # data=result
        )

        if not await self.has_filter_permission(request, None):
            return api

        for field in self.search_fields:
            alias = self.parser.get_alias(field)
            if alias:
                api.data[alias] = f"[~]${alias}"
        for field in await self.get_list_filter(request):
            if isinstance(field, FormItem):
                api.data[field.name] = f"${field.name}"
            else:
                modelfield = self.parser.get_modelfield(field)
                if modelfield and issubclass(
                    annotation_outer_type(modelfield.type_), (datetime.datetime, datetime.date, datetime.time)
                ):
                    api.data[modelfield.alias] = f"[-]${modelfield.alias}"
        api = AmisAPI(
            method="POST",
            url=f"{self.router_path}/list?" + "page=${page}&perPage=${perPage}&orderBy=${orderBy}&orderDir=${orderDir}",
            # data={"&": "$$"},
            data={"&": "$$", "linkman_account": f"[~]"+username},
            # data=result
        )
        return api

    async def get_list_table(self, request: Request) -> TableCRUD:
        '''
            去除导出, 添加示例文档下载
        '''
        # time_value = datetime.datetime.now().strftime("%Y%m%d")
        headerToolbar = [
            "filter-toggler",
            "reload",
            "bulkActions",
            {"type": "columns-toggler", "align": "right", "draggable": True},
            {"type": "drag-toggler", "align": "right"},
            # {"type": "pagination", "align": "right"},
            {
                "type": "tpl",
                "tpl": _("SHOWING ${items|count} OF ${total} RESULT(S)"),
                "className": "v-middle",
                "align": "right",
            },
        ]
        headerToolbar.extend(await self.get_actions(request, flag="toolbar"))
        itemActions = []
        if not self.display_item_action_as_column:
            itemActions = await self.get_actions(request, flag="item")
        filter_form = None
        if await self.has_filter_permission(request, None):
            filter_form = await self.get_list_filter_form(request)
        table = TableCRUD(
            api=await self.get_list_table_api(request),
            autoFillHeight=True,
            headerToolbar=headerToolbar,
            filterTogglable=True,
            filterDefaultVisible=False,
            filter=filter_form,
            syncLocation=False,
            keepItemSelectionOnPageChange=True,
            perPage=self.list_per_page,
            itemActions=itemActions,
            bulkActions=await self.get_actions(request, flag="bulk"),
            footerToolbar=[
                "statistics",
                "switch-per-page",
                "pagination",
                {
                    "type": "button",
                    "label": "填报示例下载",
                    "actionType": "url",
                    "url": "/static/填报说明.xlsx",
                },
            ],
            columns=await self.get_list_columns(request),
            primaryField=self.pk_name,
            quickSaveItemApi=f"put:{self.router_path}/item/${self.pk_name}",
            defaultParams={k: v for k, v in request.query_params.items() if v},
        )
        # 追加操作列
        action_columns = await self._get_list_columns_for_actions(request)
        table.columns.extend(action_columns)
        # 追加内联模型列
        link_model_columns = await self._get_list_columns_for_link_model(request)
        if link_model_columns:
            table.columns.extend(link_model_columns)
            table.footable = True
        return table


# 注册Web资产页面
class SrcDataPage(SrcModelAdmin):
    '''域名资产底表'''
    page_schema = PageSchema(sort=3, label='域名底表')
    model = SrcData
    list_display = [SrcData.domain,SrcData.IP,SrcData.unit,SrcData.system,SrcData.anguan_id,SrcData.department_code,SrcData.system_type,SrcData.system_type_other,SrcData.used,SrcData.linkman_name,SrcData.linkman_account,SrcData.linkman_phone,SrcData.protection_level,SrcData.protection_name,SrcData.protection_number,SrcData.protection_time,SrcData.company,SrcData.product,SrcData.product_version,SrcData.inter_alive,SrcData.public_alive,SrcData.xw_waf,SrcData.fore_url,SrcData.back_url,SrcData.modify_time]
    search_fields = [SrcData.domain,SrcData.IP,SrcData.unit,SrcData.system,SrcData.system_type_other,SrcData.linkman_name,SrcData.protection_level,SrcData.protection_name,SrcData.protection_number,SrcData.protection_time,SrcData.product,SrcData.product_version,SrcData.fore_url,SrcData.back_url,SrcData.modify_time]


    async def get_list_table(self, request: Request) -> TableCRUD:
        '''
            重写表格, 自定义导出excle
        '''
        time_value = datetime.datetime.now().strftime("%Y%m%d")
        headerToolbar = [
            "filter-toggler",
            "reload",
            "bulkActions",
            {"type": "columns-toggler", "align": "right", "draggable": True},
            {"type": "drag-toggler", "align": "right"},
            # {"type": "pagination", "align": "right"},
            {
                "type": "tpl",
                "tpl": _("SHOWING ${items|count} OF ${total} RESULT(S)"),
                "className": "v-middle",
                "align": "right",
            },
        ]
        headerToolbar.extend(await self.get_actions(request, flag="toolbar"))
        itemActions = []
        if not self.display_item_action_as_column:
            itemActions = await self.get_actions(request, flag="item")
        filter_form = None
        if await self.has_filter_permission(request, None):
            filter_form = await self.get_list_filter_form(request)
        table = TableCRUD(
            api=await self.get_list_table_api(request),
            autoFillHeight=True,
            headerToolbar=headerToolbar,
            filterTogglable=True,
            filterDefaultVisible=False,
            filter=filter_form,
            syncLocation=False,
            keepItemSelectionOnPageChange=True,
            perPage=self.list_per_page,
            itemActions=itemActions,
            bulkActions=await self.get_actions(request, flag="bulk"),
            footerToolbar=[
                "statistics",
                "switch-per-page",
                "pagination",
                {
                    "type": "export-excel",
                    "filename": "域名资产底表_" + str(time_value),
                    "api": "/WebAMS/API/SrcData_Export_Excle"
                },
            ],
            columns=await self.get_list_columns(request),
            primaryField=self.pk_name,
            quickSaveItemApi=f"put:{self.router_path}/item/${self.pk_name}",
            defaultParams={k: v for k, v in request.query_params.items() if v},
        )
        # 追加操作列
        action_columns = await self._get_list_columns_for_actions(request)
        table.columns.extend(action_columns)
        # 追加内联模型列
        link_model_columns = await self._get_list_columns_for_link_model(request)
        if link_model_columns:
            table.columns.extend(link_model_columns)
            table.footable = True
        return table

# 注册扫描结果页面
class ScanDataPage(ModelAdmin):
    '''扫描结果页面'''
    page_schema = PageSchema(sort=2, label='数据中心资产')
    model = ScanData
    list_display = [ScanData.domain,ScanData.IP,ScanData.unit,ScanData.system,ScanData.port,ScanData.server,ScanData.website,ScanData.status,ScanData.title,ScanData.finger,ScanData.fore_url,ScanData.back_url,ScanData.version_id]
    search_fields = [ScanData.domain,ScanData.IP,ScanData.unit,ScanData.system,ScanData.server,ScanData.website,ScanData.title,ScanData.finger,ScanData.fore_url,ScanData.back_url,ScanData.version_id]

    # async def get_list_table_api(self, request: Request) -> AmisAPI:
    #     '''重写表格数据，限制数据以 version_id 为查询条件'''
    #   version_value = await get_version_value()
    #     api = AmisAPI(
    #         method="POST",
    #         url=f"{self.router_path}/list?" + "page=${page}&perPage=${perPage}&orderBy=${orderBy}&orderDir=${orderDir}",
    #         data={"&": "$$", "version_id": version_value},
    #     )
    #     if not await self.has_filter_permission(request, None):
    #         return api
    #     for field in self.search_fields:
    #         alias = self.parser.get_alias(field)
    #         if alias:
    #             api.data[alias] = f"[~]${alias}"
    #     for field in await self.get_list_filter(request):
    #         if isinstance(field, FormItem):
    #             api.data[field.name] = f"${field.name}"
    #         else:
    #             modelfield = self.parser.get_modelfield(field)
    #             if modelfield and issubclass(
    #                 annotation_outer_type(modelfield.type_), (datetime.datetime, datetime.date, datetime.time)
    #             ):
    #                 api.data[modelfield.alias] = f"[-]${modelfield.alias}"
    #     return api


    async def get_list_table(self, request: Request) -> TableCRUD:
        '''
            重写表格, 自定义导出excle
        '''
        version_value = await get_version_value()
        headerToolbar = [
            "filter-toggler",
            "reload",
            "bulkActions",
            {"type": "columns-toggler", "align": "right", "draggable": True},
            {"type": "drag-toggler", "align": "right"},
            # {"type": "pagination", "align": "right"},
            {
                "type": "tpl",
                "tpl": _("SHOWING ${items|count} OF ${total} RESULT(S)"),
                "className": "v-middle",
                "align": "right",
            },
        ]
        headerToolbar.extend(await self.get_actions(request, flag="toolbar"))
        itemActions = []
        if not self.display_item_action_as_column:
            itemActions = await self.get_actions(request, flag="item")
        filter_form = None
        if await self.has_filter_permission(request, None):
            filter_form = await self.get_list_filter_form(request)
        table = TableCRUD(
            api=await self.get_list_table_api(request),
            autoFillHeight=True,
            headerToolbar=headerToolbar,
            filterTogglable=True,
            filterDefaultVisible=False,
            filter=filter_form,
            syncLocation=False,
            keepItemSelectionOnPageChange=True,
            perPage=self.list_per_page,
            itemActions=itemActions,
            bulkActions=await self.get_actions(request, flag="bulk"),
            footerToolbar=[
                "statistics",
                "switch-per-page",
                "pagination",
                {
                    "type": "button",
                    "label": "格式化导出",
                    "actionType": "url",
                    "url": "/WebAMS/API/ScanData_Export_Excle_Format",
                },
                {
                    "type": "button",
                    "label": "脚本化导出",
                    "actionType": "url",
                    "url": "/WebAMS/API/ScanData_Export_Excle_Unformat",
                }
                # {
                #     "type": "export-excel",
                #     "label": "脚本化导出",
                #     "filename": "web资产_waf配置联动_" + str(version_value),
                #     "api": "/WebAMS/API/ScanData_Export_Excle_Unformat"
                # }
            ],
            columns=await self.get_list_columns(request),
            primaryField=self.pk_name,
            quickSaveItemApi=f"put:{self.router_path}/item/${self.pk_name}",
            defaultParams={"version_id": version_value},
        )
        # 追加操作列
        action_columns = await self._get_list_columns_for_actions(request)
        table.columns.extend(action_columns)
        # 追加内联模型列
        link_model_columns = await self._get_list_columns_for_link_model(request)
        if link_model_columns:
            table.columns.extend(link_model_columns)
            table.footable = True
        return table


# 注册校园网扫描结果页面
class ScanDataPage_Campus(ModelAdmin):
    '''校园网扫描结果页面'''
    page_schema = PageSchema(sort=1, label='校园网资产')
    model = ScanData_Campus
    list_display = [ScanData_Campus.IP,ScanData_Campus.port,ScanData_Campus.server,ScanData_Campus.website,ScanData_Campus.status,ScanData_Campus.title,ScanData_Campus.finger,ScanData_Campus.remark,ScanData_Campus.version_id]
    search_fields = [ScanData_Campus.IP,ScanData_Campus.server,ScanData_Campus.website,ScanData_Campus.title,ScanData_Campus.finger,ScanData_Campus.remark,ScanData_Campus.version_id]


    async def get_list_table(self, request: Request) -> TableCRUD:
        '''
            重写表格, 自定义导出excle
        '''
        version_value = await get_version_value_campus()
        headerToolbar = [
            "filter-toggler",
            "reload",
            "bulkActions",
            {"type": "columns-toggler", "align": "right", "draggable": True},
            {"type": "drag-toggler", "align": "right"},
            # {"type": "pagination", "align": "right"},
            {
                "type": "tpl",
                "tpl": _("SHOWING ${items|count} OF ${total} RESULT(S)"),
                "className": "v-middle",
                "align": "right",
            },
        ]
        headerToolbar.extend(await self.get_actions(request, flag="toolbar"))
        itemActions = []
        if not self.display_item_action_as_column:
            itemActions = await self.get_actions(request, flag="item")
        filter_form = None
        if await self.has_filter_permission(request, None):
            filter_form = await self.get_list_filter_form(request)
        table = TableCRUD(
            api=await self.get_list_table_api(request),
            autoFillHeight=True,
            headerToolbar=headerToolbar,
            filterTogglable=True,
            filterDefaultVisible=False,
            filter=filter_form,
            syncLocation=False,
            keepItemSelectionOnPageChange=True,
            perPage=self.list_per_page,
            itemActions=itemActions,
            bulkActions=await self.get_actions(request, flag="bulk"),
            footerToolbar=[
                "statistics",
                "switch-per-page",
                "pagination",
                {
                    "type": "button",
                    "label": "导出Excle",
                    "actionType": "url",
                    "url": "/WebAMS/API/ScanData_Campus_Export_Excle",
                }
            ],
            columns=await self.get_list_columns(request),
            primaryField=self.pk_name,
            quickSaveItemApi=f"put:{self.router_path}/item/${self.pk_name}",
            defaultParams={"version_id": version_value},
        )
        # 追加操作列
        action_columns = await self._get_list_columns_for_actions(request)
        table.columns.extend(action_columns)
        # 追加内联模型列
        link_model_columns = await self._get_list_columns_for_link_model(request)
        if link_model_columns:
            table.columns.extend(link_model_columns)
            table.footable = True
        return table