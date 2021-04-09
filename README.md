## 微信刷脸小程序接口文档##

[TOC]

#### 1、老师账号登陆接口

- **请求URL**
> [http://test.ourvend.com/FaceAppletsApi/FaceTeacherLogin](#)

- **请求方式** 
>**POST**

- **请求参数**
>
| 请求参数      |     必选 |   类型  |   参数说明   |
| :-------- | :--------| :------ |:------ |
| Account| 是| string|账号|

- **返回参数**
>
| 返回参数      |     参数类型 |   参数说明   |
| :-------- | :--------| :------ |
| Code|   int|  状态码（200 成功 其他失败）|
| IsLoin|   int|  是否首次登陆（1 已修改密码 0 未修改过）|
| Msg|   String|  失败时返回错误|
| teacherInfo| Object| 返回学校等内容|
| SchoolName| string| 学校名称|
| GradeName| string| 年级名称|
| ClassName| string| 班级名称|
| FCID| int| 班级ID|
| DefaultPassword| string| 家长登陆默认密码|

- **返回示例**
>    
```
{
    "Code": 200,
    "IsLoin": 1,
    "Msg": "登录成功",
    "teacherInfo": {
        "SchoolName": "测试学校857",
        "GradeName": "初中一年级",
        "ClassName": "72班",
        "FCID": 1,
        "DefaultPassword": "000000"
    }
}
```