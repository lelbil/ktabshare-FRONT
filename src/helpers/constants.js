const defaultBookCoverImageUrl = "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"

//Language
const ARABIC = 'arabic'
const ENGLISH = 'english'
const FRENCH = 'french'
const ITALIAN = 'italian'
const SPANISH = 'spanish'
const GERMAN = 'german'

const languages = [ ARABIC,  ENGLISH,  FRENCH,  ITALIAN,  SPANISH,  GERMAN]

const genres = [
    "science fiction",
    "drama",
    "action and adventure",
    "romance",
    "mystery",
    "horror",
    "self help",
    "health",
    "guide",
    "travel",
    "children",
    "religion",
    "science",
    "maths",
    "poetry",
    "encyclopedia",
    "dictionary",
    "comic",
    "art",
    "cookbook",
    "biography",
    "autobiography",
    "fantasy",
    "other",
].sort()

export { defaultBookCoverImageUrl, languages, genres }