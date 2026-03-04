const lodLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url).then(res => res.json()).then(data => levelWord(data.data))
}

const levelWord = (words) => {
    const wordsContainer = document.getElementById("word-container")
    wordsContainer.innerHTML = ""
    if (words.length == 0) {
        wordsContainer.innerHTML = `
          <div class="text-center bg-white col-span-full py-20 space-y-3 mx-6 rounded-xl">
            <img class="mx-auto" src="./images/alert-error.png" alt="">
            <p class="text-gray-400 text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-4xl font-bold bangla">নেক্সট Lesson এ যান</h1>
        </div>

   `
        return;
    }
    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML = `
         <div class="bg-white text-center rounded-xl shadow-md space-y-3 py-10 px-5 mx-3">
            <h2 class="text-2xl font-semibold">${word.word ? word.word:"শব্দ পাওয়া যায়নি"}</h2>
            <p class="text-xl">Meaning /Pronounciation</p>
            <div class="text-xl">"${word.meaning ? word.meaning :"অর্থ পাওয়া যায়নি"}/ ${word.pronunciation? word.pronunciation : "pronunciation পাওয়া যায়নি" }"</div>
            <div class="flex justify-between items-center mt-10">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordsContainer.append(card)
    })
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ""

    for (let lesson of lessons) {
        const buttonDive = document.createElement("div")

        buttonDive.innerHTML = `
    <button onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Learn - ${lesson.level_no}</button>
    `
        levelContainer.append(buttonDive)
    }
}

lodLessons()