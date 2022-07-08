import request from "@/utils/request";

export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

//获取登录验证码接口
export const getSmsCode = (mobile) => {
  return request({
    method: "GET",
    url: `v1_0/sms/codes/${mobile}`,
  });
};

//获取用户信息接口
export const fetchUserInfo = () => {
  return request({
    method: "GET",
    url: "v1_0/user",
  });
};
