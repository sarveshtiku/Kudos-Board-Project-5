## Unit Assignment: Kudos Board

Submitted by: **Sarvesh Tiku, Paola Negron, Liliana Cantero**

### Application Features

#### CORE FEATURES

##### Home Page

- [x] **Home Page Display**
  - [x] Home page includes the following features:
    - [x] Header
    - [x] Banner
    - [x] Search bar
    - [x] List of boards
    - [x] Footer
- [x] **Display Boards**
  - [x] Users can view a list of all boards in a grid view on the home page.
  - [x] For each board displayed, users can see:
    - [x] An image/gif
    - [x] A board title
- [x] **Filter Boards**
  - [x] Home page includes navigation bar, drop down, or some other mechanism which allows users to filter boards by the following categories:
    - [x] All/Home (displays all boards)
    - [x] Recent (displays the 6 most recently created boards)
    - [x] Celebration
    - [x] Thank you
    - [x] Inspiration
  - [x] When a category is clicked, boards matching the specified category are displayed.
- [x] **Search Functionality**
  - [x] Users can use a search bar to search for boards by title on the home page.
  - [x] The search bar should include:
    - [x] Text input field
    - [x] Submit/Search Button
    - [x] Clear Mechanism
  - [x] Boards with a title containing the search query in the text input field are displayed in a grid view when the user:
    - [x] Presses the Enter key
    - [x] Clicks the Submit/Search button 
  - [x] User can delete all text from the text input field. 
  - [x] When all text is cleared from the text input field, all boards are displayed in a grid view
- [x] **View Board** 
  - [x] Users can click on a board in the grid view to navigate to a new page containing that board's details.
- [x] **Add New Board**
  - [x] Users can create a new board on the home page.
  - [x] When creating a new board, users can specify the:
    - [x] Title (required)
    - [x] Category (required)
    - [x] Author (optional)
  - [x] Items listed as required above must have a value to succesffuly create a new board.
  - [x] When the board is successfully created, it appears in the grid of boards. 
- [x] **Delete Board**
  - [x] User can delete boards on the home page. 
  - [x] When the board is deleted, the board disappears from the grid of boards. 

##### Board Page

- [x] **Display Cards**
  - [x] For a given board, the board's page displays a list of all cards for that board in a grid view.
  - [x] For each card should displayed, users can see the card's:
    - [x] Message
    - [x] Gif 
    - [x] Number of upvotes
    - [x] Delete button
- [x] **Add New Card**
  - [x] Users can make a new card associated with the current board. 
  - [x] To successfully create a new card, users must specify the following:
    - [x] Text message (required).
    - [x] A gif users can search for and select within the form using the [GIPHY API](https://developers.giphy.com/docs/api/) (required).
  - [x] Users are given the option to specify the author of the card.
  - [x] When the new card is successfully created, it appears in the grid of cards. 
- [x] **Upvote Card**
  - [x] Users can upvote a card.
  - [x] Update the vote count on the card tile when a user clicks the upvote icon.
  - [x] When the upvote icon is clicked the upvote count increases by 1. 
  - [x] A user can upvote a card multiple times. 
- [x] **Delete Card**
  - [x] Users can delete cards.
  - [x] When the user clicks the delete button for a card, the card disappears from the grid of cards. 


####  Stretch Features
- [x] **User Accounts**
  - [x] Users should be able to log in with a username and password.
  - [x] Users should be able to sign up for a new account.
  - [x] Boards and cards should be associated with a user.
    - [x] Anonymous cards or cards by guest users should still be allowed.
  - [x] Add a new filter option on the home page to display only the current user's boards.
  - [x] Allow boards to be deleted only if they are owned by the user.


### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

Yes the topics discussed in labs from past units helped us complete this assignment. We were able to refer back and utilize everything that we have learned within the course thus far and apply it to this project. We also used to reassurance from the abundance of resources provided to venture and apply the concepts we learned towards implementing new features / using new api's that we hadn't used before.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If we had more time, our group might have asked more questions about the google authorization software and added more helpful but concise comments wihtin our code to help us follow more easily. We also might have implemented the dark mode functionality by learning how to utilize Material UI or another react component library.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

Our project demo went relatively well for it being our first time presenting as a group and in front of all of our peers. It was definitely nervewracking going into this presentation knowing that our code base wasn't completed yet, but we still presented as best as we could given that we also experienced an unexpected interuption as the laptop we were presenting from froze. I believe that setback caused us to lose our presentation flow, but we tried our best to recover from that and saw the presentation through to the end no matter how discouraged we might have felt in the moment. The feeback we received was helpful in the sense that I see us applying it to future projects, most notably our capstone project. After finishing our presentation, which was the first of 10, we tuned in to the others and took note of what they did that impressed us greatly. It's alot of pressure to be the first presenter, individually and as a group, but ultimately we did what we could and we are proud of ourselves for getting through this learning experience with our heads held high and looking forward to the learning experiences to come.

### Open-source libraries used

- https://developers.giphy.com/docs/api/
- https://developers.google.com/identity/protocols/oauth2

### Shout out

Shout out to our team members, consisting of Sarvesh Tiku, Paola Negron, and Liliana Cantero for being amazing students and taking the feedback in stride, no matter how off-putting the situation might have been. Also, a big shoutout to our Codepath instructors for being so open to helping us whenever we ran into trouble and also our peers who have been pillars of support throughout this program and this unit. We admire our cohort so much and look forward to spending the next 5 weeks working alongside one another to accomplish our dreams of breaking into the industry as university students. Thank you!
