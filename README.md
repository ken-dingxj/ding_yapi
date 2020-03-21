# ding_yapi

## API文档
### 用户
#### 登录
**url**
```
http://127.0.0.1/api/user/login
```
**请求方式：post**

| 参数|是否必选|类型|说明|
| :----: |:----: |:----: |:----: |
| email |Y |string |用户名称或邮箱 |
| password |Y |string |用户密码 |

**返回示例**
```json
    {
        "code": 10000,
        "msg": "登录成功",
        "data": {
            "username": "admin",
            "role": "admin",
            "uid": "5e6ba519d680850545f8fb6d",
            "email": "admin@admin.com",
            "add_time": 1584112921,
            "up_time": 1584112921,
            "type": "site",
            "study": false
        },
        "success": true
    }   
```