import json
import boto3

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')
IMGBUCKET = 'findbyimagebucket'

TABLENAME = 'ImageTaginfo'
s3_url_head = "https://" + IMGBUCKET + ".s3.amazonaws.com/"


def lambda_handler(event, context):
    # TODO implement
    # key = event['tags']
    # print(type(key))
    body = json.loads(event['body'])
    key = body.get('tags')
    key = key.get('tags')  # 获取tag内容
    response_dict = dynamodb.scan(TableName=TABLENAME)
    img_list = response_dict['Items']
    res_list = []
    for i in range(len(img_list)):
        img_tag = img_list[i]['tag']['S']  # 获取数据库中的tag字符串
        tag_list = img_tag.split("&")  # 将字符串通过“&”分割，返回的是列表
        cnt = 1
        for j in range(len(key)):
            cnt = cnt * tag_list.count(key[j])  # count函数会返回列表中关键字出现的次数
        if cnt:  # 如果cnt大于0，所有tag都存在，返回图片的url
            img_id = img_list[i]['link']['S']
            img_url = s3_url_head + img_id
            res_list.append(img_url)
    res_dict = {}
    res_dict["pictureList"] = res_list
    return json.dumps(res_dict)

