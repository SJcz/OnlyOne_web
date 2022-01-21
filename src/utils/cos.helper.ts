import COS from 'cos-js-sdk-v5';
import axios from 'axios'
import { uuid } from './utils';
const config = require("../config/config.json")

// 存储桶名称，由bucketname-appid 组成，appid必须填入，可以在COS控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
const Bucket = 'onlyone-chat-1304022868';  /* 存储桶，必须字段 */

// 存储桶region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/ 
// 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
const Region = 'ap-guangzhou';     /* 存储桶所在地域，必须字段 */

export default class COSHelper {
  cos!: COS;
  constructor() {
  }
  initCos(token: string) {
    this.cos = new COS({
      // getAuthorization 必选参数
      getAuthorization: function (options, callback) {
        axios.request({
          method: 'GET',
          url: config.http_server_url + '/sts',
          params: { token }
        }).then((result) => {
          const data = result.data
          if (!data || !data.credentials) {
            return console.error('credentials invalid:\n' + JSON.stringify(data))
          }
          callback({
            TmpSecretId: data.credentials.tmpSecretId,
            TmpSecretKey: data.credentials.tmpSecretKey,
            SecurityToken: data.credentials.sessionToken,
            // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
            StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
          })
          console.log('获取COS临时密钥成功')
        }).catch(error => {
          console.log('获取COS临时密钥失败')
          console.error(error)
        })
      }
    });
  }

  uploadFile(file: File, callback: any) {
    const fileId = uuid()
    console.log(file.type)
    console.log(file.size)
    if (!file.type.match('image') || file.size > 3 * 1024 * 1024) {
      return alert(`只能发送 3 M 内的图片`)
    }
    this.cos.putObject({
      Bucket,
      Region,
      Key: file.name + fileId,              /* 必须 */
      StorageClass: 'STANDARD',
      Body: file, // 上传文件对象
      onProgress: function(progressData) {
          console.log(JSON.stringify(progressData));
      }
    }, (err, data) => {
      console.log(err || data);
      this.cos.getObjectUrl({
        Bucket,
        Region,
        Key: file.name + fileId,
      }, (err, data) => {
        console.log(err || data);
        if (data.Url) callback(data.Url)
      });
    });
  }
}
