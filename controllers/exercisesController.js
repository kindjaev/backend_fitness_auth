
export const exercisesHomePage = async (req, res) => {
    // res.send("welcome")
    try {
        const exerciseApi = "https://exercisedb.p.rapidapi.com/exercises"
        const exerciseOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.VITE_EXERCISE_OPTIONS_KEY,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };
        const exercisesData = await fetch(exerciseApi, exerciseOptions)
        const exercises = await exercisesData.json()
    
        const exercisesBodyPartsData = await fetch(`${exerciseApi}/bodyPartList`, exerciseOptions)
        const exercisesBodyPartsList = await exercisesBodyPartsData.json()
        // if(exercises.message) throw Error("You have exceeded the MONTHLY quota for Requests")
        const data = {exercises, exercisesBodyPartsList}
        res.json(data)
    } catch (error) {
        res.status(404).json({error: error.message})
    }

}

export const specificExercise = async (req, res) => {
    try {
        const {id} = req.params
        const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com/exercises/exercise/'
        const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com/search?query='
        const exerciseSimilarDbUrl = 'https://exercisedb.p.rapidapi.com/exercises'

        const exerciseImgURL =  'https://exercisedb.p.rapidapi.com/image?resolution=360&exerciseId=';
    
        const exerciseOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.VITE_EXERCISE_OPTIONS_KEY,
                'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
        };
    
        const youtubeOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.VITE_YOUTUBE_OPTIONS_KEY,
                'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
            }
        };

        const apiKey = process.env.VITE_YOUTUBE_OPTIONS_KEY; 
        const resolution = "360"; 
        const imageUrl = `https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=${resolution}&rapidapi-key=${apiKey}`;
    
        const exercisesData = await fetch(exerciseDbUrl + id, exerciseOptions)
        // const exercisesDataImg = await fetch(exerciseImgURL + id, exerciseOptions)
        const exercise = await exercisesData.json()
        exercise.gifUrl = imageUrl;

        const exercisesSimilarData = await fetch(exerciseSimilarDbUrl, exerciseOptions)
        const similarExercises = await exercisesSimilarData.json()
    
        const youtubeData = await fetch(youtubeSearchUrl + exercisesData.name + "exercise", youtubeOptions)
        const youtubeExercises = await youtubeData.json()
    
        const data = {exercise, youtubeExercises, similarExercises}
        res.json(data)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
 
}