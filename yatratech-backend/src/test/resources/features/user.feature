Feature: user
  Scenario Outline: Fetch users
    Given get list of users
    And find by user id

    Examples:
      | user_id | email            | first_name | last_name | password   | phone_number | role | otp |
      | 1       | random123@gmail.com| random     | random     | random | 9822222222   | USER |     |