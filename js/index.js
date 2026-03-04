const lodLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const displayLesson = (lessons) =>{
   const levelContainer=document.getElementById("level-container")
   levelContainer.innerHTML=""

   for(let lesson of lessons){
    const buttonDive=document.createElement("div")

    buttonDive.innerHTML=`
    <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Learn - ${lesson.level_no}</button>
    `
    levelContainer.append(buttonDive)
   }
}

    lodLessons()