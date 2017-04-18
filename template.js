module.exports.generate = (obj) => {
  let compiledString = '';

  function parseBlock(el) {
    el.tags.forEach((tag) => {
      if (typeof TEMPLATES[tag.tag] !== 'function') return;

      compiledString += TEMPLATES[tag.tag](tag);
    });
  };

  const TEMPLATES = {

    title: val => {
      return `**${val}**
      ----`;
    },

    desc: val => {
      return `  ${val}`;
    },

    url: val => {

    }
  }

  obj.forEach(parseBlock);

//   let temp = `
// **${template}**
// ----
//   Returns json data about a single user.

// * **URL**

//   /users/:id

// * **Method:**

//   \`GET\`

// *  **URL Params**

//    **Required:**

//    \`id=[integer]\`

// * **Data Params**

//   None

// * **Success Response:**

//   * **Code:** 200 <br />
//     **Content:** \`{ id : 12, name : "Michael Bloom" }\`

// * **Error Response:**

//   * **Code:** 404 NOT FOUND <br />
//     **Content:** \`{ error : "User doesn't exist" }\`

//   OR

//   * **Code:** 401 UNAUTHORIZED <br />
//     **Content:** \`{ error : "You are unauthorized to make this request." }\`

// * **Sample Call:**

//   \```javascript
//     $.ajax({
//       url: "/users/1",
//       dataType: "json",
//       type : "GET",
//       success : function(r) {
//         console.log(r);
//       }
//     });
//   \```
// `;

  return JSON.stringify(obj, 0, 2);
}