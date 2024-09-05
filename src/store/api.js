// export const domain = "https://api.bppindia.com";
export const domain = "http://localhost:3001";

const endpoints = {
  loginMaster: "/auth/loginMaster/",
  getBppMember: "/user/getBppMember/",
};



function getURLbyEndPointV2(endpoint, id) {
  let url = domain + "/api" + endpoints[endpoint];
  if (id) {
    // Replace the placeholder with the actual ID
    url = url.replace(":id", id);
  }
  return url;
}

export { endpoints, getURLbyEndPointV2 };
