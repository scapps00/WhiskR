<!DOCTYPE html>
<html>
  <head>
    <title>
      <%=title %>
    </title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <script src="https://code.jquery.com/jquery.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
      <link rel="stylesheet" href="css/testStyle.css">
        <script src="transition.min.js"></script>
        <link href="http://getbootstrap.com/dist/css/bootstrap.min.css" rel="stylesheet">

          <!-- <link href="http://getbootstrap.com/examples/signin/signin.css" rel="stylesheet"> -->
          </head>
          <body>
            <!-- <% for(var i in messages) { %>
              <div class="flash"><%= messages[i] %></div>
            <% } %> -->

            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <form class="form-signin" action="/register" method="post">
                    <h2 class="form-signin-heading text-center">Register</h2>

                    <label for="email" class="sr-only">Username(email)l</label>
                    <input type="email" id="email" name="email" class="form-control" placeholder="E-mail" required>

                      <label for="password" class="sr-only">Password</label>
                      <input type="password" name="password" id="password" class="form-control" placeholder="Password" required>

                        <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                      </form>
                    </div>
                  </div>
                </div>
                <body>
                  <div id="app"></div>
                  <script src="bundle.js"></script>
                </body>

              </html>
