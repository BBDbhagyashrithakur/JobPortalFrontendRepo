async function getUserInfo(accessToken) {
  fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
      accessToken
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("email", data.email);
      sessionStorage.setItem("authToken", accessToken);
      localStorage.setItem("profileImg", data.picture);
      getJwtToken(data);
    })
    .catch((error) => console.error("Error fetching user info:", error));
}
async function getJwtToken(data) {
  try {
      const response = await fetch(
        "https://jobportal.projects.bbdgrad.com/api/login/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );
      if (!response.ok) {
        sessionStorage.clear();
        localStorage.clear();
        throw new Error("Network response was not ok");
      }
   
      const verifiedUser = await response.json();
      sessionStorage.setItem("userToken", verifiedUser.token);
      console.log(verifiedUser);
  } catch (error) {
    
    console.error("Error:", error);
  }
    window.location.href = "https://jobportal.projects.bbdgrad.com/web/index.html";

}

function LogOut() {
  let authToken = sessionStorage.getItem("authToken");
  if (sessionStorage.getItem("userToken") != null) {
    fetch("https://oauth2.googleapis.com/revoke?token=" + authToken, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    }).then((data) => console.log(data));
    sessionStorage.clear();
    var url = new URL("https://jobportal.projects.bbdgrad.com/web/index.html");
    localStorage.clear();
    window.location.href = "https://jobportal.projects.bbdgrad.com/web/index.html";
  } else {
    window.alert("Already Logged Out");
  }
}
function SignIn() {
  let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
  let form = document.createElement("form");
  form.setAttribute("method", "GET");
  form.setAttribute("action", oauth2Endpoint);

  let params = {
    client_id:
      "468372946465-krq376qfcuqklalvshtilmbhgt34auvg.apps.googleusercontent.com",
    redirect_uri: "https://jobportal.projects.bbdgrad.com/web/index.html",
    response_type: "token",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    include_granted_scopes: "true",
    state: "pass-through-value",
  };

  for (var p in params) {
    let input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", p);
    input.setAttribute("value", params[p]);
    form.appendChild(input);
  }

  document.body.appendChild(form);

  form.submit();
}
