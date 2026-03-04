const createElement = (arr) => {
    const createHtml = arr.map((el => `<span class="btn">${el}</span>`))
    return createHtml.join(" ")
}

const loading = (load) => {
    if(load== true){
        document.getElementById("loading").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }else{
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("loading").classList.add("hidden")
    }
}

const lodLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const removeActive = () => {
    const lessonButton = document.querySelectorAll(".lesson-btn")
    lessonButton.forEach(btn => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
    loading(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url).then(res => res.json())
        .then(data => {
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            removeActive()
            clickBtn.classList.add("active")
            levelWord(data.data)
        })
}

const lodWordD = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(url)
    const details = await res.json()
    displayWordDetails(details.data)
}

const displayWordDetails = (word) => {
    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML = `
                <div class="mb-4">
                    <h2 class="text-2xl font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h2>
                </div>
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold">Meaning</h2>
                    <p class="text-xl">${word.meaning}</p>
                </div>
                <div class="space-y-2 mt-5">
                    <h2 class="text-xl font-semibold">Example</h2>
                    <p class="text-xl">${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="text-xl font-semibold">সমার্থক শব্দ গুলো</h2>
                    <div class="gap-3">${createElement(word.synonyms)}</div>
                </div>
  `
    document.getElementById("my_modal").showModal()
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
        loading(false)
        return;
    }
    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML = `
         <div class="bg-white text-center rounded-xl shadow-md space-y-3 py-10 px-5 mx-3">
            <h2 class="text-2xl font-semibold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="text-xl">Meaning /Pronunciation</p>
            <div class="text-xl">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/ ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center mt-10">
                <button onclick="lodWordD(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordsContainer.append(card)
    })
    loading(false)
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = ""

    for (let lesson of lessons) {
        const buttonDive = document.createElement("div")

        buttonDive.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Learn - ${lesson.level_no}</button>
    `
        levelContainer.append(buttonDive)
    }
}

lodLessons()