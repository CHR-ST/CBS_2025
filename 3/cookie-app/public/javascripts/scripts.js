const getUsers = async () => {
  const response = await fetch("/user");
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(JSON.stringify(data));
}

const getUser = async () => {
  const response = await fetch("/user/mikkel");
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(JSON.stringify(data));
}

const createUser = async () => {
  const response = await fetch("/user/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Hildur",
      password: "hildudigi",
      email: "hil.digi@cbs.dk",
    }),
  });
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(JSON.stringify(data));
}

const updateUser = async () => {
  const response = await fetch("/user/update/Hildur", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: "hildudigidoo" }),
  });
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(JSON.stringify(data));
}

const deleteUser = async () => {
  const response = await fetch("/user/delete/Hildur", {
    method: "DELETE",
  });
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(data.message);
}

const setCookie = async () => {
  const response = await fetch("/cookie/set");
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(data.message);
}

const getCookie = async () => {
  const response = await fetch("/cookie/get");
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(data.message);
}

const middleware = async () => {
  const response = await fetch("/middleware");
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(JSON.stringify(data));
}

const setSessionCookie = async () => {
  const response = await fetch("/cookie/set-session");
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(data.message);
}

const getSessionCookie = async () => {
  const response = await fetch("/cookie/get-session");
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(data.message);
}

const login = async () => {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: "mikkel" }),
  });
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(JSON.stringify(data));
}

const logout = async () => {
  const response = await fetch("/auth/logout", {
    method: "POST",
  });
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(JSON.stringify(data));
}

const protected = async () => {
  const response = await fetch("/auth/protected");
  const data = await response.json();
  console.log(response);
  console.log(data);
  alert(JSON.stringify(data));
}