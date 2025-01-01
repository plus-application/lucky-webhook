## Lucky Webhook
Project for Lucky STUN web hook

## Deploy
```shell
docker build -t lucky-webhook .
```
## Run
- docker 
```
docker run -p 6000:6000 lucky-webhook
```
- docker-compose
```shell
cd ./docker
docker-compose up -d
```

## API

### 上报STUN
> 需要X-TOKEN

- 请求
```
curl --location --request POST 'http://127.0.0.1:6000/stun' \
--header 'x-token: 123456789abcdef' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: 127.0.0.1:3000' \
--header 'Connection: keep-alive' \
--data-raw '{"port":2000,"ipAddr":"127.0.0.1","ip":"192.129.2.2","ruleName":"1111","time":1111,"ddns":"xxx.tpddns.cn"}'
```
- 响应
```json
{
    "code": 0,
    "message": "OK"
}
```
![图片](https://public-picgo.oss-cn-guangzhou.aliyuncs.com/stun_post.png)


### 查询全部STUN列表
- 请求
```
curl --location --request GET 'http://127.0.0.1:6000/stun/all' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Accept: */*' \
--header 'Host: 127.0.0.1:3000' \
--header 'Connection: keep-alive'
```
- 响应
```json
[
    {
        "id": 1,
        "ruleName": "1111",
        "ip": "192.129.2.2",
        "port": 2000,
        "ipAddr": "127.0.0.1",
        "ddns": "xxx.tpddns.cn",
        "time": 1111,
        "create_time": 1735630101
    }
]
```
### 按RuleName查询STUN
- 请求
```
curl --location --request GET 'http://127.0.0.1:6000/stun/rule?ruleName=1111' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Accept: */*' \
--header 'Host: 127.0.0.1:3000' \
--header 'Connection: keep-alive'
```
- 响应
```json
  {
      "id": 1,
      "ruleName": "1111",
      "ip": "192.129.2.2",
      "port": 2000,
      "ipAddr": "127.0.0.1",
      "ddns": "xxx.tpddns.cn",
      "time": 1111,
      "create_time": 1735630101
  }
```

## 中转页
> stun_redirect.ejs

地址 : /stun/redirect?ruleName=xxx

![图片](https://public-picgo.oss-cn-guangzhou.aliyuncs.com/stun_redirect.png)