
var clickFlag = true;
var can_draw = false;
var no_chance = false;
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
    var submit_type;
    if(is_pc){
        submit_type = 'PC';
    }else{
        submit_type = 'MB';
    }
    $.ajax({
        url: "http://www.sgmw.com.cn/ashx/reservation_json.aspx",
        dataType: 'jsonp',
        data: {
            aid: 165,
            fid: $_GET('MediaID'),
            lid: 0,
            name: _name,
            phone: _tel,
            key: md5(_tel).toUpperCase().substr(0, 10),
            province: _province,
            city: _city,
            dealercode: _dealer,
            cartype: '宝骏730',
            mark: '',
            source: '全新宝骏730预约试驾'+submit_type,
            ordering: 0,
            driving: 1,
            credit: 0

        },
        jsonp: 'callback',
        success: function (result) {
            var wr = result.success[0].result;
            if (wr == 1) {
                alert('预约成功！');
                can_draw = true;
                var p = $("#pro option:selected").text();
                var c = $("#city option:selected").text();
                var d = $("#delear option:selected").text();
                _tel = _tel.replace(_tel.substr(3,4),'****');
                if(is_pc){
                    _smq.push(['custom', '17-baojun', '730millionsownernewPC-home-submitsuccess', '{' + _name + '+' + _tel + '+' + p + '+' + c + '+' + _dealer + '}']);
                }else{
                    _smq.push(['custom', '17-baojun', '730millionsownernewMB-home-submitsuccess', '{' + _name + '+' + _tel + '+' + p + '+' + c + '+' + _dealer + '}']);
                }
                if (window.gsTracker) {
                    var orderid = leadsID;
                    gsTracker.addOrder(orderid, 1);
                    gsTracker.setEcomProperty(orderid, "1", _name);
                    gsTracker.setEcomProperty(orderid, "2", _tel);
                    gsTracker.setEcomProperty(orderid, "3", "宝骏730");
                    gsTracker.setEcomProperty(orderid, "4", p);
                    gsTracker.setEcomProperty(orderid, "5", c);
                    gsTracker.setEcomProperty(orderid, "6", _dealer);
                    gsTracker.addProduct(orderid, location.pathname, location.pathname, 1, 1, "全新宝骏730");
                    gsTracker.trackECom();
                    gsTracker.track("/targetpage/formsubmit/sqtywlpc");
                }
            } else if (wr == 2) {
                alert('您已预约成功,请勿重复提交');
            } else {
                alert('预约失败，请稍后重试');
            }
            clickFlag = true;
        }

    });
}
function $_GET(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}