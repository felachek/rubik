Feature: Rubik's cube
    Description: The purpose of this feature is to test everything in the app

    Scenario: Shuffling
        Given the user see the rubik's cube
        When the user click on "Shuffle"
        Then the user see a label "Shuffling..." at the top of the page
        But the user can not click on any button while the cube is rotating
        And the user see the rubik's cube completely "shuffled"

    Scenario: Solving
        Given the user see the rubik's cube scrambled
        When the user click on "Solve"
        Then the user see a label "Solving..." at the top of the page
        But the user can not click on any button while the cube is rotating
        And the user close the modal
        And the user see the rubik's cube completely "solved"

    Scenario: Ipad mode
        Given the user see the rubik's cube in iPad mode
        When the user click on "Z 1" for a single rotation
        Then the user see the background changing color to "rgb(63, 81, 181)"

    Scenario: Counter
        Given the user see the rubik's cube scrambled
        And the user see the counter equal "1"
        When the user click on "Solve"
        Then the user see a modal "You solved the button in 1 steps!"
        And the user close the modal
        And the user see the counter equal "0"






   