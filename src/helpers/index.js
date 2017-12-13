
const capitalizeFirstLetters = (str) => {
    const arr = str.split(' ')
    const newArr = arr.map(word => {
        return word[0].toUpperCase() + word.slice(1)
    })
    return newArr.join(' ')
}

export { capitalizeFirstLetters }