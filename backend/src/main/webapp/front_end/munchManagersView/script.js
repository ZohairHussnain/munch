let tablesGrid = document.querySelector("#tableGrid")
let numberOfTables = tablesGrid.childElementCount
let statisticsGrid = document.querySelector('#statisticsGrid')
let navbar = document.querySelector("#navbar")
let  navbarDay = `<li class="nav-item">
<a class="nav-link active" aria-current="page">Today</a>
</li>
<li class="nav-item">
<a class="nav-link" onclick="showWeek()">Week</a>
</li>
<li class="nav-item">
<a class="nav-link" onclick="showMonth()">Month</a>
</li>
<li class="nav-item">
<a class="nav-link disabled" aria-disabled="true">Year</a>
</li>`
let navbarWeek = `<li class="nav-item">
<a class="nav-link" onclick="showDay()" >Today</a>
</li>
<li class="nav-item">
<a class="nav-link active" aria-current="page" onclick="showWeek()">Week</a>
</li>
<li class="nav-item">
<a class="nav-link" onclick="showMonth()">Month</a>
</li>
<li class="nav-item">
<a class="nav-link disabled" aria-disabled="true">Year</a>
</li>`

let  navbarMonth = `<li class="nav-item">
<a class="nav-link" onclick="showDay()" >Today</a>
</li>
<li class="nav-item">
<a class="nav-link" onclick="showWeek()">Week</a>
</li>
<li class="nav-item">
<a class="nav-link active" aria-current="page"" onclick="showMonth()">Month</a>
</li>
<li class="nav-item">
<a class="nav-link" aria-disabled="true">Year</a>
</li>`
let weeklyStats = `    <div class="col">
<div class="card">
  
  <div class="card-body text-center">
    <h5 class="card-title">540</h5>
    <p class="card-text">Tables Served</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">
 
  <div class="card-body text-center">
    <h5 class="card-title">21.2  min  </h5>
    <p class="card-text">Average Wait time</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">3.8</h5>
    <p class="card-text">Average Raiting</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Salad</h5>
    <p class="card-text">Most popular starter</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Burger</h5>
    <p class="card-text">Most popular Main</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Ice-cream</h5>
    <p class="card-text">Most popular Desert</p>
  </div>
</div>`
let dailyStats = `<div class="col">
<div class="card">
  
  <div class="card-body text-center">
    <h5 class="card-title">18</h5>
    <p class="card-text">Tables Served</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">
 
  <div class="card-body text-center">
    <h5 class="card-title">11.2  min  </h5>
    <p class="card-text">Average Wait time</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">4.5</h5>
    <p class="card-text">Average Raiting</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Hummus</h5>
    <p class="card-text">Most popular starter</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Mansaf</h5>
    <p class="card-text">Most popular Main</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Kunafa</h5>
    <p class="card-text">Most popular Desert</p>
  </div>
</div>
</div>`
function addTable() {
    numberOfTables++
    let newTable = `<div class="col">
    <div class="card h-100" style="border: 2px solid darkred;">
      <div class="card-header"> <h5 class="card-title">Table ${numberOfTables}</h5>
          <h5 class="card-title"></h5> 
      </div>
       <div class="card-body"><p class="card-text">No Costumers Yet</p></div>
      
      
      <div class="card-footer">
      <a href="qrCode.html" class="stretched-link"></a>
        <small class="text-muted">Last updated 1 mins ago</small>
      </div>
  </div>
    </div>`
    tablesGrid.insertAdjacentHTML('beforeend', newTable)
}

let monthlyStats = `    <div class="col">
<div class="card">
  
  <div class="card-body text-center">
    <h5 class="card-title">12,531</h5>
    <p class="card-text">Tables Served</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">
 
  <div class="card-body text-center">
    <h5 class="card-title">17 min  </h5>
    <p class="card-text">Average Wait time</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">3.5</h5>
    <p class="card-text">Average Raiting</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Lental Soup </h5>
    <p class="card-text">Most popular starter</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Mansaf</h5>
    <p class="card-text">Most popular Main</p>
  </div>
</div>
</div>
<div class="col">
<div class="card">

  <div class="card-body text-center">
    <h5 class="card-title">Cookies</h5>
    <p class="card-text">Most popular Desert</p>
  </div>
</div>`

function showDay(){
  statisticsGrid.innerHTML = dailyStats
  navbar.innerHTML =navbarDay
}
function showWeek() { 
  statisticsGrid.innerHTML = weeklyStats
  navbar.innerHTML = navbarWeek
}

function showMonth(){
  statisticsGrid.innerHTML = monthlyStats
  navbar.innerHTML = navbarMonth
}

const menuBtn = document.getElementById("managermenu");
if(menuBtn){
  menuBtn.addEventListener("click", ()=>{
    window.location.href = "../menu_managerview/index.html"
  })
}