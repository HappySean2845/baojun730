
var clickFlag = true;
var validate = {
    isEmpty: function (val) {
        if (val == "") {
            return false;
        } else {
            return true;
        }
    },
    isMobile: function (val) {
        if (val == "") {
            return false;
        }
        if (!val.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/) || val.length != 11) {
            return false;
        } else {
            return true;
        }
    },
    isMail: function (val) {
        if (val == "") {
            return false;
        }
        if (!val.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            return false;
        } else {
            return true;
        }
    },
    isDate: function (str) {
        if (str.length != 0) {
            var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
            var r = str.match(reg);
            if (r == null) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    isLetter: function (str) {
        if (str.length != 0) {
            reg = /^[a-zA-Z]+$/;
            if (!reg.test(str)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    isInteger: function (str) {
        if (str.length != 0) {
            reg = /^[-+]?\d*$/;
            if (!reg.test(str)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    isChinese: function (str) {
        if (str.length != 0) {
            reg = /^[\u0391-\uFFE5]+$/;
            if (!reg.test(str)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    isString: function (str) {
        if (str.length != 0) {
            reg = /^[a-zA-Z0-9_]+$/;
            if (!reg.test(str)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    isZIP: function (str) {
        if (str.length != 0) {
            reg = /^\d{6}$/;
            if (!reg.test(str)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    maxValue: function (str, maxValue) {
        if (str.length != 0) {
            reg = /^[-+]?\d*$/;
            if (!reg.test(str)) {
                return false;
            } else {
                if (val > parseInt(maxValue)) {
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            return false;
        }
    },
    isCarCode: function (str) {
        if (str.length != 0) {
            reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
            if (!reg.test(str)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    isRate: function (str) {
        if (str.length != 0) {
            reg = /^\d+(\.\d{1,2})?$/;
            if (!reg.test(str)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}

function addInfo(_name, _tel, _province, _city, _dealer) {
    clickFlag = false;
    $.ajax({
        url: "http://www.sgmw.com.cn/ashx/reservation_json.aspx",
        dataType: 'jsonp',
        data: {
            aid: 0,
            fid: 0,
            lid: 0,
            name: _name,
            phone: _tel,
            key: md5(_tel).toUpperCase().substr(0, 10),
            province: _province,
            city: _city,
            dealercode: _dealer,
            cartype: '宝骏730',
            mark: '',
            source: '全新宝骏730预约试驾PC',
            ordering: 0,
            driving: 1,
            credit: 0

        },
        jsonp: 'callback',
        success: function (result) {
            var wr = result.success[0].result;
            if (wr == 1) {
                alert('预约成功');

                var p = $("#pro option:selected").text();
                var c = $("#city option:selected").text();
                var d = $("#delear option:selected").text();
                _smq.push(['custom', '17-baojun', '730millionsownerPC-home-sumbitsuccess', '{' + _name + '+' + _tel + '+' + p + '+' + c + '+success}']);

            } else if (wr == 2) {
                alert('您已预约成功,请勿重复提交');
            } else {
                alert('预约失败，请稍后重试');
            }
            clickFlag = true;
        }

    });
}