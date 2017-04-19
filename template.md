**<%= data.title %>**
----
<% if (isDefined(data.desc) && data.desc.length > 0) { %>
  Returns json data about a single user.
<% } %>

<% if (isDefined(data.url) && data.url.length > 0) { %>
* **URL**

  <% data.url.forEach(url => { %>
    `<%= url %>`
  <% }) %>
<% } %>

<% if (isDefined(data.method) && data.method.length > 0) { %>
* **Method:**

  <% data.method.forEach(val => { %>
    `<%= val %>`
  <% }) %>
<% } %>

<% if (isDefined(data.param) && data.param.length > 0) { %>
*  **URL Params**

  <% data.param.forEach(val => { %>
    `<%= val %>`
  <% }) %>
<% } %>

<% if (isDefined(data.data) && data.data.length > 0) { %>
* **Data Params**

  <% data.data.forEach(val => { %>
    `<%= val %>`
  <% }) %>
<% } %>

<% if (isDefined(data['success-content']) && data['success-content'].length > 0) { %>
* **Success Response:**

  <% data['success-content'].forEach((val, i) => { %>
    * <% if (isDefined(data['success-code'][i])) { %>**Code:** <%= data['success-code'][i] %><br><% } %>**Content:** `<%= data['success-content'] %>`
  <% }) %>
<% } %>

<% if (isDefined(data['error-content']) && data['error-content'].length > 0) { %>
* **Error Response:**

  <% data['error-content'].forEach((val, i) => { %>
    * <% if (isDefined(data['error-code'][i])) { %>**Code:** <%= data['error-code'][i] %><br><% } %>**Content:** `<%= data['error-content'] %>`
  <% }) %>
<% } %>

<% if (isDefined(data['sample-call']) && data['sample-call'].length > 0) { %>
* **Sample Call:**

  ``
    <%= data['sample-call'] %>
  ``
<% } %>