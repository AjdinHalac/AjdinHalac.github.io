function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// document.getElementByClassName("page").each(function (i, e) {
//   this.click(function (event) {
//     let x = event.pageX;
//     let y = event.pageY;

//     let nextItem = i + 1;
//     if (nextItem >= document.getElementByClassName("page").length) {
//       nextItem = 0;
//     }

//     $(".page:eq(" + nextItem + ")").css(
//       "z-index",
//       parseInt(this.css("z-index")) + 1
//     );
//     $(".page:eq(" + nextItem + ")").css(
//       "clip-path",
//       "circle(0% at " + x + "px " + y + "px)"
//     );

//     anime({
//       targets: document.getElementByClassName("page")[nextItem],
//       update: function (anim) {
//         $(".page:eq(" + nextItem + ")").css(
//           "clip-path",
//           "circle(" + anim.progress * 2 + "% at " + x + "px " + y + "px)"
//         );
//       },
//     });
//   });
// });

if (window.sessionStorage.getItem("biocerticaAuthorizationCode") !== null) {
  document.getElementById("page-choose").style.zIndex = 0;
  document.getElementById("page-implicit-login").style.zIndex = 0;
  document.getElementById("page-authorization-code-login").style.zIndex = 0;
  document.getElementById("page-implicit-logged-in").style.zIndex = 0;
  document.getElementById("page-authorization-logged-in").style.zIndex = 1;
  document.getElementById("btn-oauth").style.zIndex = 0;
  const code = sessionStorage.getItem("biocerticaAuthorizationCode");
  document.getElementById("code").innerText =
    "Your authorization code: " + code;
} else if (window.localStorage.getItem("biocerticaIDToken") !== null) {
  document.getElementById("page-choose").style.zIndex = 0;
  document.getElementById("page-implicit-login").style.zIndex = 0;
  document.getElementById("page-authorization-code-login").style.zIndex = 0;
  document.getElementById("page-implicit-logged-in").style.zIndex = 1;
  document.getElementById("page-authorization-logged-in").style.zIndex = 0;
  document.getElementById("btn-oauth").style.zIndex = 0;
  const profile = parseJwt(localStorage.getItem("biocerticaIDToken"));
  document.getElementById("firstName").innerText =
    "First name: " + profile.first_name;
  document.getElementById("lastName").innerText =
    "Last name: " + profile.last_name;
  document.getElementById("email").innerText = "Email: " + profile.email;
  document.getElementById("phoneNumber").innerText =
    "Phone number: " + profile.phone;
  document.getElementById("accessToken").innerText =
    "Access Token: " + localStorage.getItem("biocerticaAccessToken");
  document.getElementById("refreshToken").innerText =
    "Refresh Token: " + localStorage.getItem("biocerticaRefreshToken");
  document
    .getElementById("recommendation")
    .addEventListener("click", async function () {
      await bapi.getProducts();
      document.getElementById("vitaminA").innerText =
        "Product recommendation based on DNA Results: " +
        JSON.stringify(window.bapi.products);
    });
} else {
  document.getElementById("page-choose").style.zIndex = 1;
  document.getElementById("page-implicit-login").style.zIndex = 0;
  document.getElementById("page-authorization-code-login").style.zIndex = 0;
  document.getElementById("page-implicit-logged-in").style.zIndex = 0;
  document.getElementById("page-authorization-logged-in").style.zIndex = 0;
  document.getElementById("btn-oauth").style.zIndex = 0;
}

document
  .getElementById("btn-implicit")
  .addEventListener("click", async function () {
    bapi.init(
      "d916027f-2f42-4b38-b2aa-b9eecb1dd50d",
      window.location.href.split("?")[0],
      "implicit",
      "token"
    );
    document.getElementById("page-choose").style.zIndex = 0;
    document.getElementById("page-implicit-login").style.zIndex = 1;
    document.getElementById("page-authorization-code-login").style.zIndex = 0;
    document.getElementById("page-implicit-logged-in").style.zIndex = 0;
    document.getElementById("page-authorization-logged-in").style.zIndex = 0;
    document.getElementById("btn-oauth").style.zIndex = 2;
  });

document
  .getElementById("btn-code")
  .addEventListener("click", async function () {
    bapi.init(
      "d916027f-2f42-4b38-b2aa-b9eecb1dd50d",
      window.location.href.split("?")[0],
      "authorization_code",
      "code"
    );
    document.getElementById("page-choose").style.zIndex = 0;
    document.getElementById("page-implicit-login").style.zIndex = 0;
    document.getElementById("page-authorization-code-login").style.zIndex = 1;
    document.getElementById("page-implicit-logged-in").style.zIndex = 0;
    document.getElementById("page-authorization-logged-in").style.zIndex = 0;
    document.getElementById("btn-oauth").style.zIndex = 2;
  });

document
  .getElementById("btn-logout-implicit")
  .addEventListener("click", async function () {
    document.getElementById("page-choose").style.zIndex = 1;
    document.getElementById("page-implicit-login").style.zIndex = 0;
    document.getElementById("page-authorization-code-login").style.zIndex = 0;
    document.getElementById("page-implicit-logged-in").style.zIndex = 0;
    document.getElementById("page-authorization-logged-in").style.zIndex = 0;
    document.getElementById("btn-oauth").style.zIndex = 0;
    localStorage.clear();
  });

document
  .getElementById("btn-logout-code")
  .addEventListener("click", async function () {
    document.getElementById("page-choose").style.zIndex = 1;
    document.getElementById("page-implicit-login").style.zIndex = 0;
    document.getElementById("page-authorization-code-login").style.zIndex = 0;
    document.getElementById("page-implicit-logged-in").style.zIndex = 0;
    document.getElementById("page-authorization-logged-in").style.zIndex = 0;
    document.getElementById("btn-oauth").style.zIndex = 0;
    sessionStorage.clear();
  });
