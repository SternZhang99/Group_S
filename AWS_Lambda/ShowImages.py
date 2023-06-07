import json
import boto3

s3 = boto3.client('s3')
dynamodb = boto3.client('dynamodb')
IMGBUCKET = 'libimageuploadbucket'
TABLENAME = 'ImageTaginfo'
s3_url_head = "https://" + IMGBUCKET + ".s3.amazonaws.com/"


def lambda_handler(event, context):
    # TODO implement
    response_dict = dynamodb.scan(TableName=TABLENAME)
    img_list = response_dict['Items']
    res_list = []
    for i in range(len(img_list)):
        img_id = img_list[i]['link']['S']
        img_url = s3_url_head + img_id
        img_tag = img_list[i]['tag']['S']
        tag_list = img_tag.split("&")
        res_tagList = []
        for j in range(len(tag_list)):
            tag_dict = {"tagName": tag_list[j]}
            res_tagList.append(tag_dict)
        img_dict = {"url": img_url, "tagList": res_tagList}
        res_list.append(img_dict)
    res_dict = {"pictureList": res_list}
    print(res_dict)
    return json.dumps(res_dict)

# 用于显示所有图片及对应
