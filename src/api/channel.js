import request from "@/utils/request";

export const getUserChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

//获取所有频道数据
export const fethAllChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/channels",
  });
};
