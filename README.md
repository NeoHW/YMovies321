<center><h1>NUS Orbital 2023</h1></center>

### Proposed Level of Achievement:
Project Apollo

### Motivation:
As university students, we have little free time to enjoy ourselves, and given the huge selection of movies available to us, we are spoilt for choice. We all know the feeling of browsing movies only to realise our free time was wasted, or even worse, sitting through a boring movie.  
Why not use a local movie review website which is frequented by many other moviegoers of similar ages?

### Aim:  
In order to give student movie buffs a place to find and discuss information about their favourite movies, we want to create a web application. The website's objective is to make it simpler for users to find movies, read reviews, and submit their own evaluations. In doing so, it hopes to foster a community of movie fans who can exchange ideas and suggestions.

### User Stories:

1. I want to be able to search for movies by genre as a university student so that I can find films that interest me.  
2. I want to be able to read user evaluations as a university student so that I may choose movies to watch with knowledge.  
3. I want to be able to rate and review movies as a university student so that I can express my thoughts to other users.  
4. I want to be able to add movies to a watchlist as a university student so that I can remember which ones I want to see later.  
5. I want to be able to make playlists of my favourite movies as a student so that I can quickly access them later.  

### Features and Timeline

**Liftoff: Week 1 (8 May - 15 May):**  
Define project scope and requirements  
Conduct research on movie databases and APIs  

**Week 2-4 (16 May - 5 Jun):**  
Implement user authentication and user account system  
Set up the movie database and integrate it with an API to retrieve movie data  

**Evaluation Milestone 1 (29 May):**  
Review progress and ensure development is on track  

**Week 5-7 (6 Jun - 26 Jun):**  
Develop a search feature that allows users to search for movies by title or keyword  
Develop a movie detail page that displays information about the movie, including ratings, reviews  
Implement a review feature that allows users to leave ratings and reviews for movies  

**Evaluation Milestone 2 (26 Jun):**  
Review progress and ensure development is on track  

**Week 8-9 (27 Jun - 10 Jul):**  
Create a watchlist feature that allows users to save movies to watch later  
Implement a recommendation engine that suggests movies based on user ratings and watch history  

**Evaluation Milestone 3 (24 Jul):**  
Review progress and ensure development is on track  

**Week 10-11 (11 Jul - 24 Jul):**  
Test and debug the web application thoroughly  
Address any issues or bugs identified during testing  
Prepare the web application for deployment to a production environment  

**Week 12 (25 Jul - 31 Jul):**  
Deploy the web application to a production environment  
Finalize documentation and user guides  



### Use Cases and Features
1. User Registration:
    - Feature: Allow users to create an account by providing their email and password.
    - Use Case: As a user, I want to register for an account so that I can access additional features and participate in the community.

2. User Login:
    - Feature: Enable users to log in to their accounts securely.
    - Use Case: As a registered user, I want to log in to my account to access personalized content and preferences.

3. Movie Search:
    - Feature: Provide a search functionality to allow users to search for movies by title or keyword.
    - Use Case: As a user, I want to search for movies based on my interests or specific criteria.

4. Movie Details:
    - Feature: Display detailed information about a selected movie, including synopsis, release date, genre, and cast.
    - Use Case: As a user, I want to view comprehensive information about a movie before deciding to watch it.

5. User Ratings and Reviews:
    - Feature: Allow users to rate and write reviews for movies they have watched.
    - Use Case: As a user, I want to share my opinions and experiences by rating and reviewing movies.

6. Watchlist:
    - Feature: Enable users to create and manage a watchlist of movies they plan to watch.
    - Use Case: As a user, I want to save movies to my watchlist for future reference and easy access.

7. Recommendations:
    - Feature: Provide personalized movie recommendations based on user ratings and watch history.
    - Use Case: As a user, I want to receive movie suggestions tailored to my preferences and interests.

8. User Profile:
    - Feature: Allow users to customize their profiles, including adding a profile picture and bio.
    - Use Case: As a user, I want to personalize my profile and share information about myself with the community.

### Flow and Architecture

1. User Registration and Login: Users can register for an account using their Google account. Once registered, they can log in securely using their credentials.

2. Movie Search and Details: Users can search for movies based on titles or keywords. The search results display a list of matching movies, and users can click on a movie to view its detailed information, including synopsis, release date, genre, and cast.

3. User Ratings and Reviews: Users can rate and write reviews for movies they have watched. They can express their opinions, provide ratings, and share their thoughts with other users.

4. Watchlist and Recommendations: Users can add movies to their watchlist to keep track of movies they plan to watch. The system provides personalized recommendations based on the user's ratings and watch history to suggest movies that align with their interests.

5. User Profile and Playlists: Users can customize their profiles by adding a profile picture and bio.

### Architecture & tech-stack

- Front-end: React

- Back-end: Node.js

- Database: Google Firebase

- Deployment: Vercel

### Reasons for choosing React
1. Component-Based Architecture: React follows a component-based architecture, which allows us to break down the user interface into smaller, reusable components. This modular approach promotes code reusability, maintainability, and scalability. We can create components for different sections of our application, such as movie lists, search bars, movie details, reviews, and user authentication. This modular structure will make it easier to develop and update different parts of the application independently.
2. Virtual DOM: React utilizes a virtual DOM that efficiently updates and renders only the necessary components when changes occur. This approach minimizes the number of actual DOM manipulations, resulting in improved performance and faster rendering. In YMovies321, where users can interact with various components and update data dynamically, React's virtual DOM will enhance the overall user experience by providing smooth and responsive interactions.

### Database ER diagram
![ER diagram](/Ymovies321%20DB%20planning.png)

### Design principles and patterns

- Responsive Design: The application is designed to be responsive and adapt to different screen sizes and devices. This ensures that users can access and interact with the application effectively on desktops, laptops, tablets, and mobile devices.

- Minimalistic and Intuitive UI: The user interface (UI) follows a minimalistic design approach, focusing on clarity, simplicity, and ease of use. Clear navigation, intuitive icons, and well-organized content help users quickly find and access the desired features and information.

- Consistency and Visual Hierarchy: The application maintains a consistent design language, including color schemes, typography, and iconography. A clear visual hierarchy is established to guide users' attention and highlight important information, such as movie titles, ratings, and user reviews.

- Feedback and Error Handling: Interactive elements provide visual feedback to indicate user actions and system responses. Error handling is implemented to provide informative and user-friendly error messages when necessary, helping users understand and resolve any issues that may occur.

### Design Decisions

- Card-based Layout: The movie listings, search results, and movie details pages are designed using a card-based layout. Each card represents a movie and displays key information, such as the movie poster, title, genre, and average rating. This layout provides a visually appealing and organized way to present movie information and encourages users to explore different movies.

- Intuitive Navigation: The application utilizes a clear and intuitive navigation system. A top navigation bar provides access to different sections, such as Home, Search, Watchlist, and Profile. A drop-down menu is used to access additional features, including profiles and settings. This navigation structure ensures that users can easily navigate between different pages and sections of the application.

- Ratings and Reviews: The user interface for rating and reviewing movies is designed to be straightforward and user-friendly. Users can provide ratings using a star-based system and write reviews in a text input field. Users would be able to see other users' reviews too!

- Interactive Watchlist: The watchlist feature is designed to be interactive, allowing users to add and remove movies easily. A dedicated watchlist page displays the saved movies, and users can manage their watchlist by marking movies as watched or removing them from the list.


### SWE Practices
- Agile methodology: As a student-led project, we are taking into consideration that the product we are developing is in an environment susceptible to change. Therefore, we are using the Scrum methodology, in which we are breaking our tasks into delivery cycles called sprints, which generally last from a week to two. This way, work would be incremental and focused on previous work.

- Version Control: We would be utilizing a version control system (Git) to manage source code changes. We took the time to ensure that both team members are familiar with version control best practices. We would be creating branches for feature developments and also performing regular code reviews.

- Code Reviews: We have implemented a code review process to maintain code quality and catch potential issues early. We will be conducting regular code reviews among team members to provide feedback, identify bugs, improve code readability, and enforce coding standards.

- User Testing: We have wrote more than 25 test cases, testing various states (signed in vs signed out) to clearly document and easily replicate testing for expected behaviour and account for edge cases:

- Kanban Board: we are utilizing a Kanban board to track tickets and issues. The Kanban board helps us visualize our workflow, manage tasks, and improve overall productivity. Here's an example of how we are using the Kanban board in our project:
![Kanban Board](/Kanban%20Board.jpg)
