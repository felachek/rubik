Feature: Rubik's cube
    Description: The purpose of this feature is to test everything in the app

    Scenario: Shuffling
        Given the user see the rubik's cube
        When the user click on "Shuffle"
        Then the user can not click on any button while the cube is rotating
        And the user see the rubik's cube completely "shuffled"

    # Scenario: Solving
    #     Given the user see the rubik's cube scrambled
    #     When the user click on "Solve"
    #     Then the user can not click on any button while the cube is rotating
    #     And the user see the rubik's cube completely "solved"

    #  Scenario: Playing horizontally
    #     Given the user see the rubik's cube scrambled
    #     When the user click on "Y 0" for a single rotation
    #     Then the user can not click on any button while the cube is rotating
    #     But the user see the rubik's cube scrambled horizontally
    
    # Scenario: Playing vertically
    #     Given the user see the rubik's cube scrambled
    #     When the user click on "X 1" for a single rotation 
    #     Then the user can not click on any button while the cube is rotating
    #     But the user see the rubik's cube scrambled vertically

    # Scenario: Ipad mode
    #     Given the user see the rubik's cube in iPad mode
    #     When the user click on "Z 1" for a single rotation
    #     Then the user can not click on any button while the cube is rotating






   