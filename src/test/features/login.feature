Feature: Login page
    Feature Login page will work depending on the user credentials.

  Background: 
    Given A web browser is at the orangehrm login page

  Scenario: Success Login
    When A user enters the username "Admin", the password "admin123", and clicks on the login button
    Then the url will contains the index subdirectory
