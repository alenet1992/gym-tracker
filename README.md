# My Workout Plan

A simple and organized web application to view and track your workout plans.

## Features

### 📋 Plan Visualization
- **Plan 1**: Functional + Full Body (Circuit)
- **Plan 2**: Upper Body Strength (Progressive Load)
- **Plan 3**: Functional + Legs (Power and Endurance)
- **Plan 4**: Lower Body Strength (Progressive Load)

### 🏋️ Workout Management
- **View Details**: View all exercises for each plan
- **Start Workout**: Begin a workout with timer
- **Mark Exercises**: Mark exercises as completed during workout
- **Exercise Details**: Click on any exercise to see detailed instructions, tips and **demonstration videos/images**
- **Multimedia Content**: YouTube videos and images to demonstrate proper exercise execution
- **Visual Indicators**: Icons show which exercises have video 🎥 or image 📷 available

### 📊 History
- **Automatic Recording**: All workouts are saved automatically
- **Statistics**: View duration and completed exercises for each workout
- **Local Storage**: Data is stored in your browser

## How to Use

### 1. Start the Server
```bash
cd "gym-tracker"
python3 -m http.server 8000
```

### 2. Open in Browser
Go to: `http://localhost:8000`

### 3. Navigate the Application

#### View Plans
- On the home page, you'll see the 4 available plans
- Click "View Details" to see all exercises
- Click "Start Workout" to begin a workout

#### During Workout
- The timer starts automatically
- Click on any exercise name to see instructions
- Mark each exercise as "Done" when completed
- Click "Finish Workout" when you're done

#### View History
- Click "History" in the top menu
- See all your previous workouts with statistics

## Plan Structure

### Plan 1 - Functional + Full Body
- **Warm-up**: 10 min (bike + mobility)
- **Circuit**: 3 rounds, 45"ON/15"OFF
- **Core**: Abs and plank

### Plan 2 - Upper Body Strength
- **Warm-up**: 10 min (elliptical + activation)
- **Strength**: 3x15 reps (back, chest, arms)
- **Cardio**: 10 min bike

### Plan 3 - Functional + Legs
- **Warm-up**: 8-10 min (stairs + mobility)
- **Circuit**: 2-3 rounds (functional exercises)
- **Core**: Side plank + V-ups

### Plan 4 - Lower Body Strength
- **Warm-up**: 5-7 min (walking + mobility)
- **Strength**: 3 progressive sets (complete legs)
- **Cardio**: 10 min light running

## Technologies Used

- **HTML5**: Application structure
- **CSS3**: Responsive and modern design
- **JavaScript**: Application logic and interactivity
- **LocalStorage**: Workout history storage
- **Font Awesome**: Icons

## Technical Features

### Multimedia Content
- **Videos**: YouTube integration for exercise demonstrations
- **Images**: Illustrative photos of proper execution
- **Indicators**: Visual icons to identify exercises with multimedia content
- **Responsive**: Videos and images adapt to all screen sizes

### Local Storage
- Workouts are saved in the browser's `localStorage`
- Maintains history of the last 50 workouts
- Data persists between sessions

### Responsive Interface
- Adapted for desktop, tablet and mobile
- Modern design with gradients and shadows
- Smooth animations and visual feedback
- Videos with responsive 16:9 aspect ratio

### Keyboard Shortcuts
- **ESC**: Close details modal
- **1-4**: Quick access to plans (on main view)

## Customization

You can easily customize:

1. **Add New Exercises**: Edit the `workoutPlans` object in `script.js`
2. **Modify Colors**: Change CSS variables in `styles.css`
3. **Add Videos/Images**: Include URLs in exercise data using the structure:
   ```javascript
   media: {
       type: "video", // or "image"
       url: "https://www.youtube.com/embed/VIDEO_ID", // or image URL
       thumbnail: "https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg", // for videos
       alt: "Image description" // for images
   }
   ```

## Support

The application works on all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

---

**Happy workouts! 💪**