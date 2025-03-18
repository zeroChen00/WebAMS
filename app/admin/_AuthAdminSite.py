from fastapi_user_auth.admin import AuthAdminSite, UserLoginFormAdmin, UserAuthApp, UserRegFormAdmin
from starlette.requests import Request
from fastapi_amis_admin.amis.constants import DisplayModeEnum, LevelEnum
from fastapi_amis_admin.amis.components import (
    Form,
    Action,
    Horizontal,
    ButtonToolbar,
    Page,
    Html,
    Grid,
    Page
)
from fastapi_amis_admin.utils.translation import i18n as _
from fastapi_amis_admin.admin.parser import AmisParser
from typing import Any, Type
from .model import SystemType
from fastapi_amis_admin.utils.pydantic import annotation_outer_type
import datetime
from pydantic import Json
from fastapi._compat import field_annotation_is_scalar_sequence


class MyAmisParser(AmisParser):
    '''
        修改AmisParser的kwargs["clearValueOnEmpty"] = False
        自定义字段下拉框
    '''
    def get_field_amis_form_item_type(self, type_: Any, is_filter: bool, required: bool = False) -> dict:
        kwargs = super().get_field_amis_form_item_type(type_, is_filter, required)
        kwargs["clearValueOnEmpty"] = False

        if type_ is SystemType:
            kwargs["quickEdit"] = True   # 填写下拉框
        return kwargs
        

    def get_field_amis_table_column_type(self, type_: Type) -> dict:
        kwargs = {}
        type_ = annotation_outer_type(type_)
        if type_ in {str, Any}:
            pass
        elif issubclass(type_, bool):
            kwargs["type"] = "switch"
            kwargs["disabled"] = True
            kwargs["filterable"] = {
                "options": [
                    {"label": _("YES"), "value": True},
                    {"label": _("NO"), "value": False},
                ]
            }
        elif issubclass(type_, datetime.datetime):
            kwargs["type"] = "datetime"
        elif issubclass(type_, datetime.date):
            kwargs["type"] = "date"
        elif issubclass(type_, datetime.time):
            kwargs["type"] = "time"
        elif issubclass(type_, (dict, Json)):
            kwargs["type"] = "json"
        elif field_annotation_is_scalar_sequence(type_):
            kwargs["type"] = "each"
            kwargs["items"] = {
                "type": "tpl",
                "tpl": "<span class='label label-info m-l-sm'><%= this.item %></span>",
            }
        return kwargs

    # def as_table_column(self, modelfield: ModelField, quick_edit: bool = False) -> TableColumn:
    #     column = super().as_table_column(modelfield,quick_edit)
    #     if column.name in ['system_type', 'company', 'used']:
    #         column.sortable = False
    #     return column


class MyUserloginFormAdmin(UserLoginFormAdmin):
    '''重写UserloginFormAdmin, 去除注册, 修改登录界面图标'''
    page = Page()

    async def get_form(self, request: Request) -> Form:
        form = await super().get_form(request)

        # # 添加验证码
        # verification_json = {
        #     "type": "flex",
        #     "items": [
        #         {
        #             "type": "input-text",
        #             "name": "verification_code",
        #             "label": "验证码",
        #             "required": True,
        #             "size": "sm"
        #         },
        #         {
        #             "type": "service",
        #             "api": "/WebAMS/API/Verification_Code",
        #             "id": "service-reload",
        #             "body": [
        #                 {
        #                     "type": "tpl",
        #                     "tpl": "<img src=\"${img}\" style=\"cursor: pointer;margin-left: 2px;\"\">",
        #                     "onEvent": {
        #                         "click": {
        #                             "actions": [
        #                                 {
        #                                     "componentId": "service-reload",
        #                                     "actionType": "reload"
        #                                 }
        #                             ]
        #                         }
        #                     },
        #                 }
        #             ],
        #             "dsType": "api"
        #         }
        #     ],
        # }

        # form.body.append(verification_json)

        buttons = []

        buttons.append(Action(actionType="submit", label=_("Sign in"), level=LevelEnum.primary))
        
        form.update_from_kwargs(
            title="",
            mode=DisplayModeEnum.horizontal,
            submitText=_("Sign in"),
            actionsClassName="no-border m-none p-none",
            panelClassName="",
            wrapWithPanel=True,
            horizontal=Horizontal(left=3, right=9),
            actions=[ButtonToolbar(buttons=buttons)],
        )
        # 修复xss漏洞
        form.redirect = request.query_params.get("redirect") or "/"
        # form.redirect = html.escape(request.query_params.get("redirect") or "/")
        return form

    async def get_page(self, request: Request) -> Page:
        page = self.page
        page.body = await self.get_form(request)
        desc = _("基于Amis开发的轻量级Web资产管理系统")
        page.body = [
            Html(
                html=f'<div style="display: flex; justify-content: center; align-items: center; margin: 96px 0px 8px;">'
                     f'<img src="/static/site_ico/favicon.png" alt="logo" style="margin-right: 8px; '
                     f'width: 48px;"><span style="font-size: 32px; font-weight: bold;">Web资产管理系统</span></div>'
                     f'<div style="width: 100%; text-align: center; color: rgba(0, 0, 0, 0.45); margin-bottom: 40px;">{desc}</div>'
            ),
            # Grid(columns=[{"body": [page.body], "lg": 3, "md": 6, "valign": "middle"}], align="center", valign="middle"),
            Grid(columns=[{"body": [page.body], "lg": 2, "md": 4, "valign": "middle"}], align="center", valign="middle"),
        ]
        return page


class MyUserRegFormAdmin(UserRegFormAdmin):
    '''彻底删除注册接口'''
    page_path = "/reg_False"
    
    async def get_page(self, request: Request) -> Page:
        page = self.page
        page.body = '注册已关闭！'
        return page

class MyUserAuthApp(UserAuthApp):
    '''继承重写的 UserloginFormAdmin'''
    UserLoginFormAdmin = MyUserloginFormAdmin
    UserRegFormAdmin = MyUserRegFormAdmin
    

class MyAuthAdminSite(AuthAdminSite):
    '''
        继承重写的 UserAuthApp
    '''
    UserAuthApp = MyUserAuthApp

    # 继承修改的AmisParser，可以多级关系继承,**args任意参数
    def __init__(self, **args):
        super().__init__(**args)
        self.amis_parser = MyAmisParser(
            image_receiver=self.settings.amis_image_receiver,
            file_receiver=self.settings.amis_file_receiver,
        )