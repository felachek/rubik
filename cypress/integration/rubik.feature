Feature: Rubik's cube
    Description: The purpose of this feature is to test everything in the app

    #     Background: User is Logged In
    #     # Given the following images exist:
    #     #     | name      | url                                                              |
    #     #     | Elic      | https://ca.slack-edge.com/T192ZHTT4-U2MEQHZ9S-137747cdff3c-512   |
    #     #     | Samuel    | https://ca.slack-edge.com/T192ZHTT4-U01KWQF39LN-8080fc3f2458-512 |
    #     #     | Mingo     | https://ca.slack-edge.com/T192ZHTT4-U016V9H9MJ8-fdb251e7e074-512 |
    #     #     | LQ        | https://ca.slack-edge.com/T192ZHTT4-U88KPTF8Q-0be7469703ed-512   |
    #     #     | Youssef   | https://ca.slack-edge.com/T192ZHTT4-U01NJ00HNLX-90d63b76081e-512 |
    #     #     | Karl      | https://ca.slack-edge.com/T192ZHTT4-U01NVL6N7GD-0c05e7c0978f-512 |
    #     #     | Sebastien | https://ca.slack-edge.com/T192ZHTT4-U8N6E07U7-0d4c6de5459f-512   |
    #     #     | Simon     | https://ca.slack-edge.com/T192ZHTT4-U010T88C37V-2972b3b81e04-512 |
    #     #     | Romain    | https://ca.slack-edge.com/T192ZHTT4-U02F3AV71JL-0b4965a7e93e-512 |
    #     #     | Iman      | https://ca.slack-edge.com/T192ZHTT4-U02EE9UDVHS-bf16c89e0a30-512 |

    Scenario: Shuffling
        Given the user see the rubik's cube
        When the user click on "Shuffle"
#         Then the user can not click on any button
        # And the user see the rubik's cube scrambled

    Scenario: Solving
        Given the user see the rubik's cube scrambled
        When the user click on "Solve"
        # Then the user can not click on any button
        # And the user see the rubik's cube solved
