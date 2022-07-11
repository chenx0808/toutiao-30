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

export const fethAddChannels = (channle) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channle],
    },
  });
};
export const deleteUserChannel = (channleId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/channels/${channleId}`,
  });
};
