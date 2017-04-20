*Simple Rest Api Documentation Generator*
----

This documentation generator parses specified files in search for comments, and outputs them into one markdown file (DOCUMENT.md by default).
This project was created in need of tool to document REST Api to README.md file that is being displayed on github.

The notation was inspired by this article: [Documenting your REST API](https://gist.github.com/iros/3426278)

### How it works ###

It is really simplified, and created for specific use. It parses only comments beginning with two asterisks after slash e.g. `/** */`,
and it looks only for these tags:
- @h1
- @title
- @desc
- @method
- @data
- @success-code
- @success-content (displayed as js)
- @error-code
- @error-content
- @sample-call (displayed as js)

### Usage: ###

```javascript
const docs = require('simple-rest-docs');

const options = {
  files: ['./index.js'], // glob pattern
  output: './README.md', //default './DOCUMENT.md'
  // parsers: []
}

docs(options);
```

To read more about `parsers: []` option, read [comment-parser documentation](https://github.com/yavorskiy/comment-parser)

### Example ###

###### COMMENT IN CODE: ######

```
/**
 * @title Register Route
 *
 * @desc This is the description of register user route
 *
 * @method POST
 *
 * @url /some/test
 * @data email
 * @data password
 * @data age
 * @data displayName
 *
 * @success-code 200
 * @success-content
 * {
 *    token,
 *    user {
 *      _id: '12311231',
 *      displayName: 'John Smith',
 *      email: 'example@test.com',
 *      role: 'admin'
 *    }
 * }
 *
 * @error-code 422
 * @error-content {error}
 *
 * @sample-call
 * $.ajax({
 *    url: '/auth/register',
 *    dataType: 'json',
 *    data: {
 *      email: 'example@mail.com',
 *      password: 'kitty123',
 *      age: 20,
 *      displayName: 'sampleman'
 *    },
 *    type: 'POST',
 *    success: function(res) {}
 * });
 *
 * @note This is still in development.
 */
```

###### PARSED TO: ######

## Register Route ##

  Returns json data about a single user.

* **URL**

    `/some/test`

* **Method:**

    `POST`

- **Data Params**

    `email`

    `password`

    `age`

    `displayName`

- **Success Response:**

    - **Code:** 200<br>**Content:**
      ```
        {
            token, user {
                _id: '12311231',
                displayName: 'John Smith',
                email: 'example@test.com',
                role: 'admin'
            }
        }
      ```

- **Error Response:**

    * **Code:** 422<br>**Content:**
      `{error}`

- **Sample Call:**

  ```javascript
    $.ajax({
        url: '/auth/register',
        dataType: 'json',
        data: {
            email: 'example@mail.com',
            password: 'kitty123',
            age: 20,
            displayName: 'sampleman'
        },
        type: 'POST',
        success: function (res) {}
    });
  ```
<br>
