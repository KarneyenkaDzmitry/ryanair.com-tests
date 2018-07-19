Feature: Tests of ryanair.com 
 
 Background:
  Given I open url 'https://www.ryanair.com'

#  Scenario: Can choose a language at the top of page and the page becomes in the choosed language
#    Then The url is 'https://www.ryanair.com/gb/en/'
#     And see the text 'Sign up', 'Log in' at the header
#     And the button with text 'Continue'  
#    When I choose country 'Germany'
#    Then The url is 'https://www.ryanair.com/de/de/'
#     And see the text 'Registrieren', 'Einloggen' at the header
#     And the button with text 'Fortfahren' 
  
 Scenario Outline: booking flight tickets servise
   When I fill form for reason to buy '<ticket>' ticket from '<from_airport>' to '<to_airport>',out date '<fly_out>', back date '<fly_back>' for '<passengers>' passengers
   Then I see the page with next step with entered before data at the left side of the top of page in order:from '<from_airport>' to '<to_airport>' '<ticket>' '<passengers>' 
   Examples:
|ticket|from_airport|to_airport|  fly_out | fly_back |passengers|
|return|Berlin Tegel|   Bari   |25/08/2018|29/09/2018|  default |

  